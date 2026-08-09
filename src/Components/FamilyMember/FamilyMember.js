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
        <NodeBox selected={isSelected} onClick={() => onSelect(node.id)}>
          <span className="nodeMark">{node.name?.charAt(0).toUpperCase()}</span>
          <span className="nodeInfo">
            <strong>{node.name}</strong>
            <small>{isRoot ? 'Family root' : 'Family member'}</small>
          </span>
        </NodeBox>
        {node.spouse && (
          <>
            <span className="partnerLink" aria-hidden="true">&amp;</span>
            <NodeBox selected={selectedId === node.spouse.id} onClick={() => onSelect(node.spouse.id)}>
              <span className="nodeMark">{node.spouse.name?.charAt(0).toUpperCase()}</span>
              <span className="nodeInfo">
                <strong>{node.spouse.name}</strong>
                <small>Spouse</small>
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
