//on logo click
$('#logo-cont').click( function() {
    window.location.href = "/";
});

//generalize
function scrolledNav(){
    $('#logo-cont>img').attr('src', '/images/RBCE-LOGO.png');
    // $('#logo-cont').css({
    //     width: '15rem',
    //     transition: '0.3s'
    // });
    $('#navbar-cont').css('background', 'white');
    $('#links-cont > .link').css('color', 'black');
    $('#contact-us-btn').css({
        background: '#022d41',
        color: 'white'
    });
    $('#links-cont > .link::after').css({
        background: 'black !important'
    });
}

//on init
if( $(window).scrollTop() ){
    scrolledNav();
}

//on scroll
$(window).on('scroll', function(){

    if( !$(window).scrollTop() ){
        $('#logo-cont>img').attr('src', '/images/RBCE-LOGO-white.png');
        // $('#logo-cont').css({
        //     width: '20rem',
        //     transition: '0.3s'
        // });

        $('#navbar-cont').css({
            background: 'none',
            opacity: '1 !important'
        });

        $('#links-cont > .link').css('color', 'white');
        $('#contact-us-btn').css({
            background: 'white',
            color: 'black'
        });   
    
    } else{ //scroll nav is not on top of page
        scrolledNav();
    }
    
});