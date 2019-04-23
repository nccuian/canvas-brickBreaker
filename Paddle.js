class Paddle {
    constructor() {
        this.width = 180
        this.height = 25
        this.p = new Vector((ww/2)-(this.width/2), wh-35)
        const speed = 8
        this.velocity = new Vector(speed, 0)
    }

    draw() {
        c.save()
        c.fillStyle = 'white'
        c.shadowColor = 'white';
        c.shadowBlur = 10;
        c.beginPath()
        c.fillRect(this.p.x, this.p.y, this.width, this.height)
        c.restore()
    }
    move(drection) {
        drection === 'right'? this.p = this.p.add(this.velocity): this.p = this.p.sub(this.velocity);
        
        if(this.p.x<=0) {
            this.p.x = 0
        } else if(this.p.x+this.width>=ww) {
            this.p.x = ww-this.width
        }
    }
}