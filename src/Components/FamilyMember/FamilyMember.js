import React from 'react';
import { NodeContainer, NodeBox, ChildrenWrapper } from './FamilyMember.style';

const FamilyMember = ({ node, isRoot = false, onSelect, selectedId }) => {
  const isSelected = selectedId === node.id;

  return (
    <NodeContainer>
      <NodeBox selected={isSelected} onClick={() => onSelect(node.id)}>
        <span className="nodeMark">{node.name?.charAt(0).toUpperCase()}</span>
        <span className="nodeInfo">
          <strong>{node.name}</strong>
          <small>{isRoot ? 'Family root' : 'Family member'}</small>
        </span>
      </NodeBox>

      {node.spouse && (
        <ChildrenWrapper>
          <FamilyMember node={node.spouse} onSelect={onSelect} selectedId={selectedId} />
        </ChildrenWrapper>
      )}

      {node.children?.length > 0 && (
        <ChildrenWrapper>
          {node.children.map(child => (
            <FamilyMember 
              key={child.id} 
              node={child} 
              onSelect={onSelect} 
              selectedId={selectedId} 
            />
          ))}
        </ChildrenWrapper>
      )}

      {node.siblings?.length > 0 && (
        <ChildrenWrapper>
          {node.siblings.map(sib => (
            <FamilyMember key={sib.id} node={sib} onSelect={onSelect} selectedId={selectedId} />
          ))}
        </ChildrenWrapper>
      )}
    </NodeContainer>
  );
};

export default FamilyMember;
