import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiDownload, FiMinus, FiPlus, FiMaximize, FiCrosshair } from 'react-icons/fi';
import FamilyMember from '../FamilyMember/FamilyMember';
import { BoardWrapper, BoardHeader, BoardTitle, BoardHint, BoardTools, TreeViewport, TreeStage, TreeCanvas, ExportButton, ZoomLabel, ZoomControls, ZoomButton, FitButton, UnlinkedSection, UnlinkedList } from './DrawingBoard.style';
import { generateUUID } from '../../utils/uuid';
import MemberAddForm from '../MemberAddForm/MemberAddForm';
import MoreDetailsForm from '../MoreDetailsForm/MoreDetailsForm';

const findNode = (node, id) => {
  if (!node) return null;
  if (node.id === id) return node;
  for (const child of node.children || []) {
    const match = findNode(child, id);
    if (match) return match;
  }
  for (const sibling of node.siblings || []) {
    const match = findNode(sibling, id);
    if (match) return match;
  }
  return findNode(node.spouse, id);
};

const DrawingBoard = ({ phone }) => {
  const MIN_ZOOM = 0.45;
  const MAX_ZOOM = 1.5;
  const [tree, setTree] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('All changes save automatically');
  const [zoom, setZoom] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const panRef = useRef(null);

  const updateZoom = (nextZoom) => {
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(nextZoom.toFixed(2)))));
  };

  const fitTree = useCallback(() => {
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!viewport || !canvas) return;

    const availableWidth = Math.max(viewport.clientWidth - 48, 240);
    const treeWidth = canvas.scrollWidth;
    const nextZoom = treeWidth > availableWidth ? availableWidth / treeWidth : 1;
    setZoom(currentZoom => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(nextZoom.toFixed(2)))));
  }, []);

  const persistTree = (updatedTree) => {
    if (!phone) return;
    const profileKey = `family-profile-${phone}`;
    const profileValue = localStorage.getItem(profileKey);
    if (!profileValue) return;

    try {
      const profile = JSON.parse(profileValue);
      localStorage.setItem(profileKey, JSON.stringify({ ...profile, tree: updatedTree }));
    } catch {
      setStatus('Tree changed, but the saved profile could not be updated');
    }
  };

  useEffect(() => {
    const profileKey = phone ? `family-profile-${phone}` : Object.keys(localStorage)
      .find(key => key.startsWith('family-profile-'));
    
    if (profileKey) {
      const profileValue = localStorage.getItem(profileKey);
      if (!profileValue) return;

      let prof;
      try {
        prof = JSON.parse(profileValue);
      } catch {
        setStatus('Saved profile could not be read');
        return;
      }
      const root = {
        id: generateUUID(),
        name: prof.familyName,
        children: [],
        siblings: [],
      };
      const savedTree = prof.tree && prof.tree.id ? prof.tree : root;
      setTree(savedTree);
      setSelectedId(savedTree.id);
    }
  }, [phone]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!viewport || !canvas) return undefined;

    const observer = new ResizeObserver(fitTree);
    observer.observe(viewport);
    observer.observe(canvas);
    setCanvasSize({ width: canvas.scrollWidth, height: canvas.scrollHeight });
    const handleWheel = (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      setZoom((currentZoom) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((currentZoom - event.deltaY * 0.0015).toFixed(2)))));
    };
    viewport.addEventListener('wheel', handleWheel, { passive: false });
    fitTree();
    return () => {
      observer.disconnect();
      viewport.removeEventListener('wheel', handleWheel);
    };
  }, [tree, fitTree]);

  const handleAdd = ({ name, relation, selectedId: selId }) => {
    if (!tree) return;

    const newNode = {
      id: generateUUID(),
      name,
      children: [],
      siblings: [],
    };

    let added = false;
    const addRec = (node) => {
      if (node.id === selId) {
        if (relation === 'child') node.children = [...(node.children || []), newNode];
        if (relation === 'sibling') node.siblings = [...(node.siblings || []), newNode];
        if (relation === 'spouse') {
          if (node.spouse && !window.confirm('Replace the existing spouse for this person?')) return;
          node.spouse = newNode;
        }
        added = true;
      } else {
        node.children?.forEach(addRec);
        node.siblings?.forEach(addRec);
        if (node.spouse) addRec(node.spouse);
      }
    };
    const treeCopy = JSON.parse(JSON.stringify(tree));
    addRec(treeCopy);
    if (!added) return;
    const updatedTree = treeCopy;
    setTree(updatedTree);

    if (phone) {
      persistTree(updatedTree);
    }
    setStatus(`${name} added as ${relation}`);
  };

  const handleUpdate = (details) => {
    if (!tree || !selectedId || !details.name) return;
    const treeCopy = JSON.parse(JSON.stringify(tree));
    const updateRec = (node) => {
      if (!node) return false;
      if (node.id === selectedId) {
        Object.assign(node, details);
        return true;
      }
      return (node.children || []).some(updateRec)
        || (node.siblings || []).some(updateRec)
        || updateRec(node.spouse);
    };

    if (!updateRec(treeCopy)) return;
    setTree(treeCopy);
    persistTree(treeCopy);
    setStatus(`${details.name} details saved`);
  };

  const handleDelete = () => {
    if (!tree || !selectedId || selectedId === tree.id) {
      setStatus('The family root cannot be deleted');
      return;
    }
    const member = findNode(tree, selectedId);
    if (!member || !window.confirm(`Delete ${member.name} and their entire branch?`)) return;

    const treeCopy = JSON.parse(JSON.stringify(tree));
    const removeRec = (node) => {
      if (!node) return false;
      const childIndex = (node.children || []).findIndex(child => child.id === selectedId);
      if (childIndex >= 0) {
        node.children.splice(childIndex, 1);
        return true;
      }
      const siblingIndex = (node.siblings || []).findIndex(sibling => sibling.id === selectedId);
      if (siblingIndex >= 0) {
        node.siblings.splice(siblingIndex, 1);
        return true;
      }
      if (node.spouse?.id === selectedId) {
        delete node.spouse;
        return true;
      }
      return (node.children || []).some(removeRec)
        || (node.siblings || []).some(removeRec)
        || removeRec(node.spouse);
    };

    if (!removeRec(treeCopy)) return;
    setTree(treeCopy);
    setSelectedId(treeCopy.id);
    persistTree(treeCopy);
    setStatus(`${member.name} and their branch were deleted`);
  };

  const centerSelected = () => {
    const viewport = viewportRef.current;
    const selectedNode = viewport?.querySelector('button[aria-pressed="true"]');
    if (!viewport || !selectedNode) return;

    const viewportRect = viewport.getBoundingClientRect();
    const nodeRect = selectedNode.getBoundingClientRect();
    viewport.scrollLeft += nodeRect.left + nodeRect.width / 2 - (viewportRect.left + viewportRect.width / 2);
    viewport.scrollTop += nodeRect.top + nodeRect.height / 2 - (viewportRect.top + viewportRect.height / 2);
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    window.requestAnimationFrame(centerSelected);
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    panRef.current = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: event.currentTarget.scrollLeft,
      scrollTop: event.currentTarget.scrollTop,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const viewport = viewportRef.current;
    const pan = panRef.current;
    if (!viewport || !pan) return;
    viewport.scrollLeft = pan.scrollLeft - (event.clientX - pan.x);
    viewport.scrollTop = pan.scrollTop - (event.clientY - pan.y);
  };

  const stopPanning = (event) => {
    panRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleExport = () => {
    if (!tree || !phone) return;

    const profileKey = `family-profile-${phone}`;
    const profileValue = localStorage.getItem(profileKey);
    let profile = {};
    try {
      profile = profileValue ? JSON.parse(profileValue) : {};
    } catch {
      setStatus('Export failed: saved profile data is invalid');
      return;
    }
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
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);

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
        <BoardTools>
          <ExportButton type="button" onClick={handleExport} disabled={!tree}><FiDownload aria-hidden="true" /> Export JSON</ExportButton>
          <ZoomControls aria-label="Tree zoom controls">
            <ZoomButton type="button" onClick={() => updateZoom(zoom - 0.1)} aria-label="Zoom out" title="Zoom out"><FiMinus /></ZoomButton>
            <ZoomLabel>{Math.round(zoom * 100)}%</ZoomLabel>
            <ZoomButton type="button" onClick={() => updateZoom(zoom + 0.1)} aria-label="Zoom in" title="Zoom in"><FiPlus /></ZoomButton>
            <FitButton type="button" onClick={fitTree} aria-label="Fit tree to viewport" title="Fit tree"><FiMaximize /> Fit</FitButton>
            <ZoomButton type="button" onClick={centerSelected} aria-label="Center selected person" title="Center selected person"><FiCrosshair /></ZoomButton>
          </ZoomControls>
          <span>{tree ? 'Live archive' : 'Preparing archive'}</span>
        </BoardTools>
      </BoardHeader>
      {tree && (
        <>
          <MemberAddForm onAdd={handleAdd} selectedId={selectedId} />
          {findNode(tree, selectedId) && (
            <MoreDetailsForm member={findNode(tree, selectedId)} onUpdate={handleUpdate} onDelete={handleDelete} />
          )}
          {tree.unlinkedPeople?.length > 0 && (
            <UnlinkedSection>
              <strong>Unlinked records</strong>
              <span>These people were included in the source records without a confirmed relationship.</span>
              <UnlinkedList>
                {tree.unlinkedPeople.map((person, index) => <li key={`${person.name}-${index}`}>{person.name}</li>)}
              </UnlinkedList>
            </UnlinkedSection>
          )}
          <TreeViewport
            ref={viewportRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopPanning}
            onPointerCancel={stopPanning}
            title="Drag to pan. Hold Ctrl or Cmd and scroll to zoom"
          >
            <TreeStage $width={canvasSize.width ? canvasSize.width * zoom : undefined} $height={canvasSize.height ? canvasSize.height * zoom : undefined}>
              <TreeCanvas ref={canvasRef} $zoom={zoom}>
                <FamilyMember node={tree} isRoot onSelect={handleSelect} selectedId={selectedId} />
              </TreeCanvas>
            </TreeStage>
          </TreeViewport>
        </>
      )}
    </BoardWrapper>
  );
};

export default DrawingBoard;
