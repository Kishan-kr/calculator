
// function pressedSomeKey(event) {
// let one = event.key;
// if(one == "1") {
//       alert('you have pressed 1');
// }
// }

// fetching the display of calulator where it will show the inputs and result 
let displayValues = document.getElementById('values');

// fetching and displying clicked numbers
for (let numbers of document.querySelectorAll('.number')) {
      numbers.addEventListener("click", function () {
            storeNumbers(numbers)
      });
}

function storeNumbers(numbers) {
      // console.log(numbers.innerHTML);
      let number = numbers.innerHTML;
      displayValues.innerHTML += number;
}

// fetching and displying clicked operators
for (let operator of document.querySelectorAll('.operator')) {
      operator.addEventListener("click", function () {
            storeOperators(operator)
      });
}

let negative = false;
function storeOperators(operator) {
      let op = operator.innerHTML;
      let Length = displayValues.innerHTML.length;
      if (Length <= 0) {
            if (op == '-') {
                  negative = true;
                  displayValues.innerHTML += op;
            }
            return;
      }

      let lastValue = displayValues.innerHTML.substr((Length - 1), 1);
      if ((lastValue == '+' || lastValue == '-' || lastValue == '%' || lastValue == '*' || lastValue == '/') && op != '=') {
            let tempValue = displayValues.innerHTML.substr(0, (Length - 1))
            displayValues.innerHTML = tempValue + op;
            console.log(displayValues.innerHTML);
      }
      else if (op != '=') {
            displayValues.innerHTML += op;
            Length = displayValues.innerHTML.length;
      }
}

let equal = document.getElementById('equal');
equal.addEventListener("click" , getResult);

// function to find result
function getResult() {
      // if (negative == true) {
            //       operands[0] = -operands[0];
            //       negative = false;
            // 
      // }
      let stringLength = displayValues.innerHTML.length;
      console.log("final length : "+ stringLength);
      stringLength = divide(stringLength);
      stringLength = multiply(stringLength);
      stringLength = percent(stringLength);
      stringLength = addSubtract(stringLength);
      console.log("final result : " + displayValues.innerHTML);
}


// divide function
function divide(stringLength) {
      for( let index = 1; index < stringLength; index++) {
            let startIndex , endIndex;
            if(displayValues.innerHTML[index] == '/') {
                  startIndex = storePreviousOperand(index);
                  endIndex = storeNextOperand(index , stringLength);
                  let result = previousOperand / nextOperand;
                  if(isNaN(nextOperand)) { result = previousOperand;}
                  let firstSubstring = displayValues.innerHTML.substring(0 , startIndex);
                  let lastSubstring = displayValues.innerHTML.substring(endIndex , stringLength);
                  displayValues.innerHTML = firstSubstring + result.toString() + lastSubstring;
                  console.log("result / : " + displayValues.innerHTML);
                  index = 0;
            }
      }
      stringLength = displayValues.innerHTML.length;
      return stringLength;
}

// multiply function 
function multiply(stringLength) {
      for( let index = 1; index < stringLength; index++) {
            let startIndex , endIndex;
            if(displayValues.innerHTML[index] == '*') {
                  startIndex = storePreviousOperand(index);
                  endIndex = storeNextOperand(index , stringLength);
                  let result = previousOperand * nextOperand;
                  if(isNaN(nextOperand)) { result = previousOperand;}
                  let firstSubstring = displayValues.innerHTML.substring(0 , startIndex);
                  let lastSubstring = displayValues.innerHTML.substring(endIndex , stringLength);
                  displayValues.innerHTML = firstSubstring + result.toString() + lastSubstring;
                  console.log("result * : " + displayValues.innerHTML);
                  index = 0;
            }
      }
      stringLength = displayValues.innerHTML.length;
      return stringLength;
}

// percentage function 
function percent(stringLength) {
      for( let index = 1; index < stringLength; index++) {
            let startIndex , endIndex;
            if(displayValues.innerHTML[index] == '%') {
                  startIndex = storePreviousOperand(index);
                  endIndex = storeNextOperand(index , stringLength);
                  let result = (previousOperand * nextOperand)/100;
                  if(isNaN(nextOperand)) { result = previousOperand;}
                  let firstSubstring = displayValues.innerHTML.substring(0 , startIndex);
                  let lastSubstring = displayValues.innerHTML.substring(endIndex , stringLength);
                  displayValues.innerHTML = firstSubstring + result.toString() + lastSubstring;
                  console.log("result : " + displayValues.innerHTML);
                  index = 0;
            }
      }
      stringLength = displayValues.innerHTML.length;
      return stringLength;
}

// function for addition and subtraction
function addSubtract(stringLength) {
      for( let index = 1; index < stringLength; index++) {
            let startIndex , endIndex;
            if(displayValues.innerHTML[index] == '+' || displayValues.innerHTML[index] == '-') {
                  let operator = displayValues.innerHTML[index];
                  startIndex = storePreviousOperand(index);
                  endIndex = storeNextOperand(index , stringLength);
                  let result;
                  if(operator == '+')
                  result = previousOperand + nextOperand;
                  else 
                  result = previousOperand - nextOperand;
                  if(isNaN(nextOperand)) { result = previousOperand;}
                  let firstSubstring = displayValues.innerHTML.substring(0 , startIndex);
                  let lastSubstring = displayValues.innerHTML.substring(endIndex , stringLength);
                  displayValues.innerHTML = firstSubstring + result.toString() + lastSubstring;
                  console.log("result + or - : " + displayValues.innerHTML);
                  index = 0;
            }
      }
      stringLength = displayValues.innerHTML.length;
      return stringLength;
}

// function to store previous operands in an Array
let previousOperand , nextOperand;
function storePreviousOperand(preLength) {
      let start = 0;
      let index;
      for (index = preLength - 1; index > 0; index--) {
            if (displayValues.innerHTML[index] == '+' || displayValues.innerHTML[index] == '-' || displayValues.innerHTML[index] == '*' || displayValues.innerHTML[index] == '/' || displayValues.innerHTML[index] == '%') {
                  start = index + 1;
                  break;
            }
      }

      let preString = displayValues.innerHTML.substring(start, preLength)
      previousOperand = parseFloat(preString);
      console.log("1st operand : " + previousOperand);
      return start;
}

// function to store next Operand  
function storeNextOperand(postLength , stringLength) {
      let index;
      let end = stringLength;
      for(index = postLength + 1; index < stringLength; index++) {
            if (displayValues.innerHTML[index] == '+' || displayValues.innerHTML[index] == '-' || displayValues.innerHTML[index] == '*' || displayValues.innerHTML[index] == '/' || displayValues.innerHTML[index] == '%') {
                  end = index;
                  break;
            }  
      }

      let nextString = displayValues.innerHTML.substring(postLength + 1 , end);
      nextOperand = parseFloat(nextString);
      console.log("2nd operand : " + nextOperand);
      return end;
}

// To clear all 
let allClear = document.getElementById('allClear');
allClear.onclick = clearAll;
function clearAll() {
      displayValues.innerHTML = "";
}


// To erase a character 
let clear = document.getElementById('clear');
clear.onclick = erase;
function erase() {
      let stringLength = displayValues.innerHTML.length;
      let tempDisplay = displayValues.innerHTML.substring(0, stringLength - 1);
      displayValues.innerHTML = tempDisplay;
}

