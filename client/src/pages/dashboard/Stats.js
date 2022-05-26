import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, Loading, ChartsContainer, StatisticsContainer } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
const Stats = () => {
  const { showStats, isLoading, monthlyApplications, totalGraph } = useAppContext()

  useEffect(() => {
    //showStats()
    totalGraph()
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return <Loading center />
  }
  // return (
  //   <>
  //     <StatsContainer />
  //     {monthlyApplications.length > 0 && <ChartsContainer />}
  //   </>
  // )

  return (<Wrapper className=''>
    <div>

      <h3>Number Stats</h3>
      <div id='statistics'><StatisticsContainer /></div>
    </div>
  </Wrapper>)
}

export default Stats
