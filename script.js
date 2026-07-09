/*======================================================
    EMOJI MERGE
    script.js
    Part 1A
======================================================*/

const emojiOrder = [
    "😁",
    "😂",
    "😛",
    "🤯",
    "🫥",
    "💀",
    "🐔",
    "👽",
    "🦈",
    "👾",
    "🐺",
    "🐍"
];

const rareEmojis = [
    "😇",
    "🤪",
    "👻",
    "🦂",
    "🐊",
    "🫃",
    "🥀"
];

//----------------------------------------------------
// Game Variables
//----------------------------------------------------

let coins = 50;

let highestUnlocked = 0;

let board = [];

const BOARD_SIZE = 36;

let draggedIndex = null;

//----------------------------------------------------
// Income Values
//----------------------------------------------------

const income = [
    1,
    2,
    4,
    7,
    12,
    20,
    35,
    55,
    85,
    130,
    200,
    350
];

//----------------------------------------------------
// DOM
//----------------------------------------------------

const boardElement = document.getElementById("board");

const coinsElement = document.getElementById("coins");

const highestElement =
document.getElementById("highest");

const buyBtn =
document.getElementById("buyBtn");

const gambleBtn =
document.getElementById("gambleBtn");

const gambleResult =
document.getElementById("gambleResult");

const snakeBtn =
document.getElementById("snakeBtn");

//----------------------------------------------------
// Create Empty Board
//----------------------------------------------------

function createBoard(){

    board=[];

    for(let i=0;i<BOARD_SIZE;i++){

        board.push(null);

    }

}

//----------------------------------------------------
// Find Empty Slot
//----------------------------------------------------

function firstEmpty(){

    for(let i=0;i<board.length;i++){

        if(board[i]==null){

            return i;

        }

    }

    return -1;

}

//----------------------------------------------------
// Update HUD
//----------------------------------------------------

function updateStats(){

    coinsElement.textContent=Math.floor(coins);

    highestElement.textContent=
        emojiOrder[highestUnlocked];

}

//----------------------------------------------------
// Buy Emoji
//----------------------------------------------------

buyBtn.onclick=function(){

    if(coins<10){

        alert("Not enough coins!");

        return;

    }

    let slot=firstEmpty();

    if(slot==-1){

        alert("Board Full!");

        return;

    }

    coins-=10;

    board[slot]=0;

    drawBoard();

    updateStats();

    saveGame();

};

//----------------------------------------------------
// Draw Board
//----------------------------------------------------

function drawBoard(){

    boardElement.innerHTML="";

    board.forEach((value,index)=>{

        const tile=document.createElement("div");

        tile.className="tile";

        tile.dataset.index=index;

        tile.draggable=value!==null;

        if(value!==null){

            tile.textContent=
                emojiOrder[value];

        }

        //------------------------------------------------

        tile.addEventListener("dragstart",()=>{

            draggedIndex=index;

            tile.classList.add("dragging");

        });

        tile.addEventListener("dragend",()=>{

            tile.classList.remove("dragging");

        });

        tile.addEventListener("dragover",(e)=>{

            e.preventDefault();

        });

        tile.addEventListener("drop",()=>{

            mergeTiles(draggedIndex,index);

        });

        //------------------------------------------------

        boardElement.appendChild(tile);

    });

}

//----------------------------------------------------
// Merge Logic
//----------------------------------------------------

function mergeTiles(a,b){

    if(a===null) return;

    if(a===b) return;

    if(board[a]==null) return;

    if(board[b]==null){

        board[b]=board[a];

        board[a]=null;

        drawBoard();

        saveGame();

        return;

    }

    if(board[a]!==board[b]){

        return;

    }

    //------------------------------------------------

    board[b]++;

    board[a]=null;

    //------------------------------------------------

    if(board[b]>=emojiOrder.length){

        board[b]=emojiOrder.length-1;

    }

    //------------------------------------------------

    if(board[b]>highestUnlocked){

        highestUnlocked=board[b];

    }

    //------------------------------------------------

    drawBoard();

    updateStats();

    saveGame();

}

//----------------------------------------------------
// Save
//----------------------------------------------------

function saveGame(){

    const save={

        coins,

        board,

        highestUnlocked

    };

    localStorage.setItem(
        "emojiMergeSave",
        JSON.stringify(save)
    );

}

//----------------------------------------------------
// Load
//----------------------------------------------------

function loadGame(){

    const save=
        localStorage.getItem(
            "emojiMergeSave"
        );

    if(!save){

        createBoard();

        return;

    }

    const data=
        JSON.parse(save);

    coins=data.coins??50;

    board=data.board??[];

    highestUnlocked=
        data.highestUnlocked??0;

    while(board.length<BOARD_SIZE){

        board.push(null);

    }

}

//----------------------------------------------------
// Income Tick
//----------------------------------------------------

setInterval(()=>{

    let gain=0;

    for(let tile of board){

        if(tile!=null){

            gain+=income[tile];

        }

    }

    coins+=gain;

    updateStats();

},3000);

//----------------------------------------------------
// Start Game
//----------------------------------------------------

loadGame();

drawBoard();

updateStats();
/*======================================================
    PART 1B
    Paste BELOW Part 1A
======================================================*/

//----------------------------------------------------
// Prices
//----------------------------------------------------

const BUY_COST = 10;
const GAMBLE_COST = 250;

//----------------------------------------------------
// Rare Collection
//----------------------------------------------------

let rareCollection = [];

//----------------------------------------------------
// Coin Animation
//----------------------------------------------------

function floatText(text){

    const div=document.createElement("div");

    div.textContent=text;

    div.style.position="fixed";
    div.style.left="50%";
    div.style.top="120px";

    div.style.transform="translateX(-50%)";

    div.style.background="#333";
    div.style.padding="10px 18px";
    div.style.borderRadius="12px";
    div.style.fontWeight="bold";
    div.style.zIndex="9999";

    document.body.appendChild(div);

    let y=120;

    const timer=setInterval(()=>{

        y--;

        div.style.top=y+"px";

    },15);

    setTimeout(()=>{

        clearInterval(timer);

        div.remove();

    },900);

}

//----------------------------------------------------
// Better Merge
//----------------------------------------------------

function animateTile(index){

    const tile=document.querySelector(
        `.tile[data-index="${index}"]`
    );

    if(!tile) return;

    tile.classList.add("merge");

    setTimeout(()=>{

        tile.classList.remove("merge");

    },250);

}

//----------------------------------------------------
// Replace mergeTiles()
// with this improved version
//----------------------------------------------------

mergeTiles=function(a,b){

    if(a==null) return;

    if(a===b) return;

    if(board[a]==null) return;

    //------------------------------------------------

    if(board[b]==null){

        board[b]=board[a];

        board[a]=null;

        drawBoard();

        saveGame();

        return;

    }

    //------------------------------------------------

    if(board[a]!=board[b]){

        return;

    }

    //------------------------------------------------

    board[b]++;

    board[a]=null;

    //------------------------------------------------

    if(board[b]>=emojiOrder.length){

        board[b]=emojiOrder.length-1;

    }

    //------------------------------------------------

    if(board[b]>highestUnlocked){

        highestUnlocked=board[b];

        floatText(
            "Unlocked "+emojiOrder[board[b]]
        );

    }

    drawBoard();

    animateTile(b);

    updateStats();

    saveGame();

    //------------------------------------------------

    if(highestUnlocked>=11){

        snakeBtn.disabled=false;

    }

};

//----------------------------------------------------
// Gamble Button
//----------------------------------------------------

gambleBtn.onclick=function(){

    if(coins<GAMBLE_COST){

        gambleResult.textContent=
            "Need 250 coins.";

        return;

    }

    coins-=GAMBLE_COST;

    //------------------------------------------------
    // 8% chance rare
    //------------------------------------------------

    if(Math.random()<0.08){

        const prize=
            rareEmojis[
                Math.floor(
                    Math.random()*
                    rareEmojis.length
                )
            ];

        gambleResult.textContent=
            "⭐ Rare! "+prize;

        if(!rareCollection.includes(prize)){

            rareCollection.push(prize);

        }

        floatText("Rare "+prize);

    }

    //------------------------------------------------
    // Otherwise common
    //------------------------------------------------

    else{

        const tier=
            Math.floor(
                Math.random()*5
            );

        const slot=firstEmpty();

        if(slot!=-1){

            board[slot]=tier;

        }

        gambleResult.textContent=
            "Won "+
            emojiOrder[tier];

    }

    drawBoard();

    updateStats();

    saveGame();

};

//----------------------------------------------------
// Income Message
//----------------------------------------------------

setInterval(()=>{

    let gain=0;

    for(const tile of board){

        if(tile!=null){

            gain+=income[tile];

        }

    }

    if(gain>0){

        floatText("+"+gain+" 🪙");

    }

},3000);

//----------------------------------------------------
// Improved Save
//----------------------------------------------------

const oldSave=saveGame;

saveGame=function(){

    const save={

        coins,

        board,

        highestUnlocked,

        rareCollection

    };

    localStorage.setItem(
        "emojiMergeSave",
        JSON.stringify(save)
    );

};

//----------------------------------------------------
// Improved Load
//----------------------------------------------------

const oldLoad=loadGame;

loadGame=function(){

    const raw=
        localStorage.getItem(
            "emojiMergeSave"
        );

    if(!raw){

        createBoard();

        return;

    }

    const data=
        JSON.parse(raw);

    coins=data.coins??50;

    board=data.board??[];

    highestUnlocked=
        data.highestUnlocked??0;

    rareCollection=
        data.rareCollection??[];

    while(board.length<BOARD_SIZE){

        board.push(null);

    }

    if(highestUnlocked>=11){

        snakeBtn.disabled=false;

    }

};

//----------------------------------------------------
// Refresh everything
//----------------------------------------------------

loadGame();

drawBoard();

updateStats();
/*======================================================
    PART 1C
    Snake Game + Final Merge Features
    Paste BELOW Part 1B
======================================================*/

//----------------------------------------------------
// Snake Variables
//----------------------------------------------------

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const snakeHighscore =
document.getElementById("snakeHighscore");

const GRID = 20;
const SIZE = canvas.width / GRID;

let snake = [];
let direction = "right";
let nextDirection = "right";
let food = null;

let snakeRunning = false;
let snakeScore = 0;
let bestScore = 0;

//----------------------------------------------------
// Start Snake
//----------------------------------------------------

snakeBtn.onclick = function(){

    canvas.hidden = false;

    snakeRunning = true;

    snake = [
        {x:5,y:10},
        {x:4,y:10},
        {x:3,y:10}
    ];

    direction = "right";
    nextDirection = "right";

    snakeScore = 0;

    spawnFood();

};

//----------------------------------------------------
// Spawn Food
//----------------------------------------------------

function spawnFood(){

    while(true){

        let x =
        Math.floor(Math.random()*GRID);

        let y =
        Math.floor(Math.random()*GRID);

        let blocked = false;

        for(const part of snake){

            if(part.x==x && part.y==y){

                blocked=true;

                break;

            }

        }

        if(!blocked){

            food={x,y};

            return;

        }

    }

}

//----------------------------------------------------
// Controls
//----------------------------------------------------

document.addEventListener("keydown",(e)=>{

    if(e.key=="ArrowUp" && direction!="down")
        nextDirection="up";

    if(e.key=="ArrowDown" && direction!="up")
        nextDirection="down";

    if(e.key=="ArrowLeft" && direction!="right")
        nextDirection="left";

    if(e.key=="ArrowRight" && direction!="left")
        nextDirection="right";

});

//----------------------------------------------------
// Snake Update
//----------------------------------------------------

function updateSnake(){

    if(!snakeRunning) return;

    direction=nextDirection;

    let head={
        x:snake[0].x,
        y:snake[0].y
    };

    if(direction=="up") head.y--;
    if(direction=="down") head.y++;
    if(direction=="left") head.x--;
    if(direction=="right") head.x++;

    //------------------------------------------------

    if(head.x<0) head.x=GRID-1;
    if(head.x>=GRID) head.x=0;

    if(head.y<0) head.y=GRID-1;
    if(head.y>=GRID) head.y=0;

    //------------------------------------------------

    for(const part of snake){

        if(part.x==head.x &&
           part.y==head.y){

            gameOver();

            return;

        }

    }

    snake.unshift(head);

    //------------------------------------------------

    if(head.x==food.x &&
       head.y==food.y){

        snakeScore++;

        if(snakeScore>bestScore){

            bestScore=snakeScore;

            snakeHighscore.textContent=
            bestScore;

        }

        spawnFood();

    }

    else{

        snake.pop();

    }

}

//----------------------------------------------------
// Draw Snake
//----------------------------------------------------

function drawSnake(){

    if(!snakeRunning) return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    //------------------------------------------------
    // Food
    //------------------------------------------------

    ctx.font="20px Arial";

    ctx.textAlign="center";
    ctx.textBaseline="middle";

    ctx.fillText(
        "🍎",
        food.x*SIZE+SIZE/2,
        food.y*SIZE+SIZE/2
    );

    //------------------------------------------------
    // Snake
    //------------------------------------------------

    for(let i=0;i<snake.length;i++){

        let emoji="🟩";

        if(i==0){

            emoji=emojiOrder[
                highestUnlocked
            ];

        }

        ctx.fillText(

            emoji,

            snake[i].x*SIZE+SIZE/2,

            snake[i].y*SIZE+SIZE/2

        );

    }

    //------------------------------------------------

    ctx.fillStyle="white";

    ctx.font="18px Arial";

    ctx.fillText(

        "Score: "+snakeScore,

        80,

        20

    );

}

//----------------------------------------------------
// Game Over
//----------------------------------------------------

function gameOver(){

    snakeRunning=false;

    alert(

        "Game Over!\n\nScore: "+snakeScore

    );

}

//----------------------------------------------------
// Loop
//----------------------------------------------------

setInterval(()=>{

    updateSnake();

    drawSnake();

},120);

//----------------------------------------------------
// Save High Score
//----------------------------------------------------

const previousSave = saveGame;

saveGame=function(){

    const save={

        coins,

        board,

        highestUnlocked,

        rareCollection,

        bestScore

    };

    localStorage.setItem(

        "emojiMergeSave",

        JSON.stringify(save)

    );

};

//----------------------------------------------------
// Load High Score
//----------------------------------------------------

const previousLoad = loadGame;

loadGame=function(){

    const raw=

    localStorage.getItem(

        "emojiMergeSave"

    );

    if(!raw){

        createBoard();

        return;

    }

    const save=

    JSON.parse(raw);

    coins=save.coins??50;

    board=save.board??[];

    highestUnlocked=
    save.highestUnlocked??0;

    rareCollection=
    save.rareCollection??[];

    bestScore=
    save.bestScore??0;

    snakeHighscore.textContent=
    bestScore;

    while(board.length<BOARD_SIZE){

        board.push(null);

    }

    if(highestUnlocked>=11){

        snakeBtn.disabled=false;

    }

};

//----------------------------------------------------
// Final Refresh
//----------------------------------------------------

loadGame();

drawBoard();

updateStats();
/*======================================================
    PART 2
    Polish + Quality of Life + Progression
    Paste BELOW Part 1C
======================================================*/

//----------------------------------------------------
// Prices Scale Slightly
//----------------------------------------------------

function getBuyPrice(){

    return BUY_COST + Math.floor(highestUnlocked * 5);

}

function updateButtons(){

    buyBtn.innerHTML =
        `Buy 😁<span>(${getBuyPrice()} Coins)</span>`;

    gambleBtn.innerHTML =
        `Gamble!<span>(${GAMBLE_COST} Coins)</span>`;

}

updateButtons();

//----------------------------------------------------
// Replace Buy Button
//----------------------------------------------------

buyBtn.onclick=function(){

    const price=getBuyPrice();

    if(coins<price){

        floatText("Not enough coins!");

        return;

    }

    const slot=firstEmpty();

    if(slot==-1){

        floatText("Board Full!");

        return;

    }

    coins-=price;

    board[slot]=0;

    drawBoard();

    updateStats();

    updateButtons();

    saveGame();

};

//----------------------------------------------------
// Statistics
//----------------------------------------------------

let totalMerges=0;
let totalBought=0;
let totalGambles=0;

function printStats(){

    console.log("==========");

    console.log("Coins:",coins);

    console.log("Highest:",emojiOrder[highestUnlocked]);

    console.log("Merges:",totalMerges);

    console.log("Bought:",totalBought);

    console.log("Gambles:",totalGambles);

    console.log("==========");

}

//----------------------------------------------------
// Count Purchases
//----------------------------------------------------

const oldBuy=buyBtn.onclick;

buyBtn.onclick=function(){

    totalBought++;

    oldBuy();

};

//----------------------------------------------------
// Count Gambles
//----------------------------------------------------

const oldGamble=gambleBtn.onclick;

gambleBtn.onclick=function(){

    totalGambles++;

    oldGamble();

};

//----------------------------------------------------
// Count Merges
//----------------------------------------------------

const previousMerge=mergeTiles;

mergeTiles=function(a,b){

    const beforeHighest=highestUnlocked;

    previousMerge(a,b);

    if(highestUnlocked>=beforeHighest){

        totalMerges++;

    }

};

//----------------------------------------------------
// Better Coin Income
//----------------------------------------------------

setInterval(()=>{

    let gain=0;

    for(const tile of board){

        if(tile!=null){

            gain+=income[tile];

        }

    }

    if(gain>0){

        coins+=Math.floor(gain*0.1);

        updateStats();

    }

},1000);

//----------------------------------------------------
// Keyboard Shortcuts
//----------------------------------------------------

document.addEventListener("keydown",(e)=>{

    if(e.key=="b"){

        buyBtn.click();

    }

    if(e.key=="g"){

        gambleBtn.click();

    }

});

//----------------------------------------------------
// Random Sparkle
//----------------------------------------------------

setInterval(()=>{

    const tiles=
    document.querySelectorAll(".tile");

    if(tiles.length==0)return;

    const random=

    tiles[Math.floor(

        Math.random()*tiles.length

    )];

    random.style.transform="scale(1.15)";

    setTimeout(()=>{

        random.style.transform="";

    },250);

},1800);

//----------------------------------------------------
// Better Rare Rewards
//----------------------------------------------------

function giveRareReward(){

    const reward=Math.floor(

        Math.random()*500

    )+250;

    coins+=reward;

    floatText(

        "Bonus +"+reward+"🪙"

    );

}

//----------------------------------------------------
// Upgrade Gamble
//----------------------------------------------------

const gambleOriginal=gambleBtn.onclick;

gambleBtn.onclick=function(){

    const before=rareCollection.length;

    gambleOriginal();

    if(rareCollection.length>before){

        giveRareReward();

    }

};

//----------------------------------------------------
// Daily Gift
//----------------------------------------------------

function checkDailyGift(){

    const today=
    new Date().toDateString();

    const last=

    localStorage.getItem(

        "emojiGift"

    );

    if(today!=last){

        coins+=500;

        localStorage.setItem(

            "emojiGift",

            today

        );

        floatText(

            "Daily Gift +500🪙"

        );

    }

}

checkDailyGift();

//----------------------------------------------------
// Auto Save
//----------------------------------------------------

setInterval(()=>{

    saveGame();

},5000);

//----------------------------------------------------
// Better Save
//----------------------------------------------------

const savePart2=saveGame;

saveGame=function(){

    const save={

        coins,

        board,

        highestUnlocked,

        rareCollection,

        bestScore,

        totalBought,

        totalMerges,

        totalGambles

    };

    localStorage.setItem(

        "emojiMergeSave",

        JSON.stringify(save)

    );

};

//----------------------------------------------------
// Better Load
//----------------------------------------------------

const loadPart2=loadGame;

loadGame=function(){

    const raw=

    localStorage.getItem(

        "emojiMergeSave"

    );

    if(!raw){

        createBoard();

        return;

    }

    const save=

    JSON.parse(raw);

    coins=save.coins??50;

    board=save.board??[];

    highestUnlocked=
    save.highestUnlocked??0;

    rareCollection=
    save.rareCollection??[];

    bestScore=
    save.bestScore??0;

    totalBought=
    save.totalBought??0;

    totalMerges=
    save.totalMerges??0;

    totalGambles=
    save.totalGambles??0;

    snakeHighscore.textContent=

    bestScore;

    while(board.length<BOARD_SIZE){

        board.push(null);

    }

    if(highestUnlocked>=11){

        snakeBtn.disabled=false;

    }

};

//----------------------------------------------------
// Secret Cheat Codes
//----------------------------------------------------

window.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key=="1"){

        coins+=10000;

        updateStats();

        floatText("Developer Coins");

    }

    if(e.ctrlKey && e.key=="2"){

        highestUnlocked=11;

        snakeBtn.disabled=false;

        updateStats();

        floatText("🐍 Unlocked");

    }

});

//----------------------------------------------------
// Welcome Message
//----------------------------------------------------

setTimeout(()=>{

    floatText(

        "Welcome to Emoji Merge!"

    );

},1000);

//----------------------------------------------------
// Final Refresh
//----------------------------------------------------

loadGame();

drawBoard();

updateStats();

updateButtons();
/*======================================================
    PART 3
    Achievements + Prestige + Collection
======================================================*/

//----------------------------------------------------
// Achievement System
//----------------------------------------------------

let achievements = [];

function unlockAchievement(name){

    if(achievements.includes(name))
        return;

    achievements.push(name);

    floatText("🏆 " + name);

    saveGame();

}

//----------------------------------------------------
// Achievement Checks
//----------------------------------------------------

function checkAchievements(){

    if(coins >= 1000)
        unlockAchievement("First Thousand");

    if(coins >= 10000)
        unlockAchievement("Money Machine");

    if(highestUnlocked >= 5)
        unlockAchievement("Skull Collector");

    if(highestUnlocked >= 8)
        unlockAchievement("Shark Master");

    if(highestUnlocked >= 11)
        unlockAchievement("Snake Lord");

    if(rareCollection.length >= 1)
        unlockAchievement("Lucky!");

    if(rareCollection.length >= 4)
        unlockAchievement("Rare Hunter");

    if(rareCollection.length >= 7)
        unlockAchievement("Completed Collection");

}

//----------------------------------------------------
// Run Achievement Check
//----------------------------------------------------

setInterval(checkAchievements,2000);

//----------------------------------------------------
// Collection Panel
//----------------------------------------------------

const collectionPanel =
document.createElement("div");

collectionPanel.style.marginTop="20px";

document.body.appendChild(
    collectionPanel
);

function drawCollection(){

    let html =
    "<h2 style='text-align:center'>Collection</h2>";

    html +=
    "<div style='text-align:center;font-size:32px;'>";

    for(const emoji of rareEmojis){

        if(rareCollection.includes(emoji))
            html += emoji + " ";
        else
            html += "❔ ";

    }

    html += "</div>";

    collectionPanel.innerHTML = html;

}

//----------------------------------------------------
// Prestige System
//----------------------------------------------------

let prestigeLevel = 0;

function prestige(){

    if(highestUnlocked < 11){

        alert(
        "Reach 🐍 before prestiging!"
        );

        return;

    }

    prestigeLevel++;

    coins = 100;

    highestUnlocked = 0;

    board = [];

    createBoard();

    //------------------------------------------------

    for(let i=0;i<prestigeLevel;i++){

        coins += 500;

    }

    //------------------------------------------------

    floatText(
        "Prestige " + prestigeLevel
    );

    drawBoard();

    updateStats();

    saveGame();

}

//----------------------------------------------------
// Prestige Button
//----------------------------------------------------

const prestigeBtn =
document.createElement("button");

prestigeBtn.textContent =
"⭐ Prestige";

prestigeBtn.style.position="fixed";

prestigeBtn.style.bottom="20px";

prestigeBtn.style.right="20px";

prestigeBtn.style.width="150px";

prestigeBtn.onclick=prestige;

document.body.appendChild(
    prestigeBtn
);

//----------------------------------------------------
// Prestige Bonus
//----------------------------------------------------

const oldIncome = income.slice();

function getIncomeValue(tier){

    const base = oldIncome[tier];

    return Math.floor(
        base *
        (1 + prestigeLevel * 0.25)
    );

}

//----------------------------------------------------
// Override Income Tick
//----------------------------------------------------

setInterval(()=>{

    let gain = 0;

    for(const tile of board){

        if(tile != null){

            gain +=
            getIncomeValue(tile);

        }

    }

    coins += gain;

    updateStats();

},3000);

//----------------------------------------------------
// Better Snake Rewards
//----------------------------------------------------

const oldGameOver = gameOver;

gameOver = function(){

    const reward =
    snakeScore * 25;

    coins += reward;

    floatText(
        "+"+reward+" 🪙"
    );

    oldGameOver();

    updateStats();

};

//----------------------------------------------------
// Rare Emoji Bonuses
//----------------------------------------------------

function rareBonus(){

    let bonus =

    rareCollection.length * 50;

    coins += bonus;

    updateStats();

}

setInterval(rareBonus,30000);

//----------------------------------------------------
// Save Upgrade
//----------------------------------------------------

const savePart3 = saveGame;

saveGame=function(){

    const save={

        coins,

        board,

        highestUnlocked,

        rareCollection,

        achievements,

        prestigeLevel,

        bestScore,

        totalBought,

        totalMerges,

        totalGambles

    };

    localStorage.setItem(

        "emojiMergeSave",

        JSON.stringify(save)

    );

};

//----------------------------------------------------
// Load Upgrade
//----------------------------------------------------

const loadPart3 = loadGame;

loadGame=function(){

    const raw=

    localStorage.getItem(
        "emojiMergeSave"
    );

    if(!raw){

        createBoard();

        return;

    }

    const save=
    JSON.parse(raw);

    coins=save.coins??50;

    board=save.board??[];

    highestUnlocked=
    save.highestUnlocked??0;

    rareCollection=
    save.rareCollection??[];

    achievements=
    save.achievements??[];

    prestigeLevel=
    save.prestigeLevel??0;

    bestScore=
    save.bestScore??0;

    while(board.length<BOARD_SIZE){

        board.push(null);

    }

};

//----------------------------------------------------
// Achievement Display
//----------------------------------------------------

const achievementPanel =
document.createElement("div");

achievementPanel.style.marginTop="20px";

document.body.appendChild(
    achievementPanel
);

function drawAchievements(){

    let html =
    "<h2 style='text-align:center'>Achievements</h2>";

    html +=
    "<div style='text-align:center'>";

    for(const a of achievements){

        html +=
        "🏆 " + a + "<br>";

    }

    html += "</div>";

    achievementPanel.innerHTML =
    html;

}

//----------------------------------------------------
// UI Refresh
//----------------------------------------------------

setInterval(()=>{

    drawCollection();

    drawAchievements();

},1000);

//----------------------------------------------------
// Initial Draw
//----------------------------------------------------

drawCollection();

drawAchievements();

loadGame();

updateStats();

drawBoard();
/*======================================================
    PART 4
    Enhanced Snake Mode
    Paste BELOW Part 3
======================================================*/

//----------------------------------------------------
// Snake Powerups
//----------------------------------------------------

let snakeMultiplier = 1;
let powerup = null;
let obstacleList = [];

function randomTile(){

    return {

        x:Math.floor(Math.random()*GRID),

        y:Math.floor(Math.random()*GRID)

    };

}

//----------------------------------------------------
// Spawn Powerup
//----------------------------------------------------

function spawnPowerup(){

    if(Math.random()<0.40){

        powerup=randomTile();

    }

}

//----------------------------------------------------
// Spawn Obstacles
//----------------------------------------------------

function generateObstacles(){

    obstacleList=[];

    let amount=

        Math.min(

            15,

            Math.floor(snakeScore/5)

        );

    for(let i=0;i<amount;i++){

        obstacleList.push(

            randomTile()

        );

    }

}

//----------------------------------------------------
// Replace Spawn Food
//----------------------------------------------------

const oldSpawnFood=spawnFood;

spawnFood=function(){

    oldSpawnFood();

    spawnPowerup();

    generateObstacles();

};

//----------------------------------------------------
// Draw Extras
//----------------------------------------------------

const oldDrawSnake=drawSnake;

drawSnake=function(){

    oldDrawSnake();

    if(!snakeRunning) return;

    //------------------------------------------

    ctx.font="18px Arial";

    //------------------------------------------
    // Obstacles
    //------------------------------------------

    for(const rock of obstacleList){

        ctx.fillText(

            "🪨",

            rock.x*SIZE+SIZE/2,

            rock.y*SIZE+SIZE/2

        );

    }

    //------------------------------------------
    // Powerup
    //------------------------------------------

    if(powerup){

        ctx.fillText(

            "⭐",

            powerup.x*SIZE+SIZE/2,

            powerup.y*SIZE+SIZE/2

        );

    }

    //------------------------------------------

    ctx.fillStyle="white";

    ctx.fillText(

        "x"+snakeMultiplier,

        canvas.width-40,

        20

    );

};

//----------------------------------------------------
// Replace Update
//----------------------------------------------------

const oldUpdateSnake=updateSnake;

updateSnake=function(){

    if(!snakeRunning) return;

    direction=nextDirection;

    let head={

        x:snake[0].x,

        y:snake[0].y

    };

    if(direction=="up") head.y--;

    if(direction=="down") head.y++;

    if(direction=="left") head.x--;

    if(direction=="right") head.x++;

    //------------------------------------------

    if(head.x<0) head.x=GRID-1;
    if(head.x>=GRID) head.x=0;

    if(head.y<0) head.y=GRID-1;
    if(head.y>=GRID) head.y=0;

    //------------------------------------------
    // Hit obstacle
    //------------------------------------------

    for(const rock of obstacleList){

        if(

            head.x==rock.x &&

            head.y==rock.y

        ){

            gameOver();

            return;

        }

    }

    //------------------------------------------
    // Hit self
    //------------------------------------------

    for(const part of snake){

        if(

            head.x==part.x &&

            head.y==part.y

        ){

            gameOver();

            return;

        }

    }

    snake.unshift(head);

    //------------------------------------------
    // Food
    //------------------------------------------

    if(

        head.x==food.x &&

        head.y==food.y

    ){

        snakeScore+=snakeMultiplier;

        if(snakeScore>bestScore){

            bestScore=snakeScore;

            snakeHighscore.textContent=bestScore;

        }

        spawnFood();

    }

    else{

        snake.pop();

    }

    //------------------------------------------
    // Powerup
    //------------------------------------------

    if(

        powerup &&

        head.x==powerup.x &&

        head.y==powerup.y

    ){

        powerup=null;

        snakeMultiplier++;

        floatText(

            "Multiplier x"+

            snakeMultiplier

        );

    }

};

//----------------------------------------------------
// Bonus Rewards
//----------------------------------------------------

const previousGameOver=gameOver;

gameOver=function(){

    const reward=

        snakeScore*

        snakeMultiplier*

        40;

    coins+=reward;

    updateStats();

    floatText(

        "+"+

        reward+

        "🪙"

    );

    previousGameOver();

};

//----------------------------------------------------
// Difficulty Increase
//----------------------------------------------------

let snakeSpeed=120;

setInterval(()=>{

    if(!snakeRunning) return;

    if(snakeSpeed>50){

        snakeSpeed--;

    }

},2000);

//----------------------------------------------------
// Golden Apples
//----------------------------------------------------

let goldenFood=null;

function spawnGoldenFood(){

    if(Math.random()<0.15){

        goldenFood=randomTile();

    }

}

setInterval(

    spawnGoldenFood,

    8000

);

//----------------------------------------------------
// Draw Golden Apple
//----------------------------------------------------

const previousDraw=drawSnake;

drawSnake=function(){

    previousDraw();

    if(!snakeRunning) return;

    if(goldenFood){

        ctx.font="20px Arial";

        ctx.fillText(

            "🍍",

            goldenFood.x*SIZE+SIZE/2,

            goldenFood.y*SIZE+SIZE/2

        );

    }

};

//----------------------------------------------------
// Golden Food Check
//----------------------------------------------------

setInterval(()=>{

    if(

        !snakeRunning ||

        !goldenFood

    ) return;

    const head=snake[0];

    if(

        head.x==goldenFood.x &&

        head.y==goldenFood.y

    ){

        goldenFood=null;

        snakeScore+=10;

        coins+=500;

        floatText(

            "Golden Fruit!"

        );

        updateStats();

    }

},40);

//----------------------------------------------------
// Endless Bonus
//----------------------------------------------------

setInterval(()=>{

    if(

        snakeRunning &&

        snake.length>=30

    ){

        coins+=100;

        updateStats();

    }

},5000);

//----------------------------------------------------
// Unlock Rewards
//----------------------------------------------------

function snakeMilestones(){

    if(bestScore>=25)

        unlockAchievement(

            "Snake Expert"

        );

    if(bestScore>=50)

        unlockAchievement(

            "Snake Champion"

        );

    if(bestScore>=100)

        unlockAchievement(

            "Snake Legend"

        );

}

setInterval(

    snakeMilestones,

    1000

);

//----------------------------------------------------
// Final Refresh
//----------------------------------------------------

drawBoard();

updateStats();
/*======================================================
    PART 5
    Final Polish
======================================================*/

//----------------------------------------------------
// Version
//----------------------------------------------------

const GAME_VERSION = "1.0";

console.log("Emoji Merge v" + GAME_VERSION);

//----------------------------------------------------
// Pause Snake
//----------------------------------------------------

let snakePaused = false;

document.addEventListener("keydown",(e)=>{

    if(e.key=="p"){

        snakePaused=!snakePaused;

        floatText(
            snakePaused ?
            "Paused" :
            "Resumed"
        );

    }

});

const originalUpdateSnake = updateSnake;

updateSnake = function(){

    if(snakePaused) return;

    originalUpdateSnake();

};

//----------------------------------------------------
// Restart Snake
//----------------------------------------------------

const restartButton =
document.createElement("button");

restartButton.textContent =
"Restart Snake";

restartButton.style.position="fixed";
restartButton.style.bottom="70px";
restartButton.style.right="20px";

restartButton.onclick=function(){

    snakeBtn.click();

};

document.body.appendChild(
    restartButton
);

//----------------------------------------------------
// FPS Counter
//----------------------------------------------------

const fpsLabel =
document.createElement("div");

fpsLabel.style.position="fixed";
fpsLabel.style.left="10px";
fpsLabel.style.bottom="10px";
fpsLabel.style.padding="6px";
fpsLabel.style.background="#222";
fpsLabel.style.borderRadius="8px";

document.body.appendChild(
    fpsLabel
);

let fps=0;

setInterval(()=>{

    fpsLabel.textContent=
        "FPS: "+fps;

    fps=0;

},1000);

const oldDraw = drawSnake;

drawSnake=function(){

    fps++;

    oldDraw();

};

//----------------------------------------------------
// Export Save
//----------------------------------------------------

function exportSave(){

    const text=
        localStorage.getItem(
            "emojiMergeSave"
        );

    navigator.clipboard.writeText(text);

    floatText(
        "Save copied!"
    );

}

//----------------------------------------------------
// Import Save
//----------------------------------------------------

function importSave(){

    const text=
    prompt(
        "Paste Save Data"
    );

    if(!text) return;

    localStorage.setItem(
        "emojiMergeSave",
        text
    );

    location.reload();

}

//----------------------------------------------------
// Buttons
//----------------------------------------------------

const exportBtn =
document.createElement("button");

exportBtn.textContent=
"Export Save";

exportBtn.style.position="fixed";
exportBtn.style.left="20px";
exportBtn.style.bottom="20px";

exportBtn.onclick=exportSave;

document.body.appendChild(
    exportBtn);

const importBtn =
document.createElement("button");

importBtn.textContent=
"Import Save";

importBtn.style.position="fixed";
importBtn.style.left="20px";
importBtn.style.bottom="70px";

importBtn.onclick=importSave;

document.body.appendChild(
    importBtn);

//----------------------------------------------------
// Reset Game
//----------------------------------------------------

function resetGame(){

    if(!confirm(
        "Delete your save?"
    )) return;

    localStorage.removeItem(
        "emojiMergeSave"
    );

    location.reload();

}

const resetBtn=
document.createElement("button");

resetBtn.textContent=
"Reset";

resetBtn.style.position="fixed";
resetBtn.style.left="20px";
resetBtn.style.bottom="120px";

resetBtn.onclick=resetGame;

document.body.appendChild(
    resetBtn);

//----------------------------------------------------
// Credits
//----------------------------------------------------

const credits=
document.createElement("div");

credits.style.textAlign="center";
credits.style.marginTop="30px";
credits.style.padding="20px";

credits.innerHTML=`
<h2>Emoji Merge</h2>
<p>Version ${GAME_VERSION}</p>
<p>Designed by You</p>
<p>Built with ChatGPT</p>
`;

document.body.appendChild(
    credits);

//----------------------------------------------------
// Random Tips
//----------------------------------------------------

const tips=[

"Merge faster for more coins.",

"Rare emojis give huge bonuses.",

"Prestige boosts income.",

"Golden fruit is worth a lot!",

"Press B to buy.",

"Press G to gamble.",

"Press P to pause Snake."

];

setInterval(()=>{

    floatText(

        tips[
            Math.floor(
                Math.random()*
                tips.length
            )
        ]

    );

},45000);

//----------------------------------------------------
// Celebration
//----------------------------------------------------

function celebrate(){

    document.body.animate([

        {transform:"scale(1)"},

        {transform:"scale(1.01)"},

        {transform:"scale(1)"}

    ],{

        duration:250

    });

}

setInterval(()=>{

    if(highestUnlocked>=11){

        celebrate();

    }

},10000);

//----------------------------------------------------
// Autosave Reminder
//----------------------------------------------------

setInterval(()=>{

    saveGame();

},10000);

//----------------------------------------------------
// Finish
//----------------------------------------------------

updateStats();

drawBoard();

console.log(
"Game Loaded Successfully."
);
