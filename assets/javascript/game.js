var playerChar = {
  name: "Richter",
  dam: 45,
  hp: 100,
  exp: 0
}
var enemyChar = {
  name: "Dracula",
  dam: 50,
  hp: 150,
}


function right () { 
  $('body').animate({
    'background-position-x': '+=50px',
  }, 300);
}

function left () { 
  $('body').animate({
    'background-position-x': '-=50px',
  }, 300);
}


document.onkeypress = function (evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var input = charCode;

  console.log(input);

  switch (input) {
    case 32: 
      $("#p").attr("src", "assets/images/jump.gif");
      enemyDamage();
      break;
    case 100: 
      $("#p").attr("src", "assets/images/walkyg.gif");
      left();
      break;
    case 97: 
      $("#p").attr("src", "assets/images/walkyback.gif");
      right();
      break;
    case 102: 
      $("#p").attr("src", "assets/images/atackf.gif");
      playerDamage();
      break;

  }

  
  function playerDamage() {
    var p = enemyChar.hp/10;
    var x = playerChar.dam;
    var d = 20;
    for (let i = 20; i > 0; i--) {
      if ($(`#ehp${i}`).css("color") !== "rgb(255, 0, 0)"){
        d--;
      }
    }
    for (x; x >0; x-=p) {
      if (x >= p) {
      $(`#ehp${d}`).css("color", "white")
      d--;
      }
      }
}

  function enemyDamage() {
    var p = playerChar.hp / 10;
    var x = enemyChar.dam;
    var d = 20;
    for (let i = 20; i > 0; i--) {
      if ($(`#hp${i}`).css("color") !== "rgb(255, 0, 0)"){
        d--;
      }
    }
    for (x; x >0; x-=p) {
      if (x >= p) {
      $(`#hp${d}`).css("color", "white")
      d--;
      }
    }
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

