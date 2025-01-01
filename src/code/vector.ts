export class Vector {
    x : number;
    y : number;

    constructor (x : number, y : number) {
        this.x = x;
        this.y = y;
    }

    set(x : number, y : number) {
        this.x = x;
        this.y = y;
    }

    subtract(other : Vector) {
        this.x -= other.x;
        this.y -= other.y;
    }

    add(other : Vector) {
        this.x += other.x;
        this.y += other.y;
    }

    subtractXY(x : number, y : number) {
        this.x -= x;
        this.y -= y;
    }

    clamp(length : number) {
        const current = Math.sqrt(this.x * this.x + this.y * this.y);
        
        if (current > length) {
            this.x = this.x / current * length;
            this.y = this.y / current * length;
        }
    }

    lerpXY(x : number, y : number, factor : number) {
        this.x = (x - this.x) * factor + this.x;
        this.y = (y - this.y) * factor + this.y;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    scalar(factor : number) {
        this.x *= factor;
        this.y *= factor;
    }
}