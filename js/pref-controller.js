'use strict'

function initPage() {
    var prefVals = getPrefVals();
    document.body.style.backgroundColor = prefVals.bgColor;
    document.body.style.color = prefVals.txtColor;

    var elBgColor = document.querySelector('[name=prefColorBg]');
    var elTxtColor = document.querySelector('[name=prefColorTxt]');

    if (prefVals.bgColor && prefVals.txtColor) {
        elBgColor.value = prefVals.bgColor;
        elTxtColor.value = prefVals.txtColor;
    }

    var elBirthDate = document.querySelector('[name=birthDate]');
    elBirthDate.value = formatDate(prefVals.birthDate);

    var elUserEmail = document.querySelector('[name=userEmail]');
    elUserEmail.value = (prefVals.email) ? prefVals.email : '';

    var elUserAge = document.querySelector('[name=userAge]');

    elUserAge.value = prefVals.age;
    showAge(elUserAge);
}


function formatDate(birthDate) {
    var date = new Date(birthDate);
    var years = date.getFullYear();
    var months = date.getMonth() + 1;
    var days = date.getDate();
    if (!birthDate) {
        var today = new Date();
        years = today.getFullYear();
        months = today.getMonth() + 1;
        days = today.getDate();
    }
    var timeFormat = years + '-' + (months + '').padStart(2, '0') + '-' + (days + '').padStart(2, '0');
    return timeFormat;
}

function showAge(elUserAge) {
    if (elUserAge && elUserAge.value) {
        var newVal = elUserAge.value;
        document.querySelector(".sAge").innerText = newVal;
        var prefVals = getPrefVals();

        if (prefVals.age) {
            var birthYear = new Date(prefVals.birthDate).getFullYear();
            var IsAgeValid = isValidAge(birthYear, +newVal);
            if (!IsAgeValid) {
                elUserAge.setCustomValidity('Wrong age!');
            } else {
                elUserAge.setCustomValidity('');
            }

        }
    }
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
        var birthYear = new Date(prefVals.birthDate).getFullYear();
        var IsAgeValid = isValidAge(birthYear, +elUserAge.value);
        if (!IsAgeValid) {
            elUserAge.setCustomValidity('Wrong age!');
            return;
        }
        savePrefs(elBgColor.value, elTxtColor.value, birthDate, elUserEmail.value, +elUserAge.value);
        var elModal = document.querySelector('.modal');
        elModal.hidden = false

    }



}
//Shallow validation
function isValidAge(birthYear, age) {
    var realAge = new Date().getFullYear() - birthYear;
    return realAge === age;
}

function changeBgColor(bgColor) {
    document.body.style.backgroundColor = bgColor;
}

function changeTxtColor(txtColor) {
    document.body.style.color = txtColor;
}


function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.hidden = true;
}