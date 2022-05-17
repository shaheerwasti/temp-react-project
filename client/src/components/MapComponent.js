import { useAppContext } from '../context/appContext'
import { GoogleMap, Marker, } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '600px'
};

const center = {
    lat: 34.1652894,
    lng: -118.7706532
}

const center1 = {
    lat: 34.1652894,
    lng: -118.7706532
};

const Map = () => {

    const { geoCodeData } = useAppContext();
    const { data } = geoCodeData

    if (data) {
        console.log(data.map((item, index) => <Marker key={index} position={item.results[0].geometry.location}> </Marker> ));
        return (<GoogleMap zoom={10} mapContainerStyle={containerStyle}
            center={center}> {data.map((item, index) => <Marker key={index} position={item.results[0].geometry.location} > </Marker> )} </GoogleMap>)

    }
    // data.forEach(element => {
    //     console.log(element);
    // });
    // item.results[0].geometry.location
    //{data.map(item=><Marker position={item.results[0].location}></Marker>) }
    // return <Marker>key={index} position={mark.results[0].location} </Marker>
    console.log(<Marker position={center}></Marker>);
   
}

export default Map