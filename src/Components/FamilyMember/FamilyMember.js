import React from 'react';
import { NodeContainer, GenerationRow, Branch, PartnerRow, NodeBox, ChildrenWrapper } from './FamilyMember.style';

const FamilyMember = ({ node, isRoot = false, onSelect, selectedId }) => {
  return (
    <NodeContainer>
      <GenerationRow>
        <MemberBranch node={node} isRoot={isRoot} onSelect={onSelect} selectedId={selectedId} />
        {node.siblings?.map((sibling) => (
          <MemberBranch key={sibling.id} node={sibling} onSelect={onSelect} selectedId={selectedId} />
        ))}
      </GenerationRow>
    </NodeContainer>
  );
};

const MemberBranch = ({ node, isRoot = false, onSelect, selectedId }) => {
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
        >
          {node.image ? <img className="nodeImage" src={node.image} alt="" /> : <span className="nodeMark">{node.name?.charAt(0).toUpperCase()}</span>}
          <span className="nodeInfo">
            <strong>{node.name}</strong>
            <small>{isRoot ? 'Family root' : node.dob || node.location || 'Family member'}</small>
          </span>
        </NodeBox>
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
            >
              {node.spouse.image ? <img className="nodeImage" src={node.spouse.image} alt="" /> : <span className="nodeMark">{node.spouse.name?.charAt(0).toUpperCase()}</span>}
              <span className="nodeInfo">
                <strong>{node.spouse.name}</strong>
                <small>{node.spouse.dob || node.spouse.location || 'Spouse'}</small>
              </span>
            </NodeBox>
          </>
        )}
      </PartnerRow>
      {node.children?.length > 0 && (
        <ChildrenWrapper>
          {node.children.map((child) => (
            <FamilyMember key={child.id} node={child} onSelect={onSelect} selectedId={selectedId} />
          ))}
        </ChildrenWrapper>
      )}
    </Branch>
  );
};

export default FamilyMember;
