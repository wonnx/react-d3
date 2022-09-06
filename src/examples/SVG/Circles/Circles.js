import React, {useRef, useEffect, useState} from "react";
import { select } from "d3";

const Circles = () => {
    const svgRef = useRef();
    const [data, setData] = useState([5, 20, 25, 30, 40])

    useEffect(() => {
        const svg = select(svgRef.current) // d3 select
        svg
            .selectAll("circle") // find all the circle tags
            .data(data) // data binding
            .join( // manage enter, update, exit at once
                (enter) => enter.append("circle"), // if no circle, create new one
                (update) => update.attr("class", "updated"), // if there is, append updated class
                (exit) => exit.remove() // erase remaining circles
            )
            // add the following properties to the created circles
            .attr("r", (value) => value) // r : radius
            .attr("cx", (value) => value * 2) // cx : x coordinate of center
            .attr("cy", (value) => value * 2) // cy : y coordinate of center
            .attr("stroke", "red");
    }, [data])

    const increaseData = () => {
        setData(data.map((value)=>value+5))
    }

    const decreaseData = () => {
        setData(data.map((value)=>value-5))
    }

    return (
        <React.Fragment>
            <svg ref={svgRef}>
                <circle />
            </svg>
            <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow" />
            </svg>
            <button onClick={increaseData}>+5</button>
            <button onClick={decreaseData}>-5</button>
        </React.Fragment>
    )
}

export default Circles;