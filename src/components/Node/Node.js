import { useEffect } from "react";
import "./Node.css";

const Node = ({
    row,
    col,
    isVisited,
    pathAnimate,
    isWall,
    isOpen,
    isStart,
    isFinish,
    onMouseUp,
    onMouseEnter,
    onMouseDown,
}) => {
    useEffect(() => {}, [isWall]);
    const visitedClass = isVisited ? "visited" : "";
    const pathClass = pathAnimate ? "path" : "";
    const wallClass = isWall ? "wall" : "";
    const openClass = isOpen ? "open" : "";
    const startClass = isStart ? "start" : "";
    const finishClass = isFinish ? "finish" : "";
    return (
        <div>
            <div
                className={`node ${startClass} ${finishClass} ${wallClass} ${visitedClass} ${pathClass} ${openClass}`}
                id={`row-${row} col-${col}`}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseUp={() => onMouseUp()}
            ></div>
        </div>
    );
};

export default Node;
