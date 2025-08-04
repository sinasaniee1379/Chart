import { IChartEntry } from "@/types";
import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";
import { HEIGHT, MARGIN, WIDTH } from "./constants";

const SingleSeriesChart: FC<IChartEntry> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const filtered = data.filter(
      (d) => d[1] !== null && typeof d[1] === "number"
    ) as [number, number][];

    const svg = d3
      .select(svgRef.current)
      .html("")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    const axisX = d3
      .scaleLinear()
      .domain(d3.extent(filtered, (d) => d[0]) as [number, number])
      .range([0, 700]);

    const axisY = d3
      .scaleLinear()
      .domain(d3.extent(filtered, (d) => d[1]) as [number, number])
      .range([HEIGHT, 0]);

    svg.append("g").call(d3.axisLeft(axisY));
    svg
      .append("g")
      .attr("transform", `translate(0,${HEIGHT})`)
      .call(d3.axisBottom(axisX));

    svg
      .append("path")
      .datum(filtered)
      .attr("stroke", "black")
      .attr("stroke-width", 1.2)
      .attr(
        "d",
        d3
          .line<[number, number]>()
          .x((d) => axisX(d[0]))
          .y((d) => axisY(d[1]))
      );
  }, [data]);
  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default SingleSeriesChart;
