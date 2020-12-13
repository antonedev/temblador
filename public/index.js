var modal = document.getElementById("modal");
var img = document.getElementById("modal-img");

function openGallery(element) {
  img.src = element.src;
  modal.style.display = "flex";
}
