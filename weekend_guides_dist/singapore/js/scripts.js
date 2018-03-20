var map;

var markers = []

var things_to_see = [
	{label: 'A', name: 'Orchard Road', position: {lat: 1.3017996, lng: 103.83779709999999}},
	{label: 'B', name: 'Marina Bay', position: {lat: 1.2877936, lng: 103.86655510000003}},
	{label: 'C', name: 'Gardens by the Bay', position: {lat: 1.2815683, lng: 103.86361320000003}},
	{label: 'D', name: 'Sentosa', position: {lat: 1.2494041, lng: 103.83032090000006}},
	{label: 'E', name: 'Night Safari', position: {lat: 1.4021872, lng: 103.7880606}}
]

var things_to_eat = []

function loadItems(items, map){
	markers.forEach(function(marker) {
		//marker.setMap(null)
	})
	markers = []
	items.forEach(function(thing) {
		var marker = new google.maps.Marker({
			position: thing.position,
			map: map,
			label: {
				text: thing.label,
				color: '#ff7665',
				fontSize: '13px',
				fontFamily: 'Proxima_Nova',
				fontWeight: '600'
			},
			icon: {
				url: 'https://i.imgur.com/q9kann7.png',
				labelOrigin: new google.maps.Point(12, 13)
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
		markers.push(marker)
	});
}

function createMap(div, loc, zoom, styles){
	return new google.maps.Map(document.getElementById(div), {
		center: loc,
		zoom: zoom ,
		styles: styles, 
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false,
		zoomControl: false,
	});
}

function initMap(data) {
	map = createMap('map', data.map.location, data.map.zoom, data.map.styles)

	loadItems(things_to_see, map)
	loadItems(things_to_eat, map)
}

function loadItin(data){
	Object.entries(data.itineraries).forEach(function(thing){
		content_string = '<a href="../itinerary#singapore/' + thing[0] +'"><div class="itinerary"><img src="./'+ thing[1].itinerary[0].image + '"><h2>' + thing[1].name + '</h2></div></a>'
		$('#itineraries').append(content_string)
	})
}



$.getJSON("./itinerary.json", {}, function(data){
		console.log(data)
		initMap(data)
		loadItin(data)
	}
)

$(window).on('scroll', function() {
	var window_top = $(window).scrollTop();
	var div_top = $('#map_anchor').offset().top;
	var stop_top = $('#itinerary-title').offset().top - $('#map_section').height();
	if (window_top > stop_top) {
		$('#map_section').css({top: stop_top - window_top + 'px'});
	}
});