import { FC } from "react";
import { IChartProps } from "@/types";
import MultiSeriesChart from "./MultiSeriesChart";
import SingleSeriesChart from "./SingleSeriesChart";

const Chart: FC<IChartProps> = ({ chart }) => {
  const firstValue = chart.data.find((d) => d[1] !== null)?.[1];
  const isMultiSeries = Array.isArray(firstValue);
  return (
    <div
      style={{
        marginBottom: "40px",
      }}
    >
      <h3>{chart.title}</h3>
      {isMultiSeries ? (
        <MultiSeriesChart data={chart.data as [number, number[] | null][]} />
      ) : (
        <SingleSeriesChart data={chart.data as [number, number | null][]} />
      )}
    </div>
  );
};

export default Chart;
