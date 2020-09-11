//generalize
function scrolledNav(){
    $(".navbar").addClass("bg-light").removeClass("navbar-dark").addClass("navbar-light");
    $('.nav-link').removeClass("text-light").addClass("text-dark");
    $('.navbar-brand > img').attr('src', "/images/RBCE-LOGO.png");
}

if( $(window).scrollTop() ){
    scrolledNav();
}

//on scroll
$(window).on('scroll', function(){
    if(!$(window).scrollTop()){
        $(".navbar").removeClass("bg-light").removeClass("navbar-light").addClass("navbar-dark");
        $('.nav-link').removeClass("text-dark").addClass("text-light");
        $('.navbar-brand > img').attr('src', "/images/RBCE-LOGO-white.png");
    } else{ //if not on top
        scrolledNav();
    }
});

$(".navbar-toggler-icon").on("click", function(){
    var isVisible = $( ".collapse" ).is( ":visible" );
    if(!isVisible){
        $(".navbar").addClass("navbar-blue");
    } else{
        $(".navbar").removeClass("navbar-blue");
    }
});