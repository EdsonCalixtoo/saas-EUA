export interface MetricCard {
  id: 'revenue' | 'deals' | 'calls' | 'conversion'
  label: string
  value: string
  change: string
  isPositive: boolean
}

export interface ChartDataPoint {
  date: string
  displayDate: string
  revenue: number
  deals: number
  calls: number
  conversion: number
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
  { date: 'Apr 29', displayDate: '29 de Abril', revenue: 14000, deals: 2, calls: 12, conversion: 4.5 },
  { date: 'Apr 30', displayDate: '30 de Abril', revenue: 21000, deals: 3, calls: 16, conversion: 5.2 },
  { date: 'May 01', displayDate: '01 de Maio', revenue: 22000, deals: 3, calls: 18, conversion: 5.4 },
  { date: 'May 02', displayDate: '02 de Maio', revenue: 26000, deals: 4, calls: 20, conversion: 6.0 },
  { date: 'May 03', displayDate: '03 de Maio', revenue: 30000, deals: 5, calls: 24, conversion: 6.5 },
  { date: 'May 04', displayDate: '04 de Maio', revenue: 28000, deals: 4, calls: 22, conversion: 6.2 },
  { date: 'May 05', displayDate: '05 de Maio', revenue: 32000, deals: 5, calls: 26, conversion: 6.8 },
  { date: 'May 6',  displayDate: '06 de Maio', revenue: 37500, deals: 6, calls: 28, conversion: 7.1 },
  { date: 'May 07', displayDate: '07 de Maio', revenue: 33500, deals: 5, calls: 25, conversion: 6.9 },
  { date: 'May 08', displayDate: '08 de Maio', revenue: 31000, deals: 4, calls: 23, conversion: 6.4 },
  { date: 'May 09', displayDate: '09 de Maio', revenue: 35000, deals: 5, calls: 27, conversion: 7.0 },
  { date: 'May 10', displayDate: '10 de Maio', revenue: 39500, deals: 6, calls: 30, conversion: 7.3 },
  { date: 'May 11', displayDate: '11 de Maio', revenue: 41000, deals: 7, calls: 32, conversion: 7.5 },
  { date: 'May 12', displayDate: '12 de Maio', revenue: 33000, deals: 5, calls: 26, conversion: 6.8 },
  { date: 'May 13', displayDate: '13 de Maio', revenue: 28000, deals: 4, calls: 21, conversion: 6.1 },
  { date: 'May 14', displayDate: '14 de Maio', revenue: 30500, deals: 4, calls: 24, conversion: 6.3 },
  { date: 'May 15', displayDate: '15 de Maio', revenue: 33000, deals: 5, calls: 25, conversion: 6.7 },
  { date: 'May 16', displayDate: '16 de Maio', revenue: 36000, deals: 6, calls: 28, conversion: 7.0 },
  { date: 'May 17', displayDate: '17 de Maio', revenue: 40500, deals: 7, calls: 31, conversion: 7.4 },
  { date: 'May 18', displayDate: '18 de Maio', revenue: 44500, deals: 8, calls: 35, conversion: 7.8 },
  { date: 'May 19', displayDate: '19 de Maio', revenue: 39500, deals: 6, calls: 30, conversion: 7.2 },
  { date: 'May 20', displayDate: '20 de Maio', revenue: 36000, deals: 5, calls: 27, conversion: 6.9 },
  { date: 'May 21', displayDate: '21 de Maio', revenue: 39500, deals: 6, calls: 31, conversion: 7.3 },
  { date: 'May 22', displayDate: '22 de Maio', revenue: 41500, deals: 7, calls: 33, conversion: 7.5 },
  { date: 'May 23', displayDate: '23 de Maio', revenue: 47500, deals: 8, calls: 38, conversion: 8.0 },
  { date: 'May 24', displayDate: '24 de Maio', revenue: 52000, deals: 9, calls: 42, conversion: 8.4 },
  { date: 'May 25', displayDate: '25 de Maio', revenue: 46000, deals: 7, calls: 36, conversion: 7.8 },
  { date: 'May 26', displayDate: '26 de Maio', revenue: 51000, deals: 8, calls: 40, conversion: 8.2 },
  { date: 'May 27', displayDate: '27 de Maio', revenue: 59000, deals: 10, calls: 46, conversion: 8.9 },
  { date: 'May 28', displayDate: '28 de Maio', revenue: 55000, deals: 9, calls: 43, conversion: 8.5 },
  { date: 'May 29', displayDate: '29 de Maio', revenue: 52000, deals: 8, calls: 40, conversion: 8.1 },
  { date: 'May 30', displayDate: '30 de Maio', revenue: 54500, deals: 9, calls: 42, conversion: 8.3 },
]
