import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { generateUUID } from '../../utils/uuid';

const Container = styled.div`
  max-width: 700px;
  margin: 20px auto;
  padding: 30px;
  border: 2px dashed #667eea;
  border-radius: 12px;
  background: #f8f9ff;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.5;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;

  &:hover {
    background: #5568d3;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: monospace;
  font-size: 13px;
  resize: vertical;
  margin-bottom: 10px;

  &::placeholder {
    color: #999;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ErrorMessage = styled.div`
  color: #f44336;
  background: #ffebee;
  padding: 12px;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  background: #e8f5e9;
  padding: 12px;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 14px;
`;

const Preview = styled.div`
  background: white;
  padding: 15px;
  border-radius: 6px;
  margin-top: 15px;
  text-align: left;
  max-height: 200px;
  overflow-y: auto;
  font-size: 12px;
  border: 1px solid #ddd;

  strong {
    display: block;
    margin-top: 8px;
    margin-bottom: 4px;
  }
`;

/**
 * Parse name string and extract name, DOB, spouse
 * Examples:
 * "Dayakant Thakur (1955apprx)(Jibchi Devi)"
 * "Murari Thakur(1987 apprx)"
 * "Rajendra Thakur(12/11/1991)"
 */
const parsePerson = (text) => {
  if (!text) return null;
  
  text = text.trim();
  
  // Extract spouse (if in parentheses after date)
  let spouse = null;
  const spouseMatch = text.match(/\)\(([^)]+)\)$/);
  if (spouseMatch) {
    spouse = spouseMatch[1].trim();
    text = text.replace(/\)\([^)]+\)$/, '');
  }
  
  // Extract name and DOB
  const nameMatch = text.match(/^([^(]+)(?:\(([^)]*)\))?/);
  const name = nameMatch ? nameMatch[1].trim() : text;
  const dob = nameMatch && nameMatch[2] ? nameMatch[2].trim() : '';
  
  return { name, dob, spouse };
};

/**
 * Parse CSV data into tree structure
 * CSV format: Columns = generations, rows = family lineages
 * Siblings are identified by sharing the same parent column
 */
const parseCSVToTree = (csvText) => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) throw new Error('CSV must have at least 2 rows');

  const data = lines.slice(1).map(line => line.split(',').map(cell => cell.trim()));

  if (data.length === 0) throw new Error('No data rows found');

  // Find first non-empty cell to start the tree
  let rootText = null;
  let rootColIdx = 0;
  for (let row of data) {
    for (let i = 0; i < row.length; i++) {
      if (row[i]) {
        rootText = row[i];
        rootColIdx = i;
        break;
      }
    }
    if (rootText) break;
  }

  if (!rootText) throw new Error('No family data found in CSV');

  const createPerson = (nameStr, extra = {}) => {
    const parsed = parsePerson(nameStr);
    if (!parsed) return null;
    
    return {
      id: generateUUID(),
      name: parsed.name,
      ...(parsed.dob && { dob: parsed.dob }),
      children: [],
      siblings: [],
      ...extra,
    };
  };

  const rootPerson = createPerson(rootText);
  if (!rootPerson) throw new Error('Could not parse root person');

  const personMap = new Map();
  personMap.set(rootText, rootPerson);

  // Track parent-child relationships by column
  // Key: "colIndex:personName" -> person object
  const columnPersons = new Map();
  columnPersons.set(`${rootColIdx}:${rootText}`, rootPerson);

  // Build tree: each row represents a lineage down from root
  data.forEach((row, rowIdx) => {
    let lastPerson = null;
    let lastColIdx = -1;

    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      const cell = row[colIdx];
      if (!cell) continue;

      const person = createPerson(cell);
      if (!person) continue;

      // Determine if this is a child or sibling
      if (colIdx > lastColIdx) {
        // Child relationship: current person is child of last person
        if (lastPerson) {
          if (!lastPerson.children.find(c => c.name === person.name)) {
            lastPerson.children.push(person);
          }
        }
      }

      personMap.set(cell, person);
      columnPersons.set(`${colIdx}:${cell}`, person);
      lastPerson = person;
      lastColIdx = colIdx;
    }
  });

  return rootPerson;
};

const CSVImporter = ({ onImport }) => {
  const [csvText, setCsvText] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setCsvText(text);
        setError(null);
        setSuccess(null);
      }
    };
    reader.readAsText(file);
  };

  const handleParse = () => {
    setError(null);
    setSuccess(null);
    setPreview(null);

    if (!csvText.trim()) {
      setError('Please paste or upload CSV data');
      return;
    }

    try {
      const tree = parseCSVToTree(csvText);
      const memberCount = countMembers(tree);

      setPreview({
        rootName: tree.name,
        memberCount,
      });

      setSuccess(`✓ Parsed successfully! Found ${memberCount} family member${memberCount !== 1 ? 's' : ''}.`);

      if (onImport) {
        onImport(tree);
      }
    } catch (err) {
      setError(`✗ ${err.message}`);
    }
  };

  const countMembers = (node) => {
    if (!node) return 0;
    let count = 1;
    (node.children || []).forEach(child => {
      count += countMembers(child);
    });
    (node.siblings || []).forEach(sibling => {
      count += countMembers(sibling);
    });
    return count;
  };

  const handleClear = () => {
    setCsvText('');
    setError(null);
    setSuccess(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Container>
      <Title>📋 Import Your Family Tree</Title>
      <Description>
        Paste your CSV data or upload a file. Format: Each row is a family lineage, columns represent generations.
      </Description>

      <InputGroup>
        <Button onClick={() => fileInputRef.current?.click()}>
          📁 Choose File
        </Button>
        <Button onClick={handleParse} disabled={!csvText.trim()}>
          ✓ Parse CSV
        </Button>
        <Button onClick={handleClear} disabled={!csvText.trim()}>
          🗑️ Clear
        </Button>
      </InputGroup>

      <HiddenInput 
        ref={fileInputRef} 
        type="file" 
        accept=".csv,.txt" 
        onChange={handleFileUpload} 
      />

      <TextArea
        value={csvText}
        onChange={(e) => setCsvText(e.target.value)}
        placeholder={`Example CSV format:\nGreat Grandparents,Grandparents,Parents,Children\nAncestor Name,Parent Name,Your Name,Child Name\nJohn Smith,James Smith,Michael Smith,David Smith`}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      {preview && (
        <Preview>
          <strong>✓ Tree Preview:</strong>
          Root: {preview.rootName}
          <br />
          Total Members: {preview.memberCount}
        </Preview>
      )}
    </Container>
  );
};

export default CSVImporter;
