const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorBtn = document.querySelector(".scissor");
const resetBtn = document.querySelector(".reset");

const resultDiv = document.querySelector(".result");
const resultDiv2 = document.querySelector(".result2");
const score = document.querySelector(".score");

rockBtn.addEventListener("click", playerMove);
paperBtn.addEventListener("click", playerMove);
scissorBtn.addEventListener("click", playerMove);
resetBtn.addEventListener("click", resetScore);

const scoreObj = getLocalst();

score.innerHTML = `Wins: ${scoreObj.Wins}, Loses: ${scoreObj.Loses}, Draws: ${scoreObj.Draws}`;

function playerMove(pick) {
  const cMove = computerMove();
  const pMove = pick.target.innerHTML;
  let result = resultFn(cMove, pMove);

  showResults(result, cMove, pMove);

  updateScore(result);

  score.innerHTML = `Wins: ${scoreObj.Wins}, Loses: ${scoreObj.Loses}, Draws: ${scoreObj.Draws}`;

  saveLocalSt(result);
}

function computerMove() {
  const Move = Math.ceil(Math.random() * 10);
  let cMove;

  if (Move > 0 && Move <= 10 / 3) {
    cMove = "Rock";
  } else if (Move > 10 / 3 && Move <= 20 / 3) {
    cMove = "Paper";
  } else if (Move > 20 / 3) {
    cMove = "Scissor";
  }
  return cMove;
}

function resultFn(cMove, pMove) {
  let result;

  if (cMove == "Rock") {
    if (pMove == "Rock") {
      result = "Draw";
    } else if (pMove == "Paper") {
      result = "Win";
    } else if (pMove == "Scissor") {
      result = "Lose";
    }
  } else if (cMove == "Paper") {
    if (pMove == "Rock") {
      result = "Lose";
    } else if (pMove == "Paper") {
      result = "Draw";
    } else if (pMove == "Scissor") {
      result = "Win";
    }
  } else if (cMove == "Scissor") {
    if (pMove == "Rock") {
      result = "Win";
    } else if (pMove == "Paper") {
      result = "Lose";
    } else if (pMove == "Scissor") {
      result = "Draw";
    }
  }

  return result;
}

function updateScore(result) {
  if (result == "Win") {
    scoreObj.Wins++;
  } else if (result == "Lose") {
    scoreObj.Loses++;
  } else if (result == "Draw") {
    scoreObj.Draws++;
  }
}

function resetScore() {
  scoreObj.Wins = 0;
  scoreObj.Loses = 0;
  scoreObj.Draws = 0;

  let scores;

  if (localStorage.getItem("scores") == null) {
    scores = {
      Wins: 0,
      Loses: 0,
      Draws: 0,
    };
  } else {
    scores = JSON.parse(localStorage.getItem("scores"));
  }

  scores.Wins = 0;
  scores.Loses = 0;
  scores.Draws = 0;

  localStorage.setItem("scores", JSON.stringify(scores));

  score.innerHTML = `Wins: ${scoreObj.Wins}, Loses: ${scoreObj.Loses}, Draws: ${scoreObj.Draws}`;

  resultDiv.innerHTML = "";

  resultDiv2.innerHTML = "";
}

function showResults(result, cMove, pMove) {
  resultDiv.innerHTML = `You ${result}`;

  resultDiv2.innerHTML = `You ${pMove} - ${cMove} Computer`;
}

function saveLocalSt(todo) {
  let scores;

  if (localStorage.getItem("scores") == null) {
    scores = {
      Wins: 0,
      Loses: 0,
      Draws: 0,
    };
  } else {
    scores = JSON.parse(localStorage.getItem("scores"));
  }

  if (todo == "Win") {
    scores.Wins++;
  } else if (todo == "Lose") {
    scores.Loses++;
  } else if (todo == "Draw") {
    scores.Draws++;
  }

  localStorage.setItem("scores", JSON.stringify(scores));
}

function getLocalst() {
  let scores;

  if (localStorage.getItem("scores") == null) {
    scores = {
      Wins: 0,
      Loses: 0,
      Draws: 0,
    };
  } else {
    scores = JSON.parse(localStorage.getItem("scores"));
  }

  return scores;
}
