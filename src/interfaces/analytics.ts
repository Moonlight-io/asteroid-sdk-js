export interface MultiVariateDataPoint {
  timestamp: number
  values: PlotDataPoint[]
}

export interface PlotDataPoint {
  id: string
  value: number
}

export interface PlotStatistic {
  label: string
  key: string
  value: string | number
}

export interface SimplePlot {
  title: string
  data: PlotDataPoint[]
}

export interface StackedBarPlot {
  title: string
  data: MultiVariateDataPoint[]
}
