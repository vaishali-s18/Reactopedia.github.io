import React from 'react';
import { Link } from 'react-router-dom';

const ConceptCard = ({ concept }) => {
  return (
    <div className="card">
      <h2>{concept.title}</h2>
      <p>{concept.description}</p>
      <Link to={`/concepts/${concept.slug}`}>Learn More</Link>
    </div>
  );
};

export default ConceptCard;
