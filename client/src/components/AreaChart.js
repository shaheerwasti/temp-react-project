import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300} data={data}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='_id' label="Month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area dataKey='countOfFilteredNumbers' fill='#2cb1bc' barSize={75} />
        <Area dataKey='countOfTotalNumbers' fill='#fbd4d0' barSize={75} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent
