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
		gestureHandling: 'greedy',
		zoomControl: false,
	});
}

function addMarker(item, map){
	var marker = new google.maps.Marker({
		position: item.location,
		map: map,
		label: {
			text: item.label,
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
		content: "<div><h3 style='margin:0;'>" + item.name + "</h3></div>"
	})
	marker.addListener('mouseover', function(){
		infowindow.open(map, marker)
	})
	marker.addListener('mouseout', function(){
		infowindow.close()
	})
	return [marker, infowindow]
}

function registerHandler(element, map, marker){
	$(element).on('mouseover', function(){
		marker[1].open(map, marker[0])
	})
	$(element).on('mouseout', function(){
		marker[1].close(map, marker[0])
	})
	$(element).on('click', function(){
		p = marker[0].getPosition()
		map.setCenter(p)
		map.setZoom(map_data.zoom+1)
	})
}

function loadSight(item, map, marker){

	sight = $.parseHTML('<div class="item"><div class="label_section"><div class="label">' + item.label + '</div><div class="line"></div></div><div class="info"><h2>' + item.name +'</h2><h3>' + item.type.charAt(0).toUpperCase() + item.type.slice(1) + '</h3><p>Cost: ' + item.cost + ', Time Spent: ' + item.time + '</p><p>' + item.description + '</p><a href="' + item.link + '">' + item.link_text + '</a></div><div class="picture" style="background-image: url(../' + location_name + '/' + item.image + ')"></div></div>')
	
	registerHandler(sight, map, marker)

	$('#content').append(sight)
}

function loadFood(item, map, marker){

	sight = $.parseHTML('<div class="item"><div class="label_section"><div class="label">' + item.label + '</div><div class="line"></div></div><div class="info"><h2>' + item.name +'</h2><h3>' + item.type.charAt(0).toUpperCase() + item.type.slice(1) + '</h3><p>Cost: ' + item.cost + '</p><p>' + item.description + '</p><a href="' + item.link + '">' + item.link_text + '</a></div><div class="picture" style="background-image: url(../' + location_name + '/' + item.image + ')"></div></div>')

	registerHandler(sight, map, marker)

	$('#content').append(sight)
}

function loadTransportation(item){
	icons = {drive: 'directions_car', bus: 'directions_bus', train: 'train', walk: 'directions_walk'}

	content_string = '<div class="item item_icon"><div class="label_section"><div class="label_icon"><i class="material-icons">' + icons[item.type] + '</i></div><div class="line"></div></div><div class="info"> <h4>' + item.duration + '</h4></div></div>'
	$('#content').append(content_string)
}

function setStyles(styles){
	s = "<style>#items #content .item .label_section .label{background-color: {{color}};} #items #content .item .label_section .label_icon{color: {{color}};} #items #content .item .label_section .line{border-color: {{color}};} </style>".replace(/{{color}}/g, styles.highlight)
	$('head').append(s)
}

function loadInformation(data){
	setStyles(data.styles)
	var itinerary_data = data.itineraries[itinerary]

	$('title').text(data.location + ' - ' + itinerary_data.name)
	$('#title').text(data.location)
	$('#subtitle').text(itinerary_data.name)
	
	map_data = data.map
	console.log(map_data)

	zoom = map_data.zoom

	if ("zoom" in itinerary_data){
		zoom = itinerary_data[zoom]
	}

	var map = createMap("map", map_data.location, zoom, map_data.styles)
	var markers = []

	var lat_sum = 0;
	var lng_sum = 0;
	var i = 0;


	itinerary_data.itinerary.forEach(function(item){
		console.log(item)
		if (item.type == "sight") {
			m = addMarker(item, map)
			markers.push(m)
			lat_sum += item.location.lat
			lng_sum += item.location.lng
			loadSight(item, map, m)
		} else if (item.type == "food") {
			m = addMarker(item, map)
			markers.push(m)
			lat_sum += item.location.lat
			lng_sum += item.location.lng
			loadFood(item, map, m)
		} else if (item.type == "drive", "bus", "train", "walk") {
			loadTransportation(item)
		}

		if (i == itinerary_data.itinerary.length-1){
			map.setCenter(new google.maps.LatLng(lat_sum/markers.length, lng_sum/markers.length))
		}
        
        i+=1
	})

}

var hash = window.location.hash.substring(1)
var location_name = hash.substring(0, hash.indexOf('/'))
var itinerary = hash.substring(hash.indexOf('/')+1)
console.log()
$.ajax({
	dataType: "json",
	url: "../" + location_name +"/itinerary.json",
	success: function(data){
		console.log(data)
		loadInformation(data)
	},
	error: function(e){
		console.log(e)
	}
});
