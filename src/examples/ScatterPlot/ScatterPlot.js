import React, { useRef, useEffect } from "react";
import {
    select,
    csv,
    scaleLinear,
    max,
    scalePoint,
    axisLeft,
    axisBottom,
    format
} from "d3";
import country from "./data.csv"
import $ from "jquery"
import "../../styles.css"

const ScatterPlot = () => {
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current);

        const render = data => {
            const xValue = d => d.population
            const yValue = d => d.country

            const margin = { top: 60, right: 40, bottom: 40, left: 100 }

            const innerWidth = $(svgRef.current).width() - margin.left - margin.right
            const innerHeight = $(svgRef.current).height() - margin.top - margin.bottom

            const xScale = scaleLinear();
            xScale
                .domain([0, max(data, xValue)])
                .range([0, innerWidth])
                .nice();

            const yScale = scalePoint();
            yScale
                .domain(data.map(yValue))
                .range([0, innerHeight])
                .padding(0.7);

            const xAxisTickFormat = number =>
                format('.3s')(number)
                    .replace('G', 'B');

            const xAxis = axisBottom(xScale)
                .tickFormat(xAxisTickFormat)
                .tickSize(-innerHeight);

            const yAxis = axisLeft(yScale)
                .tickSize(-innerWidth)

            const g = svg.append('g')
            g
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
            g
                .append('g').call(yAxis)
                .selectAll('.domain')
                .remove()

            const xAxisG = g.append('g').call(xAxis)
            xAxisG
                .attr('transform', `translate(0, ${innerHeight})`)
                .selectAll('.domain')
                .remove()
            xAxisG
                .append('text')
                .attr('class', 'xAxis-label')
                .attr('x', innerWidth / 2)
                .attr('y', 40)
                .attr('fill', 'red')
                .text('population')
            g
                .selectAll('circle').data(data)
                .enter().append('circle')
                .attr('cx', d=>xScale(xValue(d)))
                .attr('cy', d => yScale(yValue(d)))
                .attr('r', 18);
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

export default ScatterPlot;