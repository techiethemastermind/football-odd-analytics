import React, { useState, useEffect } from 'react';
import { useD3 } from '../hooks/useD3';
import * as d3 from 'd3';

import "./style.css";

function PieChart({PieChartData}) {
    const margin = 30;
    const initRadius = 170;
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(400);
    const [radius, setRadius] = useState(initRadius);
    const [data, setData] = useState([]);
    const colors = ['#96ceb4', '#ffeead', '#ffcc5c', '#ff6f69'];

    useEffect(() => {
        let loadedWidth = document.getElementById("PieChart").offsetWidth;
        if(loadedWidth < width) {
            setWidth(loadedWidth);
            setHeight(loadedWidth);
        }
        let newRadius = Math.min(loadedWidth, height) / 2  - margin;
        setRadius(newRadius);
        setData(PieChartData);
    }, [PieChartData]);

    let ref = useD3 (
        (svg) => {

            function drawChart() {

                // Draw Circle for Axis
                svg.attr('width', '100%')
                    .attr('height', '100%')
                    .attr('viewBox', '0 0 ' + width + ' ' + height );

                let pie = d3.pie()
                    .value( d => d.value )
                let data_ready = pie(data);

                svg.selectAll('whatever')
                    .data(data_ready)
                    .enter()
                    .append('path')
                    .attr('d', d3.arc()
                        .innerRadius(radius/ 1.1)  // This is the size of the donut hole
                        .outerRadius(radius)
                    )
                    .attr('fill',  (d) =>  colors[d.index] )
                    .attr("stroke", "#DBE7F0")
                    .style("fill-opacity", "0.75")
                    .style("stroke-width", "0.5")
                    .style("stroke-opacity", "0.8")
                    .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")")

                svg
                    .selectAll('mySlices')
                    .data(data_ready)
                    .enter()
                    .append('g')
                    .attr("transform", d => {
                        let legendPosition = d3.arc().innerRadius(radius/1.75).outerRadius(radius);
                        return `translate(${legendPosition.centroid(d)})`;
                    })
                    .attr("class", 'legend-g')
                    .style("user-select", "none")
                    .append('text')
                    .text(d =>  d.data.name)
                    .style("text-anchor", "middle")
                    .style("fill", '#ddd')
                    .style("font-size", "14px")
                    .style("text-transform", 'uppercase')
                    .style("font-weight", '500')
                    .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")")
            }

            function update() {
                svg.selectAll('*').remove();
            }
            update();
            drawChart();
        }
    )

    function PieChartHeader() {
        return (<div className="header">
            <h2>Odd Analytics</h2>
        </div>)
    }

    function PieChartDescription() {
        return (
            <div className="description">
                <div id="colors_area" className="colors">
                    {data.map((ele, i) => {
                        let color = colors[i];
                        return (<RowElement ele={ele} color={color} key={i} />)
                    })}
                </div>
            </div>
        )
    }

    function RowElement(data) {
        return (
            <div className="row">
                <span className="rect" style={{backgroundColor: data.color, opacity: 0.75}}></span><span>{data.ele.name}</span>
                <span className="small">(Odd Value <span className="duration">{data.ele.value}</span> %)</span>
            </div>
        )
    }

    return (
        <div className="PieChartArea">
            <PieChartHeader />
            <div id="PieChart" className="PieChartSvg">
                <svg
                    id="PieChartSVG"
                    ref={ref}
                    style={{
                        height: height,
                        width: width,
                        marginRight: "0px",
                        marginLeft: "0px"
                    }}
                >
                </svg>
            </div>
            <PieChartDescription />
        </div>
    );
}

export default PieChart;
