import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiDownload, FiMinus, FiPlus, FiMaximize, FiCrosshair, FiMove, FiTarget, FiUpload, FiUsers } from 'react-icons/fi';
import FamilyMember from '../FamilyMember/FamilyMember';
import { BoardWrapper, BoardHeader, BoardTitle, BoardHint, BoardTools, CanvasHint, TreeViewport, TreeStage, TreeCanvas, ExportButton, HiddenInput, ZoomLabel, ZoomControls, ZoomButton, FitButton, ModeButton, UnlinkedSection, UnlinkedList, EmptyState, DetailsOverlay } from './DrawingBoard.style';
import { generateUUID } from '../../utils/uuid';
import MemberAddForm from '../MemberAddForm/MemberAddForm';
import MoreDetailsForm from '../MoreDetailsForm/MoreDetailsForm';
import { createArchive, getUniqueProfileId, isValidTree, normalizeTree, PROFILE_PREFIX, EXPORT_PREFIX } from '../../utils/familyData';
import { NAME_LISTS_KEY } from '../../utils/nameLists';
import { DEFAULT_GENERATED_NAMES } from '../../utils/nameLibrary';

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

const knownGenderByName = {
  noah: 'male', nora: 'female', lena: 'female', owen: 'male', piper: 'female', elaine: 'female', daniel: 'male', james: 'male', mina: 'female',
  ruth: 'female', elias: 'male', clara: 'female', paul: 'male', sage: 'female', wren: 'female', milo: 'male', samuel: 'male', ines: 'female',
  michael: 'male', jonas: 'male', agnes: 'female', tronte: 'male', ulrich: 'male', martha: 'female', magnus: 'male', bernd: 'male', helge: 'male',
  peter: 'male', charlotte: 'female', franziska: 'female', elisabeth: 'female', greta: 'female', claudia: 'female', regina: 'female', egon: 'male',
  aleksander: 'male', bartosz: 'male', hannah: 'female', jana: 'female', katharina: 'female', reed: 'male', ben: 'male', ivy: 'female', isaac: 'male',
  theo: 'male', june: 'female', ava: 'female', rose: 'female', mara: 'female',
};

const getNodeGender = (node) => {
  if (node?.gender) return node.gender;
  const firstName = node?.name?.trim().split(/\s+/)[0].toLowerCase();
  return knownGenderByName[firstName] || null;
};

const collectNames = (node, names = new Set()) => {
  if (!node) return names;
  if (node.name) names.add(node.name.trim().toLowerCase());
  collectNames(node.spouse, names);
  (node.children || []).forEach((child) => collectNames(child, names));
  (node.siblings || []).forEach((sibling) => collectNames(sibling, names));
  return names;
};

const readQuickNamePool = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(NAME_LISTS_KEY) || 'null');
    if (saved && Array.isArray(saved.maleNames) && Array.isArray(saved.femaleNames)) {
      const customPool = [
        ...saved.maleNames.map((name) => ({ name, gender: 'male' })),
        ...saved.femaleNames.map((name) => ({ name, gender: 'female' })),
      ];
      return customPool.length > 0 ? customPool : DEFAULT_GENERATED_NAMES;
    }
  } catch {
    return DEFAULT_GENERATED_NAMES;
  }
  return DEFAULT_GENERATED_NAMES;
};

const DrawingBoard = ({ phone }) => {
  const MIN_ZOOM = 0.45;
  const MAX_ZOOM = 1.5;
  const [tree, setTree] = useState(null);
  const [profileMissing, setProfileMissing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [panMode, setPanMode] = useState(false);
  const [status, setStatus] = useState('All changes save automatically');
  const [zoom, setZoom] = useState(1);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const importInputRef = useRef(null);
  const navigate = useNavigate();
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const panRef = useRef(null);
  const manualZoomRef = useRef(false);

  const updateZoom = (nextZoom) => {
    manualZoomRef.current = true;
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(nextZoom.toFixed(2)))));
  };

  const fitTree = useCallback(() => {
    if (manualZoomRef.current) return;
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!viewport || !canvas) return;

    const availableWidth = Math.max(viewport.clientWidth - 48, 240);
    const availableHeight = Math.max(viewport.clientHeight - 48, 240);
    const treeWidth = canvas.scrollWidth;
    const treeHeight = canvas.scrollHeight;
    const widthZoom = treeWidth > availableWidth ? availableWidth / treeWidth : 1;
    const heightZoom = treeHeight > availableHeight ? availableHeight / treeHeight : 1;
    const nextZoom = Math.min(widthZoom, heightZoom, 1);
    setZoom(currentZoom => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(nextZoom.toFixed(2)))));
  }, []);

  const handleFitTree = () => {
    manualZoomRef.current = false;
    setCanvasOffset({ x: 0, y: 0 });
    fitTree();
  };

  const persistTree = (updatedTree) => {
    if (!phone) return;
    const profileKey = `${PROFILE_PREFIX}${phone}`;
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
    const profileKey = phone ? `${PROFILE_PREFIX}${phone}` : Object.keys(localStorage)
      .find(key => key.startsWith(PROFILE_PREFIX));
    
    if (profileKey) {
      const profileValue = localStorage.getItem(profileKey);
      if (!profileValue) {
        setProfileMissing(true);
        return;
      }

      let prof;
      try {
        prof = JSON.parse(profileValue);
      } catch {
        setStatus('Saved profile could not be read');
        setProfileMissing(true);
        return;
      }
      if (!prof || typeof prof !== 'object') {
        setStatus('Saved profile could not be read');
        setProfileMissing(true);
        return;
      }
      const root = {
        id: generateUUID(),
        name: prof.familyName,
        ...(prof.gender ? { gender: prof.gender } : {}),
        children: [],
        siblings: [],
      };
      const savedTree = prof.tree && prof.tree.id ? prof.tree : root;
      setTree(savedTree);
      setSelectedId(savedTree.id);
      setProfileMissing(false);
      if (!prof.tree || !prof.tree.id) {
        localStorage.setItem(profileKey, JSON.stringify({ ...prof, tree: root }));
      }
    } else {
      setProfileMissing(true);
    }
  }, [phone]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    if (!viewport || !canvas) return undefined;

    const observer = new ResizeObserver(fitTree);
    observer.observe(viewport);
    setCanvasSize({ width: canvas.scrollWidth, height: canvas.scrollHeight });
    const handleWheel = (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((zoom - event.deltaY * 0.0015).toFixed(2))));
      if (nextZoom === zoom) return;

      const viewportRect = viewport.getBoundingClientRect();
      const cursorX = event.clientX - viewportRect.left;
      const cursorY = event.clientY - viewportRect.top;
      const contentX = viewport.scrollLeft + cursorX;
      const contentY = viewport.scrollTop + cursorY;
      const zoomRatio = nextZoom / zoom;

      setZoom(nextZoom);
      window.requestAnimationFrame(() => {
        const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
        const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
        viewport.scrollTo({
          left: Math.min(maxScrollLeft, Math.max(0, contentX * zoomRatio - cursorX)),
          top: Math.min(maxScrollTop, Math.max(0, contentY * zoomRatio - cursorY)),
          behavior: 'auto',
        });
      });
    };
    viewport.addEventListener('wheel', handleWheel, { passive: false });
    fitTree();
    return () => {
      observer.disconnect();
      viewport.removeEventListener('wheel', handleWheel);
    };
  }, [tree, fitTree, zoom]);

  const addNode = ({ name, gender, relation, selectedId: selId }) => {
    if (!tree) return;

    const newNode = {
      id: generateUUID(),
      name,
      ...(gender ? { gender } : {}),
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

  const handleAdd = (details) => addNode(details);

  const handleQuickAdd = (id, relation) => {
    if (!tree) return;
    setDetailsOpen(false);
    const usedNames = collectNames(tree);
    const targetGender = getNodeGender(findNode(tree, id));
    const availableNames = readQuickNamePool().filter(({ name, gender }) => {
      if (usedNames.has(name.toLowerCase())) return false;
      return relation !== 'spouse' || !targetGender || gender !== targetGender;
    });
    if (availableNames.length === 0) {
      setStatus('All quick-add names are in use. Add a custom person below.');
      return;
    }
    const randomPerson = availableNames[Math.floor(Math.random() * availableNames.length)];
    addNode({ name: randomPerson.name, gender: randomPerson.gender, relation, selectedId: id });
    setSelectedId(id);
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
    setDetailsOpen(false);
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
    setDetailsOpen(false);
    setStatus(`${member.name} and their branch were deleted`);
  };

  const centerSelected = useCallback(() => {
    const viewport = viewportRef.current;
    const selectedNode = viewport?.querySelector('button[aria-pressed="true"]');
    if (!viewport || !selectedNode) return;

    const viewportRect = viewport.getBoundingClientRect();
    const nodeRect = selectedNode.getBoundingClientRect();
    const horizontalDelta = nodeRect.left + nodeRect.width / 2 - (viewportRect.left + viewportRect.width / 2);
    const verticalDelta = nodeRect.top + nodeRect.height / 2 - (viewportRect.top + viewportRect.height / 2);
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const maxScrollTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    const nextScrollLeft = Math.min(maxScrollLeft, Math.max(0, viewport.scrollLeft + horizontalDelta));
    const nextScrollTop = Math.min(maxScrollTop, Math.max(0, viewport.scrollTop + verticalDelta));
    const residualX = horizontalDelta - (nextScrollLeft - viewport.scrollLeft);
    const residualY = verticalDelta - (nextScrollTop - viewport.scrollTop);

    if (Math.abs(residualX) > 1 || Math.abs(residualY) > 1) {
      setCanvasOffset((currentOffset) => ({
        x: currentOffset.x - residualX,
        y: currentOffset.y - residualY,
      }));
    }

    viewport.scrollTo({
      left: nextScrollLeft,
      top: nextScrollTop,
      behavior: 'smooth',
    });
  }, []);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  useEffect(() => {
    if (!selectedId || panMode) return undefined;
    const frame = window.requestAnimationFrame(centerSelected);
    return () => window.cancelAnimationFrame(frame);
  }, [selectedId, panMode, zoom, centerSelected]);

  useEffect(() => {
    const handleCanvasKeys = (event) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return;
      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        updateZoom(zoom + 0.1);
      }
      if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        updateZoom(zoom - 0.1);
      }
      if (event.key === '0') {
        manualZoomRef.current = false;
        fitTree();
      }
      if (event.key.toLowerCase() === 'c') centerSelected();
    };
    document.addEventListener('keydown', handleCanvasKeys);
    return () => document.removeEventListener('keydown', handleCanvasKeys);
  }, [centerSelected, fitTree, zoom]);

  const handleOpenDetails = (id) => {
    setSelectedId(id);
    setDetailsOpen(true);
  };

  const selectedMember = tree && selectedId ? findNode(tree, selectedId) : null;

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setDetailsOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  const handlePointerDown = (event) => {
    if (event.button !== 0 || !panMode) return;
    panRef.current = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: event.currentTarget.scrollLeft,
      scrollTop: event.currentTarget.scrollTop,
      offsetX: canvasOffset.x,
      offsetY: canvasOffset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const viewport = viewportRef.current;
    const pan = panRef.current;
    if (!viewport || !pan) return;
    const deltaX = event.clientX - pan.x;
    const deltaY = event.clientY - pan.y;
    const canScrollX = viewport.scrollWidth > viewport.clientWidth;
    const canScrollY = viewport.scrollHeight > viewport.clientHeight;

    if (canScrollX) viewport.scrollLeft = pan.scrollLeft - deltaX;
    if (canScrollY) viewport.scrollTop = pan.scrollTop - deltaY;
    if (!canScrollX || !canScrollY) {
      setCanvasOffset({
        x: canScrollX ? pan.offsetX : pan.offsetX + deltaX,
        y: canScrollY ? pan.offsetY : pan.offsetY + deltaY,
      });
    }
  };

  const stopPanning = (event) => {
    panRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleExport = () => {
    if (!tree || !phone) return;
    if (!isValidTree(tree)) {
      setStatus('Export failed: the tree data is invalid');
      return;
    }

    const profileKey = `${PROFILE_PREFIX}${phone}`;
    const profileValue = localStorage.getItem(profileKey);
    let profile = {};
    try {
      profile = profileValue ? JSON.parse(profileValue) : {};
    } catch {
      setStatus('Export failed: saved profile data is invalid');
      return;
    }
    const exportData = createArchive({
      fullName: profile.fullName,
      familyName: profile.familyName || tree.name,
      phone,
      tree,
    });
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${(profile.familyName || tree.name || 'family-tree').replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);

    const historyKey = `${EXPORT_PREFIX}${Date.now()}`;
    localStorage.setItem(historyKey, JSON.stringify({
      familyName: exportData.familyName,
      exportedAt: exportData.exportedAt,
      phone,
    }));
    setStatus('JSON archive downloaded');
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (imported.format && imported.format !== 'familyroots-tree') throw new Error('Invalid format');
        const importedTree = normalizeTree(imported.tree);
        if (!imported.familyName || !isValidTree(importedTree)) throw new Error('Invalid archive');

        const importedPhone = getUniqueProfileId(imported.phone || `imported-${Date.now()}`);
        localStorage.setItem(`${PROFILE_PREFIX}${importedPhone}`, JSON.stringify({
          fullName: imported.fullName || '',
          phoneNumber: importedPhone,
          familyName: imported.familyName,
          tree: importedTree,
        }));
        setStatus('JSON archive imported');
        navigate(`/builder/${importedPhone}`);
      } catch {
        setStatus('Import failed: choose a valid FamilyRoots JSON archive');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <BoardWrapper>
      <BoardHeader>
        <div>
          <BoardTitle>Your family tree</BoardTitle>
          <BoardHint>{status}</BoardHint>
        </div>
        <BoardTools>
          <ExportButton type="button" onClick={() => importInputRef.current?.click()}><FiUpload aria-hidden="true" /> Import JSON</ExportButton>
          <HiddenInput ref={importInputRef} type="file" accept="application/json,.json" onChange={handleImport} />
          <ExportButton type="button" onClick={handleExport} disabled={!tree}><FiDownload aria-hidden="true" /> Export JSON</ExportButton>
          <ExportButton type="button" onClick={() => navigate(`/name-lists?return=${encodeURIComponent(`/builder/${phone}`)}`)}><FiUsers aria-hidden="true" /> Name lists</ExportButton>
          <ZoomControls aria-label="Tree zoom controls">
            <ZoomButton type="button" onClick={() => updateZoom(zoom - 0.1)} aria-label="Zoom out" title="Zoom out"><FiMinus /></ZoomButton>
            <ZoomLabel>{Math.round(zoom * 100)}%</ZoomLabel>
            <ZoomButton type="button" onClick={() => updateZoom(zoom + 0.1)} aria-label="Zoom in" title="Zoom in"><FiPlus /></ZoomButton>
            <FitButton type="button" onClick={handleFitTree} aria-label="Fit tree to viewport" title="Fit tree"><FiMaximize /> Fit</FitButton>
            <ZoomButton type="button" onClick={centerSelected} aria-label="Center selected person" title="Center selected person"><FiCrosshair /></ZoomButton>
            <ModeButton type="button" $active={panMode} onClick={() => setPanMode((currentMode) => !currentMode)} aria-pressed={panMode} title={panMode ? 'Switch to focus mode' : 'Switch to pan mode'}>
              {panMode ? <FiTarget aria-hidden="true" /> : <FiMove aria-hidden="true" />}
              {panMode ? 'Pan' : 'Focus'}
            </ModeButton>
          </ZoomControls>
          <span>{tree ? 'Live archive' : 'Preparing archive'}</span>
        </BoardTools>
      </BoardHeader>
      {profileMissing ? (
        <EmptyState>
          <strong>Family archive not found</strong>
          <span>This builder link does not match a saved family on this device.</span>
          <Link to="/families">Return to your families</Link>
        </EmptyState>
      ) : tree && (
        <>
          <MemberAddForm onAdd={handleAdd} selectedId={selectedId} selectedName={selectedMember?.name} suggestedRelation="child" />
          {detailsOpen && findNode(tree, selectedId) && (
            <DetailsOverlay onClick={() => setDetailsOpen(false)} role="presentation">
              <div onClick={(event) => event.stopPropagation()}>
                <MoreDetailsForm member={findNode(tree, selectedId)} onUpdate={handleUpdate} onDelete={handleDelete} onClose={() => setDetailsOpen(false)} />
              </div>
            </DetailsOverlay>
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
          <CanvasHint>{panMode ? 'Pan mode: drag the canvas to explore' : 'Focus mode: select a person to center them'} · double-click for details · + / − to zoom · 0 to fit</CanvasHint>
          <TreeViewport
            ref={viewportRef}
            $panMode={panMode}
            data-pan-mode={panMode}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopPanning}
            onPointerCancel={stopPanning}
            title="Drag to pan. Hold Ctrl or Cmd and scroll to zoom"
          >
            <TreeStage $width={canvasSize.width ? canvasSize.width * zoom : undefined} $height={canvasSize.height ? canvasSize.height * zoom : undefined}>
                <TreeCanvas ref={canvasRef} $zoom={zoom} $offsetX={canvasOffset.x} $offsetY={canvasOffset.y}>
                <FamilyMember node={tree} isRoot onSelect={handleSelect} onOpenDetails={handleOpenDetails} onQuickAdd={handleQuickAdd} selectedId={selectedId} />
              </TreeCanvas>
            </TreeStage>
          </TreeViewport>
        </>
      )}
    </BoardWrapper>
  );
};

export default DrawingBoard;
