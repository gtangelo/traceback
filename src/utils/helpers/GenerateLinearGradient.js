import React from 'react'

const GenerateLinearGradient = (colour) => {
  const rgb = [
    colour.substring(1, 3),
    colour.substring(3, 5),
    colour.substring(5, 7),
  ];
  const linearColour = `rgb(${rgb.map((c) => parseInt(c, 16) * 0.8).join()})`;
  return `linear-gradient(
      ${colour} 50%,
      ${linearColour} 100%
    );`;
};

export default GenerateLinearGradient
