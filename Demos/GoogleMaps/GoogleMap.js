/*-------------------------------------------GoogleMap Library-------------------------------------------*/
var GoogleMap = function () {
    var This = this;
    var _latitude, _longitude, _zoom, _mapType, _targetId, _markerLatitude, _markerLongitude, _bounds, _infoWindow, map;
    var geoCollection = {
        "addresses": ['9419 Dorisann Ct, Saint Louis, MO', 'London, UK', 'Los Angeles', 'Dallas, TX'],
        "addressContent": [ '<div class="info_Content"><h3>My house</h3><a href="http://msn.com"><p>My house is awesome.</p></a></div>',
                            'div class="info_Content"><h3>London Eye</h3><p>The London Eye is a giant Ferris wheel situates on the banks of the river Thames.</p></div>',
                            '<div class="info_Content"><h3>LA</h3><p>Los Angeles.</p></div>',
                            '<div class="info_Content"><h3>Dallas</h3><p>Dallas, TX.</p></div>'
                          ]
    };    

    this.Config = function (config) {
        if (config) {
            if (config.lat) _latitude = config.lat;
            if (config.lng) _longitude = config.lng;
            if (config.zoom) _zoom = parseInt(config.zoom);
            if (config.mapType) _mapType = config.mapType;
            if (config.target) _targetId = config.target;
        }
        return this;
    }

    this.Latitude = function (val) {
        if (val === undefined) return _latitude;
        else {
            _latitude = val;
            return this;
        }
    };

    this.Longitude = function (val) {
        if (val === undefined) return _longitude;
        else {
            _longitude = val;
            return this;
        }
    };

    this.Zoom = function (val) {
        if (val === undefined) return _zoom;
        else {
            _zoom = parseInt(val);
            return this;
        }
    };

    this.MapType = function (val) {
        if (val === undefined) return _mapType;
        else {
            _mapType = val;
            return this;
        }
    };

    this.MapTypes = function () {
        return ["ROADMAP", "TERRAIN", "SATELLITE", "HYBRID"];
    };

    this.TargetId = function (val) {
        if (val === undefined) return _targetId;
        else {
            _targetId = val;
            return this;
        }
    };

    this.GenerateMapFromAddress = function (userAddress, markerAddresses, infoWindowContent) {
        var baseGeoCodeServiceUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        var userAddressPlusSeparated = userAddress.split(" ").join("+");
        var url = baseGeoCodeServiceUrl + userAddressPlusSeparated;
        console.log(url);
        $.ajax(url)
            .then(function (data) {
            if (data.results[0].geometry.location.lat) _latitude = data.results[0].geometry.location.lat;
            if (data.results[0].geometry.location.lng) _longitude = data.results[0].geometry.location.lng;
        })
            .then(function () {
            This.GenerateMap(markerAddresses, infoWindowContent);
        });
        return this;
    };

    this.GenerateMap = function (markerAddresses, infoWindowContent) {
        if (_latitude && _longitude && _mapType && _targetId) {
            //Default zoom to 10 if it's not set
            if (!_zoom) _zoom = 10;
            var mapProp = {
                center: new google.maps.LatLng(_latitude, _longitude),
                zoom: _zoom,
                mapTypeId: google.maps.MapTypeId[_mapType]
            };
            map = new google.maps.Map(document.getElementById(_targetId), mapProp);
			
            if(markerAddresses != undefined){
                markerAddresses.forEach(function(item, index){
                    if(infoWindowContent != undefined){
                        This.AddMarkerToMap(item, null, map, index, infoWindowContent)
                    } else {
            			This.AddMarkerToMap(item, null, map, index)
                    }
            	});
            }

        } else {
            if (!_latitude) alert("Please enter a latitude to perform the mapping.");
            if (!_longitude) alert("Please enter a longitude to perform the mapping.");
            if (!_mapType) alert("Please enter a map type to perform the mapping.");
            if (!_targetId) alert("Please enter a target element ID to perform the mapping.");
        }
        return this;
    };
    
    this.AddMarkerToMap = function(userAddress, markerOptions, map, index, infoWindowContent){
        var baseGeoCodeServiceUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        var userAddressPlusSeparated = userAddress.split(" ").join("+");
        var url = baseGeoCodeServiceUrl + userAddressPlusSeparated;
        $.ajax(url)
            .then(function (data) {
            if (data.results[0].geometry.location.lat) _markerLatitude = data.results[0].geometry.location.lat;
            if (data.results[0].geometry.location.lng) _markerLongitude = data.results[0].geometry.location.lng;
        })
            .then(function () {
            	var marker = (markerOptions != undefined) 
                ? new google.maps.Marker(markerOptions) 
                : new google.maps.Marker({ position: new google.maps.LatLng(_markerLatitude, _markerLongitude), title: userAddress, map: map });
            	if(infoWindowContent != undefined)
                    This.AddInfoWindowToMarker(infoWindowContent[index], marker, map)
        });
    }

    this.AddInfoWindowToMarker = function(displayContent, marker, map){
        var infoWindow = new google.maps.InfoWindow({
            content: displayContent
        });
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    }

    this.Update = {
        MapType: function (type) {
            if (map) {
                map.setMapTypeId(google.maps.MapTypeId[type]);
            }
        }
    };
};