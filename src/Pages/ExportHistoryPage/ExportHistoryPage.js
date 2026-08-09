import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ExportHistoryPage = () => {
  const [exports] = useState(() => Object.keys(localStorage)
    .filter((key) => key.startsWith('family-export-'))
    .map((key) => JSON.parse(localStorage.getItem(key)))
    .sort((first, second) => new Date(second.exportedAt) - new Date(first.exportedAt)));

  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) 1.25rem' }}>
      <p style={{ color: '#bd5b3c', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', margin: '0 0 0.8rem' }}>Archive activity</p>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 400, lineHeight: 1, margin: '0 0 0.8rem', color: '#24312d' }}>Export history</h1>
      <p style={{ color: '#52615b', margin: '0 0 2rem' }}>A record of the family trees you have downloaded.</p>
      {exports.length === 0 ? (
        <div style={{ padding: '2rem', background: '#fff', border: '1px solid rgba(36, 49, 45, 0.12)', borderRadius: '8px', color: '#68776d' }}>
          No exports yet. Open a family tree to create your first JSON archive.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {exports.map((exportItem) => (
            <article key={`${exportItem.phone}-${exportItem.exportedAt}`} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', padding: '1rem 1.25rem', background: '#fff', border: '1px solid rgba(36, 49, 45, 0.12)', borderRadius: '8px' }}>
              <div>
                <strong style={{ display: 'block', color: '#24312d' }}>{exportItem.familyName}</strong>
                <small style={{ color: '#68776d' }}>{new Date(exportItem.exportedAt).toLocaleString()}</small>
              </div>
              <Link to={`/builder/${exportItem.phone}`} style={{ color: '#bd5b3c', fontWeight: 700, textDecoration: 'none' }}>Open tree</Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExportHistoryPage