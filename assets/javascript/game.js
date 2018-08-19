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
  exp: 10,
  stand: "",
  fight: "",
  fightDelay: 0,
  death: "",
}

var enemies = [
  {
    name: "medusa",
    damage: 10,
    hp: 25,
    exp: 10,
    stand: "assets/images/medusastand.gif",
    fight: "assets/images/medusattack.gif",
    fightDelay: 1350,
    death: "",
  }
];

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
    setEnemy(enemies[0]);
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
}

function playerDamage() {
  var p = enemyChar.hp/20;
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
  var p = playerChar.hp/20;
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
  $("#e").attr("src", `${enemyChar.fight}`);
  setTimeout(fightReset, enemyChar.fightDelay)
}

function fightReset() {
  $("#e").attr("src", `${enemyChar.stand}`);
}

function setPlayer(char) {
  $("#playerName").html(char.name);
  playerChar.name = char.name;
  playerChar.dam = char.dam;
  playerChar.hp = char.hp;
  playerChar.exp = 0;
  playerChar.stand = char.stand;
  playerChar.fight = char.fight;
  playerChar.death = char.death;
}

function setEnemy(char) {
  $("#enemyName").html(char.name);
  enemyChar.name = char.name;
  enemyChar.dam = char.dam;
  enemyChar.hp = char.hp;
  enemyChar.exp = 0;
  enemyChar.stand = char.stand;
  enemyChar.fight = char.fight;
  enemyChar.death = char.death;
  enemyChar.fightDelay = char.fightDelay;
  $("#e").attr("src", `${char.stand}`);
}


