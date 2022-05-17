import { Loading, Map } from '../../components'
import { useAppContext } from '../../context/appContext'
import { useEffect, } from 'react'
import {  useLoadScript } from '@react-google-maps/api'




const FsboMap = () => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyAtO5Ll9NStUIlYx1e16AnJVZMCztmKgpI" })

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