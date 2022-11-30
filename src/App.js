import React, { useState, useEffect } from "react";
import Node from "./components/Node/Node";
import Sidebar from "./components/Sidebar/sidebar";
import {
    dijkstra,
    getShortestPath,
} from "./algorithms/pathFinding/dijkstra.js";
import { AStar } from "./algorithms/pathFinding/AStar";

//maze algorithms
import { randomMaze } from "./algorithms/mazeGen/randomMaze";
import {
    recursiveDivision,
    getOrientation,
} from "./algorithms/mazeGen/recursiveDivision";

function App() {
    //2d array, cartesian cooridantes starting from the top left as 0,0
    const [grid, setGrid] = useState([]);
    //check if the start node has been set
    const [startSet, setStartSet] = useState(false);
    //keeps track of the start node for the pathfinding algoritm
    const [startNode, setStartNode] = useState(null);
    //check if the finish node for the pathfinding algorithm has been set
    const [finishSet, setFinishSet] = useState(false);
    //keeps track of the finish node for the pathfinding algoritm
    const [finishNode, setFinishNode] = useState(null);
    //check to see if the mouse button is being pressed
    const [mouseIsDown, setMouseIsDown] = useState(false);
    //bool for the cursor and draw mode to erase
    const [erase, setErase] = useState(false);
    //grid size

    const [gridWidth, setGridWidth] = useState();
    const [gridHeight, setGridHeight] = useState();

    //initial build of the grid when page loads
    useEffect(() => {
        handleResizeGrid();
        buildGrid();
    }, [gridHeight, gridWidth]);

    useEffect(() => {
        //handleResizeGrid();
        window.addEventListener("resize", handleResizeGrid);
        return (_) => {
            window.removeEventListener("resize", handleResizeGrid);
        };
    });

    //build the initial grid when page is loaded
    const buildGrid = () => {
        const tempGrid = [];
        for (let row = 0; row < gridWidth; row++) {
            const currentrow = [];
            for (let col = 0; col < gridHeight; col++) {
                currentrow.push(createNode(row, col));
            }
            tempGrid.push(currentrow);
        }
        setGrid(tempGrid);
    };

    const handleResizeGrid = () => {
        let client = document.getElementsByClassName("grid");

        let newHeight = window.innerHeight / 33;
        let newWidth = client[0].clientWidth / 33;
        //multiplying and dividing by 2 to ensure even numbers
        setGridHeight(2 * Math.round(newHeight / 2));
        setGridWidth(2 * Math.round(newWidth / 2));
    };

    //creates a node object that for every box that holds its related data
    const createNode = (col, row) => {
        return {
            col,
            row,
            distance: Infinity,
            Hscore: Infinity,
            Fscore: Infinity,
            prevNode: null,
            isStart: false,
            isFinish: false,
            isWall: false,
            isVisited: false,
            pathAnimate: false,
        };
    };

    const handleMouseDown = (row, col) => {
        let currentNode = grid[col][row];
        if (erase) {
            if (currentNode.isStart) {
                grid[col][row].isStart = false;
                setStartSet(false);
                setStartNode(null);
                setGrid(grid);
            } else if (currentNode.isFinish) {
                grid[col][row].isFinish = false;
                setFinishSet(false);
                setFinishNode(null);
                setGrid(grid);
            } else if (currentNode.isWall) {
                let tempGrid = [...grid];
                let tempNode = { ...tempGrid[col][row] };
                tempNode.isWall = false;
                tempGrid[col][row] = tempNode;
                setGrid(tempGrid);
            }
        } else {
            if (!startSet) {
                grid[col][row].isStart = true;
                setStartSet(true);
                setStartNode(grid[col][row]);
                setGrid(grid);
            } else if (!finishSet && !currentNode.isStart) {
                grid[col][row].isFinish = true;
                setFinishSet(true);
                setFinishNode(grid[col][row]);
                setGrid(grid);
            } else if (!currentNode.isStart && !currentNode.isFinish) {
                let tempGrid = [...grid];
                let tempNode = { ...tempGrid[col][row] };
                tempNode.isWall = true;
                tempGrid[col][row] = tempNode;
                setGrid(tempGrid);
            }
        }
        setMouseIsDown(true);
    };

    const handleMouseEnter = (row, col) => {
        if (mouseIsDown) {
            let currentNode = grid[col][row];
            if (erase) {
                if (currentNode.isStart) {
                    grid[col][row].isStart = false;
                    setStartSet(false);
                    setStartNode(null);
                    setGrid(grid);
                } else if (currentNode.isFinish) {
                    grid[col][row].isFinish = false;
                    setFinishSet(false);
                    setFinishNode(null);
                    setGrid(grid);
                } else if (currentNode.isWall) {
                    let tempGrid = [...grid];
                    let tempNode = { ...tempGrid[col][row] };
                    tempNode.isWall = false;
                    tempGrid[col][row] = tempNode;
                    setGrid(tempGrid);
                }
            } else {
                if (!startSet) {
                    grid[col][row].isStart = true;
                    setStartSet(true);
                    setStartNode(grid[col][row]);
                    setGrid(grid);
                } else if (!finishSet && !currentNode.isStart) {
                    grid[col][row].isFinish = true;
                    setFinishSet(true);
                    setFinishNode(grid[col][row]);
                    setGrid(grid);
                } else if (!currentNode.isStart && !currentNode.isFinish) {
                    let tempGrid = [...grid];
                    let tempNode = { ...tempGrid[col][row] };
                    tempNode.isWall = true;
                    tempGrid[col][row] = tempNode;
                    setGrid(tempGrid);
                }
            }
        }
    };

    const handleMouseUp = () => {
        setMouseIsDown(false);
    };

    //runs the related algorithm that was chosen
    const handlePathFinding = (pathDropdownValue) => {
        let vistedNodes;
        let path;
        switch (pathDropdownValue) {
            case "Dijkstra":
                vistedNodes = dijkstra(startNode, finishNode, grid);
                path = getShortestPath(finishNode);
                break;

            case "A Star":
                vistedNodes = AStar(startNode, finishNode, grid);
                path = getShortestPath(finishNode);
                break;
        }
        handlePathAnimate(vistedNodes, path);
    };

    //animates the path that the algorithm took during its runtime
    const handlePathAnimate = (vistedNodes, path) => {
        for (let i = 0; i < vistedNodes.length; i++) {
            setTimeout(() => {
                //vistedNodes[i].isVisited = true;
                let tempGrid = [...grid];
                let tempNode = {
                    ...tempGrid[vistedNodes[i].col][vistedNodes[i].row],
                };
                tempNode.isVisited = true;
                tempGrid[vistedNodes[i].col][vistedNodes[i].row] = tempNode;
                setGrid(tempGrid);
            }, 20 * i);

            if (i === vistedNodes.length - 1) {
                setTimeout(() => {
                    showPath(path);
                }, 20 * i);
            }
        }
    };

    //shows and animates the final shortest path for the pathfinding algorithm
    const showPath = (path) => {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                let tempGrid = [...grid];
                let tempNode = {
                    ...tempGrid[path[i].col][path[i].row],
                };
                tempNode.pathAnimate = true;
                tempGrid[path[i].col][path[i].row] = tempNode;
                setGrid(tempGrid);
            }, 40 * i);
        }
    };

    //runs the algorithm for the chosen maze type
    const handleMazeGen = (mazeDropdownValue) => {
        let tempGrid = [...grid];
        let animateArray = [];
        switch (mazeDropdownValue) {
            case "Random Maze":
                randomMaze(tempGrid, animateArray, gridHeight, gridWidth);
                break;

            case "Recursive Division":
                const orientation = getOrientation(gridHeight, gridWidth);
                recursiveDivision(
                    tempGrid,
                    0,
                    0,
                    gridHeight,
                    gridWidth,
                    orientation,
                    animateArray
                );
                break;
        }
        handleMazeAnimate(animateArray);
    };

    //animates the maze that the algorithm took during its runtime
    const handleMazeAnimate = (wallNodes) => {
        for (let i = 0; i < wallNodes.length; i++) {
            setTimeout(() => {
                let tempGrid = [...grid];
                let tempNode = wallNodes[i];
                tempGrid[wallNodes[i].col][wallNodes[i].row] = tempNode;
                setGrid(tempGrid);
            }, 20 * i);
        }
    };

    //reset all of the relevent data in each nodes so an algoritm can be run again
    const resetPaths = () => {
        let newgrid = [...grid];
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                let newNode = { ...newgrid[row][col] };
                newNode.distance = Infinity;
                newNode.Fscore = Infinity;
                newNode.Hscore = Infinity;
                newNode.prevNode = null;
                newNode.isVisited = false;
                newNode.pathAnimate = false;
                if (newNode.isStart) {
                    setStartNode(newNode);
                }
                if (newNode.isFinish) {
                    setFinishNode(newNode);
                }
                newgrid[row][col] = newNode;
            }
        }
        setGrid(newgrid);
    };

    return (
        <>
            <div className="flex-container">
                <div>
                    <Sidebar
                        handlePathFinding={handlePathFinding}
                        handleMazeGen={handleMazeGen}
                        setErase={setErase}
                        erase={erase}
                        resetPaths={resetPaths}
                    ></Sidebar>
                </div>

                <div className="grid ">
                    <div className="nodes">
                        {grid.map((row, rowindex) => {
                            return (
                                <div key={rowindex}>
                                    {row.map((node, nodeindex) => {
                                        return (
                                            <Node
                                                key={nodeindex}
                                                {...node}
                                                onMouseDown={(row, col) =>
                                                    handleMouseDown(row, col)
                                                }
                                                onMouseEnter={(row, col) =>
                                                    handleMouseEnter(row, col)
                                                }
                                                onMouseUp={() =>
                                                    handleMouseUp()
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
