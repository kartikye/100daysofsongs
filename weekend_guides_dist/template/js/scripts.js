var map;
var things_to_see = [
	{label: '', name: '', position: {lat: , lng: }},
]

var things_to_eat = [
	{label: '', name: '', position: {lat: , lng: }},
]

var markers = []

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

function createMap(div, loc, zoom){
	return new google.maps.Map(document.getElementById(div), {
		center: loc,
		zoom: zoom ,
		styles: [], 
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false,
		zoomControl: false,
	});
}

function initMap() {
	map = createMap('map', {lat: , lng: }, )

	loadItems(things_to_see, map)
	loadItems(things_to_eat, map)
}

function loadItin(data){
	Object.entries(data.itineraries).forEach(function(thing){
		content_string = '<a href="../itinerary#/' + thing[0] +'"><div class="itinerary"><img src="./'+ thing[1].itinerary[0].image + '"><h2>' + thing[1].name + '</h2></div></a>'
		$('#itineraries').append(content_string)
	})
}

$.ajax({
	dataType: "json",
	url: "./itinerary.json",
	success: function(data){
		loadItin(data)
	}, error: function(data){
	}
})

$(window).on('scroll', function() {
	var window_top = $(window).scrollTop();
	var div_top = $('#map_anchor').offset().top;
	var stop_top = $('#test').offset().top - $('#map_section').height();
	if (window_top > stop_top) {
		$('#map_section').css({top: stop_top - window_top + 'px'});
	}
});