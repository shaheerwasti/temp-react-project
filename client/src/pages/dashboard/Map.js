import { Loading, Map, MapInfoContainer } from '../../components'
import { useAppContext } from '../../context/appContext'
import { useEffect, } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import Wrapper from '../../assets/wrappers/BigSidebar'




const FsboMap = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyAtO5Ll9NStUIlYx1e16AnJVZMCztmKgpI" })
    //AIzaSyAtO5Ll9NStUIlYx1e16AnJVZMCztmKgpI
    //AIzaSyBrl--tkl9vUGwTjAvqgoAcpTRrDfw-nN4
    const { getFisbo, } = useAppContext()
    useEffect(() => {
        getFisbo()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isLoaded) {
        return <Loading center />
    }

    return (<Wrapper className=''>
        <div>

            <h3>Map with Property Markers</h3>
            <div id='statistics'> <MapInfoContainer /> </div>
            <Map />

        </div>
    </Wrapper>
    )

}




export default FsboMap;