/* eslint-disable array-callback-return */
import { useState, useEffect } from "react";
import { useD3 } from '../hooks/useD3';
import * as d3 from 'd3';
import { connect } from "react-redux";

import "./style.css";

function SpiderChart({SpiderChartValues, ...props}) {

    console.log(SpiderChartValues);

    const start = 20;
    const circleCount = 10;
    const textOffset = 7;
    const width = 800;
    const height = 600;
    const axis_len = 3;
    const max_rad = 200;
    const offset_x = (width - (2 * max_rad)) / 2;
    const offset_y = (height - (2 * max_rad)) / 2;
    const strokeColor = '#DBE7F0';
    const strokeWidth = 1;
    const chartFillColor = '#fff6';

    let axis = {
        radius: [],
        lines: []
    }
    let sub_rad_len = max_rad - start;

    for(let i = 0; i < circleCount; i++) {
        axis.radius.push(start + parseInt(i * sub_rad_len) / 10);
    }
    axis.radius.push(max_rad);

    let scales = [];
    let points = [];

    SpiderChartValues.data.map(function (v, i) {
        scales[i] = d3.scaleLinear()
            .domain([SpiderChartValues.min, SpiderChartValues.max])
            .range([start, max_rad]);

        let lineData = {
            text: v.name,
            value: v.value,
            x: get_position(max_rad, i, max_rad, axis_len).x,
            y: get_position(max_rad, i, max_rad, axis_len).y,
        };
        axis.lines.push(lineData);
        points.push(get_position(scales[i](v.value), i, max_rad, axis_len));
    });

    let spiderData = {
        axis: axis,
        points: points
    };

    let titles = [
        {
            title: SpiderChartValues.name,
            id: 'name',
            x: 30,
            y: 30
        },
        {
            title: SpiderChartValues.match,
            id: 'match',
            x: 30,
            y: 60
        },
        {
            title: SpiderChartValues.type,
            id: 'type',
            x: 30,
            y: 90
        }
    ]
    
    let ref = useD3(
        (svg) => {

            function drawAxis() {

                // Draw Circle for Axis
                svg.select(".ploat-area")
                    .selectAll('circle')
                    .data(spiderData.axis.radius)
                    .join('circle')
                    .attr('cx', max_rad + offset_x)
                    .attr('cy', max_rad + offset_y)
                    .attr('stroke', strokeColor)
                    .attr('fill', 'transparent')
                    .attr('stroke-width', function(d, i) {
                        if(i === 0) {
                            return 2;
                        } else {
                            return strokeWidth;
                        }
                    })
                    .attr('r', function (d, i) {
                        return d;
                    })
                    .attr("stroke-opacity", 0.4);

                // Draw Lines for circle Axis
                svg.select('.axis-area')
                    .selectAll('line')
                    .data(spiderData.axis.lines)
                    .join('line')
                    .attr('x1', function (d, i) {
                        return d.x + offset_x;
                    })
                    .attr('y1', function (d, i) {
                        return d.y + offset_y;
                    })
                    .attr('x2', function (d, i) {
                        return get_position(start, i, max_rad, axis_len).x + offset_x;
                    })
                    .attr('y2', function (d, i) {
                        return get_position(start, i, max_rad, axis_len).y + offset_y;
                    })
                    .attr('id', function (d, i) {
                        return i;
                    })
                    .attr('stroke', strokeColor)
                    .attr('stroke-width', strokeWidth)
                    .on('mouseover', function () {
                        d3.select(this).attr('stroke-width', 3);
                    })
                    .on('mouseout', function () {
                        d3.select(this).attr('stroke-width', strokeWidth);
                    })
                    .attr("stroke-opacity", 0.4)

                // Circles on point
                svg.select('.axis-area')
                    .selectAll('circle')
                    .data(spiderData.axis.lines)
                    .join('circle')
                    .attr('cx', function (d) {
                        return d.x + offset_x;
                    })
                    .attr('cy', function (d) {
                        return d.y + offset_y;
                    })
                    .attr('stroke', strokeColor)
                    .attr('stroke-width', strokeWidth)
                    .attr("stroke-opacity", 0.4)
                    .attr('fill', '#0F5E9E')
                    .attr('r', 4);

                // Text variable for Spider chart
                svg.select('.text-area')
                    .selectAll('text')
                    .data(titles)
                    .join('text')
                    .text(function (d) {
                        return d.title;
                    })
                    .attr('id', function(d, i) {
                        return d.id;
                    })
                    .attr("x", function (d, i) {
                        return d.x;
                    })
                    .attr("y", function (d, i) {
                        return d.y;
                    })
            };

            function drawValue() {

                svg.select('.axis-area')
                    .selectAll('text')
                    .data(spiderData.axis.lines)
                    .join('text')
                    .text(function(d, i) {
                        return d.text + ' (' + d.value + ')';
                    })
                    .attr('fill', '#DDD')
                    .attr('font-size', '17')
                    .attr('font-weight', '400')
                    .attr("x", function (d, i) {
                        let baseLength = 0;
                        
                        if (this.textLength !== undefined) {
                            baseLength = this.textLength.baseVal.value;
                        } else {
                            baseLength = 7 * d.length;
                        }

                        if (d.x < max_rad) {
                            return d.x - baseLength + offset_x - textOffset;
                        } else {
                            return d.x + offset_x + textOffset;
                        }
                    })
                    .attr("y", function (d, i) {
                        return d.y + offset_y + textOffset + (i * 16) - 20;
                    })
            }

            function drawChart() {

                svg.select('.chart')
                    .selectAll('polyline')
                    .attr("points", function () {
                        let points = '';
                        let first_point = '';
                        spiderData.points.map(function (v, i) {
                            if (i === 0) {
                                first_point = (v.x + offset_x) + ',' + (v.y + offset_y) + ' ';
                            }
                            let point = (v.x + offset_x) + ',' + (v.y + offset_y) + ' ';
                            points += point;
                        });

                        return points + first_point;
                    })
                    .attr('stroke', strokeColor)
                    .attr('stroke-width', 3)
                    .attr('fill', chartFillColor);

                svg.select('.chart')
                    .selectAll('circle')
                    .data(spiderData.points)
                    .join('circle')
                    .attr('cx', function (d) {
                        return d.x + offset_x;
                    })
                    .attr('cy', function (d) {
                        return d.y + offset_y;
                    })
                    .attr('id', function (d, i) {
                        return i;
                    })
                    .attr('stroke', strokeColor)
                    .attr('stroke-width', strokeWidth)
                    .attr("opacity", 0.7)
                    .attr('fill', strokeColor)
                    .attr('r', 5)
            }

            function initDraw() {

                // Get Chart point count
                let pc = svg.selectAll('.chart circle')._groups[0].length;

                if(pc === axis_len) return;

                if(pc !== axis_len) {
                    svg.selectAll(".chart circle").remove();
                    svg.selectAll(".chart polyline").remove();
                }
            
                if(svg.selectAll('.chart polyline')._groups[0].length !== 0) return;

                svg.select('.chart')
                    .append('polyline')
                    .attr("points", function () {
                        let points = '';
                        let first_point = '';
                        spiderData.points.map(function (v, i) {
                            if (i === 0) {
                                first_point = (v.x + offset_x) + ',' + (v.y + offset_y) + ' ';
                            }
                            let point = (v.x + offset_x) + ',' + (v.y + offset_y) + ' ';
                            points += point;
                        });

                        return points + first_point;
                    })
                    .attr('stroke', strokeColor)
                    .attr('stroke-width', 3)
                    .attr("stroke-opacity", 0.4)
                    .attr('fill', chartFillColor);
            }

            drawAxis();
            initDraw();
            drawValue();
            drawChart();
        }
    );

    return (
        <svg
            id="spiderChartSVG"
            data-testid="spiderChartSVG"
            ref={ref}
            style={{
                height: height,
                width: width,
                marginRight: "0px",
                marginLeft: "0px",
                marginTop: "30px",
                background: '#0F5E9E'
            }}
        >
            <g className="ploat-area" />
            <g className="axis-area" />
            <g className="text-area" />
            <g className="chart" />
            <g className="pop-chart" />
        </svg>
    );

    /**
     * Get Position
     * @param {*} v // value
     * @param {*} i // index of value
     * @param {*} max // max number (max radius value)
     * @param {*} len // variable Length
     */
    function get_position(v, i, max, len) {

        let rad = (2 * Math.PI) / len
        let x = max + v * Math.sin((-1) * i * rad + Math.PI);
        let y = max + v * Math.cos((-1) * i * rad + Math.PI);
    
        return {
            x: x,
            y: y
        };
    }
}

function mapDispatchToProps(dispatch) {
    // 
}

const mapStateToProps = (state) => {
    if (state !== undefined) {
        return {SpiderChartValues: state};
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SpiderChart);