let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelectorAll(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning patterns
let winPatterns = [[0, 1, 2], [0, 3, 6], [2, 5, 8], [6, 7, 8], [3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6]];

// Player X plays first
let playerX = true;
let count = 0;

const disableButtons = () => {
    btnRef.forEach((element) => {
        element.disabled = true;
    });
    popupRef.forEach((element) => {
        element.classList.remove("hide");
    });
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.forEach((element) => {
        element.classList.add("hide");
    });
};

const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br>'O' Wins";
    }
};

const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> 'It is a Draw'";
};

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

const winChecker = () => {
    for (let i of winPatterns) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        if (element1 !== "" && element2 !== "" && element3 !== "") {
            if (element1 === element2 && element2 === element3) {
                winFunction(element1);
                return; // Exit the loop early if there's a winner
            }
        }
    }
    if (count === 9) {
        drawFunction();
    }
};

// Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (!element.disabled) {
            if (playerX) {
                playerX = false;
                // Display X
                element.innerText = "X";
                element.disabled = true;
            } else {
                playerX = true;
                // Display O
                element.innerText = "O";
                element.disabled = true;
            }
            // Increment count on click
            count += 1;
            winChecker(); // Call winChecker after each click
        }
    });
});

window.onload = enableButtons;
