$("#wall-images-p").on("click", "img", function() {
    $("#save").removeClass().addClass(this.id)
})

function loginRecMsg() {
    $("#login-rec-msg").addClass("show")
    setTimeout(function() {
        $("#login-rec-msg").removeClass()
    }, 3000)
}