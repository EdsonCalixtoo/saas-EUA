export interface MetricCard {
  id: string
  label: string
  value: string
  change: string
  isPositive: boolean
}

export interface ChartDataPoint {
  date: string
  displayDate: string
  revenue: number
}

export const analyticsMetrics: MetricCard[] = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: '$186,500',
    change: '42%',
    isPositive: true,
  },
  {
    id: 'deals',
    label: 'Deals Closed',
    value: '9',
    change: '80%',
    isPositive: true,
  },
  {
    id: 'calls',
    label: 'Calls',
    value: '342',
    change: '18%',
    isPositive: true,
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '7.2%',
    change: '2.1%',
    isPositive: true,
  },
]

export const revenueTimeData: ChartDataPoint[] = [
  { date: 'Apr 29', displayDate: '29 de Abril', revenue: 14000 },
  { date: 'Apr 30', displayDate: '30 de Abril', revenue: 21000 },
  { date: 'May 01', displayDate: '01 de Maio', revenue: 22000 },
  { date: 'May 02', displayDate: '02 de Maio', revenue: 26000 },
  { date: 'May 03', displayDate: '03 de Maio', revenue: 30000 },
  { date: 'May 04', displayDate: '04 de Maio', revenue: 28000 },
  { date: 'May 05', displayDate: '05 de Maio', revenue: 32000 },
  { date: 'May 6', displayDate: '06 de Maio', revenue: 37500 },
  { date: 'May 07', displayDate: '07 de Maio', revenue: 33500 },
  { date: 'May 08', displayDate: '08 de Maio', revenue: 31000 },
  { date: 'May 09', displayDate: '09 de Maio', revenue: 35000 },
  { date: 'May 10', displayDate: '10 de Maio', revenue: 39500 },
  { date: 'May 11', displayDate: '11 de Maio', revenue: 41000 },
  { date: 'May 12', displayDate: '12 de Maio', revenue: 33000 },
  { date: 'May 13', displayDate: '13 de Maio', revenue: 28000 },
  { date: 'May 14', displayDate: '14 de Maio', revenue: 30500 },
  { date: 'May 15', displayDate: '15 de Maio', revenue: 33000 },
  { date: 'May 16', displayDate: '16 de Maio', revenue: 36000 },
  { date: 'May 17', displayDate: '17 de Maio', revenue: 40500 },
  { date: 'May 18', displayDate: '18 de Maio', revenue: 44500 },
  { date: 'May 19', displayDate: '19 de Maio', revenue: 39500 },
  { date: 'May 20', displayDate: '20 de Maio', revenue: 36000 },
  { date: 'May 21', displayDate: '21 de Maio', revenue: 39500 },
  { date: 'May 22', displayDate: '22 de Maio', revenue: 41500 },
  { date: 'May 23', displayDate: '23 de Maio', revenue: 47500 },
  { date: 'May 24', displayDate: '24 de Maio', revenue: 52000 },
  { date: 'May 25', displayDate: '25 de Maio', revenue: 46000 },
  { date: 'May 26', displayDate: '26 de Maio', revenue: 51000 },
  { date: 'May 27', displayDate: '27 de Maio', revenue: 59000 },
  { date: 'May 28', displayDate: '28 de Maio', revenue: 55000 },
  { date: 'May 29', displayDate: '29 de Maio', revenue: 52000 },
  { date: 'May 30', displayDate: '30 de Maio', revenue: 54500 },
]
