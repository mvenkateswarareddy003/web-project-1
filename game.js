let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#newgame-btn');
let msgContainer = document.querySelector('.msgcontainer');
let msg = document.querySelector('#msg');   

let turn0 = true; // X starts first

const winningpatterns = [
  [0, 1, 2], // Row 1  
  [0, 3, 6], // Column 1
  [0, 4, 8], // Diagonal 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [2, 4, 6], // Diagonal 2
  [3, 4, 5], // Row 2
  [6, 7, 8] // Row 3
];

const resetGame = () => {
    turn0 = true; // Reset the turn to X
    msgContainer.classList.add('hide'); // Hide the message container
    enableAllBoxes(); // Enable all boxes for a new game
}

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (turn0){
        box.innerText = '0';
        turn0 = false;
    } else {
        box.innerText = 'X';
        turn0 = true;
    }
    box.classList.add('disabled'); // Disable the box after clicking
    box.style.pointerEvents = 'none'; // Disable pointer events for the clicked box
    checkWinner();
});
});

const enableAllBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = ''; // Clear the text in each box
        box.classList.remove('disabled');
        box.classList.remove('highlight'); // Remove the disabled class
        box.style.pointerEvents = 'auto'; // Enable pointer events for all boxes
    });
}

const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.classList.add('disabled');
        box.style.pointerEvents = 'none'; // Disable pointer events for all boxes
    });
}   

const showWinner = (winner) => {
    msg.innerText = `Congratulation,Winner is ${winner}!`;
    msgContainer.classList.remove('hide');
    disableAllBoxes(); // Disable all boxes when a winner is found

};

const checkWinner = () => {
    let isTie = true; // Assume it's a tie unless a winner is found

    for (pattern of winningpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== '' && pos2val !== '' && pos3val !== '') {
            if (pos1val===pos2val && pos2val===pos3val){
                boxes[pattern[0]].classList.add('highlight');
                boxes[pattern[1]].classList.add('highlight');
                boxes[pattern[2]].classList.add('highlight');
                showWinner(pos1val);
                return; 
            }
        }
    };
    boxes.forEach((box) => {
        if (box.innerText === '') {
            isTie = false; // Found an empty box, so it's not a tie
        }
    });
    if (isTie) {
        msg.innerText = `It's a Tie!`;
        msgContainer.classList.remove('hide');
        disableAllBoxes(); // Disable all boxes when it's a tie
    }
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);