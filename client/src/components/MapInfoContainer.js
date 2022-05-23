import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

const MapInfoContainer = () => {
    const { geoCodeData } = useAppContext();
    const { totalMarkers } = geoCodeData

    const defaultStats = [
        {
            title: 'Total Markers On This Map',
            count: totalMarkers || 0,
            icon: <FaMapMarkerAlt />,
            color: '#ea4335',
            bcg: '#811511',
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

export default MapInfoContainer