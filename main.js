const opsDisplay = document.querySelector(".view-operations");
const ansDisplay = document.querySelector(".view-answers");

// Gather all calculator buttons
const buttons = document.querySelectorAll("button");

let currentOps = "";

const updateDisplay = () => {
  opsDisplay.textContent = currentOps || "0";
};

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.textContent;

    switch (val) {
      case "AC":
        currentOps = "";
        ansDisplay.textContent = "0";
        break;

      case "DEL":
        currentOps = currentOps.slice(0, -1);
        break;

      case "=":
        try {
          const safeOps = currentOps
            .replace(/x/g, "*")
            .replace(/\^/g, "**");
          const result = eval(safeOps);
          ansDisplay.textContent = result;
        } catch {
          ansDisplay.textContent = "Error";
        }
        break;

      default:
        currentOps += val;
        break;
    }

    updateDisplay();
  });
});
