import { Loading, Map } from '../../components'
import { useAppContext } from '../../context/appContext'
import { useEffect, } from 'react'
import {  useLoadScript } from '@react-google-maps/api'




const FsboMap = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyBrl--tkl9vUGwTjAvqgoAcpTRrDfw-nN4" })

    const { getFisbo, } = useAppContext()
    useEffect(() => {
        getFisbo()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!isLoaded) {
        return <Loading center />
    }

    return (
        <Map />
    )

}




export default FsboMap;