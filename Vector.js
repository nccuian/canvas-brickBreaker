class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y)
    }
    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y)
    }
    mul(s) {
        return new Vector(this.x * s, this.y * s)
    }
}