import Geocode from "react-geocode";
import toastr from '../notification/Toastr';



//CONVERTS ADDRESS TO LONGITUDE AND LATITUDE
//---RECEIVES OBJECT WITH ATTRIBUTE ADDRESS TYPE, VALUE ADDRESS
//---RECEIVES THE COMPONENT AND SET THE STATE WITH THE LNG AND LAT RESULT

const geocode = ({ field, val }, obj) => {

    Geocode.setApiKey('AIzaSyBv0sVayQdqOBhH48gWwnnJHMkMil3pCQg');
    Geocode.setLanguage('en');
    Geocode.enableDebug();

    Geocode.fromAddress(val).then(

        res => {
            const { lat, lng } = res.results[0].geometry.location;
            const dataCopy = { ...obj.state.data }
            dataCopy.order[field].lat = lat;
            dataCopy.order[field].lng = lng;
            obj.setState({
                data: dataCopy
            })
        },
        err => {
            toastr.info('WE COULD LOCATE ' + val + ' ON THE ROUTE NOW, CHECK BACK LATER');
            console.log(err)
        }

    );


}


export default geocode;

