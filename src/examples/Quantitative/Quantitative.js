import React, { useRef, useEffect } from "react";
import {
    select,
    csv,
    scaleLinear,
    extent,
    axisBottom,
    format,
    axisLeft,
} from "d3";
import $ from "jquery"
import "../../styles.css"

const Quantitative = () => {
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current);

        const render = data => {
            const margin = { top: 80, right: 40, bottom: 80, left: 100 }
            const innerWidth = $(svgRef.current).width() - margin.left - margin.right;
            const innerHeight = $(svgRef.current).height() - margin.top - margin.bottom;

            const title = 'Cars Horsepower vs Weight';
            const circleRadius = 10;
            
            const xValue = d => d.horsepower;
            const xAxisLabel = "horsepower";
            const yValue = d => d.weight;
            const yAxisLabel = "weight";

            const xScale = scaleLinear()
                .domain(extent(data, xValue))
                .range([0, innerWidth])
                .nice();
            const yScale = scaleLinear()
                .domain(extent(data, yValue))
                .range([0, innerWidth])
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
            g
                .selectAll('circle').data(data)
                .enter().append('circle')
                .attr('cx', d => xScale(xValue(d)))
                .attr('cy', d => yScale(yValue(d)))
                .attr('r', circleRadius);
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
                .attr('x', -innerHeight/2)
                .attr('text-anchor', 'middle')
                .attr('y', -60)
                .text(yAxisLabel);
        }

        csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
            .then(data => {
                data.forEach(d => {
                    d.mpg = +d.mpg;
                    d.cylinders = +d.cylinders;
                    d.displacement = +d.displacement;
                    d.horsepower = + d.horsepower;
                    d.weight = +d.weight;
                    d.acceleration = +d.acceleration;
                    d.year = +d.year;
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

export default Quantitative;