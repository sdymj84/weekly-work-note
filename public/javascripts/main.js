/*===================================================================
    Front End Effects
===================================================================*/
function saveEffect() {
    $(".navbar").addClass("shadow-black")
    $("#save2").addClass("shake")
    setTimeout(function () {
        $(".navbar").removeClass("shadow-black")
        $("#save2").removeClass("shake")
    }, 1000)
}



/*===================================================================
    Wall Changes    
===================================================================*/
$("#wall-images-p").on("click", "img", function () {
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
    $("i").css('font-family', "")
    setFontInModal()
}

function setFontInModal() {
    $(".font-list").each(function (i, element) {
        const font = $(element).text().split(":")[0]
        $(`#font${i + 1}`).css('font-family', font)
    })
}

function setFontInAll() {
    $(".font-list").on("click", function () {
        const font = $(this).text().split(":")[0]
        $("*").css('font-family', font)
        $("i").css('font-family', "")
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
    setTimeout(function () {
        $("#login-err-msg").removeClass("show")
    }, 3000)
}

function loginRecMsg() {
    $("#login-rec-msg").addClass("show")
    setTimeout(function () {
        $("#login-rec-msg").removeClass("show")
    }, 3000)
}

function showToastMsg(message) {
    $("#toast-msg").text(message).addClass("show")
    setTimeout(function () {
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
    container: ".datepicker-container",
}).on('changeDate', function (e) {
    $("#set-date").val(e.date)
    $("#set-date-form").submit()
})

$("#prev-history").on("click", function () {
    let d = $("#note-date-mon").val()
    d = new Date(d)
    d = new Date(d.setDate(d.getDate() - 7))
    $("#set-date").val(d)
    $("#set-date-form").submit()
})

$("#next-history").on("click", function () {
    let d = $("#note-date-mon").val()
    d = new Date(d)
    d = new Date(d.setDate(d.getDate() + 7))
    $("#set-date").val(d)
    $("#set-date-form").submit()
})




/*===================================================================
    Save Notes with Ajax
===================================================================*/
if (!$("#search-page").length) {
    $("#save1, #save2").on('click', function (e) {
        e.preventDefault()
        ajaxSaveNotes()
    })

    if ($("#save2").length) {
        setInterval(ajaxSaveNotes, 60000)
    }
} else {
    $("#save1, #save2").on('click', function (e) {
        e.preventDefault()
        showToastMsg("Can't save in search page")
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
        success: function () {
            saveEffect()
            console.log("Notes are saved successfully")
        },
        error: function (e) {
            showToastMsg("Auto save issue occurred, please save manually")
            console.log(e)
        }
    })
}


/*===================================================================
    Textarea key binding
===================================================================*/

$("body").on('keydown', 'textarea', function (e) {
    var keyCode = e.keyCode || e.which;

    // Tab
    if (keyCode == 9) {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        $(this).val($(this).val().substring(0, start)
            + "\t"
            + $(this).val().substring(end));

        // put caret at right position again
        this.selectionStart =
            this.selectionEnd = start + 1;
    }

    // Ctrl + S (save)
    if (e.ctrlKey || e.metaKey) {
        if (String.fromCharCode(keyCode).toLowerCase() === 's') {
            e.preventDefault();
            if (!$("#search-page").length) {
                ajaxSaveNotes()
            } else {
                showToastMsg("Can't save in search page")
            }
        }
    }
});
