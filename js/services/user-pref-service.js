const KEY = 'user-data';
var gPrefValMap = _getPrefs();



function getPrefVals() {
    return gPrefValMap;
}


function savePrefs(bgColor, txtColor, birthDate, email, age) {
    gPrefValMap = {
        bgColor,
        txtColor,
        birthDate,
        email,
        age
    };
    saveToStorage(KEY, gPrefValMap);
}



function _getPrefs() {
    var prefValMap = loadFromStorage(KEY);
    if (!prefValMap) {
        prefValMap = {}
    }
    return prefValMap;
}