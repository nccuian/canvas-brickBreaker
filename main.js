const canvas = document.getElementById('mycanvas');
const c = canvas.getContext('2d');
let ww, wh;
const scoreDisplay = document.querySelector('.score h1')
const infoDisplay = document.querySelector('.info')
const infoDisplayH1 = document.querySelector('.info h1')

let score = 0
let scoreLastTime = 0
let paddle
let ball 
let bricks
let gameStatus //確認正在玩或破關或失敗

function setCanvasSize() {
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;
}
function clear() {
    c.fillStyle = 'rgba(45, 45, 45, 0.6)'
    c.fillRect(0,0,ww,wh)
}

// 偵測鍵盤
let keyIsDown
function keyDown(code, isKeyup) {
    if(isKeyup) {                                          //按鍵放開時paddle停掉
        keyIsDown = null
    } else {                                                        
        if(gameStatus==='lose' || gameStatus==='win') {    //結束時隨便按重置遊戲
            setup()
            score = 0
            scoreDisplay.innerText = `SCORE : ${score}`
        } else {
            if(code == 37) {                               //按左按右、暫停
                keyIsDown =  'left'
            } else if (code == 39) {
                keyIsDown =  'right'
            } else if (code == 32) {
                gameStatus = gameStatus==='playing'? 'pause': 'playing'
            } else keyIsDown =  null
        }
    }
}

function createBricks(brick_rows, brick_per_Row) {
    const bricks = []
    const rows = brick_rows
    const brickPerRow = brick_per_Row
    const brickWidth = ww/brickPerRow
    const brickHeight = 25
    const colors = [
        '244, 92, 65','244, 151, 65', '244, 205, 65', '220, 244, 65', '157, 244, 65',
        '65, 244, 100', '65, 244, 196', '65, 166, 244', '65, 73, 244', '178, 65, 244'
        ]
    for(let row = 0; row < rows; row++) {
        for(let i = 0; i < brickPerRow; i++) {
            const position = {
                x: brickWidth * i,
                y: brickHeight * row
            }
            const brick = new Brick(brickWidth, brickHeight, position, colors[i])
            bricks.push(brick)
        }
    }
    return bricks
}

//////////////////////////

function setup() {
    setCanvasSize()
    
    paddle = new Paddle()
    ball = new Ball(paddle)
    bricks = createBricks(8, 10) // (brick_rows, brick_per_Row)
    scoreLastTime = localStorage.getItem('score') === null? 0: localStorage.getItem('score')
    gameStatus = 'playing'
}

function draw() {
    clear()
    
    paddle.draw()
    
    if(keyIsDown=='left') {
        paddle.move('left')
    } else if (keyIsDown=='right') {
        paddle.move('right')
    }

    ball.draw()
    ball.update()

    //handle bricks
    for(let i = bricks.length-1; i >= 0 ; i--) {
        const brick = bricks[i]
        if(brick.isCollide(ball)) {
            ball.velocity = ball.velocity.mul(1.03)
            ball.velocity.y *= -1
            bricks.splice(i, 1)
            score += brick.point
            scoreDisplay.innerText = `SCORE : ${score}`
        } else {
            brick.draw() //沒撞掉、沒從陣列移除才畫，不然會一直重畫出來
        }
    }

    gameStatus = ball.isBelowBottom()? 'lose': bricks.length === 0? 'win': 'playing'
}

//持續確認遊戲狀態
const check = () => {
    if(gameStatus==='playing') {
        infoDisplay.style = 'opacity: 0'
        draw()
    } else {
        if(gameStatus === 'lose') {
            localStorage.setItem('score', score)
            let txt
            if(scoreLastTime<score) {
                txt = `but you made progress from 
                    <span>${scoreLastTime}</span> to <span>${score}</span>. Good job`
            } else if(scoreLastTime>score) {
                txt = `and you dropped from 
                    <span>${scoreLastTime}</span> to <span>${score}</span>. Keep going`
            } else {
                txt = `and you got the same point as last time 
                    <span>${scoreLastTime}</span>. Keep going`
            }
            infoDisplay.style = 'opacity: 1'
            infoDisplayH1.style.fontSize = '2.5rem'
            infoDisplayH1.innerHTML = `You Lose, ${txt}`
        } else if(gameStatus === 'win'){
            infoDisplay.style = 'opacity: 1'
            infoDisplayH1.innerText = 'You Win. Nice'
        } else if(gameStatus === 'pause'){
            infoDisplay.style = 'opacity: 1'
            infoDisplayH1.style.fontSize = '5rem'
            infoDisplayH1.innerText = 'PAUSE'
        } else {
            draw();
        }
    }
    requestAnimationFrame(check)
}

window.addEventListener('resize', setup)
window.addEventListener('keydown', (e) => {
    keyDown(e.keyCode)
}) 
window.addEventListener('keyup', (e) => {
    keyDown(e.keyCode, true)
}) 

setup();
check()