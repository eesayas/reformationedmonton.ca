$('[data-toggle="datepicker"]').datepicker();
$('#time').timepicker();

$('.scheduleTime').timepicker();

// on click, add new activity
$('#addAct').on("click", function(){
    $("#act-cont").append(
        `
        <div class="form-row act-row">
            <div class="form-group col-md-6">
                <label class="act-label">Activity # ${ $(".act-label").length + 1}</label>
                <input class="form-control" placeholder="Enter Activity Name" name="activity[]">
            </div>
    
            <div class="form-group col-md-6">
                <label>&nbsp;</label>
                <input class="scheduleTime form-control" class="form-control" placeholder="Select Time" name="act-time[]">
            </div>

            <button type="button" class="ml-auto mr-1 btn btn-danger deleteBtn">DELETE</button>
        </div>
        `
    );

    $('.scheduleTime').timepicker();
});

// on click add new location
$("#addLoc").on("click", function(){
    $("#loc-cont").append(
        `
        <div class="form-group loc">
            <label>Location # ${ $(".loc").length + 1 }</label>
            <input class="form-control" placeholder="Enter Location" name="location[]">
            <br>
            <div class="d-flex">
                <button type="button" class="ml-auto mr-1 btn btn-danger deleteLoc">DELETE</button>
            </div>
        </div>  
        `
    );
});

// on click delete
$("#act-cont").on("click", ".deleteBtn", function(){
    $(this).parent().remove();
    $(".act-label").each(function(index){
        $(this).text(`Activity # ${index + 1}`)
    }); 
});


// delete locations
$("#loc-cont").on("click", ".deleteLoc", function(){
    $(this).parent().parent().remove();
    $(".loc > label").each(function(index){
        $(this).text(`Location # ${index + 1}`);
    });
});


// on submit configure data
$("form").submit(function(event){
    event.preventDefault();

    let formData = $('form').serializeArray();
    let dayOfWeek = $("#dayOfWeek").val() !== "Choose..." ? $("#dayOfWeek").val() : null;

    // configure schedule
    let activities = formData.filter(data => data.name === "activity[]");
    let actTimes = formData.filter(data => data.name === "act-time[]");

    let schedule = [];
    for(let i = 0; i < activities.length; ++i){
        let activity = {
            activity: activities[i].value,
            time: actTimes[i].value,
        }

        schedule.push(activity);
    }

    // configure location
    let locationVals = formData.filter(data => data.name === "location[]");

    let location = [];
    for(let i = 0; i < locationVals.length; ++i){
        location.push(locationVals[i].value);
    }

    // assemble submission
    let submission = {
        title: formData.find(data => data.name === "title").value,
        dayOfWeek: dayOfWeek,
        msg: formData.find(data => data.name === "msg").value,
        link: formData.find(data => data.name === "link").value,
        time: formData.find(data => data.name === "time").value,
        location: location,
        schedule: schedule,
    }

    let event_id = formData.find(data => data.name === "id").value;

    // make put request
    $.ajax({
        url: `/events/${event_id}`,
        type: 'PUT',
        data: { data: JSON.stringify(submission) },
        success: function(result) {
            window.location.href = `/events/${event_id}`;    
        }
    });    
});