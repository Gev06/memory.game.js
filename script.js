const gameNode = document.querySelector("#game-board");
const winingText = document.querySelector("#victory-message");
const startGameBtn = document.querySelector("#new-game-button");

const visibleCard = "visible";
const flipTimeout = 500;

const cardElm = ['😀', '🚀', '🌟', '⚽', '🎵', '🍕',];
const cardsAmount = 12;

let visibleCards = [];

startGameBtn.addEventListener("click", startGame);

function startGame() {
  [gameNode, winingText].forEach((element) => (element.innerHTML = ""));

  const cardValues = generateArrayWithPairs(cardElm, cardsAmount);

  cardValues.forEach(renderCard);

  const renderedCards = document.querySelectorAll(".card");

  renderedCards.forEach((card) => card.classList.add(visibleCard));

  setTimeout(() => {
    renderedCards.forEach((card) =>
      card.classList.remove(visibleCard)
    );
  }, flipTimeout * 2);
}

function generateArrayWithPairs(arr, fieldSize) {
  if (arr.length * 2 !== fieldSize) {
    const errorMessage =
      "Невозможно создать массив с парами из указанного массива и размера.";

    console.error(errorMessage);
    return null;
  }

  const randomArray = [];
  const elementCounts = {};

  for (const item of arr) {
    elementCounts[item] = 0;
  }

  while (randomArray.length < fieldSize) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomElement = arr[randomIndex];

    if (elementCounts[randomElement] < 2) {
      randomArray.push(randomElement);
      elementCounts[randomElement]++;
    }
  }

  return randomArray;
}

function renderCard(cardText = "") {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");

  cardFront.textContent = "?";
  cardBack.textContent = cardText;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  card.appendChild(cardInner);

  card.addEventListener("click", handleCardClick.bind(this, card));

  gameNode.appendChild(card);
}

function handleCardClick(card) {
  if (card.classList.contains(visibleCard)) {
    return;
  }

  const checkVictory = () => {
    const visibleCardsNodes = document.querySelectorAll(
      `.${visibleCard}`
    );

    const isVictory = visibleCardsNodes.length === cardsAmount;
    const victoryMessage = "you win!";

    if (isVictory) {
      winingText.textContent = victoryMessage;
    }
  };

    card.querySelector(".card-inner")
    card.addEventListener("transitionend", checkVictory);

  card.classList.add(visibleCard);
  visibleCards.push(card);

  if (visibleCards.length % 2 !== 0) {
    return;
  }

  const [prelastCard, lastCard] = visibleCards.slice(-2);


  if (lastCard.textContent !== prelastCard.textContent) {
    visibleCards = visibleCards.slice(0, visibleCards.length - 2);

    setTimeout(() => {
      [lastCard, prelastCard].forEach((card) =>
        card.classList.remove(visibleCard)
      );
    }, flipTimeout);
  }
}

startGame();