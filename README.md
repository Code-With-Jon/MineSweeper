# MineSweeper

1. Header title that displays "MineSweeper" at the top of the page
2. Grid loads below the Header title to display a 20x20 grid with randomly generated bombs
3. "Play Again" button will be displayed at the bottom of the screen below the grid
4. Bombs are generated by randomly selecting numbers between 1 and 400
    * The grid size is a 1 based, 400 index grid
5. All cells will initially not show any numbers or bombs
6. When a user clicks a specific cell:
    * If the cell is a bomb - GAME OVER
    * If the cell is next to a bomb - DISPLAY NUMBER 
    * If the cell is not a bomb and the cell's neighboring cells are not next to any bombs - RECURSIVE SEARCH
7. Game Over will hide the active grid, and change the background to a picture of a bomb
8. Play Again will clear the grid and randomly select new locations for bombs within the grid
9. Display Number will count the number of adjacent bombs next to the current cell by looking at the neighboring cells and adding "1" for every bomb to display a total. 
10. Recursive Search will search from the current cell and expand the search in all directions until the all directions have hit a neighboring cell that has a bomb, or until the search hits a wall of the grid. 
11. When the user has cleared the entire board without hitting a bomb, the user - HAS WON
12. Has Won will hide the grid and display an image of baloons with the Play Again button at the bottom of the screen
  
# Wireframe:
Game Start: ![Game Start](https://i.imgur.com/JzUACNe.jpg)
Empty Cell - Search: ![Empty Cell - Search](https://i.imgur.com/EEJQn9v.jpg)
Empty Cell - Next to Bomb: ![Empty Cell - Next to Bomb](https://i.imgur.com/BK3aeTy.jpg)
Game Over: ![Game Over](https://i.imgur.com/OPvB0Yu.jpg)

# Link To Game:
[PLAY MINESWEEPER](https://code-with-jon.github.io/MineSweeper/)


# Frameworks:
HTML | CSS | JavaScript 
![alt text](http://aureliamoser.com/code-camp-18/img/htmlcssjs.png "HTML Logo")

Local Storage
![alt text](https://i.ytimg.com/vi/M-Rp8u1AAHg/hqdefault.jpg "HTML Logo")

