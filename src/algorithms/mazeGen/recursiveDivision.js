export function recursiveDivision(
    grid,
    row,
    col,
    height,
    width,
    orientation,
    animateArray
) {
    if (width < 3 || height < 3) return;

    let isHorizontal = orientation;
    let newHeight1;
    let newHeight2;
    let newWidth1;
    let newWidth2;
    let col2;
    let row2;
    let wallcol = col;
    let wallrow = row;
    let hole;

    //row = y, col = x
    if (isHorizontal) {
        //random placemnet of a wall on even nodes only
        wallrow = row + Math.floor(getRandNum(height) / 2) * 2;

        //random placement of a hole in the wall on odds nodes only
        hole = col + Math.floor(getRandNum(width) / 2) * 2 + 1;

        newHeight1 = wallrow - row;
        newWidth1 = width;

        newHeight2 = row + height - wallrow;
        newWidth2 = width;

        row2 = wallrow;
        col2 = col;

        //draws the wall
        for (let i = col; i < col + width; i++) {
            let tempNode = { ...grid[i][wallrow] };
            tempNode.isWall = true;
            animateArray.push(tempNode);
        }
        //places a hole in the wall
        let tempNode = { ...grid[hole][wallrow] };
        tempNode.isWall = false;
        animateArray.push(tempNode);
    } else {
        //random placemnet of a wall on even nodes only
        wallcol = col + Math.floor(getRandNum(width) / 2) * 2;

        //random placement of a hole in the wall on odds nodes only
        hole = row + Math.floor(getRandNum(height) / 2) * 2 + 1;

        newHeight1 = height;
        newWidth1 = wallcol - col;

        newHeight2 = height;
        newWidth2 = col + width - wallcol;

        row2 = row;
        col2 = wallcol;

        //draws the wall
        for (let i = row; i < row + height; i++) {
            let tempNode = { ...grid[wallcol][i] };
            tempNode.isWall = true;
            animateArray.push(tempNode);
        }

        //places a hole in the wall
        let tempNode = { ...grid[wallcol][hole] };
        tempNode.isWall = false;
        animateArray.push(tempNode);
    }

    recursiveDivision(
        grid,
        row,
        col,
        newHeight1,
        newWidth1,
        getOrientation(newHeight1, newWidth1),
        animateArray
    );
    recursiveDivision(
        grid,
        row2,
        col2,
        newHeight2,
        newWidth2,
        getOrientation(newHeight2, newWidth2),
        animateArray
    );
}

//decides whether the the split direction will be horizontal or vertical
export function getOrientation(height, width) {
    if (width < height) {
        //is horizontal
        return true;
    } else if (height < width) {
        // is vertical
        return false;
    } else {
        const rand = Math.floor(Math.random() * 2);
        return rand === 0 ? true : false;
    }
}

function getRandNum(max) {
    return Math.floor(Math.random() * max);
}
