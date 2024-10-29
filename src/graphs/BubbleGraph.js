import BaseGraph from '../core/BaseGraph';
import * as d3 from 'd3';

class BubbleGraph extends BaseGraph {
    constructor({ data, options }) {
        super({ data, options });
        this.width = options.width || 566;
        this.height = options.height || 755;
    }

    setup() {
        this.fullWidth = 1133;
        this.fullHeight = 755;
        this.margin = { top: 23, right: 25, bottom: 23, left: 25 };

        this.colorScale = d3.scaleOrdinal()
            .domain(['missed', 'saved', 'goal'])
            .range(['rgba(255, 0, 0, 0.5)', 'rgba(30, 144, 255, 0.5)', 'rgba(55,196,55,0.5)']);

        this.xScale = d3.scaleLinear().domain([0, 100]).range([this.margin.left, this.fullWidth - this.margin.right]);
        this.yScale = d3.scaleLinear().domain([0, 100]).range([this.fullHeight - this.margin.bottom, this.margin.top]);
        this.radiusScale = d3.scaleQuantize()
            .domain([0.001, 1])
            .range(d3.range(4, 15));

        // Configurer le SVG
        this.svg = d3.select(this.svgElement)
            .attr('viewBox', `566 0 ${this.width} ${this.height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        this.svg.append("image")
            .attr("href", "../../public/Football_pitch_horizontal.svg")
            .attr("width", this.fullWidth)
            .attr("height", this.fullHeight);
    }

    render() {
        // Ajoute les cercles pour chaque tir
        this.svg.selectAll("circle")
            .data(this.data)
            .join(
                enter => enter.append("circle")
                    .attr('cx', d => this.xScale(d.x))
                    .attr('cy', d => this.yScale(d.y))
                    .attr('r', d => this.radiusScale(d.xG) * 2)
                    .attr('fill', d => this.colorScale(d.type))
                    .attr('stroke', d => this.colorScale(d.type))
                    .attr('stroke-width', 1.5)
                    .on('mouseover', (event, d) => this.showTooltip(event, d))
                    .on('mouseout', () => this.hideTooltip()),
                update => update
                    .attr('cx', d => this.xScale(d.x))
                    .attr('cy', d => this.yScale(d.y))
                    .attr('r', d => this.radiusScale(d.xG) * 2),
                exit => exit.remove()
            );
    }

    showTooltip(event, data) {
        const tooltip = d3.select('#tooltip');
        tooltip
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY + 10}px`)
            .style('display', 'block')
            .style('background-color', 'rgb(31 41 55)')
            .style('padding', '8px')
            .style('border-radius', '5px')
            .style('color', 'white')
            .html(`Type: ${data.type}<br>xG: ${data.xG.toFixed(2)}`);
    }

    hideTooltip() {
        d3.select('#tooltip').style('display', 'none');
    }

    destroy() {
        super.destroy();
    }
}

export default BubbleGraph;