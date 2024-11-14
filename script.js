
let leftExp = 0
let rightExp = 0
let decimal = false
let base = 10
let activeOperation = null

const buttons = document.querySelectorAll(".btn");

const numbers = Array.from(buttons)
                .filter((btn => !isNaN(btn.textContent)));

const actionButtons = Array.from(buttons)
                .filter((btn => isNaN(btn.textContent)));

const display = document.querySelector("#display")
display.addEventListener('keypress', (event) => {
    Array.from(buttons).filter((btn)=> btn.textContent === event.key || event.key === "Enter" && btn.textContent === "=" ? btn.dispatchEvent(new Event('click')) : false) 
})
let displayResult = 0
display.textContent = displayResult

numbers.map(btn => btn.addEventListener('click', () => {
   if (displayResult === 0) {
    displayResult = parseInt(btn.textContent)
   }else{
    if(decimal){
        displayResult = +displayResult + parseInt(btn.textContent)/base
        base *= 10
    }else{
        displayResult = +displayResult*10 + parseInt(btn.textContent)
    }
    
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
                leftExp = 0
                rightExp = 0
                if (activeOperation !== null){
                    let btnOp = Array.from(buttons).filter((btn) => btn.textContent === activeOperation)
                    btnOp[0].style.filter = "brightness(1)";
                    activeOperation = null
                }
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
                if(!decimal){
                    displayResult += "." 
                    display.textContent = displayResult 
                    decimal = true
                }
            })
            break;
        case '+':
            btn.addEventListener('click', () => {
                if (activeOperation !== null){
                    rightExp = displayResult
                    displayResult = operate(leftExp, rightExp, activeOperation)
                    display.textContent = displayResult
                }
                btn.style.filter = "brightness(1.2)";
                activeOperation = '+'
                leftExp = displayResult
                displayResult = 0
                decimal = false
                base = 10
            })
            break;
        case '-':
            btn.addEventListener('click', () => {
                if (activeOperation !== null){
                    rightExp = displayResult
                    displayResult = operate(leftExp, rightExp, activeOperation)
                    display.textContent = displayResult
                }
                btn.style.filter = "brightness(1.2)";
                activeOperation = '-'
                leftExp = displayResult
                displayResult = 0
                decimal = false
                base = 10
            })
            break;
        case '*':
            btn.addEventListener('click', () => {
                if (activeOperation !== null){
                    rightExp = displayResult
                    displayResult = operate(leftExp, rightExp, activeOperation)
                    display.textContent = displayResult
                }
                btn.style.filter = "brightness(1.2)";
                activeOperation = '*'
                leftExp = displayResult
                displayResult = 0
                decimal = false
                base = 10
            })
            break;
        case '/':
            btn.addEventListener('click', () => {
                if (activeOperation !== null){
                    rightExp = displayResult
                    displayResult = operate(leftExp, rightExp, activeOperation)
                    display.textContent = displayResult
                }
                btn.style.filter = "brightness(1.2)";
                activeOperation = '/'
                leftExp = displayResult
                displayResult = 0
                decimal = false
                base = 10
            })
            break;
        case '=':
            btn.addEventListener('click', () => {
                if (activeOperation !== null){
                    rightExp = displayResult
                    displayResult = operate(leftExp, rightExp, activeOperation)
                    display.textContent = displayResult
                    leftExp = displayResult
                    activeOperation = null
                    decimal = false
                    base = 10
                }
            })
            break;
        default:
            display.textContent = "ERROR"
            break;

    }
})

function operate(leftExp, rightExp, operator){
    switch (operator){
        case '+':
            if (parseInt(+leftExp + rightExp)!== parseFloat(+leftExp + rightExp)){
                return parseFloat((+leftExp + rightExp).toFixed(6))
            }else{
                return (+leftExp + rightExp)
            }
        case '-':
            if (parseInt(+leftExp - rightExp)!== parseFloat(+leftExp - rightExp)){
                return parseFloat((+leftExp - rightExp).toFixed(6))
            }else{
                return (+leftExp - rightExp)
            }
        case "*":
            if (parseInt(+leftExp * rightExp)!== parseFloat(+leftExp * rightExp)){
                return parseFloat((+leftExp * rightExp).toFixed(6))
            }else{
                return (+leftExp * rightExp)
            }
        case "/":
            if(rightExp !== 0){
                if (parseInt(+leftExp / rightExp)!== parseFloat(+leftExp / rightExp)){
                    return parseFloat((+leftExp / rightExp).toFixed(6))
                }else{
                    return (+leftExp / rightExp)
                }
            }else{
                return "Cero Division"
            }
        default:
            break;
    }
}