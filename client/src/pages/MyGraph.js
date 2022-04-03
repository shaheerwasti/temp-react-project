import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'
import { BarChart } from 'recharts'
import { StatsContainer, Loading, ChartsContainer } from '../components'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
const MyGraph = () => {

    const { graphData, rawData, isLoading, monthlyApplications } = useAppContext()

    useEffect(() => {
        graphData()
        //rawData()
        // eslint-disable-next-line
    }, [])



    return (
        <Wrapper className=''>
            <div>

                <h3>Comparative analysis page</h3>
                <p>Grouped by : Risk level = 1, Score = 0, Ported = False</p>
                <ChartsContainer />
                <Link to='/'>back home</Link>
            </div>
        </Wrapper>
    )
}

export default MyGraph
