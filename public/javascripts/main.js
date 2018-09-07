$("#wall-images-p").on("click", "img", function() {
    $("#save").removeClass().addClass(this.id)
})

if ($("#show-login-rec-msg").length) {
    loginRecMsg()
}

if ($("#show-err-msg").length) {
    loginErrMsg()    
}

$("#history").datepicker({
    todayBtn: true,
    todayHighlight: true,
    endDate: "0d",
    maxViewMode: 2,
}).on('changeDate', function(e) {
    $("#set-date").val(e.date)
    $("#set-date-form").submit()
})

// $("body").css('font-family', 'Roboto')
$("body").css('font-family', 'Mukta')


function loginErrMsg() {
    $("#login-err-msg").addClass("show")
    setTimeout(function() {
        $("#login-err-msg").removeClass("show")
    }, 3000)
}

function loginRecMsg() {
    $("#login-rec-msg").addClass("show")
    setTimeout(function() {
        $("#login-rec-msg").removeClass("show")
    }, 3000)
}