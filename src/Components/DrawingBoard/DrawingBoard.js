import React, { useEffect, useState } from 'react';
import FamilyMember from '../FamilyMember/FamilyMember';
import { BoardWrapper, BoardHeader, BoardTitle, BoardHint, TreeViewport, ExportButton } from './DrawingBoard.style';
import { generateUUID } from '../../utils/uuid';
import MemberAddForm from '../MemberAddForm/MemberAddForm';

const DrawingBoard = ({ phone }) => {
  const [tree, setTree] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('All changes save automatically');

  useEffect(() => {
    const profileKey = phone ? `family-profile-${phone}` : Object.keys(localStorage)
      .find(key => key.startsWith('family-profile-'));
    
    if (profileKey) {
      const profileValue = localStorage.getItem(profileKey);
      if (!profileValue) return;

      const prof = JSON.parse(profileValue);
      const root = {
        id: generateUUID(),
        name: prof.familyName,
        children: [],
        siblings: [],
      };
      const savedTree = prof.tree || root;
      setTree(savedTree);
      setSelectedId(savedTree.id);
    }
  }, [phone]);

  const handleAdd = ({ name, relation, selectedId: selId }) => {
    if (!tree) return;

    const newNode = {
      id: generateUUID(),
      name,
      children: [],
      siblings: [],
    };

    const addRec = (node) => {
      if (node.id === selId) {
        if (relation === 'child') node.children.push(newNode);
        if (relation === 'sibling') node.siblings = [...(node.siblings||[]), newNode];
        if (relation === 'spouse') {
          if (node.spouse && !window.confirm('Replace the existing spouse for this person?')) return;
          node.spouse = newNode;
        }
      } else {
        node.children?.forEach(addRec);
        node.siblings?.forEach(addRec);
        if (node.spouse) addRec(node.spouse);
      }
    };
    addRec(tree);
    const updatedTree = { ...tree };
    setTree(updatedTree);

    if (phone) {
      const profileKey = `family-profile-${phone}`;
      const profileValue = localStorage.getItem(profileKey);
      if (profileValue) {
        const profile = JSON.parse(profileValue);
        localStorage.setItem(profileKey, JSON.stringify({ ...profile, tree: updatedTree }));
      }
    }
    setStatus(`${name} added as ${relation}`);
  };

  const handleExport = () => {
    if (!tree || !phone) return;

    const profileKey = `family-profile-${phone}`;
    const profileValue = localStorage.getItem(profileKey);
    const profile = profileValue ? JSON.parse(profileValue) : {};
    const exportDate = new Date().toISOString();
    const exportData = {
      familyName: profile.familyName || tree.name,
      phone,
      exportedAt: exportDate,
      tree,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${(profile.familyName || tree.name || 'family-tree').replace(/\s+/g, '-').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(downloadUrl);

    const historyKey = `family-export-${Date.now()}`;
    localStorage.setItem(historyKey, JSON.stringify({
      familyName: exportData.familyName,
      exportedAt: exportDate,
      phone,
    }));
    setStatus('JSON archive downloaded');
  };

  return (
    <BoardWrapper>
      <BoardHeader>
        <div>
          <BoardTitle>Your family tree</BoardTitle>
          <BoardHint>{status}</BoardHint>
        </div>
        <div>
          <ExportButton type="button" onClick={handleExport} disabled={!tree}>Export JSON</ExportButton>
          <span>{tree ? 'Live archive' : 'Preparing archive'}</span>
        </div>
      </BoardHeader>
      {tree && (
        <>
          <MemberAddForm onAdd={handleAdd} selectedId={selectedId} />
          <TreeViewport>
            <FamilyMember node={tree} isRoot onSelect={setSelectedId} selectedId={selectedId} />
          </TreeViewport>
        </>
      )}
    </BoardWrapper>
  );
};

export default DrawingBoard;
