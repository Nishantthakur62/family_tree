import React, { useState } from 'react';
import { FormWrapper, Input, Label, Button } from './MoreDetailsForm.style';

const MoreDetailsForm = ({ member, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    name: member.name || '',
    dob: member.dob || '',
    relation: member.relation || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <Label>Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} required />
        <Label>Date of Birth</Label>
        <Input name="dob" type="date" value={formData.dob} onChange={handleChange} />
        <Label>Relation</Label>
        <Input name="relation" value={formData.relation} onChange={handleChange} />
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onDelete} danger>Delete Node</Button>
      </form>
    </FormWrapper>
  );
};

export default MoreDetailsForm;
