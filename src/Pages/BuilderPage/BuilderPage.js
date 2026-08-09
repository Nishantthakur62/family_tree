import React from 'react';
import { useParams } from 'react-router-dom';
import DrawingBoard from '../../Components/DrawingBoard/DrawingBoard';

const BuilderPage = () => {
  const { phone } = useParams();

  return (
    <section style={{ maxWidth: '1180px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) 1.25rem' }}>
      <p style={{ color: '#bd5b3c', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 0.8rem' }}>
        Family archive
      </p>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1, margin: '0 0 0.8rem', color: '#24312d' }}>
        Build your tree
      </h1>
      <p style={{ color: '#52615b', margin: '0 0 2rem' }}>
        Add the people and relationships that make your family yours.
      </p>
      <DrawingBoard phone={phone} />
    </section>
  );
};

export default BuilderPage;
