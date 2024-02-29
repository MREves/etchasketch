// ------------------------------
// USER INPUT NUMBER OF BOXES
// ------------------------------
// Global scope variable
// let numberOfBoxes = 16; // Initialize with a default value
let numberOfBoxes = prompt("Please enter the number of boxes for the grid", 16)
if (numberOfBoxes > 100) {
  numberOfBoxes = 100;
}
// ------------------------------
// GET NUMBER OF BOXES
// ------------------------------
// Use numberOfBoxesInput where you need to use the value of the range input
// let numberOfBoxes = 16


// ------------------------------
// UPDATING STYLE SHEET
// ------------------------------
// create reference to the main container div
const mainContainer = document.getElementById('mainContainer')

// calculate the boxWidth property based on the number of boxes being used
let boxWidth = `calc((960px / ${numberOfBoxes})`;

// Get the style sheet
const styleSheet = document.styleSheets[0]; // Assuming the first style sheet (there is only one here)

// Find the CSS rule for .div-container (the class for each new box added to the grid)
const ruleIndex = [...styleSheet.cssRules].findIndex(rule => rule.selectorText === '.div-container');

// Update the width and height properties of the CSS rule, to reflect the boxWidth, to ensure the square are all equally sized and contained in the main div
styleSheet.cssRules[ruleIndex].style.width = boxWidth;
styleSheet.cssRules[ruleIndex].style.height = boxWidth;


// ------------------------------
// ADDING N NUMBER OF BOXES
// ------------------------------

let divElementsArrayOfArrays = addNewDivRow(mainContainer, numberOfBoxes);
let selectedMethod = 'darker'
// console.log(selectedMethod)

colorMethod = document.getElementById('colorMethod').addEventListener('change', function() {
  selectedMethod = this.value;
  console.log(selectedMethod)
  // Apply the selected coloring method
  // applyColoringMethod(selectedMethod);
});

// have these uncommented if using the 
let red = 173;
let green = 216;
let blue = 230;
let newBackgroundColour = ``

divElementsArrayOfArrays.forEach(divElementsArray => {
  let containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  divElementsArray.forEach(newDiv => {
    // ?? ADD EVENT LISTENER HERE TO EACH NEWDIV 
    // GET MOUSE POSITION FROM MAIN CONTAINER - WIP
    https://www.youtube.com/watch?v=ggE-kGo4Ang   
    newDiv.addEventListener('mouseenter', () => {
      // newDiv.style.backgroundColor = 'red'
      if (selectedMethod === 'random') {
      // get random colour changing background
      newBackgroundColour = getRandomColourBackground()
      } else if (selectedMethod === 'darker') {
        // get progressively darker background
      newBackgroundColour = getDarkerBackground(10);
      }
      // get progressively darker background
      // let newBackgroundColour = getDarkerBackground(10);

      // update background color with background colour method in use (whichever is not commented out above)
      newDiv.style.backgroundColor = newBackgroundColour;
    })
    
    // newDiv.addEventListener('mouseleave', () => {
    //   newDiv.style.backgroundColor = 'white'
    // })

    containerDiv.appendChild(newDiv);
  });

  mainContainer.appendChild(containerDiv);
});

updateDivContainerWidth(numberOfBoxes)



// ------------------------------
// FUNCTION DECLARATION SECTION
// ------------------------------




function getDarkerBackground(percent){
  const reductionAmount = 1-(percent / 100);
  
  red = Math.max(0, Math.floor(red * reductionAmount));
  green = Math.max(0, Math.floor(green * reductionAmount));
  blue = Math.max(0, Math.floor(blue * reductionAmount));

  let randomBackgroundColor = `rgb(${red}, ${green}, ${blue})`
  return randomBackgroundColor;
}

function getRandomColourBackground(){
  let red = getRandomInt();
  let green = getRandomInt();
  let blue = getRandomInt();
  let randomBackgroundColor = `rgb(${red}, ${green}, ${blue})`
  return randomBackgroundColor
}

function getRandomInt() {
  return Math.floor(Math.random() * 256)
}


function addNewDivRow(parentElement, numberOfBoxes) {
  
  const divElementsArrayOfArrays = [];

  for (let i = 0; i < numberOfBoxes; i++) {
    const divElementsArray = []; // Array to store the created div elements
    for (let j = 0; j < numberOfBoxes; j++) {
      const newDiv = document.createElement('div')

      newDiv.classList.add('div-container')
      // Test print to check arrangement of newDivs
      // newDiv.textContent = `${i+1} - ${j+1}`
      
      divElementsArray.push(newDiv)
    }

    divElementsArrayOfArrays.push(divElementsArray)
  }

  return divElementsArrayOfArrays
}


// function updateDivContainerWidth(numberOfBoxes) {
//   const padding = numberOfBoxes.padding
//   const containerWidth = 960; // default container width
//   const newWidth = (containerWidth - (numberOfBoxes + 1) * padding) / numberOfBoxes;
  
//   // Access the CSS stylesheet
//   const styleSheet = document.styleSheets[0]; // Assuming the stylesheet is the first one

//   // Find and update the .div-container rule
//   for (let rule of styleSheet.cssRules) {
//     if (rule.selectorText === '.div-container') {
//       rule.style.width = `${newWidth}px`;
//       break; // Stop searching once the rule is found and updated
//     }
//   }
// }

function updateDivContainerWidth(numberOfBoxes) {
  const containerWidth = 960; // default container width
  const newWidth = containerWidth / numberOfBoxes;

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