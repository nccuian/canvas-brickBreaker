class Ball {
    constructor(paddle) {
        this.r = 15
        this.p = new Vector(paddle.p.x+paddle.width/2, paddle.p.y-this.r-3)
        this.velocity = new Vector(5, -5)
        this.paddle = paddle
    }
    bounceEage() {
        if(this.p.x + this.r >= ww || this.p.x - this.r <= 0) {
            this.velocity.x *= -1
        } else if(this.p.y - this.r <= 0) {
            this.velocity.y *= -1
        }
    }
    bouncePaddle() {
        //first ball inside the width of paddle
        if(this.paddle.p.x <= this.p.x+this.r && 
            this.paddle.p.x+this.paddle.width >= this.p.x-this.r) {
                if(this.p.y+this.r >= this.paddle.p.y) {
                    this.p.y = this.paddle.p.y - this.r - 1 //在接觸瞬間拉開一點空間，避免一直感應
                    this.velocity.y *= -1
                }
            }
    }
    isBelowBottom() {
        return this.p.y - this.r > wh
    }
    draw() {
        c.fillStyle = '#d34904'
        c.beginPath()
        c.arc(this.p.x, this.p.y, this.r, 0, Math.PI*2)
        c.fill()
        c.strokeStyle = '#313233'
        c.beginPath()
        c.moveTo(this.p.x, this.p.y-this.r)
        c.lineTo(this.p.x, this.p.y+this.r)
        c.moveTo(this.p.x-this.r, this.p.y)
        c.lineTo(this.p.x+this.r, this.p.y)
        c.moveTo(this.p.x-this.r*Math.cos(45*(Math.PI/180)), this.p.y-this.r*Math.sin(45*(Math.PI/180)))
        c.lineTo(this.p.x+this.r*Math.cos(45*(Math.PI/180)), this.p.y+this.r*Math.sin(45*(Math.PI/180)))
        c.moveTo(this.p.x+this.r*Math.cos(45*(Math.PI/180)), this.p.y-this.r*Math.sin(45*(Math.PI/180)))
        c.lineTo(this.p.x-this.r*Math.cos(45*(Math.PI/180)), this.p.y+this.r*Math.sin(45*(Math.PI/180)))
        c.stroke()
    }
    update() {
        //撞到邊反彈
        this.bounceEage()
        //撞到paddle反彈
        this.bouncePaddle()

        this.p = this.p.add(this.velocity)
    }
}