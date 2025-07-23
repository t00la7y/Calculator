const display = document.querySelector('#digit-view > div');

let current = '';
let previous = '';
let operator = null;

// 🔁 Refresh the display
function updateDisplay() {
  display.textContent = current || '0';
}

// 🔢 Append digit to input
function appendDigit(digit) {
  if (digit === '0' && current === '0') return; // prevent leading zero spam
  current += digit;
  updateDisplay();
}

// ➕ Handle operation selection
function setOperator(op) {
  if (current === '') return;
  if (previous !== '') evaluate();
  operator = op;
  previous = current;
  current = '';
}

// ✅ Calculate result
function evaluate() {
  if (operator === null || current === '') return;

  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result;

  switch (operator) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b !== 0 ? a / b : 'Err'; break;
    case '%': result = a % b; break;
    default: result = current;
  }

  current = result.toString();
  previous = '';
  operator = null;
  updateDisplay();
}

// 🧹 Clear all
function clearAll() {
  current = '';
  previous = '';
  operator = null;
  updateDisplay();
}

// 🎯 Button listeners
document.querySelectorAll('.btn').forEach(btn => {
  const val = btn.textContent;

  if (!isNaN(val)) {
    btn.addEventListener('click', () => appendDigit(val));
  } else if (val === '=') {
    btn.addEventListener('click', evaluate);
  } else if (val === 'AC') {
    btn.addEventListener('click', clearAll);
  }
});

document.querySelectorAll('.operations button').forEach(opBtn => {
  opBtn.addEventListener('click', () => setOperator(opBtn.textContent));
});

updateDisplay();