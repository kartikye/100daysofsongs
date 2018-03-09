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
		console.log(p)
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

function loadInformation(data){
	var itinerary_data = data.itineraries[itinerary]

	$('title').text(data.location + ' - ' + itinerary_data.name)
	$('#title').text(data.location)
	$('#subtitle').text(itinerary_data.name)

	map_data = data.map
	console.log(map_data)
	var map = createMap("map", map_data.location, map_data.zoom, map_data.styles)
	var markers = []

	itinerary_data.itinerary.forEach(function(item){
		console.log(item)
		if (item.type == "sight") {
			m = addMarker(item, map)
			markers.push(m)
			loadSight(item, map, m)
		} else if (item.type == "food") {
			m = addMarker(item, map)
			markers.push(m)
			loadFood(item, map, m)
		} else if (item.type == "drive", "bus", "train", "walk") {
			loadTransportation(item)
		}
	})	
}

var hash = window.location.hash.substring(1)
var location_name = hash.substring(0, hash.indexOf('/'))
var itinerary = hash.substring(hash.indexOf('/')+1)

$.ajax({
	dataType: "json",
	url: "../" + location_name +"/itinerary.json",
	success: function(data){
		loadInformation(data)
	},
	error: function(e){
	console.log("HUKLLO")
  		loadInformation({
	"location": "San Francisco",
	"itineraries": {
		"mission": {
			"name": "The Mission District",
			"itinerary": [
				{
					"name": "Mission Dolores Park",
					"location": {
						"lat": 37.7596168,
						"lng": -122.42690379999999
					},
					"label": "A",
					"type": "sight",
					"cost": "Free",
					"time": "1.5 hours",
					"description": "Bustling park where people gather for picincs and relaxation.",
					"link": "http://sfrecpark.org/destination/mission-dolores-park/",
					"link_text": "sfrecpark.org",
					"image": ""
				},
				{
					"type": "walk",
					"duration": "19 minute walk"
				},
				{
					"name": "Taquería El Farolito",
					"location": {
						"lat": 37.752654782767,
						"lng": -122.41819202899933
					},
					"label": "B",
					"type": "food",
					"cost": "$$",
					"description": "Busy Mexican restaurant serving comfort food.",
					"link": "http://places.singleplatform.com/el-farolito-3/menu?ref=google",
					"link_text": "Menu",
					"image": ""
				},
				{
					"name": "Mission District Murals",
					"location": {
						"lat": 37.752420993840076,
						"lng": -122.41570642570304
					},
					"label": "C",
					"type": "sight",
					"cost": "Free",
					"time": "1.5 hours",
					"description": "A multitude of everchanging murals located in the Mission.",
					"link": "",
					"link_text": "",
					"image": ""
				},
				{
					"name": "Foreign Cinema Restaurant",
					"location": {
						"lat": 37.752420993840076,
						"lng": -122.41570642570304
					},
					"label": "D",
					"type": "food",
					"cost": "$$$",
					"description": "Californian-Mediterranean food in an outdoor space screening films.",
					"link": "Website",
					"link_text": "foreigncinema.com",
					"image": ""
				},
				{
					"name": "Bi Rite Creamery",
					"location": {
						"lat": 37.76158999999999,
						"lng": -122.42571700000002
					},
					"label": "E",
					"type": "food",
					"cost": "$",
					"description": "Homemade organic ice cream with often long lines.",
					"link": "Website",
					"link_text": "biritecreamery.com",
					"image": ""
				},
				{
					"name": "Twin Peaks",
					"location": {
						"lat": 37.7544066,
						"lng": -122.44768449999998
					},
					"label": "G",
					"type": "sight",
					"cost": "Free",
					"time": "30 minutes",
					"description": "An amazing, 180 degree view of the Bay Area.",
					"link": "",
					"link_text": "",
					"image": ""
				}
			]
		}
	},
	"map": {
		"location": {
			"lat": 37.75777584134365,
			"lng": -122.4341467629751
		},
		"zoom": 13,
		"styles": [
			{
				"elementType": "labels",
				"stylers": [
			  		{
						"color": "#f3f3f3"
			  		}
				]
		  	},
		  	{
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#949494"
				  	},
				  	{
						"weight": 2.5
				  	}
				]
		  	},
		  	{
				"featureType": "administrative",
				"elementType": "geometry",
				"stylers": [
				  	{
						"visibility": "off"
				  	}
				]
			},
			{
				"featureType": "administrative.land_parcel",
				"elementType": "labels",
				"stylers": [
			  		{
						"visibility": "off"
			  		}
				]
		  	},
		  	{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
			  		{
						"color": "#ff766d"
			  		}
				]
		  	},
		  	{
				"featureType": "poi",
				"stylers": [
			  		{
						"visibility": "off"
			  		}
				]
		  	},
		  	{
				"featureType": "poi",
				"elementType": "labels.text",
				"stylers": [
			  		{
						"visibility": "off"
			  		}
				]
		  	},
		  	{
				"featureType": "road",
				"elementType": "geometry.fill",
				"stylers": [
			  		{
						"color": "#ffffff"
			  		}
				]
		  	},
		  	{
				"featureType": "road",
				"elementType": "geometry.stroke",
				"stylers": [
			  		{
						"color": "#ffffff"
			  		},
			  		{
						"weight": 0.5
			  		}
				]
		  	},
		  	{
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [
				  	{
						"visibility": "off"
				  	}
				]
		  	},
		  	{
				"featureType": "road.arterial",
				"elementType": "labels",
				"stylers": [
			  		{
						"visibility": "off"
			  		}
				]
		  	},
		  	{
				"featureType": "road.highway",
				"elementType": "labels",
				"stylers": [
				  	{
						"visibility": "off"
				  	}
				]
		  	},
		  	{
				"featureType": "road.local",
				"stylers": [
				  	{
						"visibility": "off"
				  	}
				]
		  	},
		  	{
				"featureType": "road.local",
				"elementType": "labels",
				"stylers": [
				  	{
						"visibility": "off"
				  	}
				]
		  	},
		  	{
				"featureType": "transit",
				"stylers": [
				  	{
						"visibility": "off"
				  	}
				]
		  	},
		  	{
				"featureType": "water",
				"stylers": [
				  	{
						"color": "#54dede"
				  	}
				]
		  }
		]
	}
})
  	}
});






//[{"elementType":"labels","stylers":[{"color":"#f3f3f3"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#949494"},{"weight":2.5}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#ff766d"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"weight":0.5}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#54dede"}]}]