function init() {
    var prefVals = getPrefVals();
    document.body.style.backgroundColor = prefVals.bgColor;
    document.body.style.color = prefVals.txtColor;

    bindMapClick();
    renderLocs();
}

function bindMapClick() {
    var map = getMap();
    map.addListener('click', function(mapsMouseEvent) {
        var elModal = document.querySelector('.modal');
        var pos = mapsMouseEvent.latLng.toJSON();
        elModal.querySelector('[name=coordsLoc]').value = pos.lat + 'Co' + pos.lng;
        elModal.hidden = false;

        // mapClicked(mapsMouseEvent);
        // renderLocs();
    });

}

function saveLocation(ev) {
    ev.preventDefault();
    var elTxtName = document.querySelector('[name=txtLoc]');
    if (!elTxtName || !elTxtName.value) return;
    var elHdnCoords = document.querySelector('[name=coordsLoc]');
    if (!elHdnCoords || !elHdnCoords.value) return;
    var coords = elHdnCoords.value.split('Co');
    if (!coords.length) return;
    var position = { lat: +coords[0], lng: +coords[1] };
    if (isNaN(position.lat) || isNaN(position.lng)) return;
    submitLocation(position, elTxtName.value);
    elTxtName.value = '';
    elHdnCoords.value = '';
    renderLocs();
    closeModal();
}


function renderLocs() {
    var favLocs = getFavLocs();

    var strHtmls = favLocs.map(loc => {
        var { lat, lng } = loc.position;
        return (`<tr onclick="showLocation(${lat},${lng})">
        <td>${loc.locName} </td>
        <td><button onclick="onDeleteLoc('${loc.id}')">❌ </button> </td>
        
        </tr>`)
    })
    var elContainer = document.querySelector('.locsContainer');
    elContainer.innerHTML = strHtmls.join('');
    pinLocations();
}

function onDeleteLoc(locId) {
    deleteLoc(locId);
    renderLocs();
}

function closeModal() {
    var elModal = document.querySelector('.modal');

    elModal.hidden = true;
}