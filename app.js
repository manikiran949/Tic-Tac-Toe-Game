let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let countOfMoves = 0;
let winnerExists = false;

const winPatterns = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

boxes.forEach((box) => {
    box.addEventListener("click",()  => {
        // console.log("Box was clicked");
        if(turnO){
            box.innerText = "O";
            box.style.color = "blue";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "red";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        countOfMoves++;
        if(countOfMoves === 9){
            if(winnerExists === false){
                msg.innerText = `It is a Draw !`;
                msgContainer.classList.remove("hide");
                disableBoxes();
            }
        }
    })
});

const checkWinner  = () => {
    for(pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val == "" || pos2Val == "" || pos2Val == "") continue;
        if(pos1Val == pos2Val && pos2Val == pos3Val){
            // console.log("winner",pos1Val);
            showWinner(pos1Val);
            winnerExists = true;
        }
    }
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        winnerExists = false;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner} !`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    countOfMoves = 0;
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);