import { scaleOrdinal } from "d3";

/*
     create d3 data join intends to make the dom elements matchup with
     whatever data elements you passed in.
     first have data, but no corresponding dom elements
     use selectAll, to knows what elements are present already.
     If you have corresponding dom elements,
     use update to change existing dom elements.
     The data join itselt is update selection.
 */

export const fruitBowl = (selection, props) => {
    const { fruits, innerWidth, innerHeight } = props;

    const colorScale = scaleOrdinal()
        .domain(['apple', 'lemon'])
        .range(['red', 'yellow']);

    const radiusScale = scaleOrdinal()
        .domain(['apple', 'lemon'])
        .range([innerWidth / 20, innerWidth / 30]);
    
    const bowl = selection.selectAll('rect').data([null]);
    bowl.enter().append('rect')
        .attr('width', innerWidth)
        .attr('height', innerHeight/2)
        .attr('y', innerHeight/4)
        .attr('class', 'bowl-rect')
        .attr('rx', innerHeight/4);

    const groups = selection.selectAll('g').data(fruits);
    const groupsEnter = groups.enter().append('g');
    groupsEnter
        .merge(groups) // returns both enter & update selection
            .attr('transform', (d, i) => 
                `translate(${(i+1) * innerWidth / 6}, ${innerHeight / 2})`
            );
    groups
        .exit().remove();

    groupsEnter // enter groups
        .append('circle')
        .merge(groups.select('circle')) // returns both enter & update selection
            .attr('r', d => radiusScale(d.type))    
            .attr('fill', d => colorScale(d.type))    
    
    groupsEnter
        .append('text')
            .attr('class', 'fruit-text')
            .attr('fill', 'white')
        .merge(groups.select('text'))
            .text(d => d.type)
            .attr('y', innerHeight*0.1)
            
}