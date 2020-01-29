$('#logo-cont').click( function() {
    window.location.href = "/";
});

if( $(window).scrollTop() ){
    $('#logo-cont').css('width', '20rem');
}

$(window).on('scroll', function(){

    if( !$(window).scrollTop() ){
        $('#logo-cont').css({
            width: '20rem',
            transition: '0.3s'
        });

        $('#navbar-cont').css({
            background: 'none',
            // opacity: '1'
        });

       
    
    } else{
        $('#logo-cont').css({
            width: '15rem',
            transition: '0.3s'
        });

         $('#navbar-cont').css({
            background:'rgba(255,255,255,0.7)',
            // opacity: '0.3'
        });
    }
    
});