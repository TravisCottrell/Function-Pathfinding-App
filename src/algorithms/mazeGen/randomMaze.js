export function randomMaze(grid, animateArray, height, width) {
    setNodesAsWalls(grid);
    //always starts from the top left node of the grid
    const startNode = { ...grid[0][0] };
    //all of the nodes that have already been visited
    const visited = [];
    //all of the current nodes that are available to be visited
    const stack = [];

    stack.push(startNode);

    //main loop for the algorithm
    for (let i = 0; i < 800; i++) {
        const currentNode = stack.pop();
        visited.push(currentNode);
        const neighbors = getNeighbors(
            currentNode,
            grid,
            visited,
            animateArray,
            height,
            width
        );
        //loops through all of the current nodes neighbors and adds them to the stack
        for (let i = neighbors.length; i > 0; i--) {
            let randomNum = Math.floor(Math.random() * i);
            const neighbor = neighbors.splice(randomNum, 1);
            stack.push(neighbor[0]);
        }

        currentNode.isWall = false;
        //adds the currnetnode to the array that will visually show the path the generation took
        animateArray.push(currentNode);
    }
}

function getNeighbors(node, grid, visited, animateArray, height, width) {
    // prettier-ignore
    const neighbors = [];
    for (const i of [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ]) {
        const temp = [node.row + i[0], node.col + i[1]];

        // check if the neighbor node is within the grid bounds
        if (
            temp[0] < 0 ||
            temp[0] > height - 1 ||
            temp[1] < 0 ||
            temp[1] > width - 1
        ) {
            continue;
        }
        const neighbor = { ...grid[temp[1]][temp[0]] };

        //true if the current neighbor is already a path node
        const isPath = animateArray.some((value) => {
            return value.row === neighbor.row && value.col === neighbor.col;
        });

        //if the current neighbor has not been visited and is a wall add to the neighbors array
        if (!visited.includes(neighbor) && !isPath) {
            neighbors.push(neighbor);
        }
    }
    return neighbors;
}

//sets the whole grid as walls
function setNodesAsWalls(grid) {
    grid.forEach((row) => {
        row.forEach((node) => {
            node.isWall = true;
        });
    });
}
