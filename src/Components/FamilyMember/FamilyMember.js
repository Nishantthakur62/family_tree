import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { NodeContainer, GenerationRow, Branch, PartnerRow, NodeBox, ChildrenWrapper, SiblingButton, SpouseButton, ChildButton } from './FamilyMember.style';

const FamilyMember = ({ node, isRoot = false, onSelect, onOpenDetails, onQuickAdd, selectedId }) => {
  return (
    <NodeContainer>
      <GenerationRow>
        <MemberBranch node={node} isRoot={isRoot} onSelect={onSelect} onOpenDetails={onOpenDetails} onQuickAdd={onQuickAdd} selectedId={selectedId} />
        {node.siblings?.map((sibling) => (
          <MemberBranch key={sibling.id} node={sibling} onSelect={onSelect} onOpenDetails={onOpenDetails} onQuickAdd={onQuickAdd} selectedId={selectedId} />
        ))}
      </GenerationRow>
    </NodeContainer>
  );
};

const handleQuickAddClick = (event, onQuickAdd, id, relation) => {
  if (event.detail === 2) return;
  onQuickAdd(id, relation);
};

const MemberBranch = ({ node, isRoot = false, onSelect, onOpenDetails, onQuickAdd, selectedId }) => {
  const isSelected = selectedId === node.id;

  return (
    <Branch>
      <PartnerRow>
        <NodeBox
          type="button"
          selected={isSelected}
          $root={isRoot}
          aria-pressed={isSelected}
          aria-label={`Select ${node.name}`}
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => onSelect(node.id)}
          onDoubleClick={() => onOpenDetails(node.id)}
        >
          {node.image ? <img className="nodeImage" src={node.image} alt="" /> : <span className="nodeMark">{node.name?.charAt(0).toUpperCase()}</span>}
          <span className="nodeInfo">
            <strong>{node.name}</strong>
            <small>{isRoot ? 'Family root' : node.dob || node.location || 'Family member'}</small>
          </span>
        </NodeBox>
        <SiblingButton
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => handleQuickAddClick(event, onQuickAdd, node.id, 'sibling')}
          onDoubleClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onQuickAdd(node.id, 'sibling', true);
          }}
          aria-label={`Add a sibling to ${node.name}`}
          title={`Add a sibling to ${node.name}`}
        ><FiPlus aria-hidden="true" /></SiblingButton>
        {node.spouse && (
          <>
            <span className="partnerLink" aria-hidden="true">&amp;</span>
            <NodeBox
              type="button"
              selected={selectedId === node.spouse.id}
              $root={false}
              aria-pressed={selectedId === node.spouse.id}
              aria-label={`Select ${node.spouse.name}`}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => onSelect(node.spouse.id)}
              onDoubleClick={() => onOpenDetails(node.spouse.id)}
            >
              {node.spouse.image ? <img className="nodeImage" src={node.spouse.image} alt="" /> : <span className="nodeMark">{node.spouse.name?.charAt(0).toUpperCase()}</span>}
              <span className="nodeInfo">
                <strong>{node.spouse.name}</strong>
                <small>{node.spouse.dob || node.spouse.location || 'Spouse'}</small>
              </span>
            </NodeBox>
          </>
        )}
        {!node.spouse && <SpouseButton
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => handleQuickAddClick(event, onQuickAdd, node.id, 'spouse')}
          onDoubleClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onQuickAdd(node.id, 'spouse', true);
          }}
          aria-label={`Add a spouse to ${node.name}`}
          title={`Add a spouse to ${node.name}`}
        >&amp;</SpouseButton>}
      </PartnerRow>
      <ChildButton
        type="button"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => handleQuickAddClick(event, onQuickAdd, node.id, 'child')}
        onDoubleClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onQuickAdd(node.id, 'child', true);
        }}
        aria-label={`Add a child to ${node.name}`}
        title={`Add a child to ${node.name}`}
      />
      {node.children?.length > 0 && (
        <ChildrenWrapper>
          {node.children.map((child) => (
            <FamilyMember key={child.id} node={child} onSelect={onSelect} onOpenDetails={onOpenDetails} onQuickAdd={onQuickAdd} selectedId={selectedId} />
          ))}
        </ChildrenWrapper>
      )}
    </Branch>
  );
};

export default FamilyMember;
