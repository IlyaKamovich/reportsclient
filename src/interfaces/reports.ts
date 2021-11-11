export interface IReports {
  reports: Array<IReport>
}

export interface IReport {
  date: Date
  targetolog: string
  metrics: {
    conversions: number
    cpi: number
  }
}

