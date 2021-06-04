const LOCS_KEY = 'places-keeper';


var gMap;
var gFavLocations = getLocs();
var gMarkers;



function getMap() {
    return gMap;
}

function getLocs() {
    var locs = loadFromStorage(LOCS_KEY);
    if (!locs || !locs.length) {
        locs = [];
    }
    return locs;
}

function getMarkers() {
    var markers = gFavLocations.map(loc => {
        return new google.maps.Marker({
            position: { lat: loc.position.lat, lng: loc.position.lng },
            map: gMap,
            title: loc.locName
        });
    })
    return markers;
}



function getFavLocs() {
    return gFavLocations;
}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}

function initMap() {
    var elMap = document.querySelector('#map');
    var lat = 29.5264557;
    var lng = 34.9272782;
    var options = {
        center: { lat, lng },
        zoom: 16
    };

    gMap = new google.maps.Map(
        elMap,
        options
    );
    gMarkers = getMarkers();



}

function submitLocation(position, locName) {
    var id = makeId();
    gFavLocations.push({ id, position, locName });

    var newMarker = new google.maps.Marker({
        position,
        map: gMap,
        title: locName
    });
    gMarkers.push(newMarker);
    saveToStorage(LOCS_KEY, gFavLocations);


}

function deleteLoc(locId) {
    var locIdx = gFavLocations.findIndex(loc => loc.id === locId);
    if (locIdx === -1) return;
    gFavLocations.splice(locIdx, 1);
    gMarkers[locIdx].setMap(null);
    gMarkers.splice(locIdx, 1);
    saveToStorage(LOCS_KEY, gFavLocations);
}

function pinLocations() {
    gMarkers.forEach(marker => {
        marker.setMap(gMap);
    })
}


function mapReady() {

}

function showCurrLocation() {

    navigator.geolocation.getCurrentPosition(position => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        gMap.setCenter(new google.maps.LatLng(lat, lng));
        var currLoc = new google.maps.Marker({
            position: { lat, lng },
            map: gMap,
            title: 'Your location'
        });
    })
}

function showLocation(lat, lng) {
    gMap.setCenter(new google.maps.LatLng(lat, lng));
}