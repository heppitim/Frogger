var canvas, ctx;

//sprites
var gras, brick;
var sprites_up, sprites_down, sprites_right,
    sprites_left, sprites_mirrored,
    sprites_down_mirrored, sprites_left_mirrored;
var turtles

//sounds
var theme, jump, death;

// score / time
var score = null;
var playtime = 45;
var remaining_time = 0;
var start_time;
var lives = null;

// Board
const grid = 48;
const gridGap = 10;

// Frames
var frame_frogger = 0.2
var frogger_animation_speed = 0.3
var frame_turtles= 0.2;
var turtle_animation_speed = 0.002
var frame_death = 0.2;
var death_animation_speed = 0.03

const rows = [];
var patterns;

var loop = null;
var scored = false;

// Highscore
const NO_OF_HIGH_SCORES = 1;
const HIGH_SCORES = 'highScores'
const highScoreString = localStorage.getItem(HIGH_SCORES);
const highScores = JSON.parse(highScoreString) ?? [];

// Options and Character
const GAME_MODE = 'gamemode';
const SAFE_MUSIC = 'music';
const SAFE_SOUND = 'sound';
const SAFE_PLAYER = 'player';

var is_scored = false;

function Sprite(props) {
    // shortcut for assigning all object properties to the sprite
    Object.assign(this, props);
}
Sprite.prototype.render = function() {

     //draw the different Sprites

    if (this.name === 'log') {
        ctx.drawImage(sprites_up, 0, 210, sprites_up.width / 2.66, 40, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'turtle') {
        frame_turtles += turtle_animation_speed;

        ctx.drawImage(turtles, Math.floor(frame_turtles % 4) * turtles.width / 4, 0, turtles.width / 4, 55, this.x, this.y, grid - gridGap, grid - gridGap);
    }
    else if (this.name === 'truck') {
        ctx.drawImage(sprites_down, 255, 579, sprites_down.width / 4, 55, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'fast car') {
        ctx.drawImage(sprites_up, 130, 452, sprites_down.width / 8, 52, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'car 2') {
        ctx.drawImage(sprites_down, 385, 585, sprites_down.width / 8 -1, 45, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'bulldozer') {
        ctx.drawImage(sprites_up, 257, 389, sprites_down.width / 8 -1, 58, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'car 1') {
        ctx.drawImage(sprites_down, 450, 584, sprites_down.width / 8 -1, 48, this.x, this.y, this.size, grid - gridGap);
    }
    else if (this.name === 'scoredFrog') {
        if(JSON.parse(localStorage.getItem(SAFE_PLAYER)) === "green" || JSON.parse(localStorage.getItem(SAFE_PLAYER)) === null) {
            ctx.drawImage(sprites_up, 262, 8, sprites_up.width / 8 -12, 54, this.x, this.y, grid, grid- 10);
        }
        else {
            ctx.drawImage(sprites_up, 262, 520, sprites_up.width / 8 -12, 54, this.x, this.y, grid, grid- 10);
        }
    }
    else if (this.state === 'dead') {
        frame_death += death_animation_speed;

        ctx.drawImage(sprites_mirrored, 256 +Math.floor(frame_death % 4) * sprites_mirrored.width / 8, 64, sprites_mirrored.width / 8, 60, this.x, this.y, grid - gridGap, grid - gridGap);
    }
    else {
        frame_frogger += frogger_animation_speed ;

        if(JSON.parse(localStorage.getItem(SAFE_PLAYER)) === "purple") {
            if (this.direction === 'up') {

                if (this.secondstate === "jumping") {
                    ctx.drawImage(sprites_up, Math.floor(frame_frogger % 4) * sprites_up.width / 8, 512, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                } else {
                    ctx.drawImage(sprites_up, 0, 512, sprites_up.width / 8 - 4, 48, this.x, this.y, grid, grid - gridGap);
                }
            }
            else if (this.direction === 'down') {

                if(this.secondstate === "jumping") {
                    ctx.drawImage(sprites_down_mirrored, Math.floor(frame_frogger % 4) * sprites_up.width / 8, 450, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                } else {
                    ctx.drawImage(sprites_down_mirrored, 0, 466, sprites_up.width / 8 - 4, 48, this.x, this.y, grid, grid - gridGap);
                }
            }
            else if (this.direction === 'right') {

                if(this.secondstate === "jumping") {
                    ctx.drawImage(sprites_right, 450 , Math.floor(frame_frogger % 4) * sprites_right.height / 8, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                }
                else {
                    ctx.drawImage(sprites_right, 464, 0, sprites_up.width / 8 - 16, 60, this.x, this.y, grid, grid- gridGap);
                }
            }
            else {
                if(this.secondstate === "jumping") {
                    ctx.drawImage(sprites_left_mirrored, 512 , Math.floor(frame_frogger % 4) * sprites_right.height / 8, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                }
                else {
                    ctx.drawImage(sprites_left_mirrored, 512, 0, sprites_up.width / 8 - 16, 60, this.x, this.y, grid, grid- gridGap);
                }
            }
        } else if(JSON.parse(localStorage.getItem(SAFE_PLAYER)) === "purple_yellow") {
            if (this.direction === 'up') {

                if (this.secondstate === "jumping") {
                    ctx.drawImage(sprites_up, Math.floor(frame_frogger % 4) * sprites_up.width / 8, 576, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                } else {
                    ctx.drawImage(sprites_up, 0, 576, sprites_up.width / 8 - 4, 48, this.x, this.y, grid, grid - gridGap);
                }
            }
            else if (this.direction === 'down') {

                if(this.secondstate === "jumping") {
                    ctx.drawImage(sprites_down_mirrored, Math.floor(frame_frogger % 4) * sprites_up.width / 8, 384, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                } else {
                    ctx.drawImage(sprites_down_mirrored, 0, 400, sprites_up.width / 8 - 4, 48, this.x, this.y, grid, grid - gridGap);
                }
            }
            else if (this.direction === 'right') {

                if(this.secondstate === "jumping") {
                    ctx.drawImage(sprites_right, 384 , Math.floor(frame_frogger % 4) * sprites_right.height / 8, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                }
                else {
                    ctx.drawImage(sprites_right, 400, 0, sprites_up.width / 8 - 16, 60, this.x, this.y, grid, grid- gridGap);
                }
            }
            else {
                if(this.secondstate === "jumping") {
                    ctx.drawImage(sprites_left_mirrored, 576 , Math.floor(frame_frogger % 4) * sprites_right.height / 8, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                }
                else {
                    ctx.drawImage(sprites_left_mirrored, 576, 0, sprites_up.width / 8 - 16, 60, this.x, this.y, grid, grid- gridGap);
                }
            }
        } else { // green
            if (this.direction === 'up') {

                if (this.secondstate === "jumping") {
                    ctx.drawImage(sprites_up, Math.floor(frame_frogger % 4) * sprites_up.width / 8, 0, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                } else {
                    ctx.drawImage(sprites_up, 0, 0, sprites_up.width / 8 - 4, 48, this.x, this.y, grid, grid - gridGap);
                }
            }
            else if (this.direction === 'down') {

                if(this.secondstate === "jumping") {
                    ctx.drawImage(sprites_down_mirrored, Math.floor(frame_frogger % 4) * sprites_up.width / 8, 960, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                } else {
                    ctx.drawImage(sprites_down_mirrored, 0, 976, sprites_up.width / 8 - 4, 48, this.x, this.y, grid, grid - gridGap);
                }
            }
            else if (this.direction === 'right') {

                if(this.secondstate === "jumping") {
                    ctx.drawImage(sprites_right, 960 , Math.floor(frame_frogger % 4) * sprites_right.height / 8, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                }
                else {
                    ctx.drawImage(sprites_right, 976, 0, sprites_up.width / 8 - 16, 60, this.x, this.y, grid, grid- gridGap);
                }
            }
            else {
                if(this.secondstate === "jumping") {
                    ctx.drawImage(sprites_left_mirrored, 0 , Math.floor(frame_frogger % 4) * sprites_right.height / 8, sprites_up.width / 8 - 4, 60, this.x, this.y, grid, grid - gridGap);
                }
                else {
                    ctx.drawImage(sprites_left_mirrored, 0, 0, sprites_up.width / 8 - 16, 60, this.x, this.y, grid, grid- gridGap);
                }
            }
        }
    }
}

const frogger = new Sprite({
    x: grid * 6,
    y: grid * 13,
    color: 'greenyellow',
    size: grid,
    name: 'frogger',
    direction: 'up',
    state: 'alive',
    secondstate: 'solid'
});
var scoredFroggers = []

function start() {
    toggleScreen("start-screen", false);
    toggleScreen("game", true);
    toggleScreen("gameover-screen", false);

    init();

    this.loop = setInterval(() => {
        draw();
        update();
    }, 1000/60);
}
function stopGame() {
    toggleScreen("start-screen", false);
    toggleScreen("game", false);
    toggleScreen("gameover-screen", true);
    clearInterval(loop);
    stopTheme();
    checkHighScore(score);
}

// for restarting the game
function restartStats() {
    start_time = new Date();
    lives = 6
    score = 0;
    playtime = 45;
    scoredFroggers = [];
}

// for changing screen
function toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    element.style.display = (toggle) ? "block" : "none";
}

function init() {
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    makeSprites();
    loadSprites();
    if(JSON.parse(localStorage.getItem(SAFE_MUSIC))) {
        playTheme();
    }
    restartStats();
}

function playTheme() {
    theme.play();
}

function stopTheme() {
    theme.pause();
    theme.currentTime = 0;
}

function makeSprites() {
   patterns = [
        // end bank is safe
        null,

        // log
        {
            spacing: [2],      // how many grid spaces between each obstacle
            size: grid * 4,    // width (rect) / diameter (circle) of the obstacle
            name: 'log',       // shape of the obstacle (rect or circle)
            speed: 0.75        // how fast the obstacle moves and which direction
        },

        // turtle
        {
            spacing: [0,2,0,2,0,2,0,4],
            size: grid,
            name: 'turtle',
            speed: -1
        },

        // long log
        {
            spacing: [2],
            size: grid * 7,
            name: 'log',
            speed: 1
        },

        // log
        {
            spacing: [3],
            size: grid * 3,
            name: 'log',
            speed: 0.5
        },

        // turtle
        {
            spacing: [0,0,1.5],
            size: grid,
            name: 'turtle',
            speed: -1
        },

        // beach is safe
        null,

        // truck
        {
            spacing: [3,8],
            size: grid * 2,
            name: 'truck',
            speed: -1
        },

        // fast car
        {
            spacing: [2,10],
            size: grid,
            name: 'fast car',
            speed: 2.0
        },

        // car
        {
            spacing: [3,3,7],
            size: grid,
            name: 'car 2',
            speed: -0.75
        },

        // bulldozer
        {
            spacing: [3,3,7],
            size: grid,
            name: 'bulldozer',
            speed: 0.5
        },

        // car
        {
            spacing: [4],
            size: grid,
            name: 'car 1',
            speed: -0.5
        },

        // start zone is safe
        null
    ];
}

function loadSprites() {
// rows holds all the sprites for that row

    for (let i = 0; i < patterns.length; i++) {
        rows[i] = [];

        let x = 0;
        let index = 0;
        const pattern = patterns[i];

        // skip empty patterns (safe zones)
        if (!pattern) {
            continue;
        }

        // allow there to be 1 extra pattern offscreen so the loop is seamless
        // (especially for the long log)
        let totalPatternWidth =
            pattern.spacing.reduce((acc, space) => acc + space, 0) * grid +
            pattern.spacing.length * pattern.size;
        let endX = 0;
        while (endX < canvas.width) {
            endX += totalPatternWidth;
        }
        endX += totalPatternWidth;

        // populate the row with sprites
        while (x < endX) {
            rows[i].push(new Sprite({
                x,
                y: grid * (i + 1),
                index,
                ...pattern
            }));

            // move the next sprite over according to the spacing
            const spacing = pattern.spacing;
            x += pattern.size + spacing[index] * grid;
            index = (index + 1) % spacing.length;
        }
    }
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawTime();
    drawScores();
    drawLives();
    drawMode();
    drawBackground();
}

function update() {
    updateTime();
    updateAndDraw();
    drawFrogger();
    if(lives <= 0 || remaining_time <= 0) {
        stopGame()
    }
}

function drawTime() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Time: " + remaining_time, grid * 10, grid*15 - 20);
}

function updateTime () {
    const current_time = new Date();
    remaining_time = playtime - Math.floor((current_time.getTime() - start_time.getTime()) / 1000);
}

function drawScores() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 34);
    drawHIScore();
}

function drawHIScore () {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    if(highScores.length !== 0) {
        ctx.fillText("HI-Score: " + highScores.at(0).score, 350, 34);
    } else {
        ctx.fillText("HI-Score: 0", 350, 34);
    }

}

function drawLives() {
    for(let i = 0; i < lives; i++) {
        let gap = 20 * i;
        ctx.drawImage(sprites_up, 64, 0, sprites_up.width / 8 - 4, 60, gap, grid * 14, 20, grid / 2);
    }
}

function drawMode (){
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    if(JSON.parse(localStorage.getItem(GAME_MODE)) === null) {
        ctx.fillText("Mode: normal", grid * 4, grid*15 - 20);
    } else {
        ctx.fillText("Mode: " + JSON.parse(localStorage.getItem(GAME_MODE)), grid * 4, grid*15 - 20);
    }

}

function drawBackground() {
    //Water
    ctx.fillStyle = '#020079';
    ctx.fillRect(0, grid, canvas.width, grid * 6);

    // End Zone
    ctx.drawImage(gras, 0, grid, canvas.width, 5);
    ctx.drawImage(gras, 0, grid, 5, grid);
    ctx.drawImage(gras, canvas.width - 5, grid, 5, grid);
    for(let i = 0; i < 4; i++) {
        ctx.drawImage(gras, grid + grid * 3 * i, grid, grid * 2, grid);
    }

    //beach
    for(let i = 0; i < 13; i++) {
        ctx.drawImage(brick, 48 * i, 7 * grid, 48, grid);
    }

    //start zone
    for(let i = 0; i < 13; i++) {
        ctx.drawImage(brick, 48 * i, canvas.height - grid * 2, 48, grid);
    }

}

function updateAndDraw() {
    for (let r = 0; r < rows.length; r++) {
        const row = rows[r];

        for (let i = 0; i < row.length; i++) {
            const sprite = row[i]
            if(scored) {
                updateSpeed(sprite);
            }
            sprite.x += sprite.speed;
            sprite.render();

            // loop sprite around the screen
            // sprite is moving to the left and goes offscreen
            if (sprite.speed < 0 && sprite.x < 0 - sprite.size) {

                // find the rightmost sprite
                let rightMostSprite = sprite;
                for (let j = 0; j < row.length; j++) {
                    if (row[j].x > rightMostSprite.x) {
                        rightMostSprite = row[j];
                    }
                }

                // move the sprite to the next spot in the pattern so it continues
                const spacing = patterns[r].spacing;
                sprite.x =
                    rightMostSprite.x + rightMostSprite.size +
                    spacing[rightMostSprite.index] * grid;
                sprite.index = (rightMostSprite.index + 1) % spacing.length;
            }

            // sprite is moving to the right and goes offscreen
            if (sprite.speed > 0 && sprite.x > canvas.width) {

                // find the leftmost sprite
                let leftMostSprite = sprite;
                for (let j = 0; j < row.length; j++) {
                    if (row[j].x < leftMostSprite.x) {
                        leftMostSprite = row[j];
                    }
                }

                // move the sprite to the next spot in the pattern so it continues
                const spacing = patterns[r].spacing;
                let index = leftMostSprite.index - 1;
                index = index >= 0 ? index : spacing.length - 1;
                sprite.x = leftMostSprite.x - spacing[index] * grid - sprite.size;
                sprite.index = index;
            }
        }
    }
    scored = false;
}

function updateSpeed(sprite) {
    if(sprite.speed < 0) {
        sprite.speed -= 0.1;
    }
    else {
        sprite.speed += 0.1;
    }
}

function drawFrogger() {
    frogger.x += frogger.speed || 0;
    frogger.render();

    // if all Frogs are Scored, reset

    scoredFroggers.forEach(frog => frog.render());

    // check for collision with all sprites in the same row as frogger
    const froggerRow = frogger.y / grid - 1 | 0;
    let collision = false;
    for (let i = 0; i < rows[froggerRow].length; i++) {
        let sprite = rows[froggerRow][i];

        // axis-aligned bounding box (AABB) collision check
        // treat any circles as rectangles for the purposes of collision
        if (frogger.x < sprite.x + sprite.size - gridGap &&
            frogger.x + grid - gridGap > sprite.x &&
            frogger.y < sprite.y + grid &&
            frogger.y + grid > sprite.y) {
            collision = true;

            // reset frogger if got hit by car
            if (froggerRow > rows.length / 2 && frogger.state !== "dead" && frogger.secondstate !== "jumping") {
                playerDeath();
            }
            // move frogger along with obstacle
            else if (frogger.state !== "dead" && frogger.secondstate !== "jumping") {
                frogger.speed = sprite.speed;
            }
        }
    }

    if (!collision) {
        // if frogger isn't colliding reset speed
        frogger.speed = 0;

        // frogger got to end bank (goal every 3 cols)
        const col = (frogger.x + grid / 2) / grid | 0;
        if (froggerRow === 0 && col % 3 === 0 && frogger.y % grid === 0 &&
            // check to see if there isn't a scored frog already there
            !scoredFroggers.find(frog => frog.x === col * grid)) {
            scoredFroggers.push(new Sprite({
                ...frogger,
                x: col * grid,
                y: frogger.y + 5,
                name: 'scoredFrog'
            }));
            score += 50 + remaining_time / 2 * 10;
            start_time = new Date();
            if(JSON.parse(localStorage.getItem(GAME_MODE)) === "hard") {
                updateTimeAndSprites();
            }
            is_scored = true
            if(scoredFroggers.length === 5) {
                scoredFroggers = [];
                score += 1000;
            }
        }

        // reset frogger if not on obstacle in river
        if (froggerRow < rows.length / 2 - 1  && frogger.state !== "dead" && frogger.secondstate !== "jumping") {
            if(is_scored) {
                frogger.x = grid * 6;
                frogger.y = grid * 13;
                is_scored = false;
            } else {
                playerDeath();
            }
        }
    }
}

function updateTimeAndSprites () {
    if (playtime >= 25) {
        playtime -= 1;
    }
    scored = true;
}

function playerDeath() {
    frogger.state = "dead";
    playSound(death);
    setTimeout(function () {
        frame_death = 0;
        frogger.x = grid * 6;
        frogger.y = grid * 13;
        lives -= 1;
        frogger.state = "alive";
        start_time = new Date();
    }, 1900);
}

function keyboardPressed(ev) {
    let id
    let end = 0;
    let frame = 3;
    let timeout = 7;

    if(frogger.state !== "dead" && frogger.secondstate !== "jumping") {
        if(ev.which === 37 || ev.which === 38 || ev.which === 39 || ev.which === 40) {
            playSound(jump);
            frogger.secondstate = "jumping";

            //links
            if (ev.which === 37) {
                frogger.direction = 'left';
                id = setInterval(function () {
                    if(end === 48) {
                        clearInterval(id);
                        frogger.secondstate = "solid"
                    }
                    else {
                        frogger.x -= frame;
                    }
                    end += frame;
                    frogger.x = Math.min( Math.max(0, frogger.x), canvas.width - grid);
                }, timeout)
            }
            //rechts
            else if (ev.which === 39) {
                frogger.direction = 'right';
                id = setInterval(function () {
                    if(end === 48) {
                        clearInterval(id);
                        frogger.secondstate = "solid"
                    }
                    else {
                        frogger.x += frame;
                    }
                    end += frame;
                    frogger.x = Math.min( Math.max(0, frogger.x), canvas.width - grid);
                }, timeout)
            }
            //hoch
            else if (ev.which === 38) {
                frogger.direction = 'up'
                id = setInterval(function () {
                    if(end === 48) {
                        clearInterval(id);
                        frogger.secondstate = "solid"
                    }
                    else {
                        frogger.y -= frame;
                    }
                    end += frame;
                    frogger.y = Math.min( Math.max(grid, frogger.y), canvas.height - grid * 2);
                }, timeout)
                score += 10;
            }
            //runter
            else if (ev.which === 40) {
                frogger.direction = 'down';
                id = setInterval(function () {
                    if(end === 48) {
                        clearInterval(id);
                        frogger.secondstate = "solid"
                    }
                    else {
                        frogger.y += frame;
                    }
                    end += frame;
                    frogger.y = Math.min( Math.max(grid, frogger.y), canvas.height - grid * 2);
                }, timeout)
            }
        }
    }
    if(ev.which === 27 && document.getElementById("game").style.display === "block") {
        goToStartMenu();
    }
    if(ev.which === 83 && document.getElementById("game").style.display === "block") {
        if( JSON.parse(localStorage.getItem(SAFE_SOUND)) === true) {
            localStorage.setItem(SAFE_SOUND, "false");
        } else {
            localStorage.setItem(SAFE_SOUND, "true");
        }
    }
    if(ev.which === 77 && document.getElementById("game").style.display === "block") {
        if( JSON.parse(localStorage.getItem(SAFE_MUSIC)) === true) {
            localStorage.setItem(SAFE_MUSIC, "false");
            stopTheme();
        } else {
            localStorage.setItem(SAFE_MUSIC, "true");
            playTheme();
        }
    }
}

function goToStartMenu() {
    toggleScreen("start-screen", true);
    toggleScreen("game", false);
    clearInterval(loop);
    stopTheme();
}

function playSound(sound) {
    if (JSON.parse(localStorage.getItem(SAFE_SOUND))) {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }
}

function checkHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

    if (score > lowestScore) {
        saveHighScore(score, highScores);
    }
}

function saveHighScore(score, highScores) {
    const name = "Player 1"
    const newScore = { score, name };

    // 1. Add to list
    highScores.push(newScore);

    // 2. Sort the list
    highScores.sort((a, b) => b.score - a.score);

    // 3. Select new list
    highScores.splice(NO_OF_HIGH_SCORES);

    // 4. Save to local storage
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}

const addSound = function (src) {
    const sound = new Audio();
    sound.src = src;
    return sound;
}

function preloadAssets() {
    let _toPreload = 0;
    let _toPreloadSound = 0;

    const addImage = function (src) {
        const img = new Image();
        img.src = src;
        _toPreload++;

        img.addEventListener('load', function () {
            _toPreload--;
        }, false);
        return img;
    };

    const addSound = function (src) {
        const sound = new Audio();
        sound.src = src;
        _toPreloadSound++;
        sound.addEventListener('load', function () {
            _toPreloadSound--;
        }, false)
        return sound;
    }

    //sprites
    gras = addImage("sprites/gras.jpg");
    brick = addImage("sprites/brick.png")
    sprites_up = addImage("sprites/frogger_sprites_up.png");
    sprites_down = addImage("sprites/frogger_sprites_down.png");
    sprites_right = addImage("sprites/frogger_sprites_right.png");
    sprites_left = addImage("sprites/frogger_sprites_left.png");
    sprites_mirrored = addImage("sprites/frogger_sprites_up_mirrored.png");
    sprites_down_mirrored = addImage("sprites/frogger_sprites_down_mirrored.png");
    sprites_left_mirrored = addImage("sprites/frogger_sprites_left_mirrored.png");
    turtles = addImage("sprites/turtles.png");

    //sounds
    theme = addSound("sounds/FroggerTheme.mp3");
    jump = addSound("sounds/jump.mp3");
    death = addSound("sounds/deathsound.mp3");

    const checkResources = function () {
        if (_toPreload === 0 && _toPreloadSound === 0) {

        }
        else {
            setTimeout(checkResources, 200);
        }
    };
    checkResources();
}

document.addEventListener("keydown", keyboardPressed)
