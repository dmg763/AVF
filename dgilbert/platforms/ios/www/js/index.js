/* Denise M. Gilbert
 AVF Term 1308
 index.js Page*/

// GLOBAL VARIABLES

var lat,
    lng,
    db,
    dbresults,
    itemindex;

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

// DEVICE READY

document.addEventListener('deviceready', onDeviceReady, false);

// NATIVE FEATURE FUNCTIONS

function onDeviceReady() {
    $("#navGeolocation").on("click", accessGeolocation);
};

// CAMERA

var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.FILE_URI });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      console.log('Failed because: ' + message);
    }


// GEOLOCATION

function accessGeolocation () {
    navigator.geolocation.getCurrentPosition(onSuccess, onGeoError);
};

    // onSuccess Geolocation

    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
        
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        
        var currentposition = new google.maps.LatLng(lat, lng);
			
			var mapoptions = {
				zoom: 12,
				center: currentposition,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var map = new google.maps.Map(document.getElementById("map"), mapoptions);
			

			var marker = new google.maps.Marker({
					position: currentposition,
					map: map
			});
    }

// ERROR GEOLOCATION

function onGeoError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

// ERROR CAMERA

function onFail(message) {
      alert('Failed because: ' + message);
    }

// INSTAGRAM
$('#instagram').on('pageinit', function() {

    $('#instagram').css({
        backgroundColor: "#C1B298"
    });

    var screenOutput = function(info) {

        console.log(info);

        $.each(info.data, function(index, photo) {

            var pic = "<li class='instaPics'><img src='" + photo.images.standard_resolution.url + "'alt='" + photo.user.id + "' />" + "<h3 class='instaTitles'>" + photo.user.full_name + "&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;♥ " + photo.likes.count + " ♥</h3>" + "</li>";

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

        $.each(info.response.groups, function(index, group) {

               
            $.each(group.items, function(index, item) {
                      
            var popularPlaces = "<li><h4>" + item.venue.name + "<h5>" + '<a href=' + item.venue.url + '"/a>"' + "</h5></h4></li>";

                $("#fourSquare-output").append(popularPlaces);
                });
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
