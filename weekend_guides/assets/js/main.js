var map;
var markers = []

function loadItems(items, map){

	markers = []
	items.forEach(function(thing) {
		console.log(thing.location)
		var marker = new google.maps.Marker({
			position: thing.location,
			map: map,
			icon: {
				url: 'https://i.imgur.com/hZwh7by.png',
				labelOrigin: new google.maps.Point(12, 13),
				scaledSize: new google.maps.Size(10,10)
			}
		});
		var infowindow = new google.maps.InfoWindow({
			content: "<div><h3 style='margin:0;'>" + thing.name + "</h3></div>"
		})
		marker.addListener('mouseover', function(){
			infowindow.open(map, marker)
		})
		marker.addListener('mouseout', function(){
			infowindow.close()
		})
		marker.addListener('click', function(){
			window.location.href = './'+ thing.folder + '/'
		})
		markers.push(marker)

		var city = '<a href="./' + thing.folder + '/"><div class="city"><div class="image" style="background-image: url(./' + thing.folder + '/images/thumbnail.jpg)"></div><h3>' + thing.name + '</h3></div></a>'
		$('#places').append(city)

		thing.itineraries.forEach(function(itinerary){
			var itin = '<a href="./itinerary#' + thing.folder + '/' + itinerary.id + '"><div class="itinerary"><h3>' + thing.name + ': ' + itinerary.name + '</h3><div class="image" style="background-image:url(./' + thing.folder + '/images/thumbnail.jpg)"></div></div></a>'
			$('#itineraries').append(itin)
		})

	});
}

function createMap(div, loc, zoom){
	return new google.maps.Map(document.getElementById(div), {
		center: loc,
		zoom: zoom ,
		styles: [{"featureType": "all","elementType": "geometry.fill","stylers": [{"weight": "2.00"}]},{"featureType": "all","elementType": "geometry.stroke","stylers": [{"color": "#9c9c9c"}]},{"featureType": "all","elementType": "labels.text","stylers": [{"visibility": "on"}]},{"featureType": "administrative","elementType": "geometry","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"visibility": "simplified"}]},{"featureType": "administrative","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "labels.text","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "labels.text.stroke","stylers": [{"visibility": "off"}]},{"featureType": "administrative.province","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "administrative.locality","elementType": "labels","stylers": [{"visibility": "on"}]},{"featureType": "administrative.neighborhood","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "administrative.land_parcel","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "landscape","elementType": "all","stylers": [{"color": "#f2f2f2"}]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{"color": "#ffffff"}]},{"featureType": "landscape","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "landscape.man_made","elementType": "geometry.fill","stylers": [{"color": "#ffffff"}]},{"featureType": "poi","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "poi","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "road","elementType": "all","stylers": [{"saturation": -100},{"lightness": 45}]},{"featureType": "road","elementType": "geometry.fill","stylers": [{"color": "#eeeeee"}]},{"featureType": "road","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#7b7b7b"}]},{"featureType": "road","elementType": "labels.text.stroke","stylers": [{"color": "#ffffff"}]},{"featureType": "road.highway","elementType": "all","stylers": [{"visibility": "simplified"}]},{"featureType": "road.arterial","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "transit","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "transit","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "water","elementType": "all","stylers": [{"color": "#7ACCC8"},{"visibility": "on"}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"color": "#7ACCC8"}]},{"featureType": "water","elementType": "geometry.stroke","stylers": [{"visibility": "simplified"}]},{"featureType": "water","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#070707"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#ffffff"}]}],
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false,
		zoomControl: false,
	});
}



$.ajax({
	dataType: "json",
	url: "./cities.json",
	success: function(data){
		map = createMap('map', {lat: 14, lng: 0}, 2)
		loadItems(data.cities, map)
	}, error: function(data){
	}
})