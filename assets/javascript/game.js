document.onkeypress = function (evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var input = charCode;

  console.log(input);

  switch (input) {
    case 32: 
      $("#p").attr("src", "assets/images/jump.gif");
      break;
    case 100: 
      $("#p").attr("src", "assets/images/walkyg.gif");
      break;
    case 97: 
      $("#p").attr("src", "assets/images/walkyback.gif");
      break;
    case 102: 
      $("#p").attr("src", "assets/images/atackf.gif");
      break;

  }
  // if (input === 32) {
  //   $("#p").attr("src", "assets/images/jump.gif");
  // }
  // else if (input === 39) {
  //   $("#p").attr("src", "assets/images/walkyg.gif");
  // }
  // else if (input === 17) {
  //   $("#p").attr("src", "assets/images/atackf.gif");
  // }


}

