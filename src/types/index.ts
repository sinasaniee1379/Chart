export interface IChartDataPoint {
  0: number;
  1: number | number[] | null;
}

export interface IChartEntry {
  title?: string;
  data: IChartDataPoint[];
}

export interface IChartProps {
  chart: IChartEntry;
}
export interface ISingleProps {
  data: [number, number | null][];
}
export interface IMultiProps {
  data: [number, number[] | null][];
}
