import { useEffect, useRef, useState } from "react";
import { BsCaretDownFill } from "react-icons/bs";
import "./sidebar.css";
const Sidebar = ({
    handlePathFinding,
    handleMazeGen,
    setErase,
    erase,
    resetPaths,
}) => {
    const sidebar = useRef(null);
    const pathDropdownRef = useRef(null);
    const mazeDropdownRef = useRef(null);
    const [pathDropdownValue, setPathDropdownValue] = useState("Pathfinding");
    const [mazeDropdownValue, setMazeDropdownValue] = useState("Maze");
    const [showLinks, setShowLinks] = useState(false);

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    //check if erasing and change the cursor image to an erasor
    useEffect(() => {
        if (erase) {
            document.body.style.cursor =
                "url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Pink-eraser.svg/32px-Pink-eraser.svg.png') 0 30,auto";
        } else {
            document.body.style.cursor = "default";
        }
    }, [erase]);

    return (
        <aside id="mySidebar" className="sidebar" ref={sidebar}>
            <h1>Pathfinding Algorithms</h1>

            <div className="dropdown">
                <a
                    onClick={() =>
                        pathDropdownRef.current.classList.toggle("show")
                    }
                >
                    {pathDropdownValue}
                    <BsCaretDownFill className="icon" />
                </a>
                <div
                    id="myDropdown"
                    className="dropdown-content"
                    onMouseLeave={() =>
                        pathDropdownRef.current.classList.toggle("show")
                    }
                    ref={pathDropdownRef}
                >
                    <a onClick={(e) => setPathDropdownValue("Dijkstra")}>
                        Dijkstra
                    </a>
                    <a onClick={(e) => setPathDropdownValue("A Star")}>
                        A Star
                    </a>
                </div>
            </div>

            <button
                className="start-btn"
                onClick={() => handlePathFinding(pathDropdownValue)}
            >
                Start Pathfinding
            </button>

            <button className="start-btn" onClick={() => resetPaths()}>
                Reset Algorithm
            </button>

            <div className="dropdown">
                <a
                    onClick={() =>
                        mazeDropdownRef.current.classList.toggle("show")
                    }
                >
                    {mazeDropdownValue}
                    <BsCaretDownFill className="icon" />
                </a>
                <div
                    id="myDropdown"
                    className="dropdown-content"
                    onMouseLeave={() =>
                        mazeDropdownRef.current.classList.toggle("show")
                    }
                    ref={mazeDropdownRef}
                >
                    <a
                        onClick={(e) => {
                            setMazeDropdownValue("Random Maze");
                            handleMazeGen("Random Maze");
                        }}
                    >
                        Random Maze
                    </a>
                    <a
                        onClick={(e) => {
                            setMazeDropdownValue("Recursive Division");
                            handleMazeGen("Recursive Division");
                        }}
                    >
                        Recursive Division
                    </a>
                </div>
            </div>

            <a className="eraser" onClick={() => setErase(!erase)}>
                <img
                    alt="Pink-eraser"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Pink-eraser.svg/32px-Pink-eraser.svg.png"
                />
            </a>
        </aside>
    );
};

export default Sidebar;
