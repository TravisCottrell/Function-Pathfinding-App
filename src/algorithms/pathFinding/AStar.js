export function AStar(start, end, grid) {
    //nodes that are available to be visited
    let open_list = [];
    //nodes that have been visited and will not be visited
    let closed_list = [];
    start.distance = 0;
    open_list.push(start);
    while (open_list) {
        // sortNodes(open_list);
        // const current = open_list.pop();
        const current = getNearestNode(open_list);
        closed_list.push(current);
        if (current === undefined || current === end) return closed_list;

        let neighbors = getNeighbors(current, grid);
        for (let neighbor of neighbors) {
            const temp_distance = current.distance + 1;
            if (temp_distance < neighbor.distance) {
                neighbor.prevNode = current;
                neighbor.distance = temp_distance;
                neighbor.Hscore = manhattan_distance(neighbor, end);
                //neighbor.Hscore = euclidean_distance(neighbor, end);
                neighbor.Fscore = neighbor.distance + neighbor.Hscore;
                const inOpenList = open_list.some((node) => {
                    if (node === neighbor) return true;
                });
                if (!inOpenList) open_list.push(neighbor);
            }
        }
    }
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
            
        }
    }
    return neighbors;
}

function manhattan_distance(node, end) {
    return Math.abs(end.row - node.row) + Math.abs(end.col - node.col);
}

function euclidean_distance(node, end) {
    return Math.sqrt((end.row - node.row) ** 2 + (end.col - node.col) ** 2);
}

function getNearestNode(open_list) {
    let currentNearest;
    let index;
    for (let i = 0; i < open_list.length; i++) {
        //find the node in the open_list with the lowest fscore
        if (!currentNearest || open_list[i].Fscore < currentNearest.Fscore) {
            //set the node with the lowest fscore as the current node
            currentNearest = open_list[i];
            //save the index of the current node in open_list
            index = i;
            //if the nodes have the same fscore use the node with the lowest hscore
        } else if (open_list[i].Fscore === currentNearest.Fscore) {
            if (open_list[i].Hscore < currentNearest.Hscore) {
                currentNearest = open_list[i];
                index = i;
            }
        }
    }
    //remove the node from the open_list with the lowest fscore
    open_list.splice(index, 1);
    return currentNearest;
}
//sorts the number in decending order so the lowest fscore can be popped
function sortNodes(open_list) {
    open_list.sort((a, b) => {
        //b.Fscore - a.Fscore
        if (b.Fscore < a.Fscore) {
            return -1;
        } else if (b.Fscore === a.Fscore) {
            if (b.Hscore > a.Fscore) return -1;
        } else {
            return 1;
        }

        // else{
        //     if(b.Hscore < a.Hscore){

        //         return 1;
        //     }
        // }
    });
}
