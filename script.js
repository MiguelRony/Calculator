
let leftExp = 0
let rightExp = 0
let activeOperation = null

const buttons = document.querySelectorAll(".btn");

const numbers = Array.from(buttons)
                .filter((btn => !isNaN(btn.textContent)));

const actionButtons = Array.from(buttons)
                .filter((btn => isNaN(btn.textContent)));

const display = document.querySelector("#display")
let displayResult = 0
display.textContent = displayResult

numbers.map(btn => btn.addEventListener('click', () => {
   if (displayResult === 0) {
    displayResult = parseInt(btn.textContent)
   }else{
    displayResult = displayResult*10 + parseInt(btn.textContent)
   }
   display.textContent = displayResult
   if (activeOperation !== null){
       let btnOp = Array.from(buttons).filter((btn) => btn.textContent === activeOperation)
       btnOp[0].style.filter = "brightness(1)";
   }
}));



actionButtons.map(btn => {
    switch(btn.textContent){
        case 'AC':
            btn.addEventListener('click', () => {
                display.textContent = 0
                displayResult = 0
            })
            break;
        case 'C':
            btn.addEventListener('click', () => {
                displayResult = Math.floor(displayResult/10)
                display.textContent = displayResult  
            })
            break;
        case '+/-':
            btn.addEventListener('click', () => {
                displayResult = -displayResult 
                display.textContent = displayResult  
            })
            break;
            break;
        case '%':
            btn.addEventListener('click', () => {
                displayResult = displayResult/100 
                display.textContent = displayResult 
            })
            break;
        case '.':
            btn.addEventListener('click', () => {
                displayResult += "." 
                display.textContent = displayResult  
            })
            break;
        case '+':
            btn.addEventListener('click', () => {
                if (activeOperation !== null){
                    rightExp = displayResult
                    display.textContent = operate(leftExp, rightExp, activeOperation)
                }
                btn.style.filter = "brightness(1.2)";
                activeOperation = '+'
                leftExp = displayResult
                displayResult = 0
            })
            break;
        case '-':
            btn.addEventListener('click', () => {
                if (activeOperation !== null){
                    rightExp = displayResult
                    display.textContent = operate(leftExp, rightExp, activeOperation)
                }
                btn.style.filter = "brightness(1.2)";
                activeOperation = '-'
                leftExp = displayResult
                displayResult = 0
            })
            break;
        case '*':
            btn.addEventListener('click', () => {
                if (activeOperation !== null){
                    rightExp = displayResult
                    display.textContent = operate(leftExp, rightExp, activeOperation)
                }
                btn.style.filter = "brightness(1.2)";
                activeOperation = '*'
                leftExp = displayResult
                displayResult = 0
            })
            break;
        case '/':
            btn.addEventListener('click', () => {
                if (activeOperation !== null){
                    rightExp = displayResult
                    display.textContent = operate(leftExp, rightExp, activeOperation)
                }
                btn.style.filter = "brightness(1.2)";
                activeOperation = '/'
                leftExp = displayResult
                displayResult = 0
            })
            break;
        case '=':
            if (activeOperation !== null){
                display.textContent = operate(leftExp, rightExp, activeOperation)
                displayResult = 0
            }
            break;
        default:
            display.textContent = "ERROR"
            break;

    }
})

function operate(leftExp, rightExp, operator){
    switch (operator){
        case '+':
            return leftExp + rightExp
        case '-':
            return leftExp - rightExp
        case "*":
            return leftExp * rightExp
        case "/":
            return rightExp !== 0 ? leftExp / rightExp : "OOPS, Cero Division"
        case '%':
            return 
        default:
    }
}