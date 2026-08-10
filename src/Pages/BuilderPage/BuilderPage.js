import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DrawingBoard from '../../Components/DrawingBoard/DrawingBoard';
import { FiChevronRight } from 'react-icons/fi';
import { BuilderShell, Breadcrumbs, PageKicker, PageHeading, PageIntro } from './BuilderPage.style';

const BuilderPage = () => {
  const { phone } = useParams();

  return (
    <BuilderShell>
      <Breadcrumbs aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <FiChevronRight aria-hidden="true" />
        <Link to="/families">Families</Link>
        <FiChevronRight aria-hidden="true" />
        <span>Tree builder</span>
      </Breadcrumbs>
      <PageKicker>Family archive</PageKicker>
      <PageHeading>Build your tree</PageHeading>
      <PageIntro>Add the people and relationships that make your family yours.</PageIntro>
      <DrawingBoard phone={phone} />
    </BuilderShell>
  );
};

export default BuilderPage;
