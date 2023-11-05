const mbtiOptions = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

const entertainmentOptions = [
  "Kpop",
  "Kdrama",
  "Pop",
  "Band",
  "Hip-hop",
  "Movie",
  "Anime",
  "Netflix",
];

const personalityOptions = [
  "Introvert",
  "Extrovert",
  "Organized",
  "Spontaneous",
];

const gameOptions = ["Fifa", "LOL", "PC Games", "Video Games", "Playstation"];

const foodOptions = [
  "Famous Restaurant",
  "Coffee shop",
  "Dessert",
  "Meat",
  "Chicken",
  "Vegan",
  "Spicy",
];

const mbtiOptionsContainer = document.getElementById("mbti-options");

mbtiOptions.forEach((option) => {
  const label = document.createElement("label");
  label.className = "custom-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "mbti";
  checkbox.value = option;

  const checkboxText = document.createElement("span");
  checkboxText.className = "checkbox-text";
  checkboxText.textContent = option;

  label.appendChild(checkbox);
  label.appendChild(checkboxText);
  mbtiOptionsContainer.appendChild(label);
});

const entertainmentOptionsContainer = document.getElementById(
  "entertainment-options"
);

entertainmentOptions.forEach((option) => {
  const label = document.createElement("label");
  label.className = "custom-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "entertainment";
  checkbox.value = option;

  const checkboxText = document.createElement("span");
  checkboxText.className = "checkbox-text";
  checkboxText.textContent = option;

  label.appendChild(checkbox);
  label.appendChild(checkboxText);
  entertainmentOptionsContainer.appendChild(label);
});

const personalityOptionsContainer = document.getElementById(
  "personality-options"
);

personalityOptions.forEach((option) => {
  const label = document.createElement("label");
  label.className = "custom-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "personality";
  checkbox.value = option;

  const checkboxText = document.createElement("span");
  checkboxText.className = "checkbox-text";
  checkboxText.textContent = option;

  label.appendChild(checkbox);
  label.appendChild(checkboxText);
  personalityOptionsContainer.appendChild(label);
});

const gameOptionsContainer = document.getElementById("game-options");

gameOptions.forEach((option) => {
  const label = document.createElement("label");
  label.className = "custom-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "game";
  checkbox.value = option;

  const checkboxText = document.createElement("span");
  checkboxText.className = "checkbox-text";
  checkboxText.textContent = option;

  label.appendChild(checkbox);
  label.appendChild(checkboxText);
  gameOptionsContainer.appendChild(label);
});

const foodOptionsContainer = document.getElementById("food-options");

foodOptions.forEach((option) => {
  const label = document.createElement("label");
  label.className = "custom-label";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "food";
  checkbox.value = option;

  const checkboxText = document.createElement("span");
  checkboxText.className = "checkbox-text";
  checkboxText.textContent = option;

  label.appendChild(checkbox);
  label.appendChild(checkboxText);
  foodOptionsContainer.appendChild(label);
});
