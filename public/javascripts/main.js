$("#save").addClass("wall-image1")

$("#wall-images-p").on("click", "img", function() {
    $("#save").removeClass().addClass(this.id)
})