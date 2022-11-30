export function dijkstra(start, end, grid) {
    let unvistedNodes = getNodes(grid);
    let vistedNodes = [];
    start.distance = 0;
    //start.isVisited = true;

    while (unvistedNodes.length > 0) {
        sortNodes(unvistedNodes);
        const currentNode = unvistedNodes.shift();

        //this is used when there are no available paths
        if (currentNode.distance === Infinity) return vistedNodes;

        vistedNodes.push(currentNode);
        if (currentNode === end) return vistedNodes;

        const neighbors = getNeighbors(currentNode, grid);
        for (let neighbor of neighbors) {
            const inOpenList = vistedNodes.some((element) => {
                if (element === neighbor) {
                    return true;
                }
            });
            if (!inOpenList) {
                neighbor.distance = currentNode.distance + 1;
                neighbor.prevNode = currentNode;
            }
        }
    }
}

//turns the 2d array into a 1d array for easier usage
function getNodes(grid) {
    const newGrid = [];
    for (const row of grid) {
        for (const node of row) {
            newGrid.push(node);
        }
    }
    return newGrid;
}

function sortNodes(unvisitedNodes) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
}

function getNeighbors(node, grid) {
    const neighbors = [];
    // prettier-ignore
    //loop to get the neighbors in the up/down/left/right positions of the current node
    for (const i of [[0, -1],[0, 1],[-1, 0],[1, 0]]) {
        const neighborPosition = [node.row + i[0], node.col + i[1]];

        // check if the neighbor node is within the grid bounds
        if(neighborPosition[0] < 0 || neighborPosition[0] > grid[0].length-1 || neighborPosition[1] < 0 || neighborPosition[1] > grid.length-1){continue};
        
        const neighbor = grid[neighborPosition[1]][neighborPosition[0]];
        if(!neighbor.isWall ) {
            neighbors.push(neighbor);
            // neighbor.distance = node.distance + 1;
            // neighbor.prevNode = node; 
        }
    }
    return neighbors;
}

//backtracks from the finish node with prevnodes until the start, which has null, is reached
export function getShortestPath(endNode) {
    const path = [];
    let currentNode = endNode;
    while (currentNode != null) {
        path.push(currentNode);
        currentNode = currentNode.prevNode;
    }
    path.pop();
    path.shift();
    return path;
}
