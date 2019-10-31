//CONSTANTS
let gridWidth = 20;
let gridHeight = 20;

//CASHED

let bodyEl = document.querySelector('#grid-container');
let gridEl = document.querySelector('body')
let playAgain = document.querySelector('#reset');

//INITIALIZE VARIABLES
let currentCell;
let cellEl;
let cells;
let edge = false;
let counter = 1;
let bombs = [];
let leftEdge = false;
let rightEdge = false;
let topEdge = false;
let bottomEdge = false;
let edges = [leftEdge, rightEdge, topEdge, bottomEdge]
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
//Set Up Grid
for (let i = 0; i < gridHeight; i++) {
    for (let j = 0; j < gridWidth; j++) {
        cellEl = document.createElement('div');
        bodyEl.appendChild(cellEl);
        cellEl.setAttribute("id", counter);
        counter++;
        cellEl.addEventListener('click', checkNeighbors)
    }
}

function init() {

    bodyEl.style.visibility = 'visible'
    gridEl.style.background = 'white';



}

function recursiveSearch(domObject) {
    //if Left edge is false (The wall hasnt been hit) - run checkEdges function
    if (edges[leftEdge] === false) {
        checkEdges(domObject);
    }
    //if Right edge is false (The wall hasnt been hit) - run checkEdges function
    if (edges[rightEdge] === false) {
        checkEdges(domObject);
    }
    //if Top edge is false (The wall hasnt been hit) - run checkEdges function
    if (edges[topEdge] === false) {
        checkEdges(domObject);
    }
    //if Bottom edge is false (The wall hasnt been hit) - run checkEdges function
    if (edges[bottomEdge] === false) {
        checkEdges(domObject);
    }
    //initialize bombCounter to 0
    let bombCounter = 0;
    //If User clicks on Bomb
    if (bombs.includes(parseInt(domObject.id))) {
        bodyEl.style.visibility = 'hidden'
        gridEl.style.background = 'url("https://upload.wikimedia.org/wikipedia/commons/9/95/Bomb_icon.svg") no-repeat center';
        playAgain.addEventListener('click', init)
    }
    //Check Top 3 cells for bombs
    checkTopNeighbors(domObject);
    //Check Middle 2 adjacent cells for bombs
    checkMidNeighbors(domObject)
    //Check Bottom 3 cells for bombs
    checkBottomNeighbors(domObject);
    //If Neighboring Cells Have Bombs by comparing index of neighbors to bombs index's, Add to BombCount total
    for (let prop in cells) {
        if (bombs.includes(cells[prop])) {
            bombCounter += 1;
        }
    }
    //Display bombCounter total 
    domObject.textContent = bombCounter;
    //Styles
    domObject.style.backgroundColor = 'rgb(30, 75, 77)'
    domObject.style.color = 'white';
    domObject.style.textAlign = 'center';


    //Recursive Search
    if (bombCounter === 0 && domObject !== 'active') {
        //if bottom edge has not been hit by active element
        if (edges[3] === false) {
            //call recursive search on bottom neighboring cell Elements & assign class of "active"
            recursiveSearch(document.getElementById(`${parseInt(domObject.id) + 20}`));
            domObject.classList.add('active');

            recursiveSearch(document.getElementById(`${parseInt(domObject.id) + 21}`));

            domObject.classList.add('active');
            recursiveSearch(document.getElementById(`${parseInt(domObject.id) + 19}`));
            domObject.classList.add('active');

            edges[3] = false;
            console.log(edges)
        }

        //if Top edge has not been hit by active element
        if (edges[2] === false) {


            recursiveSearch(document.getElementById(`${parseInt(domObject.id) - 20}`));
            domObject.classList.add('active');


            recursiveSearch(document.getElementById(`${parseInt(domObject.id) - 21}`));
            domObject.classList.add('active');

            recursiveSearch(document.getElementById(`${parseInt(domObject.id) - 19}`));
            domObject.classList.add('active');

            edges[2] = false;
        }
        //if Right edge has not been hit by active element
        if (edges[1] === false) {

            recursiveSearch(document.getElementById(`${parseInt(domObject.id) + 1}`));
            domObject.classList.add('active');

            edges[1] = false;
        }
        //if Left edge has not been hit by active element
        if (edges[0] === false) {

            recursiveSearch(document.getElementById(`${parseInt(domObject.id) - 1}`));
            domObject.classList.add('active');

            edges[0] = false;
        }
        else {
            return;
        }

    }

}


//Pass Target Element through the recursive search
function checkNeighbors(e) {
    recursiveSearch(e.target);
}

function checkEdges(currentCell) {

    //Check if current cell index is hitting left wall
    if ((parseInt(currentCell.id) - 1) % 20 === 0) {
        console.log('Left hit')
        leftEdge = true;
    }

    //Check if current cell index is hitting right wall

    if (parseInt(currentCell.id) % 20 === 0) {
        console.log('Right Hit');
        rightEdge = true;
    }
    //Check if current cell index is hitting top wall

    if (parseInt(currentCell.id) - 20 < 1) {
        console.log('Top Edge');
        topEdge = true
    }
    //Check if current cell index is hitting bottom wall

    if (parseInt(currentCell.id) + 20 > 400) {
        console.log('Bottom Edge');
        bottomEdge = true;
    }
    //return all edges
    edges = [leftEdge, rightEdge, topEdge, bottomEdge];
    return edges
}

function checkTopNeighbors(e) {
    //Top Neighboring cells index's
    currentCell = e.id;
    cells.topMid = parseInt(currentCell) - 20;
    cells.topLeft = parseInt(currentCell) - 21;
    cells.topRight = parseInt(currentCell) - 19;
}

function checkBottomNeighbors(e) {

    //Bottom Neighboring cells index's
    currentCell = e.id;
    cells.bottomMid = parseInt(currentCell) + 20;
    cells.bottomLeft = parseInt(currentCell) + 19;
    cells.bottomRight = parseInt(currentCell) + 21;



    // console.log(cells.bottomLeft, cells.bottomMid, cells.bottomRight);
}

function checkMidNeighbors(e) {
    //Left and Right Neighboring cells index's
    currentCell = e.id;
    cells.leftCenter = parseInt(currentCell) - 1;
    cells.rightCenter = parseInt(currentCell) + 1;


    //console.log(cells.leftCenter, cells.rightCenter);
}

//Randomly Generate Bombs as an index and push them to an array
function generateBombs() {
    for (let i = 0; i <= 20; i++) {
        bombs.push(Math.floor(Math.random() * 400 + 1));
    }
    //  console.log(bombs)
}
generateBombs();
