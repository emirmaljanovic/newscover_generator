import React from 'react';

import './subtitle.css';

const Subtitle = () => (
  <div className="subtitle">
    <span className="issue">
      Issue #1
    </span>
    <span className="tagline">
      The most lookedover newspaper
    </span>
    <span className="date">
      {new Date().toDateString()}
    </span>
  </div>
);

export default Subtitle;