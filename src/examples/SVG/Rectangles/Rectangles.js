import React, { useRef, useEffect, useState } from "react";
import { select } from "d3";

const Rectangles = () => {
    const svgRef = useRef();
    const [data, setData] = useState([5, 10, 15, 20, 25]);

    useEffect(()=>{
        const svg = select(svgRef.current)
        svg
            .selectAll("rect")
            .data(data)
    },[data])

    return (
        <React.Fragment>
            <svg ref={svgRef}>
                <rect />
            </svg>
        </React.Fragment>
    )
}

export default Rectangles;