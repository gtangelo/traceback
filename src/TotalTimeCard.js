import React from 'react'
import './index.css'


const TotalTimeCard = ({ timeFormat }) => {
  return (
    <div>
      <div className="titleHeader">Tracking Time</div>
      <div className="timeHeader">{timeFormat}</div>
    </div>
  );
};

export default TotalTimeCard
