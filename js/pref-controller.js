'use strict'

function initPage() {
    var prefVals = getPrefVals();
    document.body.style.backgroundColor = prefVals.bgColor;
    document.body.style.color = prefVals.txtColor;

    var elBgColor = document.querySelector('[name=prefColorBg]');
    var elTxtColor = document.querySelector('[name=prefColorTxt]');

    elBgColor.value = prefVals.bgColor;
    elTxtColor.value = prefVals.txtColor;

    var elBirthDate = document.querySelector('[name=birthDate]');
    elBirthDate.value = formatDate(prefVals.birthDate);

    var elUserEmail = document.querySelector('[name=userEmail]');
    elUserEmail.value = prefVals.email;

    var elUserAge = document.querySelector('[name=userAge]');

    elUserAge.value = prefVals.age;
    showAge(elUserAge.value);
}


function formatDate(birthDate) {
    var date = new Date(birthDate);
    var years = date.getFullYear();
    var months = date.getMonth();
    var days = date.getDay();
    var timeFormat = years + '-' + (months + '').padStart(2, '0') + '-' + (days + '').padStart(2, '0')
    return timeFormat;
}

function showAge(newVal) {
    document.querySelector(".sAge").innerText = newVal;
}

function submitPrefs(ev) {
    ev.preventDefault();

    var elBgColor = document.querySelector('[name=prefColorBg]');
    var elTxtColor = document.querySelector('[name=prefColorTxt]');
    if (!elBgColor.value || !elTxtColor.value) return;

    var elBirthDate = document.querySelector('[name=birthDate]');
    var birthDate = Date.parse(elBirthDate.value)

    var elUserEmail = document.querySelector('[name=userEmail]');

    if (!elUserEmail.value) return;

    var elUserAge = document.querySelector('[name=userAge]');


    var prefVals = getPrefVals();

    if (prefVals.age) {
        var currYear = new Date(prefVals.birthDate).getFullYear();
        var IsAgeValid = isValidAge(currYear, +elUserAge.value);
        // if (!IsAgeValid) {
        //     elUserAge.setCustomValidity('Wrong age!');
        // } else elUserAge.setCustomValidity('');
    }

    savePrefs(elBgColor.value, elTxtColor.value, birthDate, elUserEmail.value, +elUserAge.value);

}

function isValidAge(currYear, age) {
    var realAge = new Date().getFullYear() - currYear;
    console.log(realAge + ' ' + age);
    return realAge === age;
}

function changeBgColor(bgColor) {
    document.body.style.backgroundColor = bgColor;
}

function changeTxtColor(txtColor) {
    document.body.style.color = txtColor;
}