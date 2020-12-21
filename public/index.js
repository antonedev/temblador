var anchorLinks = document.getElementsByClassName("js-no-history");
var img = document.getElementById("js-modal-img");
var modal = document.getElementById("js-modal");

for (var i = 0; i < anchorLinks.length; i++) {
  setLinkClickListener(i);
}

modal.addEventListener("click", () => {
  modal.style.display = "none";
});

function setLinkClickListener(linkIndex) {
  var link = anchorLinks[linkIndex];
  var targetDivId = link.attributes.href.value;
  var targetDiv = document.getElementById(targetDivId.slice(1));

  link.addEventListener("click", function (e) {
    e.preventDefault();
    targetDiv.scrollIntoView(true);
  });
}

function openGallery(element) {
  img.src = element.src;
  modal.style.display = "flex";
}
