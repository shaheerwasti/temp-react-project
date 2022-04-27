import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaPhone, FaSearchDollar, FaFilter } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatisticsContainer = () => {
    const { stats } = useAppContext()
    console.log(stats);
    const defaultStats = [
        {
            title: 'Total Phone Numbers',
            count: stats.pending || 0,
            icon: <FaPhone />,
            color: '#e9b949',
            bcg: '#fcefc7',
        },
        {
            title: 'Total localities',
            count: stats.interview || 0,
            icon: <FaSearchDollar />,
            color: '#34a853',
            bcg: '#beddc7', 
        },
        {
            title: 'Total ported Phone Numbers',
            count: stats.declined || 0,
            icon: <FaFilter />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
    ]

    return (
        <Wrapper>
            {defaultStats.map((item, index) => {
                return <StatItem key={index} {...item} />
            })}
        </Wrapper>
    )
}

export default StatisticsContainer
