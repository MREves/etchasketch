


// ------------------------------
// GET NUMBER OF BOXES
// ------------------------------
const numberOfBoxes = 20

// ------------------------------
// UPDATING STYLE SHEET
// ------------------------------
// create reference to the main container div
const mainContainer = document.getElementById('mainContainer')

const boxWidth = `calc((960px - (4 * 10px)) / ${numberOfBoxes})`;

// Get the style sheet
const styleSheet = document.styleSheets[0]; // Assuming the first style sheet

// Find the CSS rule for .div-container
const ruleIndex = [...styleSheet.cssRules].findIndex(rule => rule.selectorText === '.div-container');

// Update the width and height properties of the CSS rule
styleSheet.cssRules[ruleIndex].style.width = boxWidth;
styleSheet.cssRules[ruleIndex].style.height = boxWidth;


// ------------------------------
// ADDING N NUMBER OF BOXES
// ------------------------------

const divElementsArrayOfArrays = addNewDivRow(mainContainer, numberOfBoxes);

divElementsArrayOfArrays.forEach(divElementsArray => {
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  divElementsArray.forEach(newDiv => {
    containerDiv.appendChild(newDiv);
  });

  mainContainer.appendChild(containerDiv);
});

updateDivContainerWidth(numberOfBoxes)

// ------------------------------
// FUNCTION DECLARATION SECTION
// ------------------------------

function addNewDivRow(parentElement, numberOfBoxes) {
  
  const divElementsArrayOfArrays = [];

  for (let i = 0; i < numberOfBoxes; i++) {
    const divElementsArray = []; // Array to store the created div elements
    for (let j = 0; j < numberOfBoxes; j++) {
      const newDiv = document.createElement('div')
      newDiv.classList.add('div-container')
      // newDiv.textContent = 'X'
      divElementsArray.push(newDiv)
    }

    divElementsArrayOfArrays.push(divElementsArray)
  }

  return divElementsArrayOfArrays
}


function updateDivContainerWidth(numberOfBoxes) {
  const padding = numberOfBoxes.padding
  const containerWidth = 960; // default container width
  const newWidth = (containerWidth - (numberOfBoxes + 1) * padding) / numberOfBoxes;
  
  // Access the CSS stylesheet
  const styleSheet = document.styleSheets[0]; // Assuming the stylesheet is the first one

  // Find and update the .div-container rule
  for (let rule of styleSheet.cssRules) {
    if (rule.selectorText === '.div-container') {
      rule.style.width = `${newWidth}px`;
      break; // Stop searching once the rule is found and updated
    }
  }
}