import React, {useRef, useEffect} from "react";
import { select, arc } from "d3";
import $ from "jquery"
import "../../styles.css"

const SmileyFace = () => {
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)

        const circle = svg.append('circle')
        circle
            .attr('r', $(svgRef.current).height() / 2)
            .attr('cx', $(svgRef.current).width() / 2)
            .attr('cy', $(svgRef.current).height() / 2)
            .attr('fill', 'yellow')
            .attr('stroke', 'black')

        const leftEye = svg.append('circle')
        leftEye
            .attr('r', $(svgRef.current).height() / 16)
            .attr('cx', $(svgRef.current).width() / 2 - $(svgRef.current).height() / 6)
            .attr('cy', $(svgRef.current).height() / 2 - $(svgRef.current).height() / 15 * 2)
            .attr('fill', 'black')
            .attr('stroke', 'black')

        const rightEye = svg.append('circle')
        rightEye
            .attr('r', $(svgRef.current).height() / 16)
            .attr('cx', $(svgRef.current).width() / 2 + $(svgRef.current).height() / 6)
            .attr('cy', $(svgRef.current).height() / 2 - $(svgRef.current).height() / 15 * 2)
            .attr('fill', 'black')
            .attr('stroke', 'black')
        
        const g = svg.append('g')
            g
                .attr('transform', `translate(${$(svgRef.current).width() / 2}, ${$(svgRef.current).height() / 2})`)
                .attr('translate')
        const mouth = g.append('path')
        mouth
            .attr('d', arc()({
                innerRadius: 36,
                outerRadius: 40,
                startAngle: Math.PI/2,
                endAngle: Math.PI/2*3,
            }))
    })
    
    return (
        <React.Fragment>
            <svg ref={svgRef} width="100%" height="100%"/>
        </React.Fragment>
    )
}

export default SmileyFace;