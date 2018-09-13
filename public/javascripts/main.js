$("#save2").on("click", function() {
    $(".navbar").addClass("anime")
    setTimeout(function() {
        $(".navbar").removeClass("anime")
    }, 1000)
})

/*===================================================================
    Wall Changes    
===================================================================*/
$("#wall-images-p").on("click", "img", function() {
    $("#save1").removeClass().addClass(this.id)
})



/*===================================================================
    Font Changes
===================================================================*/
setFontInModal()
setFontInAll()

if ($("#load-font").length) {
    const font = $("#load-font").text()
    $("*").css('font-family', font)
    setFontInModal()
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



/*===================================================================
    Control Toast Messages
===================================================================*/
if ($("#show-login-rec-msg").length) {
    showToastMsg("Notes will NOT be saved until you're logged in")
}

if ($("#show-err-msg").length) {
    loginErrMsg()
}

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

function showToastMsg(message) {
    $("#toast-msg").text(message).addClass("show")
    setTimeout(function() {
        $("#toast-msg").removeClass("show")
    }, 3000)
}



/*===================================================================
    Date Changes
===================================================================*/
$("#history").datepicker({
    todayBtn: true,
    todayHighlight: true,
    maxViewMode: 2,
}).on('changeDate', function(e) {
    $("#set-date").val(e.date)
    $("#set-date-form").submit()
})



/*===================================================================
    Save Notes with Ajax
===================================================================*/
$("#save1, #save2").on('click', function(e) {
    e.preventDefault()
    ajaxSaveNotes()
})

if ($("#save2").length) {
    setInterval(ajaxSaveNotes, 60000)
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
            console.log("Notes are saved successfully")
        },
        error: function(e) {
            showToastMsg("Auto save issue occurred, please save manually")
            console.log(e)
        }
    })
}




