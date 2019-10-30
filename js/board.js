

export default class Board {


    constructor() {
        this.edge = false;
        this.topLeft = 0;
        this.topMid = 0;
        this.topRight = 0;
        this.leftCenter = 0;
        this.rightCenter = 0;
        this.bottomLeft = 0;
        this.bottomMid = 0;;
        this.bottomRight = 0;
        this.gridHeight = 20;
        this.gridWidth = 20;
    }

    createBoard() {
        this.gridHeight = 20;
        this.gridWidth = 20;
        let counter = 1;
        let bodyEl = document.querySelector('#grid-container');
        let gridEl = document.querySelector('body')
        for (let i = 0; i < this.gridHeight; i++) {
            for (let j = 0; j < this.gridWidth; j++) {
                let cellEl = document.createElement('div');
                bodyEl.appendChild(cellEl);
                cellEl.setAttribute("id", counter);
                counter++;
                cellEl.addEventListener('click', checkNeighbors())
            }
        }
    }
    checkNeighbors(e) {
        recursiveSearch(e.target);

    }

}

