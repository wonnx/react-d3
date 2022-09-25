import React, { useRef, useEffect } from "react";
import {
    select,
    csv,
    scaleLinear,
    extent,
    axisBottom, 
    axisLeft,
    scaleTime,
    line,
    curveBasis,
} from "d3";
import $ from "jquery"
import "../../styles.css"

const LineChart = () => {
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current);

        const render = data => {
            const margin = { top: 80, right: 40, bottom: 80, left: 80 }
            const innerWidth = $(svgRef.current).width() - margin.left - margin.right;
            const innerHeight = $(svgRef.current).height() - margin.top - margin.bottom;

            const title = 'A Week in San Francisco';
            // const circleRadius = 10;

            const xValue = d => d.timestamp;
            const xAxisLabel = "time";
            const yValue = d => d.temperature;
            const yAxisLabel = "temperature";

            const xScale = scaleTime()
                .domain(extent(data, xValue))
                .range([0, innerWidth])
                .nice();
            const yScale = scaleLinear()
                .domain(extent(data, yValue))
                .range([innerHeight, 0])
                .nice();

            const xAxis = axisBottom(xScale)
                .tickSize(-innerHeight)
                .tickPadding(20);

            const yAxis = axisLeft(yScale)
                .tickSize(-innerWidth)
                .tickPadding(10);

            const g = svg.append('g');
            g
                .attr('transform', `translate(${margin.left}, ${margin.top})`);
            
            const lineGenerator = line();
            lineGenerator
                .x(d => xScale(xValue(d)))
                .y(d => yScale(yValue(d)))
                .curve(curveBasis);
            g
                .append('path')
                .attr('d', lineGenerator(data))
                .attr('class', 'line-path')
                .attr('stroke', 'black')
            // g
            //     .selectAll('circle').data(data)
            //     .enter().append('circle')
            //     .attr('cx', d => xScale(xValue(d)))
            //     .attr('cy', d => yScale(yValue(d)))
            //     .attr('r', circleRadius);
            g
                .append('text')
                .attr('class', 'title')
                .attr('y', -20)
                .text(title);

            const xAxisG = g.append('g').call(xAxis);
            xAxisG
                .attr('transform', `translate(0, ${innerHeight})`)
                .selectAll('.domain').remove();
            xAxisG
                .append('text')
                .attr('class', 'xAxis-label')
                .attr('x', innerWidth / 2)
                .attr('y', 60)
                .text(xAxisLabel);

            const yAxisG = g.append('g').call(yAxis);
            yAxisG
                .selectAll('.domain').remove();
            yAxisG
                .append('text')
                .attr('transform', `rotate(270)`)
                .attr('class', 'yAxis-label')
                .attr('x', -innerHeight / 2)
                .attr('text-anchor', 'middle')
                .attr('y', -40)
                .text(yAxisLabel);
        }

        csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv')
            .then(data => {
                data.forEach(d => {
                    d.timestamp = new Date(d.timestamp);
                    d.temperature = +d.temperature;
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

export default LineChart;