$("#wall-images-p").on("click", "img", function() {
    $("#save").removeClass().addClass(this.id)
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

console.log($("#noteMon").val())


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
