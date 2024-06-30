let firstData = [
  {
    colorOne: "#eeaeca",
    stopOne: 0,
    colorTwo: "#94bbe9",
    stopTwo: 0,
    gradientType: "linear",
    degree: 90,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const gradientDisplay = document.querySelector(".gradient-display");
  const addStopButton = document.querySelector(".btnAddStop");
  const linearBtn = document.querySelector(".btnLinear");
  const radialBtn = document.querySelector(".btnRadial");
  const controlsDiv = document.querySelector(".ColorsSection");
  const addStopContainer = document.querySelector(".btnAddStopContainer");
  const btnRemoveAll = document.querySelector(".btnRemoveAll");
  const yearContent = document.querySelector(".year");

  const codeContainer = document.querySelector(".codeContainer");

  let linear = true;

  addStopButton.addEventListener("click", () => {
    addControl(colorRandomizer(), randomStop());
  });
  linearBtn.addEventListener("click", () => {
    linear = true;
    updateGradient();
  });
  radialBtn.addEventListener("click", () => {
    // addControl("#000000", 50);
    linear = false;
    updateGradient();
  });

  function addControl(color = "#000000", stop = 0) {
    const controlGroup = document.createElement("div");
    controlGroup.classList.add("controlGroup");

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.classList.add("color-input");
    colorInput.value = color;
    colorInput.addEventListener("input", updateGradient);

    const hexInput = document.createElement("input");
    hexInput.type = "text";
    hexInput.classList.add("hex-input");
    hexInput.value = color;
    hexInput.addEventListener("input", () => {
      colorInput.value = hexInput.value;
      updateGradient();
    });

    const stopInput = document.createElement("input");
    stopInput.type = "number";
    stopInput.classList.add("stop-input");
    stopInput.value = stop;
    stopInput.min = 0;
    stopInput.max = 100;
    stopInput.addEventListener("input", updateGradient);

    const removeButton = document.createElement("div");
    removeButton.classList.add("btnRemove");
    removeButton.innerHTML = `<i class="bx bx-x-circle"></i>`;
    removeButton.addEventListener("click", () => {
      controlGroup.remove();
      updateGradient();
    });

    controlGroup.appendChild(colorInput);
    controlGroup.appendChild(hexInput);
    controlGroup.appendChild(stopInput);
    controlGroup.appendChild(removeButton);

    controlsDiv.insertBefore(controlGroup, addStopContainer);
    updateGradient();
  }

  function updateGradient() {
    const controlGroups = document.querySelectorAll(".controlGroup");
    let gradientStops = Array.from(controlGroups).map((group) => {
      const color = group.querySelector(".color-input").value;
      const stop = group.querySelector(".stop-input").value;
      return `${color} ${stop}%`;
    });

    if (linear) {
      gradientDisplay.style.background = `linear-gradient(to right, ${gradientStops.join(
        ", "
      )})`;
      codeCreator(
        `background:linear-gradient(to right, ${gradientStops.join(", ")})`
      );
    } else {
      gradientDisplay.style.background = `radial-gradient(circle, ${gradientStops.join(
        ", "
      )})`;

      codeCreator(
        `background: radial-gradient(circle, ${gradientStops.join(", ")})`
      );
    }
  }

  function colorRandomizer() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  }

  function randomStop() {
    return Math.floor(Math.random() * 90);
  }

  function codeCreator(data) {
    codeContainer.innerHTML = "";
    const pre = document.createElement("pre");
    const code = document.createElement("code");

    pre.appendChild(code);
    pre.classList.add("language-css");
    code.classList.add("language-css");
    code.innerHTML = data;

    codeContainer.appendChild(pre);

    console.log(pre);

    Prism.highlightElement(pre);
  }

  function footerYear() {
    let year = new Date().getFullYear();
    yearContent.textContent = year == '2024' ? "" :`-${new Date().getFullYear()}` ;
  }


  footerYear();
  addControl("#eeaeca", 0);
  addControl("#94bbe9", 100);
});
