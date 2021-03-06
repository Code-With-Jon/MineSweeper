//CONSTANTS
let gridWidth = 20;
let gridHeight = 20;
let myStorage = window.localStorage;

//CASHED
let bodyEl = document.querySelector('#grid-container');
let gridEl = document.querySelector('body')
let playAgain = document.querySelector('#reset');
let divElAll = document.querySelectorAll('section > div');
let title = document.querySelector('h1');
let optionEl = document.querySelector('section')
let difficultyEl = document.querySelector('#difficultyBombs');
let login = $('.proceed');
let playLogEl = document.querySelector('#playerLog');
let timeEl = document.getElementById("time");
let currentPlayerList = document.querySelector("#currentPlayer")
let subtextEl = document.querySelector('p');
let loginFormEl = document.querySelector('#login-form');

//INITIALIZE VARIABLES
let timer;
let timerVar;
let totalSeconds;
let loginNameEl;
let JSONreadyUsers = null;
let playerRoster = [];
let difficulty = ['easy', 'medium', 'hard'];
let currentCell;
let cellEl;
let cells;
let edge = false;
let flagged = false
let counter = 1;
let bombs = [];
let numOfBombs;
let leftEdge = false;
let rightEdge = false;
let topEdge = false;
let bottomEdge = false;
let edges = [leftEdge = false, rightEdge = false, topEdge = false, bottomEdge = false]
cells = {
    topLeft: 0,
    topMid: 0,
    topRight: 0,
    leftCenter: 0,
    rightCenter: 0,
    bottomLeft: 0,
    bottomMid: 0,
    bottomRight: 0
}
let arr = new Array(400);

//FUNCTIONS
login.click(function () {
    init()
    loginFormEl.style.display = 'none';
});

//Select Difficulty from option picker
$("select").change(function () {
    $(this).find("option:selected").each(function () {
        let optionValue = $(this).attr("value");
        if (optionValue === 'easy') {
            numOfBombs = 50;
            difficultyEl.innerText = "50 bombs";
        } else if (optionValue === 'medium') {
            numOfBombs = 100;
            difficultyEl.innerText = "100 bombs";
        } else if (optionValue === 'hard') {
            numOfBombs = 200;
            difficultyEl.innerText = "200 bombs";
        } else {
            $("select").hide();
        }
    });
    generateBombs()
}).change();

function init() {
    let li
    timerVar = setInterval(countTimer, 1000);
    loginNameEl = document.getElementById('login-Name').value;
    playerRoster = localStorage.getItem('playerRoster')
    //If local storage is empty
    if (playerRoster === null) {
        //Set local storage with a key, and an empty array
        localStorage.setItem('playerRoster', JSON.stringify([]))
    } else {
        //Local storage isnt empty, Parse the values in local storage
        let playerRosterParsed = localStorage.getItem('playerRoster')
        playerRosterParsed = JSON.parse(playerRosterParsed);
        //Display history of players and duration playing.
        for (let i = 0; i < playerRosterParsed.length; i++) {
            li = document.createElement("li");
            li.innerText = `${playerRosterParsed[i].name} : ${playerRosterParsed[i].time}`;
            playLogEl.appendChild(li);
        }
    }
    //Display current player on seperate list
    li = document.createElement('li');
    li.innerText = loginNameEl;
    currentPlayerList.appendChild(li)
}

// Add a flagged toggle for right click
function flags(evt) {
    //disable default right click menu to show up
    evt.preventDefault()
    if (evt.target.classList.contains('active')) {
        return;
    }
    if (flagged) {
        evt.target.style.background = "rgb(67, 206, 199)"
        flagged = false
    } else {
        flagged = true
        evt.target.style.background = "url(https://www.nicepng.com/png/detail/50-502689_communist-flag-png-svg-library-library-red-flag.png)"
        evt.target.style.backgroundSize = "20px 20px"
    }
}

//Set Up Timer
totalSeconds = 0;
function countTimer() {
    ++totalSeconds;
    let hour = Math.floor(totalSeconds / 3600);
    let minute = Math.floor((totalSeconds - hour * 3600) / 60);
    let seconds = totalSeconds - (hour * 3600 + minute * 60);

    document.getElementById("time").innerHTML = hour + ":" + minute + ":" + seconds;
}

//Randomly Generate Bombs as an index and push them to an array
function generateBombs() {
    bombs = []
    for (i = 0; i < 400; i++) {
        arr[i] = i + 1;
    }
    for (let i = 0; i < numOfBombs; i++) {
        let index = Math.floor(Math.random() * arr.length);
        bombs.push(arr.splice(index, 1)[0]);
    }
}

//Calls recursive search function. If target has a class "active", return.
function checkNeighbors(evt) {
    countTimer();
    if (evt.target.classList.contains('active')) {
        return;
    }
    evt.target.style.background = "rgb(67, 206, 199)"
    recursiveSearch(evt.target);
}

//Function to Count Bombs in Neighboring Cells
function countBombs(domObjectId) {
    let bombCounter = 0;
    let ind = domObjectId;
    let neighbors = [
        [-19, -20, -21],
        [-1, 1],
        [19, 20, 21]
    ];
    let neighborsActive = [
        [true, true, true],
        [true, true],
        [true, true, true]
    ];
    // if LeftEdge
    if (ind % 20 === 1) {
        for (let i = 0; i < 3; i++) {
            //set state of all left neighbors false
            neighborsActive[i][0] = false;
        }
    }
    //if RightEdge
    if (ind % 20 === 0) {
        for (let i = 0; i < 3; i++) {
            //set state of right edge neighbors to false
            neighborsActive[i][neighborsActive[i].length - 1] = false;
        }
    }
    //if BottomEdge
    if (ind + 20 > 400) {
        for (let i = 0; i < 3; i++) {
            //set state of all bottom neighbors to false
            neighborsActive[2][i] = false;
        }
    }
    //if TopEdge
    if (ind - 20 < 1) {
        for (let i = 0; i < 3; i++) {
            //set state of all top neighbors to false
            neighborsActive[0][i] = false;
        }
    }
    //iterate over neighboring cells
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < neighborsActive[row].length; col++) {
            //if neighboring cells arent an edge...
            if (neighborsActive[row][col] === true) {
                //relative to current index, cross check neighbors 
                //for matching index in bombs array and add to bombCounter
                if (bombs.includes(ind + neighbors[row][col])) {
                    bombCounter += 1;
                }
            }
        }
    }
    return bombCounter;
}

function recursiveSearch(domObject) {
    let storedNames
    let playerLogObj
    let bombCount = countBombs(parseInt(domObject.id));
    //if user clicks on bomb...
    if (bombs.includes(parseInt(domObject.id))) {
        //Parse local storage
        storedNames = JSON.parse(localStorage.getItem("playerRoster"));
        //Set up object with name variable and time variable
        playerLogObj = {
            name: loginNameEl,
            time: time.innerText
        }
        //Push object to array
        storedNames.push(playerLogObj);
        //Set local storage with Stringified array
        localStorage.setItem('playerRoster', JSON.stringify(storedNames))
        //Stop timer
        clearInterval(timerVar)
        //change styles
        playAgain.style.display = 'grid';
        subtextEl.style.color = 'black';
        subtextEl.innerText = 'Good Try!';
        subtextEl.style.fontSize = '28px';
        document.querySelector('p#difficultyBombs').style.display = 'none';
        domObject.textContent = `${-1}`;
        domObject.style.width = '20px';
        domObject.style.height = '20px';
        bodyEl.style.visibility = 'hidden'
        gridEl.style.background = 'url("https://upload.wikimedia.org/wikipedia/commons/9/95/Bomb_icon.svg") no-repeat center';
        playAgain.addEventListener('click', render)
        return
    } else if (domObject.className === 'active') {
        return;
    }
    domObject.className = 'active';
    if (flagged) {
        domObject.style.background = 'rgb(30, 75, 77)'
    }
    if (bombCount > 0) {
        domObject.textContent = bombCount;
        domObject.style.backgroundColor = 'rgb(30, 75, 77)'
    }

    //Styles
    domObject.style.backgroundColor = 'rgb(30, 75, 77)'
    domObject.style.color = 'white';
    domObject.style.textAlign = 'center';

    //Check Winner 
    let totalActive = $('.active').length
    let numOfTotalBombs = bombs.length;

    if (totalActive === 400 - numOfTotalBombs) {
        title.innerHTML = "YOU WON!!!!"
        gridEl.style.background = 'url("https://i.pinimg.com/originals/25/f3/45/25f345d3262ca30d3e45751f630b1c0e.png") no-repeat center';
        bodyEl.style.visibility = 'hidden'
        title.style.color = 'black';
        playAgain.style.borderColor = 'black';
        playAgain.addEventListener('click', render)
    }
    //Search
    if (bombCount === 0) {
        let ind = parseInt(domObject.id);
        let neighbors = [-20, -1, 1, 20];
        let neighborsActive = [true, true, true, true]
        //if LeftEdge
        if (ind % 20 === 1) {
            neighborsActive[1] = false;
        }
        //if RightEdge
        if (ind % 20 === 0) {
            neighborsActive[2] = false;
        }
        //if Bottom Edge
        if (ind + 20 > 400) {
            neighborsActive[3] = false;
        }
        //if TopEdge
        if (ind - 20 < 1) {
            neighborsActive[0] = false;
        }
        //Recursive Search for left, right, bottom, and top neighbors
        for (let row = 0; row < 4; row++) {
            //if neighbors havnt hit an edge
            if (neighborsActive[row] === true) {
                //assign newObj variable to the current and neighboring indicies
                let newObj = document.getElementById(`${ind + neighbors[row]}`);
                //call recursive search again on the neighbors
                recursiveSearch(newObj);
            }
        }
    }
}

//Set Up Grid
function render() {
    //Reset Layout
    playAgain.style.display = 'none';
    arr = arr.map((item, index) => 1 + index);
    while (bodyEl.firstChild) bodyEl.removeChild(bodyEl.firstChild)
    bombs = []
    counter = 1
    bodyEl.style.visibility = 'visible'
    gridEl.style.background = '#443c3c';
    title.innerText = 'MINESWEEPER'
    title.style.color = 'white';
    subtextEl.innerText = 'Left click to display a cell | Right click to flag a cell'
    subtextEl.style.fontSize = '16px';
    subtextEl.style.color = 'white';
    totalSeconds = 0;
    //Generate new grid
    for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
            cellEl = document.createElement('div');
            bodyEl.appendChild(cellEl);
            cellEl.setAttribute("id", counter);
            counter++;
            cellEl.addEventListener('click', checkNeighbors)
            cellEl.addEventListener('contextmenu', flags)
            // FOR TESTING PURPOSES: SHOW BOMB LOCATIONS ON NEW GRID:
            // if (!bombs.includes(parseInt(cellEl.id))) {
            //     cellEl.innerText = (`${parseInt(0)}`)
            // } else {
            //     cellEl.innerText = (`${parseInt(-1)}`)
            //     cellEl.style.color = 'red'
            // }
        }
    }
    generateBombs();
}
render()
