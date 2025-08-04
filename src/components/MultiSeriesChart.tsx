import { IChartEntry } from "@/types";
import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";
import { COLOR, HEIGHT, MARGIN, SERIESCOUNT, WIDTH } from "./constants";

const MultiSeriesChart: FC<IChartEntry> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .html("")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);

    const axisX = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d[0]) as [number, number])
      .range([0, WIDTH]);

    const flatValues = data.flatMap((d) =>
      Array.isArray(d[1]) ? d[1].filter((v) => v !== null) : []
    ) as number[];

    const axisY = d3
      .scaleLinear()
      .domain([d3.min(flatValues)!, d3.max(flatValues)!])
      .range([HEIGHT, 0]);

    svg.append("g").call(d3.axisLeft(axisY));
    svg
      .append("g")
      .attr("transform", `translate(0,${HEIGHT})`)
      .call(d3.axisBottom(axisX));

    for (let i = 0; i < SERIESCOUNT; i++) {
      const lineData = data
        .map((d) =>
          Array.isArray(d[1]) && d[1][i] != null ? [d[0], d[1][i]!] : null
        )
        .filter((d): d is [number, number] => d !== null);
      for (const point of lineData) {
        if (typeof point[0] !== "number" || typeof point[1] !== "number") {
          return console.log("❌ خطای فرمت داده:", point);
        }
      }
      svg
        .append("path")
        .datum(lineData)
        .attr("stroke", COLOR[i])
        .attr("stroke-width", 1.2)
        .attr(
          "d",
          d3
            .line<[number, number]>()
            .x((d) => axisX(d[0]))
            .y((d) => axisY(d[1]))
        );
    }
  }, [data]);
  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default MultiSeriesChart;
