import { Loading, ChartsContainer, StatisticsContainer } from '../../components'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'

import Wrapper from '../../assets/wrappers/DashboardFormPage'
const MyGraph = () => {

    const { graphData, isLoading, totalGraph, showStats } = useAppContext()

    useEffect(() => {
        showStats()
        graphData()
        //totalGraph()
        // eslint-disable-next-line
    }, [])
    if (isLoading) {
        return <Loading center />
    }


    return (
        <Wrapper className=''>
            <div>

                <h3>Number dashboard page</h3>
                <div id='statistics'><StatisticsContainer /></div>
                <ChartsContainer />
                <p>Grouped by : Risk level = 1, Score = 0, Ported = False</p>
            </div>
        </Wrapper>
    )
}

export default MyGraph
