function init() {
    var prefVals = getPrefVals();
    document.body.style.backgroundColor = prefVals.bgColor;
    document.body.style.color = prefVals.txtColor;
    displayAstrologicalForecast();

}


function displayAstrologicalForecast() {
    var forecasts = ['"You are going to experience some massive movement in areas of your life that once felt locked into place."',
        '"This is a time for taking care of your possessions and personal belongings"',
        '"At this time you are likely to speak out and let your voice be heard on matters you have been considering or mulling over for some time"'
    ];
    var randIdx = Math.floor(Math.random() * forecasts.length);
    document.querySelector('.forecast').innerText = forecasts[randIdx];

}