function preloadImages(srcs) {
    if (!preloadImages.cache) {
        preloadImages.cache = [];
    }
    var img;
    for (var i = 0; i < srcs.length; i++) {
        img = new Image();
        img.src = srcs[i];
        console.log(i)
        preloadImages.cache.push(img);
    }
}

function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

var food_loaded = true
var sights_loaded = true
var nightlife_loaded = true

$(document).ready(function(){

	var foodSrcs = ["images/brendas.jpg", "images/yamadaya.jpg", "images/nopalito.jpg", "images/el_farolito.jpg", "images/yank_sing.jpg"];

	$('#brendas').hover(function(){
		$('#food_image').css("background-image","url(images/brendas.jpg)")
	})

	$('#yamadaya').hover(function(){
		$('#food_image').css("background-image","url(images/yamadaya.jpg)")
	})

	$('#nopalito').hover(function(){
		$('#food_image').css("background-image","url(images/nopalito.jpg)")
	})

	$('#el_farolito').hover(function(){
		$('#food_image').css("background-image","url(images/el_farolito.jpg)")
	})

	$('#yank_sing').hover(function(){
		$('#food_image').css("background-image","url(images/yank_sing.jpg)")
	})

	$('#food_content').hover(function(){
		if(!isMobile() && food_loaded) {
			food_loaded = !food_loaded
			preloadImages(foodSrcs)
		}
	}, function(){
		$('#food_image').css("background-image","url(images/food.jpg)")
	})

	var sightsSrcs = ["images/golden_gate_bridge.jpg", "images/alcatraz.jpg", "images/twin_peaks.jpg", "images/exploratorium.jpg", "images/mission.jpg", , "images/painted_ladies.jpg"];

	$('#golden_gate_bridge').hover(function(){
		$('#sights_image').css("background-image","url(images/golden_gate_bridge.jpg)")
	})

	$('#alcatraz').hover(function(){
		$('#sights_image').css("background-image","url(images/alcatraz.jpg)")
	})

	$('#twin_peaks').hover(function(){
		$('#sights_image').css("background-image","url(images/twin_peaks.jpg)")
	})

	$('#exploratorium').hover(function(){
		$('#sights_image').css("background-image","url(images/exploratorium.jpg)")
	})

	$('#mission').hover(function(){
		$('#sights_image').css("background-image","url(images/mission.jpg)")
	})

	$('#painted_ladies').hover(function(){
		$('#sights_image').css("background-image","url(images/painted_ladies.jpg)")
	})

	$('#sights_content').hover(function(){
		if(!isMobile() && sights_loaded) {
			preloadImages(sightsSrcs)
			sights_loaded = !sights_loaded
		}
	}, function(){
		$('#sights_image').css("background-image","url(images/sights.jpg)")
	})

	var nightlifeSrcs = ["images/holy_water.jpg", "images/li_po.jpg", "images/dna_lounge.jpg", "images/spin.jpg"];

	$('#holy_water').hover(function(){
		$('#nightlife_image').css("background-image","url(images/holy_water.jpg)")
	})

	$('#li_po').hover(function(){
		$('#nightlife_image').css("background-image","url(images/li_po.jpg)")
	})

	$('#dna_lounge').hover(function(){
		$('#nightlife_image').css("background-image","url(images/dna_lounge.jpg)")
	})

	$('#spin').hover(function(){
		$('#nightlife_image').css("background-image","url(images/spin.jpg)")
	})

	$('#nightlife_content').hover(function(){
		if(!isMobile() && nightlife_loaded) {
			preloadImages(nightlifeSrcs)
			nightlife_loaded = !nightlife_loaded
		}
	}, function(){
		$('#nightlife_image').css("background-image","url(images/nightlife.jpg)")
	})

})
