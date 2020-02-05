$('#video-cont').height(
    $(window).height() - $('#navbar-cont-black').height()
);

//left chevron redirect
$('#video-cont > #prev > div').click(function(){
    $('#video-data').attr('src', 'https://www.youtube.com/embed/0OoZ-NastYA?autoplay=1');
});

//right chevron redirect
$('#video-cont > #next > div').click(function(){
    $('#video-data').attr('src', 'https://www.youtube.com/embed/0OoZ-NastYA?autoplay=1');
});

//for left chevron
$('#video-cont > #prev').mouseover(function(){
    
    $('#video-cont > #prev > div > i').css({
        'font-size': '75px',
        'color' : 'white'
    });

    $('#prev-date-cont > div').css({
        'opacity' : '1'
    });

});


$('#video-cont > #prev').mouseout(function(){
    
    $('#video-cont > #prev > div > i').css({
        'font-size': '100px',
        'color': '#807a7a'
    });

    $('#prev-date-cont > div').css({
        'opacity' : '0'
    });

});

//for right chevron
$('#video-cont > #next > div').click(function(){
    $('#video-data').attr('src', 'https://www.youtube.com/embed/0OoZ-NastYA?autoplay=1');
});

$('#video-cont > #next').mouseover(function(){
    
    $('#video-cont > #next > div > i').css({
        'font-size': '75px',
        'color' : 'white'
    });

    $('#next-date-cont > div').css({
        'opacity' : '1'
    });

});


$('#video-cont > #next').mouseout(function(){
    
    $('#video-cont > #next > div > i').css({
        'font-size': '100px',
        'color': '#807a7a'
    });

    $('#next-date-cont > div').css({
        'opacity' : '0'
    });

});