//check if what is checked initially
if( $('#will-visit-radio').prop('checked') ){
    $('#calendar-cont').show();
}

$('#will-visit-radio').change(function(){
    $('#calendar-cont').slideDown();
});

$('#have-visited-radio').change(function() {
    $('#calendar-cont').slideUp();
});