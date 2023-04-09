'use strict';
import * as d3 from "https://cdn.skypack.dev/d3@7";
const star_chart = d3.select("#star_chart");

const width = 300;
const height = 300;


var star_data = [
    { label: "语言能力", value: 10 },
    { label: "思维能力", value: 8 },
    { label: "交往能力", value: 6 },
    { label: "创造力", value: 12 },
    { label: "执行力", value: 9 }
];


function StarChart(data, {
    label = ([x]) => x,
    value = ([, y]) => y,
    title,
    data_max = 20,
    width,
    height,
    innerRadius = 0,
    outerRadius = Math.min(width, height) / 2,
    labelRadius = (innerRadius * 0.2 + outerRadius * 0.8),
    netColor,
    dataColor,
    colors,
    names,
    netNumber = 10,
} = {}) {
    // main svg
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const Lables = d3.map(data, label);
    const Values = d3.map(data, value);
    const nValues = Values.map(v => v / data_max);
    const nData = d3.zip(Lables, nValues);


    if (names === undefined) names = Lables;
    names = new d3.InternSet(names);
    if (colors === undefined) colors = d3.schemeSpectral[names.size];
    if (colors === undefined) colors = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);

    // Construct scales.
    const color = d3.scaleOrdinal(names, colors);

    // center of the chart
    const cx = width / 2;
    const cy = height / 2;
    // edge length of the chart
    const edgeLength = Math.min(width, height) / 2;
    // 5 line from center to the edge, 五个角度
    const angles = d3.range(0, 2 * Math.PI, 2 * Math.PI / 5);



    // net lines
    for (let i = 0; i < netNumber; i++) {
        const line = d3.lineRadial()
            .curve(d3.curveLinearClosed)
            .radius(edgeLength * (i + 1) / netNumber)
            .angle((d, i) => angles[i]);
        svg.append("path")
            .attr("d", line(angles.map(() => 1)))
            .attr("fill", "none")
            .attr("stroke", (i + 1) == netNumber ? "black" : netColor)
            .attr("stroke-width", (i + 1) == netNumber ? 2 : 1);
    }
    //star lines
    function drawLine(sx, sy, ex, ey) {
        return "M" + sx + " " + sy + " L" + ex + " " + ey;
    }
    for (let i = 0; i < 5; i++) {
        const line = drawLine(0, 0, -edgeLength * Math.sin(angles[i]), -edgeLength * Math.cos(angles[i]));
        // add label
        svg.append("text")
            .attr("x", -labelRadius * Math.sin(angles[i]))
            .attr("y", -labelRadius * Math.cos(angles[i]))
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(Lables[i]);

        svg.append("path")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("stroke-width", 2);
    }
    // data lines
    const line2 = d3.lineRadial()
        .curve(d3.curveLinearClosed)
        .radius(d => d * edgeLength)
        .angle((d, i) => angles[i]);
    svg.append("path")
        .attr("d", line2(nValues))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 3);

    return Object.assign(svg.node(), { scales: {} });


}

var starChart = StarChart(star_data, {
    label: d => d.label,
    value: d => d.value,
    netColor: "gray",
    dataColor: "black",
    width: width,
    height: height
});

star_chart.node().append(starChart);