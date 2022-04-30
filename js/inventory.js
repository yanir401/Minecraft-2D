const inventory = document.getElementById("inventory");
const popCubes = {};
const boxInventory = document.createElement("div");
const currentClicked = {};
export const inventoryBox = {};
export const cubeHold = {};

function handleCubeToBoard(e) {
  cubeHold["parentCube"] = e.target.parentElement;
  document.body.style.cursor = `${
    getComputedStyle(e.target).backgroundImage
  },default`;
  if (e.target.localName === "span") {
    cubeHold["counter"] = e.target;
    cubeHold["currentCube"] = e.target.nextSibling;
  } else {
    const children = e.target.children;
    for (let i = 0; i < children.length; i++) {
      console.dir(children[i].localName);
      if (children[i].localName === "span") cubeHold["counter"] = children[i];
    }
    cubeHold["currentCube"] = e.target.firstChild;
  }
}
function handleCubeInventClick(e) {
  e.target.style.border = "2px solid red";
  currentClicked[e.target] = e.target;
}
function displayInventory(element) {
  const doc = new DOMParser().parseFromString(element, "text/xml");
  const docEle = doc.lastChild;

  const counter = document.createElement("span");

  counter.setAttribute("class", "counter");
  let newCubeType = false;
  [...inventory.children].forEach((child) => {
    if (child.className === docEle.className) {
      child.appendChild(docEle);
      newCubeType = true;
      inventoryBox[docEle.className] = child;

      const countEle = child.getElementsByTagName("span");
      countEle[0].innerHTML = child.children.length - 1;
    }
    if (child.className === "counter") {
      child.innerHTML = child.children.length;
    }
  });

  if (!newCubeType) {
    const cubeType = document.createElement("div");
    cubeType.addEventListener("click", handleCubeToBoard);
    cubeType.style.display = "flex";
    cubeType.style.justifyContent = "center";
    cubeType.style.alignItems = "center";

    cubeType.setAttribute("class", docEle.classList.value);
    cubeType.appendChild(docEle);
    cubeType.appendChild(counter);
    inventory.appendChild(cubeType);
    inventoryBox[docEle.classList.value] = cubeType;
  }

  docEle.addEventListener("click", handleCubeInventClick);
}
export function addCubes(target) {
  console.log(target);
  const targetCopy = target.outerHTML;
  if (targetCopy) {
    popCubes[targetCopy] = targetCopy;
    displayInventory(targetCopy);
    return true;
  }
}
