import {MyGeolocation} from "./my-geolocation.class";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import esriConfig from "@arcgis/core/config";
import Search from "@arcgis/core/widgets/Search";

import "../node_modules/@arcgis/core/assets/esri/themes/light/main.css";
import "../styles.css";

const pAddress = document.getElementById("address");
let map;
let view;

esriConfig.apiKey = "AAPKc2940b004f38491b869000328dd73685GNKiJxJwOBscpCvz9Pxpae-LVDdvsqr_p6VDTqAas1Kj7idPwcMZqSc-fuDAY91R";

async function showMap() {
    const coords = await MyGeolocation.getGeolocation();
    map = new Map({ basemap: "osm-streets-relief"});
    view = new MapView({
        map: map,
        center: [coords.longitude, coords.latitude], // Longitude, latitude
        zoom: 15, // Zoom level
        container: "map" // Div element (id)
    });

    createMarker(coords.latitude, coords.longitude, "red");

    view.on("click", event => {
        createMarker(event.mapPoint.latitude, event.mapPoint.longitude, "green");
        view.goTo({center: [event.mapPoint.longitude, event.mapPoint.latitude]});
    });

    const search = new Search({  //Add Search widget
        view: view,
        popupEnabled: false
    });
    view.ui.add(search, "top-right");
    search.on("select-result", e => {
        pAddress.innerText = e.result.name;
        const coords = e.result.target.geometry.centroid; 
        createMarker(coords.latitude, coords.longitude, "red");
    });
} 

function createMarker(lat, long, color) {
    // Create a graphic and add the geometry and symbol to it
    const pointGraphic = new Graphic({
        geometry: {
            type: "point", // autocasts as new Point()
            longitude: long,
            latitude: lat
        },
        symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: color
        }
    });

    // Add the graphics to the view's graphics layer
    view.graphics.add(pointGraphic);
}

showMap();

