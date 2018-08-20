$(document).ready(function () {
  var audio = new Audio('assets/audio/cast.ogg');
  audio.play(); 
  setPlayer(players[0]);
});

//curent player char
var playerChar = {
  name: "",
  dam: 0,
  hp: 0,
  exp: 0,
  stand: "",
  walk: "",
  walkDelay: 0,
  fight: "",
  fightDelay: 0,
  jump: "",
  jumpDelay: "",
  death: ""
}

//current enemy char
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

//set player attributes for selected character
function setPlayer(char) {
  $("#playerName").html(char.name);
  playerChar.name = char.name;
  playerChar.dam = char.dam;
  playerChar.hp = char.hp;
  playerChar.exp = 0;
  playerChar.stand = char.stand;
  playerChar.walk = char.walk;
  playerChar.walkDelay = char.walkDelay;
  playerChar.fight = char.fight;
  playerChar.fightDelay = char.fightDelay;
  playerChar.jump = char.jump;
  playerChar.jumpDelay = char.jumpDelay;
  playerChar.death = char.death;
}

//set enemy attributes for currently active enemy
function setEnemy(char) {
  $("#enemyName").html(char.name);
  enemyChar.name = char.name;
  enemyChar.dam = char.dam;
  enemyChar.hp = char.hp;
  enemyChar.exp = char.exp;
  enemyChar.stand = char.stand;
  enemyChar.fight = char.fight;
  enemyChar.fightDelay = char.fightDelay;
  enemyChar.death = char.death;
  $("#e").attr("src", `${char.stand}`);
  
    for (i = 1; i <= 20; i++) {
      $(`#ehp${i}`).css("color", "red");
    }
  
}
//playable characters
var players = [
  {
    name: "Simon",
    dam: 40,
    hp: 100,
    exp: 0,
    stand: "assets/images/simonstand.png",
    walk: "assets/images/simonwalk.gif",
    walkDelay: 600,
    fight: "assets/images/simonattack.gif",
    fightDelay: 900,
    jump: "assets/images/simonjump.gif",
    jumpDelay: 900,
    death: "assets/images/simondeath.gif", 
  },
];

//possible enemies
var enemies = [
  {
    name: "medusa",
    dam: 10,
    hp: 25,
    exp: 10,
    stand: "assets/images/medusastand.gif",
    fight: "assets/images/medusattack.gif",
    fightDelay: 1350,
    death: "assets/images/medusadeath.gif",
  },
  {
    name: "skeleton",
    dam: 15,
    hp: 50,
    exp: 20,
    stand: "assets/images/skeletonstand.gif",
    fight: "assets/images/skeletonattack.gif",
    fightDelay: 1800,
    death: "assets/images/skeletondeath.gif",
  },
];

function fight() {
  $("#p").attr("src", `${playerChar.fight}`);
  setTimeout(stand, `${playerChar.fightDelay}`)

}

//move to the right
function left () { 
  $('body').animate({
    'background-position-x': '+=100px',
  }, `${playerChar.walkDelay}`);
}

//move to the left
function right () { 
  $('body').animate({
    'background-position-x': '-=100px',
  }, `${playerChar.walkDelay}`);
}

//key press actions
document.onkeypress = function (evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var input = charCode;
  
  $("#expBar").attr("value", `${playerChar.exp}`);
  console.log(input);
 
  switch (input) {
    case 32: //space
    $("#p").attr("src", `${playerChar.jump}`);
    enemyDamage();
    break;
    case 100: //d
    walk();
    setTimeout(stand, `${playerChar.walkDelay}`)
    right();
    setEnemy(enemies[1]);
    break;
    case 97: //a
    $("#p").attr("src", "assets/images/walkyback.gif");
    left();
    break;
    case 102: //f
    fight();
    playerDamage();
    break;
  }
}

//set standing animation
function stand() {
  $("#p").attr("src", `${playerChar.stand}`);
}

//set walking animation
function walk() {
  $("#p").attr("src", `${playerChar.walk}`);

}

//jump return to stand animation
function jump() {
  $("#p").attr("src", `${playerChar.jump}`);
  setTimeout(stand, `${playerChar.jumpDelay}`)

}

//calc player damage subtract from enemy life bar
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
  if (d <= 0) {
    $("#e").attr("src", `${enemyChar.death}`);
    playerChar.exp = 0 + enemyChar.exp;
    getXp();
    
    if ($(`#xp${20}`).css("color") !== "rgb(255, 255, 255)"){
      lvlUp();
    }
  }
}

//get exp on kill update xpbar
function getXp() {
  var d = 1;
  var x = playerChar.exp/10;
  
  for (let i = 1; i <= 20; i++) {
    if ($(`#xp${i}`).css("color") !== "rgb(255, 255, 255)") {
      d++;
    }
  }
  for (x; x > 0; x--) {
      $(`#xp${d}`).css("color", "red")
      d++;
    }
  }

//flourish for lvling up
function gold() {
  for (i = 1; i <= 20; i++) {
    $(`#xp${i}`).css("color", "gold");
  }
}

//reset xp bar when lvling up
function white() {
  for (i = 1; i <= 20; i++) {
    $(`#xp${i}`).css("color", "white");
  }
}

//add damage and hp when lvling up, xpbar animation
function lvlUp() {
    playerChar.dam *= 1.25;
    playerChar.hp *= 1.25;
    gold();
    setTimeout(white, 1500);
    }

//calc enemy damage, subtract from player life bar
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
  
  if  ($(`#hp${1}`).css("color") === "rgb(255, 255, 255)") {
    $("#p").attr("src", `${playerChar.death}`);
}
  console.log($(`#hp${1}`).css("color"));
}

//set enemy animation to stand after attack animation is finished
function fightReset() {
  $("#e").attr("src", `${enemyChar.stand}`);
}



