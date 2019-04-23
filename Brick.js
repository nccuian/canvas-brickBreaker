class Brick {
    constructor(width, height, position, color) {
        this.width = width || 75
        this.height = height || 25
        this.p = position || new Vector(0,0)
        this.point = 1
        this.color = color
    }
    draw() {
        const gradient = c.createLinearGradient(this.p.x,this.p.y, this.p.x+this.width,this.p.y+this.height);
        gradient.addColorStop(0, `rgba(${this.color}, 0.3)`);
        gradient.addColorStop(1, `rgba(${this.color}, 0.8)`);
        c.fillStyle = gradient
        c.strokeStyle = 'rgba(255,255,255,0.3)'
        c.beginPath()
        c.fillRect(this.p.x, this.p.y, this.width, this.height)
        c.strokeRect(this.p.x, this.p.y, this.width, this.height)
    }
    isCollide(ball) {
        if( this.p.x <= ball.p.x + ball.r &&
            this.p.x + this.width >= ball.p.x - ball.r &&
            this.p.y <= ball.p.y + ball.r &&
            this.p.y + this.height >= ball.p.y - ball.r
        ) {
            return true
        }
    }
}