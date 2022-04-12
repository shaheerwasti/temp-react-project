import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const BarChartComponent = ({ data }) => {
  //console.log(data);
  return (
    <ResponsiveContainer width='100%' height={300} data={data}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='_id' label="Month" />
        <YAxis allowDecimals={false} label="Count" />
        <Tooltip />
        <Legend />
        <Bar dataKey='countOfFilteredNumbers' fill='#2cb1bc' barSize={75} />
        <Bar dataKey='countOfTotalNumbers' fill='#f7a49b' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
