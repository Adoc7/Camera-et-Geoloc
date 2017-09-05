import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera,CameraOptions } from '@ionic-native/camera';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    // public base64Image: string;
    html;

    constructor(public navCtrl: NavController, private geolocation: Geolocation, private camera: Camera) {
    }

    ////////////////////////////////////////////////
// Ales mediatheUE : LAT : 44.133333 LONG : 4.083333

//   load(){
//     // get current position
//     this.geolocation.getCurrentPosition().then((resp) => {
//       console.log('lat:'+resp.coords.latitude +',lon:'+resp.coords.longitude);
//     });
//     //to stop watchiong
//   }
// }
    /////////////////////////////////////////////
    distance(lat1, lon1, lat2, lon2, unit) {
        this.geolocation.getCurrentPosition().then((resp) => {
// variables de ma position
            let lat1 = resp.coords.latitude
            let lon1 = resp.coords.longitude
            //varibles de la position de la mediatheque
            let lat2 = 44.133333
            let lon2 = 4.083333

            // calcul pour transformer en km et m
            let radlat1 = Math.PI * lat1 / 180
            let radlat2 = Math.PI * lat2 / 180
            let theta = lon1 - lon2
            let radtheta = Math.PI * theta / 180
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist)
            dist = dist * 180 / Math.PI
            dist = dist * 60 * 1.1515
            if (unit == "K") {
                dist = dist * 1.609344
            }
            if (unit == "N") {
                dist = dist * 0.8684
            }
            // alert('vous vous situez à ' + dist.toFixed(3) + ' kilomètres de la médiathèque');
            this.html = 'vous vous situez à ' + dist.toFixed(3) + ' kilomètres de la médiathèque';

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

   takePicture() {

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            cameraDirection: this.camera.Direction.FRONT
        }
        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            alert('error')
        });
    }
}

