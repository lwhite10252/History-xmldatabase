// declare variables
var baseballObject;
var charsAllowed = "0123456789";

//filter data entry on alphanumeric fields
function editTextbox(e) {
    var key = e.which;
    if (!nCharOK(key)) {
        return false;
    } else {
        return true;
    }
}

//filter the textbox entry to see that all characters are acceptable
function nCharOK(c) {
    var ch = (String.fromCharCode(c));
    if (charsAllowed.indexOf(ch) != -1) {
        return true;
    } else {
        return false;
    }
}

//limits the amount of characters that the use can type in the box
function charLimit(limitField, limitNum) {
    if (limitField.value.length > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);
    }
}

//AJAX XMLHttpRequest to get the JSON from the site defined by url
function getJSON(url) {
    var resp;
    var xmlHttp;

    resp = "";
    xmlHttp = new XMLHttpRequest();

    if (xmlHttp !== null) {
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        resp = xmlHttp.responseText;
    }
    return resp;
}

//after validation, show the game stats for the date entered
//onload event handler creates cusotm URL
function getStats() {
    var day = $gel("txtDay").value;
    var month = $gel("txtMonth").value;
    var year = $gel("txtYear").value;

    //define the url to grab info from
    var tempURL = "http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json";
    var baseballJson = getJSON("http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json");

    //to build divs within the container
    var container = $gel("container");
    container.innerHTML = "";

    var baseballObject = JSON.parse(baseballJson);

    //if date entered is invalid, display pop-up message
    if (typeof baseballObject.data.games.game == 'undefined') {
        container.innerHTML += "<p><div class='arrayDiv' align='center'>No games stats were found for this date</div></p>";
    } else {
        //if date entered is valid, go through JSON data and find the games played
        for (var i = 0; i < baseballObject.data.games.game.length; i++) {
            //variables used to loop through the array to find the home team information
            var homeCity = [baseballObject.data.games.game[i].home_team_city];
            var homeTeam = [baseballObject.data.games.game[i].home_team_name];
            var homeWin = [baseballObject.data.games.game[i].linescore.r.home];

            //variables used to loop through the array to find the away team information
            var awayCity = [baseballObject.data.games.game[i].away_team_city];
            var awayTeam = [baseballObject.data.games.game[i].away_team_name];
            var awayWin = [baseballObject.data.games.game[i].linescore.r.away];

            //variables for other game info
            var location = [baseballObject.data.games.game[i].location];
            var time = [baseballObject.data.games.game[i].time];
            var timeZone = [baseballObject.data.games.game[i].time_zone];

            //modify some output so that it actually says the city name
            if (homeCity == "NY Mets") {
                homeCity = "New York";
            }
            if (homeCity == "Chi Cubs") {
                homeCity = "Chicago";
            }
            if (homeCity == "LA Dodgers") {
                homeCity = "Los Angeles";
            }
            if (homeCity == "LA Angels") {
                homeCity = "Los Angeles";
            }
            if (homeCity == "NY Yankees") {
                homeCity = "New York";
            }
            if (homeCity == "Chi White Sox") {
                homeCity = "Chicago";
            }

            if (awayCity == "NY Mets") {
                awayCity = "New York";
            }
            if (awayCity == "Chi Cubs") {
                awayCity = "Chicago";
            }
            if (awayCity == "LA Dodgers") {
                awayCity = "Los Angeles";
            }
            if (awayCity == "LA Angels") {
                awayCity = "Los Angeles";
            }
            if (awayCity == "NY Yankees") {
                awayCity = "New York";
            }
            if (awayCity == "Chi White Sox") {
                awayCity = "Chicago";
            }

            //output for each game
            container.innerHTML += "<div class='arrayDivHeader'>" + location + ", " + time + " " + timeZone + "</div><div class='arrayDiv' align='center'>Away team: " 
                + awayCity + " " + awayTeam + " (" + awayWin + ")<br/><label style='color:red; text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;'>=VS=</label><br/>Home team: "
                + homeCity + " " + homeTeam + " (" + homeWin + ")</div><p></p>";
        }
    }
}

//document.getElementById wrapper
function $gel(id) {
    return document.getElementById(id);
}