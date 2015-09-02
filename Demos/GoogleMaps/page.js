/*-------------------------------------------Page Code-------------------------------------------*/
var addresses = ['9419 Dorisann Ct, Saint Louis, MO', 'London, UK', 'Los Angeles', 'Dallas, TX'];
var addressContent = [
    '<div class="info_Content"><h3>My house</h3><a href="http://msn.com"><p>My house is awesome.</p></a></div>',
    '<div class="info_Content"><h3>London Eye</h3><p>The London Eye is a giant Ferris wheel situates on the banks of the river Thames.</p></div>',
    '<div class="info_Content"><h3>LA</h3><p>Los Angeles.</p></div>',
    '<div class="info_Content"><h3>Dallas</h3><p>Dallas, TX.</p></div>'
];
//Search by coordinates
$("#searchCoords").on('click', function () {
    var lat = $("#lat").val();
    var lng = $("#lng").val();
    var zoom = $("#zoom").val();
    map1 = new GoogleMap();
    //To configure with chained methods
    map1.Latitude(lat)
        .Longitude(lng)
        .Zoom(zoom)
        .MapType("ROADMAP")
        .TargetId("googleMap")
        .GenerateMap();
    
    //To configure with a predefined object
    //GoogleMap.Config({
    //    "lat":lat, 
    //    "lng": lng, 
    //    "zoom":zoom, 
    //    "mapType":"ROADMAP", 
    //    "targetId":"googleMap"
    //}).Generate();


});


//Search by converting address or name of location to coordinates
$("#searchAddress").on('click', function () {
    var userAddress = $("#address").val();
    var zoomZoom = $("#zoomLevel").val();
    map2 = new GoogleMap();
    map2.Config({
        "mapType": "ROADMAP",
        "target": "googleMaps"
    	})
        .Zoom(zoomZoom)
        .GenerateMapFromAddress(userAddress, addresses, addressContent);
});

//To show map type updates
//$("#googleMap").on('mouseover', function () {
//    if(map1 != undefined)
//        map1.Update.MapType("HYBRID");
//});

//$("#googleMap").on('mouseout', function () {
//    if(map1 != undefined)
//        map1.Update.MapType("ROADMAP");
//});

//$("#googleMaps").on('mouseover', function () {
//    if(map2 != undefined)
//        map2.Update.MapType("HYBRID");
//});

//$("#googleMaps").on('mouseout', function () {
//    if(map2 != undefined)
//        map2.Update.MapType("ROADMAP");
//});