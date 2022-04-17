import { Loading, ChartsContainer } from '../../components'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
const MyGraph = () => {

    const { graphData, isLoading, totalGraph } = useAppContext()

    useEffect(() => {
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

                <h3>Comparative analysis page</h3>
                <p>Grouped by : Risk level = 1, Score = 0, Ported = False</p>
                <ChartsContainer />
            </div>
        </Wrapper>
    )
}

export default MyGraph
