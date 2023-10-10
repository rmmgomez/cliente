import "../node_modules/@arcgis/core/assets/esri/themes/light/main.css";
import "../styles.css";
import { GeolocationService } from "./geolocation-service";
import { MapService } from "./map-service";


const pAddress = document.getElementById("address");

async function showMap(): Promise<void> {
    const coords = await GeolocationService.getLocation();
    const mapService = MapService.createMapService(coords, "map");
    mapService.createMarker(coords, "red");

    const mapView = mapService.getMapView();

    mapView.on("click", event => {
        mapService.createMarker(event.mapPoint, "green");
        mapView.goTo({center: [event.mapPoint.longitude, event.mapPoint.latitude]});
    });

    mapService.getSearch().on("select-result", e => {
        pAddress.innerText = e.result.name;
        const coords = e.result.feature.geometry; 
        const lat: number = coords.get("latitude");
        const lng: number = coords.get("longitude");
        mapService.createMarker({latitude: lat, longitude: lng}, "green");
    });
} 

showMap();

