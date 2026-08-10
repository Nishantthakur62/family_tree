import React, { useEffect, useState } from 'react';
import { FormWrapper, FormHeader, Input, Textarea, Label, Button, ImagePreview, FileInput, Actions } from './MoreDetailsForm.style';

const isExactDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value);

const MoreDetailsForm = ({ member, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    name: member.name || '',
    dob: member.dob || '',
    dod: member.dod || '',
    relation: member.relation || '',
    alias: member.alias || '',
    occupation: member.occupation || '',
    location: member.location || '',
    notes: member.notes || '',
    image: member.image || '',
  });

  useEffect(() => {
    setFormData({
      name: member.name || '',
      dob: member.dob || '',
      dod: member.dod || '',
      relation: member.relation || '',
      alias: member.alias || '',
      occupation: member.occupation || '',
      location: member.location || '',
      notes: member.notes || '',
      image: member.image || '',
    });
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...formData, name: formData.name.trim() });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setFormData(prev => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <FormWrapper>
      <FormHeader>
        <strong>Details for {member.name}</strong>
        <span>Every field except name is optional</span>
      </FormHeader>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="detail-name">Name</Label>
        <Input id="detail-name" name="name" value={formData.name} onChange={handleChange} required />
        <div className="detailGrid">
          <div>
            <Label htmlFor="detail-dob">Born</Label>
            <Input id="detail-dob" name="dob" type={isExactDate(formData.dob) ? 'date' : 'text'} value={formData.dob} onChange={handleChange} placeholder="YYYY-MM-DD or approximate" />
          </div>
          <div>
            <Label htmlFor="detail-dod">Died</Label>
            <Input id="detail-dod" name="dod" type={isExactDate(formData.dod) ? 'date' : 'text'} value={formData.dod} onChange={handleChange} placeholder="YYYY-MM-DD or approximate" />
          </div>
        </div>
        <Label htmlFor="detail-relation">Family relationship</Label>
        <Input id="detail-relation" name="relation" value={formData.relation} onChange={handleChange} placeholder="Parent, cousin, aunt..." />
        <Label htmlFor="detail-alias">Also known as</Label>
        <Input id="detail-alias" name="alias" value={formData.alias} onChange={handleChange} placeholder="Nickname or alternate name" />
        <Label htmlFor="detail-occupation">Occupation</Label>
        <Input id="detail-occupation" name="occupation" value={formData.occupation} onChange={handleChange} />
        <Label htmlFor="detail-location">Place</Label>
        <Input id="detail-location" name="location" value={formData.location} onChange={handleChange} placeholder="Town or country" />
        <Label htmlFor="detail-notes">Notes</Label>
        <Textarea id="detail-notes" name="notes" value={formData.notes} onChange={handleChange} rows="4" placeholder="Stories, memories, sources, or anything worth keeping..." />
        <Label htmlFor="detail-image">Portrait</Label>
        <FileInput id="detail-image" type="file" accept="image/*" onChange={handleImageChange} />
        {formData.image && <ImagePreview src={formData.image} alt={`${formData.name} portrait preview`} />}
        <Actions>
          <Button type="submit">Save details</Button>
          <Button type="button" onClick={onDelete} $danger>Delete branch</Button>
        </Actions>
      </form>
    </FormWrapper>
  );
};

export default MoreDetailsForm;
