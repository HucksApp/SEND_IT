import React, { Component } from 'react';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import toastr from '../notification/Toastr';
import geocode from '../controls/Geocode';

const mapStyles = {
    width: '100%',
    height: '100%'
  };


class orderMap extends Component {

    state={
            data:{
                init_conditions:{
                    lat: 8.500000,
                    lng: 4.550000,
                    zoom: 14,
                },
                accessories:{
                    showingInfoWindow: false,
                    activeMarker: {}, 
                    selectedPlace: {}
                },
                order:{
                        pickup_address:{
                            lat: "",
                            lng: ""
                        },
                        C_location:{
                            lat: "",
                            lng: ""
                        }
                }
            }
    };

componentDidMount(){
const token = sessionStorage.getItem('token');
if(!token){
    toastr.warning('YOU ARE NOT SIGNED IN');
        this.props.history.push('/login');
}else if (token){

        const queryId=this.props.match.params.id;
        console.log(this.props, queryId)

    fetch('https://s-i-api.herokuapp.com/api/v1/map?ordCk='+queryId,{
                method:"GET",
                headers:{ 
                Authorization : token
                }

} ).then(res=>{
    return res.json();
}).then(data=>{
    const pickup_address = data[0].pickup_address;
    const c_location = data[0].c_location;
    const pickupData = {
                field: 'pickup_address',
                val: pickup_address
    };
    const cLocationData = {
        field: 'c_location',
        val: c_location
};
    console.log(pickupData, cLocationData)
        geocode(pickupData, this);
        geocode(cLocationData, this);
    console.log(this.state)



})

}


}



handleMarkerClick= (props, marker, e) =>{ 
    const dataCopy = {...this.state.data};
        dataCopy.accessories.selectedPlace = props;
        dataCopy.accessories.activeMarker = marker;
        dataCopy.accessories.showingInfoWindow = true;
        this.setState({
            data: dataCopy
        })
}


handleInfoClose=()=>{
   const copyData = {...this.state.data};
   if(this.state.data.accessories.showingInfoWindow){
    copyData.accessories.showingInfoWindow = false;
    copyData.accessories.activeMarker = null;
    this.setState({
                data: copyData
    })

   } 
}


  render() {
    return (
        <div>
            <h4>WAREHOUSE,  PICKUP ADDRESS, DESTINATION ADDRESS</h4>
            <Map style={mapStyles} 
            google={this.props.google}
            initialCenter={{lat: this.state.data.init_conditions.lat,
            lng: this.state.data.init_conditions.lng}}
            zoom={this.state.data.init_conditions.zoom}>
                <Marker onClick={this.handleMarkerClick} name={'PAKAGE WAREHOUSE'} />
                <InfoWindow marker={this.state.data.accessories.activeMarker}
                visible={this.state.data.accessories.showingInfoWindow} onClose={this.handleInfoClose} >
                        <div>{this.state.data.accessories.selectedPlace.name}</div>
                </InfoWindow>
            </Map>
            </div>

    )
  }
}

export default GoogleApiWrapper({
            apiKey: 'AIzaSyDoduk96MV36i6RJFgvo80FqZTFBZj2k1M'
        })(orderMap)
