/* Denise M. Gilbert
 AVF Term 1308
 index.js Page*/

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// HOME PAGE
$('#home').on('pageinit', function() {
    $('#home').css({
        backgroundColor: "#581E59"
    });
});

// INSTAGRAM
$('#instagram').on('pageinit', function() {

    $('#instagram').css({
        backgroundColor: "#772B8C"
    });

    var screenOutput = function(info) {

        console.log(info);

        $.each(info.data, function(index, photo) {

            var pic = "<li class='instaPics'><img src='" + photo.images.standard_resolution.url + "'alt='" + photo.user.id + "' />" + "<h3 class='instaTitles'>" + photo.user.full_name + "<br>" + photo.likes.count + " Likes</h3>" + "</li>";

            $("#data-output").append(pic);
        });
    };

    $(function() {

        var tag1 = "Chicago",

        tag2 = "Bears",

        tag3 = "Football",

        url = "https://api.instagram.com/v1/tags/" + tag1 + tag2 + tag3 + "/media/recent?callback=?&amp;client_id=0fc4d14efc1a47b398687eed8dbc29dc&amp;min_id=20";

        $.getJSON(url, screenOutput);

    });
});

// FOURSQUARE
$('#fourSquare').on('pageinit', function() {

    $('#fourSquare').css({
        backgroundColor: "#FFFFFF"
    });

    var placesOutput = function(info) {

        console.log(info);

        $.each(info.response, function(index, respons) {

            var popularPlaces = "<li><h1>'" + respons + "'</h1></li>";
            //var pic = "<li><img src='" + photo.images.standard_resolution.url + "' alt='" + photo.user.id + "' /><h4> + photo.user.full_name + ", <em>(" + photo.user.username +")</em></h4></li>";
            $("#fourSquare-output").append(popularPlaces);
        });
    };

    $(function() {

        var url = "https://api.foursquare.com/v2/venues/explore?ll=44.30,37.20&near=Chicago, IL&client_id=TGZE1Y20FMUHMIMDTR5G3LTBUKT4NYSST3IEWCKCPOJAVLNI&client_secret=OPOSSLEYHH2ZR5G5I05PTCDQRP0FA24WHUDSZ0HLIYVFWT2O&v=20130814";

        $.getJSON(url, placesOutput);

    });
});

// ESPN
$('#espn').on('pageinit', function() {

    $('#espn').css({
        background: "#772B8C"
    });

    var espnOutput = function(info) {

        console.log(info);
              
        $.each(info.sports, function(index, sport) {
               $.each(sport.leagues, function(index, league) {
                      $.each(league.teams, function(index, team) {

            var teamInfo = "<li><h2>" + team.location + " " + team.name + "</h2></li>";
            
            $("#espn-output").append(teamInfo);
                        });
                });
        });
    };

    $(function() {

        var url = "http://api.espn.com/v1/sports/football/nfl/teams/?apikey=nbzjfhnvtjgxesuabgzwv363";

        $.getJSON(url, espnOutput);

    });
});

// RESEARCH PAGES

$('#weekOne').on('pageinit', function() {
              
    $('#weekOne').css({
        background: "#FFFFFF"
    });
});

$('#weekTwo').on('pageinit', function() {
                 
    $('#weekTwo').css({
        background: "#FFFFFF"
    });
});

$('#weekThree').on('pageinit', function() {
                 
    $('#weekThree').css({
        background: "#FFFFFF"
    });
});

$('#weekFour').on('pageinit', function() {
                 
    $('#weekFour').css({
        background: "#FFFFFF"
    });
});

// ORIENTATION CHANGE (PORTRAIT to LANDSCAPE)

function updateOrientation()
{
    switch(window.orientation)
    {
        case -90:
        case 90:
            alert('landscape');
            break;
        default:
            alert('portrait');
            break;
    }
}

document.addEventListener("orientationchange", updateOrientation);

// Initial execution if needed
updateOrientation();
