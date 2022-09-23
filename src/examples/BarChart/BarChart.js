import React, { useRef, useEffect } from "react";
import { 
    select, 
    csv, 
    scaleLinear, 
    max, 
    scaleBand, 
    axisLeft, 
    axisBottom, 
    format 
} from "d3";
import country from "./data.csv"
import $ from "jquery"
import "../../styles.css"

const BarChart = () => {
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current);

        const render = data => {
            const xValue = d => d.population
            const yValue = d => d.country

            const margin = {top: 60, right: 40, bottom: 40, left: 100}

            const innerWidth = $(svgRef.current).width() - margin.left - margin.right
            const innerHeight = $(svgRef.current).height() - margin.top - margin.bottom

            const xScale = scaleLinear();
            xScale
                .domain([0, max(data, xValue)])
                .range([0, innerWidth]);
            
            const yScale = scaleBand();
            yScale
                .domain(data.map(yValue))
                .range([0, innerHeight])
                .padding(0.1);

            const xAxisTickFormat = number => 
                format('.3s')(number)
                .replace('G', 'B');

            const xAxis = axisBottom(xScale)
                .tickFormat(xAxisTickFormat)
                .tickSize(-innerHeight);

            const g = svg.append('g')
            g
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
            g
                .append('g').call(axisLeft(yScale))
                    .selectAll('.domain, .tick line')
                        .remove()
    
            const xAxisG = g.append('g').call(xAxis)
            xAxisG
                    .attr('transform', `translate(0, ${innerHeight})`)
                    .selectAll('.domain')
                        .remove()
            xAxisG
                .append('text')
                    .attr('class', 'xAxis-label')
                    .attr('x', innerWidth/2)
                    .attr('y', 40)
                    .attr('fill', 'red')
                    .text('population')
            g   
                .selectAll('rect')
                .data(data)
                .enter().append('rect')
                    .attr('width', d => xScale(xValue(d)))
                    .attr('height', yScale.bandwidth())
                    .attr('y', d=> yScale(yValue(d)));
            g
                .append('text')
                    .attr('class', 'title')
                    .text("Top 10 most populous countries");
        };

        csv(country).then(data => {
            data.forEach(d => {
                d.population = +d.population * 1000;
            })
            render(data);
        })
    })

    return (
        <React.Fragment>
            <svg ref={svgRef} width="100%" height="100vw" />
        </React.Fragment>
    )
}

export default BarChart;