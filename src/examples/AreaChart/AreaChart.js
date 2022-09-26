import React, { useRef, useEffect } from "react";
import {
    select,
    csv,
    scaleLinear,
    extent,
    axisBottom,
    axisLeft,
    scaleTime,
    curveBasis,
    area,
    max,
    format,
} from "d3";
import $ from "jquery"
import "../../styles.css"

const AreaChart = () => {
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current);

        const render = data => {
            const margin = { top: 80, right: 40, bottom: 80, left: 80 }
            const innerWidth = $(svgRef.current).width() - margin.left - margin.right;
            const innerHeight = $(svgRef.current).height() - margin.top - margin.bottom;

            const title = 'World Population';
            // const circleRadius = 10;

            const xValue = d => d.year;
            const xAxisLabel = "year";
            const yValue = d => d.population;
            const yAxisLabel = "population";

            const xScale = scaleTime()
                .domain(extent(data, xValue))
                .range([0, innerWidth])
                .nice();
            const yScale = scaleLinear()
                .domain([0, max(data, yValue)])
                .range([innerHeight, 0])
                .nice();

            const xAxis = axisBottom(xScale)
                .ticks(6)
                .tickSize(-innerHeight)
                .tickPadding(20);

            const yAxisTickFormat = number => 
                format('.1s')(number)
                    .replace('G', 'B');

            const yAxis = axisLeft(yScale)
                .tickSize(-innerWidth)
                .tickPadding(10)
                .tickFormat(yAxisTickFormat);

            const g = svg.append('g');
            g
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            const AreaGenerator = area();
            AreaGenerator
                .x(d => xScale(xValue(d)))
                .y0(innerHeight)
                .y1(d => yScale(yValue(d)))
                .curve(curveBasis);
            g
                .append('path')
                .attr('d', AreaGenerator(data))
                .attr('class', 'area')
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
                .attr('text-anchor', 'middle')
                .attr('x', innerWidth/2)
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

        csv('https://vizhub.com/curran/datasets/world-population-by-year-2015.csv')
            .then(data => {
                data.forEach(d => {
                    d.year = new Date(d.year);
                    d.population = +d.population;
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

export default AreaChart;