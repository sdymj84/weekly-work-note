$("#wall-images-p").on("click", "img", function() {
    $("#save1").removeClass().addClass(this.id)
})

setFontInModal()
setFontInAll()

if ($("#load-font").length) {
    const font = $("#load-font").text()
    $("*").css('font-family', font)
    setFontInModal()
}

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

$("#save1, #save2").on('click', function(e) {
    e.preventDefault()
    ajaxSaveNotes()
})

setInterval(ajaxSaveNotes, 60000)


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

function setFontInModal() {
    $(".font-list").each(function(i, element) {
        const font = $(element).text().split(":")[0]
        $(`#font${i+1}`).css('font-family', font)
    })
}

function setFontInAll() {
    $(".font-list").on("click", function() {
        const font = $(this).text().split(":")[0]
        $("*").css('font-family', font)
        setFontInModal()
    })
}

function ajaxSaveNotes() {
    let formData = {
        mon: $("#note-mon").val(),
        tue: $("#note-tue").val(),
        wed: $("#note-wed").val(),
        thu: $("#note-thu").val(),
        fri: $("#note-fri").val(),
        etc: $("#note-etc").val(),
    }
    
    $.ajax({
        type: "POST",
        url: "save",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function() {
            console.log("ajax post success")
        },
        error: function(e) {
            console.log(e)
        }
    })
}