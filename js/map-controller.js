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
        mapClicked(mapsMouseEvent);
        renderLocs();
    });

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