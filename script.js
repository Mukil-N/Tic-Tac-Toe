document.addEventListener('DOMContentLoaded', ()=>{
const PlayerForm = document.getElementById("player");
const game = document.getElementById("game");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartbtn = document.getElementById("restart");

let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
const winning = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let gameActive = true;
let player1 = "";
let player2 = "";

PlayerForm.addEventListener("submit",(event)=>{
    event.preventDefault();

    player1 = document.getElementById("player1").value;
    player2 = document.getElementById("player2").value;

    statusText.innerText = `Player ${currentPlayer == "X" ? player1:player2}'s turn`;
    PlayerForm.style.display = "none";
    game.style.display = "block";

    restartGame();
});
const handleCellClick = (event)=>{
    const cell = event.target
    const cellIndex = parseInt(cell.getAttribute("data-index"));

    if(gameState[cellIndex]!="" || !gameActive){
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    if(checkWin()){
        statusText.innerText = `${currentPlayer == "X"? player1 : player2} wins!`;
        gameActive = false;
        return;
    }
    if(isDraw()){
        statusText.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer == "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer == "X" ? player1 : player2}'s turn`;
};

const checkWin = ()=>{
    for(const condition of winning){
        const [a,b,c] = condition;
        if(gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c])
        {
            return true;
        }
    }
    return false;
};

const isDraw = ()=>{
    return gameState.every(cell=>cell !== "");
}
const restartGame = ()=> {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    statusText.innerText = `Player ${currentPlayer == "X" ? player1 : player2 }'s turn`;
    cells.forEach(cell => cell.innerText = "");
};

cells.forEach(cell => cell.addEventListener('click',handleCellClick));
restartbtn.addEventListener('click',restartGame);
});

