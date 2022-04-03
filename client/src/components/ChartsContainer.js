import React, { useState } from 'react'

import BarChart from './BarChart'
import AreaChart from './AreaChart'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true)
  const { stats: data } = useAppContext()
  //console.log(data)
  return (
    <Wrapper>
      <h4>Monthly Numbers performance</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data.value} /> : <AreaChart data={data.value} />}
    </Wrapper>
  )
}

export default ChartsContainer
