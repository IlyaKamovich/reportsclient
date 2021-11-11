import { IReport } from './reports'
import type { LegendType } from '../types/chart'

export interface IChart {
    title: string
    dataKey: string
    reports: Array<IReport>
    trendline: boolean
  }

export interface IChartLegend {
  dataKey: string
  trendline: boolean
}

export interface IChartLabel {
  x: number
  y: number
  value: number
}


export interface ILegendData {
  value: any
  id: string
  type: LegendType
  color: string
}

export interface IChartSessings {
  xAxisPadding: {
    left: number
    right: number
  }
  yAxisLabel: {
    angle: number
    position: string
    textAnchor: string
  }
  dotSettings: {
    stroke: string
    strokeWidth: number
  }
}
