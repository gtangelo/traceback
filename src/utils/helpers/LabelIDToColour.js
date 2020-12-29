const LabelIDToColour = (labels, labelID) => {
  let colour = '#eeeeee';
  labels.forEach((label) => {
    if (label.labelID === labelID) {
      colour = label.colour;
    }
  });
  return colour;
};

export default LabelIDToColour;