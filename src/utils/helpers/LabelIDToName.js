const LabelIDToName = (labels, labelID) => {
  let name = 'None';
  labels.forEach((label) => {
    if (label.labelID === labelID) {
      name = label.name;
    }
  });
  return 'Category: ' + name;
};

export default LabelIDToName;