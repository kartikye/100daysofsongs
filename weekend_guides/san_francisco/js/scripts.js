var map;
var things_to_see = [
	{label: 'A', name: 'Lands End', position: {lat: 37.779702, lng: -122.511589}},
	{label: 'B', name: 'Union Square', position: {lat: 37.787994, lng: -122.407437}},
	{label: 'C', name: 'The Mission', position: {lat: 37.759716 , lng: -122.419458}},
	{label: 'D', name: 'Twin Peaks', position: {lat:  37.754407, lng: -122.447684}},
]

var things_to_eat = [
	{label: 'E', name: 'Brenda\'s French Soul Food', position: {lat: 37.7829023, lng: -122.41903580000002}},
	{label: 'F', name: 'Ramen Yamadaya', position: {lat: 37.7860697, lng: -122.42970700000001}},
	{label: 'G', name: 'Nopalito', position: {lat: 37.7733608 , lng: -122.43898509999997}},
	{label: 'H', name: 'Yank Sing', position: {lat:  37.7924983, lng: -122.39313870000001}},
	{label: 'I', name: 'Taquería El Farolito', position: {lat: 37.752654, lng: -122.41819150000003}}
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
		styles: [{"elementType":"labels","stylers":[{"color":"#f3f3f3"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#949494"},{"weight":2.5}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#ff766d"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"weight":0.5}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#54dede"}]}],
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false,
		zoomControl: false,
	});
}

function initMap() {
	map = createMap('map', {lat: 37.773972, lng: -122.431297}, 12)

	loadItems(things_to_see, map)
	loadItems(things_to_eat, map)
}

function loadItin(data){
	Object.entries(data.itineraries).forEach(function(thing){
		content_string = '<a href="../itinerary#san_francisco/' + thing[0] +'"><div class="itinerary"><img src="./'+ thing[1].itinerary[0].image + '"><h2>' + thing[1].name + '</h2></div></a>'
		$('#itineraries').append(content_string)
	})
}

$.ajax({
	dataType: "json",
	url: "./itinerary.json",
	success: function(data){
		loadItin(data)
	}, error: function(data){
		loadItin({"location": "San Francisco","itineraries": {"downtown": {"name": "Downtown San Francisco","itinerary": [{"name": "Union Square","location": {"lat": 37.7879938,"lng": -122.40743739999999},"label": "A","type": "sight","cost": "Free","time": "30 minutes","description": "A great place to start a trip in SF, surrounded by department stores and hotels.","link": "","link_text": "","image": "images/union_square.jpg"},{"type": "walk","duration": "5 minute walk"},{"name": "Asha Tea House","location": {"lat": 37.78818,"lng": -122.40369599999997},"label": "B","type": "food","cost": "$","description": "A wonderful tea house with high quality drinks.","link": "https://www.ashateahouse.com/","link_text": "Website","image": "images/asha.jpg"},{"type": "walk","duration": "5 minute walk"},{"name": "SF Museum of Modern Art","location": {"lat": 37.7857182,"lng": -122.40105080000001},"label": "C","type": "sight","cost": "$25","time": "2 - 3 hours","description": "A modern art museum with a beautiful collection.","link": "Website","link_text": "https://www.sfmoma.org/","image": "images/sfmoma.jpg"},{"type": "walk","duration": "2 minute walk"},{"name": "Samovar Tea Lounge","location": {"lat": 37.78417,"lng": -122.40210139999999},"label": "D","type": "food","cost": "$$","description": "A large selection of tasty food paired with tea.","link": "https://www.samovartea.com/yerba-buena-gardens/","link_text": "Website","image": "images/samovar.jpg"},{"type": "train","duration": "17 minute train ride"},{"name": "San Francisco Ferry Building","location": {"lat": 37.7955169,"lng": -122.39347279999998},"label": "E","type": "sight","cost": "free","time": "30 minutes","description": "A historic ferry terminal with a variety of artisanal shops are restaurants.","link": "Website","link_text": "https://www.ferrybuildingmarketplace.com/","image": "images/ferry_building.jpg"},{"type": "walk","duration": "9 minute walk"},{"name": "Exploratorium","location": {"lat": 37.801542,"lng": -122.39748400000002},"label": "F","type": "sight","cost": "free","time": "2 hours","description": "A museum with hundreds of wonderful interactive exhibits for both adults and kids/","link": "Website","link_text": "www.exploratorium.edu","image": "images/exploratorium.jpg"},]},"mission": {"name": "The Mission District","itinerary": [{"name": "Mission Dolores Park","location": {"lat": 37.7596168,"lng": -122.42690379999999},"label": "A","type": "sight","cost": "Free","time": "1.5 hours","description": "Bustling park where people gather for picincs and relaxation.","link": "http://sfrecpark.org/destination/mission-dolores-park/","link_text": "sfrecpark.org","image": "images/mission_park.jpg"},{"type": "walk","duration": "19 minute walk"},{"name": "Taquería El Farolito","location": {"lat": 37.752654782767,"lng": -122.41819202899933},"label": "B","type": "food","cost": "$$","description": "Busy Mexican restaurant serving comfort food.","link": "http://places.singleplatform.com/el-farolito-3/menu?ref=google","link_text": "Menu","image": "images/el_farolito.jpg"},{"type": "walk","duration": "8 minute walk"},{"name": "Mission District Murals","location": {"lat": 37.752420993840076,"lng": -122.41570642570304},"label": "C","type": "sight","cost": "Free","time": "1.5 hours","description": "A multitude of everchanging murals located in the Mission.","link": "","link_text": "","image": "images/mission_murals.jpg"},{"type": "walk","duration": "14 minute walk"},{"name": "Foreign Cinema Restaurant","location": {"lat": 37.7564724,"lng": -122.41928239999999},"label": "D","type": "food","cost": "$$$","description": "Californian-Mediterranean food in an outdoor space screening films.","link": "Website","link_text": "foreigncinema.com","image": "images/foreign_cinema.jpg"},{"type": "walk","duration": "14 minute walk"},{"name": "Bi Rite Creamery","location": {"lat": 37.76158999999999,"lng": -122.42571700000002},"label": "E","type": "food","cost": "$","description": "Homemade organic ice cream with often long lines.","link": "Website","link_text": "biritecreamery.com","image": "images/bi_rite.jpg"},{"type": "drive","duration": "12 minute drive"},{"name": "Twin Peaks","location": {"lat": 37.7544066,"lng": -122.44768449999998},"label": "C","type": "sight","cost": "Free","time": "30 minutes","description": "An amazing, 180 degree view of the Bay Area.","link": "","link_text": "","image": "images/twin_peaks.jpg"}]}},"map": {"location": {"lat": 37.75777584134365,"lng": -122.4341467629751},"zoom": 13,"styles": [{"elementType": "labels","stylers": [ {"color": "#f3f3f3" }] }, {"elementType": "labels.text.stroke","stylers": [{"color": "#949494" }, {"weight": 2.5 }] }, {"featureType": "administrative","elementType": "geometry","stylers": [ {"visibility": "off" }]},{"featureType": "administrative.land_parcel","elementType": "labels","stylers": [ {"visibility": "off" }] }, {"featureType": "landscape","elementType": "geometry","stylers": [ {"color": "#ff766d" }] }, {"featureType": "poi","stylers": [ {"visibility": "off" }] }, {"featureType": "poi","elementType": "labels.text","stylers": [ {"visibility": "off" }] }, {"featureType": "road","elementType": "geometry.fill","stylers": [ {"color": "#ffffff" }] }, {"featureType": "road","elementType": "geometry.stroke","stylers": [ {"color": "#ffffff" }, {"weight": 0.5 }] }, {"featureType": "road","elementType": "labels.icon","stylers": [ {"visibility": "off" }] }, {"featureType": "road.arterial","elementType": "labels","stylers": [ {"visibility": "off" }] }, {"featureType": "road.highway","elementType": "labels","stylers": [ {"visibility": "off" }] }, {"featureType": "road.local","stylers": [ {"visibility": "off" }] }, {"featureType": "road.local","elementType": "labels","stylers": [ {"visibility": "off" }] }, {"featureType": "transit","stylers": [ {"visibility": "off" }] }, {"featureType": "water","stylers": [ {"color": "#54dede" }]  }]}})
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


$('<br><a href="javascript:void(0);" class="show-more">Information</a>').insertBefore('address')
$('address').append('<br><a href="javascript:void(0);" class="show-less">Hide</a>')
$('address').hide()

$('.show-more').on('click', function(){
	 var $this = $(this)
	 $(this).hide()
	 $this.next().show()
})

$('.show-less').on('click', function(){
	$(this).parent().hide()
	$(this).parent().prev().show()
})