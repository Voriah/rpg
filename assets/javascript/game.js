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
  walkB: "",
  walkDelay: 0,
  fight: "",
  fightDelay: 0,
  impact: 0,
  jump: "",
  jumpDelay: "",
  death: ""
}


var spawn = parseInt($("body").css("background-position-x"))

function posit () {
  
 
  console.log(spawn)
  
  switch (spawn) {
    case -400:
    setEnemy(enemies[Math.floor(Math.random()*4)]);
    spawn += 400;
    break;
    
  }
}

//current enemy char
var enemyChar = {
  name: "",
  dam: "",
  hp: "",
  exp: "",
  stand: "",
  fight: "",
  fightDelay: "",
  impact: "",
  death: "",
  alive: false,
};

//set player attributes for selected character
function setPlayer(char) {
  $("#playerName").html(char.name);
  playerChar.name = char.name;
  playerChar.dam = char.dam;
  playerChar.hp = char.hp;
  playerChar.exp = 0;
  playerChar.stand = char.stand;
  playerChar.walk = char.walk;
  playerChar.walkB = char.walkB;
  playerChar.walkDelay = char.walkDelay;
  playerChar.fight = char.fight;
  playerChar.fightDelay = char.fightDelay;
  playerChar.impact = char.impact;
  playerChar.jump = char.jump;
  playerChar.jumpDelay = char.jumpDelay;
  playerChar.death = char.death;
  $("#p").attr("src", `${char.stand}`);
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
  enemyChar.impact = char.impact;
  enemyChar.death = char.death;
  enemyChar.alive = true;
  $("#e").attr("src", `${char.stand}`);
  
    for (i = 1; i <= 20; i++) {
      $(`#ehp${i}`).css("color", "red");
    }
  $("#enemyLifeBar").css("visibility", "initial");
}

//playable characters
var players = [
  {
    name: "Simon",
    dam: 20,
    hp: 100,
    exp: 0,
    stand: "assets/images/simonstand.png",
    walk: "assets/images/simonwalk.gif",
    walkB: "assets/images/simonwalkback.gif",
    walkDelay: 600,
    fight: "assets/images/simonattack.gif",
    fightDelay: 900,
    impact: 450,
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
    impact: 825,
    death: "assets/images/medusadeath.gif",
  },
  {
    name: "mummy",
    dam: 20,
    hp: 50,
    exp: 20,
    stand: "assets/images/mummystand.gif",
    fight: "assets/images/mummyattack.gif",
    fightDelay: 2400,
    impact: 1600,
    death: "assets/images/mummydeath.gif",
  },
  { 
    name: "skeleton",
    dam: 15,
    hp: 50,
    exp: 20,
    stand: "assets/images/skeletonstand.gif",
    fight: "assets/images/skeletonattack.gif",
    fightDelay: 1800,
    impact: 1800,
    death: "assets/images/skeletondeath.gif",
  },
  {
    name: "death",
    dam: 25,
    hp: 100,
    exp: 50,
    stand: "assets/images/deathstand.gif",
    fight: "assets/images/deathattack.gif",
    fightDelay: 2200,
    impact: 1600,
    death: "assets/images/deathdeath.gif",
  },
];

// function fight() {
//   $("#p").attr("src", `${playerChar.fight}`);
//   setTimeout(stand, `${playerChar.fightDelay}`)

// }

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
  spawn -=100;
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
      jump();  
      break;
    case 100: //d
      walk();      
      right();
      posit();
      break;
    case 97: //a
      walkBack();
      left(); 
      break;
    case 102: //f
      playerDamage();
      break;
    case 113: //q
      setPlayer(players[0]);
      break;
    case 114: //r
      enemyDamage();
      break;
    case 49: //1
      setEnemy(enemies[0]);
      break;
    case 50: //2
      setEnemy(enemies[1]);
      break;
    case 51: //3
      setEnemy(enemies[2]);
      break;
    case 52: //4
      setEnemy(enemies[3]);
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
  setTimeout(stand, `${playerChar.walkDelay}`)
}
function walkBack() {
  $("#p").attr("src", `${playerChar.walkB}`);
  setTimeout(stand, `${playerChar.walkDelay}`)
}

//jump return to stand animation
function jump() {
  $("#p").attr("src", `${playerChar.jump}`);
  setTimeout(stand, `${playerChar.jumpDelay}`)
}
 
function death() {
  $("#p").attr("src", `${playerChar.death}`);
}

function damageTimingPlayer(x, p, d) {
  for (x; x > 0; x -= p) {
    if (x >= p) {
      $(`#ehp${d}`).css("color", "white")
      d--;
    }
  }
  if ($(`#ehp1`).css("color") === "rgb(255, 255, 255)") {
    $("#e").attr("src", `${enemyChar.death}`);
    playerChar.exp = 0 + enemyChar.exp;
    getXp();
    enemyChar.alive = false;
  }
}

function damageTimingEnemy(x, p, d) {
  for (x; x > 0; x -= p) {
    if (x >= p) {
      $(`#hp${d}`).css("color", "white")
      d--;
    }
  }
  if ($(`#hp1`).css("color") === "rgb(255, 255, 255)") {
    death();
  }
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
  setTimeout(function () {
    damageTimingPlayer(x, p, d);
  }, `${playerChar.impact}`)

  $("#p").attr("src", `${playerChar.fight}`);
  setTimeout(stand, `${playerChar.fightDelay}`);
    
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
  
  if ($(`#xp20`).css("color") !== "rgb(255, 255, 255)") {
    lvlUp();
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

  var impact = enemyChar.fightDelay *0.9;

  setTimeout(function () {
    damageTimingEnemy(x, p, d);
  }, `${enemyChar.impact}`)

  $("#e").attr("src", `${enemyChar.fight}`);
  setTimeout(fightReset, enemyChar.fightDelay)
  
}

//set enemy animation to stand after attack animation is finished
function fightReset() {
  $("#e").attr("src", `${enemyChar.stand}`);
}



