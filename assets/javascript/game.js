$(document).ready(function () {
  setPlayer(players[0]);
});
// setTimeout(function() {
//   audio.play()
// }, 1000)

var audio = new Audio('assets/audio/cast.ogg');
audio.loop = true;
var cancelWalk;
var fight;
var dkey = true;
var fkey = true;
var spawn = parseInt($("body").css("background-position-x"))


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

//current enemy char
var enemyChar = {
  name: "",
  dam: "",
  hp: "",
  exp: "",
  stand: "",
  fight: "",
  fightDelay: "",
  attackSpeed: "",
  impact: "",
  death: "",
  alive: false,
};

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
    hp: 75,
    exp: 10,
    stand: "assets/images/medusastand.gif",
    fight: "assets/images/medusattack.gif",
    fightDelay: 1350,
    attackSpeed: 3300,
    impact: 825,
    death: "assets/images/medusadeath.gif",
  },
  {
    name: "mummy",
    dam: 20,
    hp: 150,
    exp: 20,
    stand: "assets/images/mummystand.gif",
    fight: "assets/images/mummyattack.gif",
    fightDelay: 2400,
    attackSpeed: 4000,
    impact: 1600,
    death: "assets/images/mummydeath.gif",
  },
  { 
    name: "skeleton",
    dam: 15,
    hp: 100,
    exp: 20,
    stand: "assets/images/skeletonstand.gif",
    fight: "assets/images/skeletonattack.gif",
    fightDelay: 1800,
    attackSpeed: 3200,
    impact: 1800,
    death: "assets/images/skeletondeath.gif",
  },
  {
    name: "death",
    dam: 25,
    hp: 200,
    exp: 50,
    stand: "assets/images/deathstand.gif",
    fight: "assets/images/deathattack.gif",
    fightDelay: 2200,
    attackSpeed: 4400,
    impact: 1600,
    death: "assets/images/deathdeath.gif",
  },
  {
    name: "frankenstein",
    dam: 25,
    hp: 160,
    exp: 30,
    stand: "assets/images/frankensteinstand.gif",
    fight: "assets/images/frankensteinattack.gif",
    fightDelay: 1500,
    attackSpeed: 4200,
    impact: 1000,
    death: "assets/images/frankensteindeath.gif",
  },
  {
    name: "gaibon",
    dam: 25,
    hp: 140,
    exp: 30,
    stand: "assets/images/gaibonstand.gif",
    fight: "assets/images/gaibonattack.gif",
    fightDelay: 1750,
    attackSpeed: 4000,
    impact: 1750,
    death: "assets/images/gaibondeath.gif",
  },
];

var items = [
  {
    name: "axe",
    icon: "assets/images/axe.png",
    drop: "assets/images/axedrop.gif",
    onUse: function() {},
  },
  {
    name: "bow",
    icon: "assets/images/bow.png",
    drop: "assets/images/bowdrop.gif",
    onUse: function() {},
  },
  {
    name: "cross",
    icon: "assets/images/cross.png",
    drop: "assets/images/crossdrop.gif",
    onUse: function() {},
  },
  {
    name: "holywater",
    icon: "assets/images/holywater.png",
    drop: "assets/images/holywaterdrop.gif",
    onUse: function() {},
  },
  {
    name: "knife",
    icon: "assets/images/knife.png",
    drop: "assets/images/knifedrop.gif",
    onUse: function() {},
  },
  {
    name: "meat",
    icon: "assets/images/meat.png",
    drop: "assets/images/meatdrop.gif",
    onUse: function() {
        for (i = 1; i <= 20; i++) {
          $(`#hp${i}`).css("color", "red");
      }
    },
  },
];

function useItemOne() { 
  console.log($("#firstItem").attr("data-itemNum"))
  var use = $("#firstItem").attr("data-itemNum");
  items[use].onUse();
  $("#firstItem").attr("src", "");
}

function useItemTwo() { 
  console.log($("#secondItem").attr("data-itemNum"))
  var use = $("#secondItem").attr("data-itemNum");
  items[use].onUse();
  $("#secondItem").attr("src", "");
}

function itemDrop() { 
  var rand = Math.floor(Math.random() * 0)
  var getItem = Math.floor(Math.random() * 6)
  if (rand === 0 ) {
    setTimeout(function() {
      $("#e").attr("src", items[getItem].drop);
    }, 2200)
    setTimeout(function() {
      if ($("#firstItem").attr("src") === "") {
      $("#firstItem").attr("src", items[getItem].icon);
      $("#firstItem").attr("data-itemNum", getItem);
      } else if ($("#secondItem").attr("src") === "") {
        $("#secondItem").attr("src", items[getItem].icon)
        $("#secondItem").attr("data-itemNum", getItem);
      }
    }, 4000)

  }
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
  $("#enemyLifeBar").css("visibility", "initial");
  $("#enemyName").css("visibility", "initial");
  $("#enemyName").html(char.name);
  enemyChar.name = char.name;
  enemyChar.dam = char.dam;
  enemyChar.hp = char.hp;
  enemyChar.exp = char.exp;
  enemyChar.stand = char.stand;
  enemyChar.fight = char.fight;
  enemyChar.fightDelay = char.fightDelay;
  enemyChar.attackSpeed = char.attackSpeed;
  enemyChar.impact = char.impact;
  enemyChar.death = char.death;
  enemyChar.alive = true;
  $("#e").attr("src", `${char.stand}`); 
    
  for (i = 1; i <= 20; i++) {
      $(`#ehp${i}`).css("color", "red");
  }
  fight = setInterval(combat, `${enemyChar.attackSpeed}`)
}

//spawn enemy based on position
function posit () {
  switch (spawn) {
    case -400:
    setEnemy(enemies[Math.floor(Math.random()*6)]);
    spawn += 400;
    break;  
  }
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
  spawn -=100;
}

//set standing animation
function stand() {
  $("#p").attr("src", `${playerChar.stand}`);
}

//set walking animation
function walk() {
  $("#p").attr("src", `${playerChar.walk}`);
  cancelWalk = setTimeout(stand, `${playerChar.walkDelay}`)
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
      if (dkey === true && enemyChar.alive === false) {
        walk();      
        right();
        posit();    
        dkey = false;
        setTimeout(function () {
        dkey = true;
        }, `${playerChar.walkDelay}`)
      }
      break;
    case 97: //a
    if(enemyChar.alive === false) {
      walkBack();
      left(); 
    }
      break;
    case 102: //f
      if (fkey === true){
        clearTimeout(cancelWalk);
        playerDamage();
        fkey = false;
        setTimeout(function() {
        fkey = true;
      }, `${playerChar.fightDelay}`)
      }
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
    break;4
    case 53: //5
    setEnemy(enemies[4]);
    break;
    case 54: //6
    setEnemy(enemies[5]);
    break;
    case 55: //7
      $("#e").attr("src", "assets/images/knifedrop.gif")
    break;
  }
}

function death() {
  $("#p").attr("src", `${playerChar.death}`);
}

//calc player damage subtract from enemy life bar
function playerDamage() {
  if (enemyChar.alive === true) {
    var p = enemyChar.hp/20;
    var x = Math.floor(Math.random() * 30 + playerChar.dam);
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
}

//show damage at time of animation hit
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
    setTimeout(function () {
      $("#e").attr("src", "");
    }, 2150)
    itemDrop();
    clearInterval(fight);
    setTimeout(function() {
      $("#enemyLifeBar").css("visibility", "hidden");
      $("#enemyName").css("visibility", "hidden");
    }, 1000)
  }
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

//show damage at time of animation hit
function damageTimingEnemy(x, p, d) {
  if( enemyChar.alive === true) {
  for (x; x > 0; x -= p) {
    if (x >= p) {
      $(`#hp${d}`).css("color", "white")
      d--;
    }
  }
  if ($(`#hp1`).css("color") === "rgb(255, 255, 255)") {
    death();
    var audio = new Audio('assets/audio/die.mp3');
    audio.play();
  }
}
}

//enemy auto attack 
function combat() {
  if(enemyChar.alive === true) {
    enemyDamage();
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


//set enemy animation to stand after attack animation is finished
function fightReset() {
  if (enemyChar.alive === true) {
  $("#e").attr("src", `${enemyChar.stand}`);
  }
}



