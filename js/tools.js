const tools = document.getElementById("tools");
const body = document.getElementsByTagName("body");

console.log(body);
export const currentTool = {};
function handleTools(e) {
  const toolName = e.target.id;
  currentTool["for"] = "";
  delete currentTool["for2"];
  currentTool["tool"] = toolName;
  if (toolName === "axe") {
    currentTool["for"] = "tree";
    currentTool["for2"] = "grass";
  }
  if (toolName === "shovel") {
    currentTool["for"] = "dirt";
    currentTool["for2"] = "dirt-top";
  }
  if (toolName === "pickaxe") currentTool["for"] = "rock";
  console.log(currentTool);
  console.log(getComputedStyle(e.target).backgroundImage);
  document.body.style.cursor = `${
    getComputedStyle(e.target).backgroundImage
  },default`;
}

function resetTool(e) {
  if (currentTool.for) {
    delete currentTool["tool"];
    delete currentTool["for"];
    delete currentTool["for2"];
    document.body.style.cursor = "default";
  }
}
tools.addEventListener("click", handleTools);
tools.addEventListener("mouseenter", resetTool);
