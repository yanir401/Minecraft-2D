import { addCubes } from "./js/inventory.js";
import { cubeHold, inventoryBox } from "./js/inventory.js";
import { currentTool } from "./js/tools.js";
const board = document.getElementById("game-board");
const columns = getComputedStyle(board).gridTemplateColumns.split(" ").length;
const rows = getComputedStyle(board).gridTemplateRows.split(" ").length;
console.log(rows, columns);
for (let i = 0; i <= rows; i++) {
  for (let j = 0; j < columns; j++) {
    const divCreator = document.createElement("div");
    divCreator.setAttribute("data-row", i);
    divCreator.setAttribute("data-col", j);

    if (i >= 7 && i <= 9 && j === 3) divCreator.classList.add("tree");
    if (i >= 4 && i <= 7) {
      if ((i === 7 && j === 2) || (i === 7 && j === 4))
        divCreator.classList.add("grass");
      if (j === 4 || j === 2 || j === 4) divCreator.classList.add("grass");
      if (j === 3 && i < 7) divCreator.classList.add("grass");
    }
    if (i >= 8 && i <= 9) {
      if (j === 7 || j == 14) divCreator.classList.add("rock");
      if (i === 9 && j === 0) divCreator.classList.add("rock");
      if ((i === 9 && j >= 9 && j <= 11) || (i === 8 && j === 10))
        divCreator.classList.add("grass");
    }
    if (i >= 10) {
      if (i === 10) divCreator.classList.add("dirt-top");
      else divCreator.classList.add("dirt");
    }
    if (
      (i === 2 && j >= 7 && j <= 12) ||
      (i === 3 && j >= 9 && j <= 11) ||
      (i === 1 && j >= 7 && j <= 8)
    )
      divCreator.style.background = "white";
    // divCreator.classList.add("box");
    board.appendChild(divCreator);
  }
}

function displayNewPosition(target) {
  const classToAdd = cubeHold.currentCube.className;
  const currentRowClicked = +target.dataset.row;
  const currentColClicked = +target.dataset.col;
  let add = false;
  [...board.children].forEach((cube, i) => {
    const upperCubeRow = +cube.dataset.row;
    const upperCubeCol = +cube.dataset.col;
    if (
      upperCubeRow - 1 === currentRowClicked &&
      currentColClicked === upperCubeCol &&
      cube.classList.length > 0
    )
      add = true;
  });
  if (add) {
    document.body.style.cursor = "default";
    target.classList.add(classToAdd);
    if (cubeHold.counter.innerHTML > 0)
      cubeHold.counter.innerHTML = cubeHold.counter.innerHTML - 1;
    // [...inventoryBox[classToAdd]].forEach((ele) => {
    //   console.log(ele);
    // });

    cubeHold.currentCube = "";

    if (cubeHold.counter.innerHTML == 0) {
      // dojo.destroy(inventoryBox[classToAdd]);
      // inventoryBox[classToAdd].parentElement.innerHTML = "";
      inventoryBox[classToAdd].classList.remove(classToAdd);
      inventoryBox[classToAdd].innerHTML = "";
    }
  }

  // for (const key in cubeHold) {
  //   cubeHold[key] = "";
  // }
  // console.log("inventoryBox", inventoryBox[classToAdd]);
}
board.addEventListener("click", function ({ target }) {
  if (
    currentTool.for === target.className ||
    currentTool.for2 === target.className ||
    cubeHold.currentCube
  ) {
    if (cubeHold.currentCube) {
      displayNewPosition(target);

      return;
    }

    // console.log(target);
    const currentRowClicked = +target.dataset.row;
    const currentColClicked = +target.dataset.col;

    [...board.children].forEach((cube, i) => {
      const upperCubeRow = +cube.dataset.row;
      const upperCubeCol = +cube.dataset.col;

      if (
        currentRowClicked - 1 === upperCubeRow &&
        currentColClicked === upperCubeCol
      ) {
        if (!cube.className && target.className.length > 0) {
          if (addCubes(target)) {
            target.removeAttribute("class");
          }
        }
      }
    });
  }
});
