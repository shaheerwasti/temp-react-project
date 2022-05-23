import { useAppContext } from '../context/appContext'
import { GoogleMap, Marker, Circle } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '600px'
};

const center = {
    lat: 37.0902,
    lng: -95.7129
}

const Map = () => {

    const { geoCodeData } = useAppContext();
    const { data } = geoCodeData
    if (data) {
        //console.log(data.map((item, index) => <Marker key={index} position={item.results[0].geometry.location}> </Marker>));
        return (<GoogleMap zoom={4} mapContainerStyle={containerStyle}
            center={center}>
            {data.map((item, index) => {
                //console.log(item.results.length);
                if (item.results.length > 0) {
                    return <Marker key={index} onClick={() => window.open('https://www.google.com/maps/place/' + item.file.addressOfDeceased + "+" + item.file.cityOfDeceased + "+" + item.file.stateOfDeceased + "+" + item.file.zipCodeOfDeceased, '_blank')} position={item.results[0].geometry.location} > </Marker>
                }
            }
            )}
        </GoogleMap>)

    }
    return "Loading..."

    /*
if (data) {
        console.log(data.map((item, index) => <Marker key={index} position={item.results[0].geometry.location}> </Marker>));
        return (<GoogleMap zoom={4} mapContainerStyle={containerStyle}
            center={center}> {data.map((item, index) => <Marker key={index} position={item.results[0].geometry.location} > </Marker>)} </GoogleMap>)

    }
    return "Loading..."
    */


}

export default Map