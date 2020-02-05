//parallax
//ref: https://www.youtube.com/watch?v=SmolT-tV5Lw

parallax();

$(window).scroll(function(){
    parallax();
});

function parallax(){
    var wScroll = $(window).scrollTop();

    $('#image-layer').css({
        'background-position' : 'center ' + (wScroll * 0.75) + 'px'
    });
}

$('.panel-image').height( $('.panel-text').height() );


//temporary will rely on database next time
var upcomingSundays = [
    new Date("Feb 2, 2020 10:40:00").getTime(),
    new Date("Feb 9, 2020 10:40:00").getTime(),
    new Date("Feb 16, 2020 10:40:00").getTime(),
    new Date("Feb 23, 2020 10:40:00").getTime(),
]


//ref: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown

// Update the count down every 1 second
var i = 0;

var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = upcomingSundays[i] - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //output to html
    $('#digit-days').html(days);
    $('#digit-hours').html(hours);
    $('#digit-mins').html(minutes);
    $('#digit-secs').html(seconds);

    //turn on disp after calc
    // $('.denom-cont').css({
    //     'opacity' : '1'
    // });

    // If the count down is over, write some text 
    if (distance < 0) {
        i++;
    }

    $('.denom-cont').css({
        'opacity' : '1'
    });
    
}, 1000);

// $(document).ready( function() {
// 	$(".owl-carousel").owlCarousel( { 
// 		loop: true,
// 		// margin: 1,
// 		nav: true,
//     });
    
// });

// tns