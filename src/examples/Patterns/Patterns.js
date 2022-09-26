import React, { useRef, useEffect } from "react";
import { select, range } from "d3";
import { fruitBowl } from "./FruitBowl";
import $ from "jquery"
import "../../styles.css"

const Patterns = () => {
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)

        const makeFruit = type => ({
            type,
            id: Math.random(),
        });
        let fruits = range(5).map(()=> makeFruit('apple'));

        const render = () => {
            fruitBowl(svg, {
                fruits,
                innerHeight: $(svgRef.current).height(),
                innerWidth: $(svgRef.current).width()
            })
        }

         // Eat an apple
        render();
        setTimeout(() => {
            fruits.pop();
            render();
        }, 1000)
        // Replacing an apple with a lemon
        setTimeout(() => {
            fruits[2].type = 'lemon';
            render();
        }, 2000)
        // Eat an apple
        setTimeout(() => {
            fruits = fruits.filter((d,i) => i !== 1);
            render();
        }, 3000)
    }, [])

    return (
        <React.Fragment>
            <svg ref={svgRef} width="100%" height="100vw" />
        </React.Fragment>
    ) 
}

export default Patterns;