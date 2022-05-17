import { useAppContext } from '../context/appContext'
import { GoogleMap, Marker, } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '600px'
};

const center = {
    lat: 37.0902,
    lng: -95.7129
}

const center1 = {
    lat: 34.1652894,
    lng: -118.7706532
};

const Map = () => {

    const { geoCodeData } = useAppContext();
    const { data } = geoCodeData

    if (data) {
        console.log(data.map((item, index) => <Marker key={index} position={item.results[0].geometry.location}> </Marker>));
        return (<GoogleMap zoom={4} mapContainerStyle={containerStyle}
            center={center}> {data.map((item, index) => <Marker key={index} position={item.results[0].geometry.location} > </Marker>)} </GoogleMap>)

    }
    return "YE LE BC"


}

export default Map