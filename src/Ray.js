//@ts-nocheck
class Ray {
    points = [];
    pos = createVector(0, 0);
    constructor(x1, y1) {
        this.lookingPos = createVector(x1, y1);
    }

    update(particle) {
        this.pos = particle.pos;
    }

    draw(boundrys) {
        this.points = [];
        let possibilities = [];
        boundrys.forEach(boundry => {
            const pos = this.cast(boundry);
            if (pos) {
                possibilities.push(pos);
            }
        })

        const calcClosestPoint = I =>
            possibilities.reduce(
                (object, [x, y], i) => {
                    if (I == i) return object;
                    const l = Math.hypot(this.pos.x - x, this.pos.y - y);
                    if (l < object.l) return { l, i };
                    else return object;
                }, {
                    l: Infinity,
                    i: -1
                }
            );

        const lineTo = (x, y) => {
            stroke(52, 255, 55);
            line(this.pos.x, this.pos.y, x, y);
            fill(255);
            circle(x, y, 10);

            this.points.push([x, y]); //To make polygon later on
        }

        if (possibilities.length) {
            const point = calcClosestPoint();
            const [x, y] = possibilities[point.i];

            lineTo(x, y);

            if (x == this.lookingPos.x && y == this.lookingPos.y) {
                const newPoint = calcClosestPoint(point.i);
                if (newPoint.l == Infinity) return;
                const [x, y] = possibilities[newPoint.i];

                lineTo(x, y);
            }
        }
    }

    cast(boundry) {
        const x1 = boundry.pt1.x;
        const y1 = boundry.pt1.y;
        const x2 = boundry.pt2.x;
        const y2 = boundry.pt2.y;

        if (this.lookingPos.x == boundry.pt1.x && this.lookingPos.y == boundry.pt1.y) return [this.lookingPos.x, this.lookingPos.y];
        if (this.lookingPos.x == boundry.pt2.x && this.lookingPos.y == boundry.pt2.y) return [this.lookingPos.x, this.lookingPos.y];

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + (this.lookingPos.x - this.pos.x) / Math.abs(this.lookingPos.x - this.pos.x);
        const y4 = this.pos.y + (this.lookingPos.y - this.pos.y) / Math.abs(this.lookingPos.x - this.pos.x);



        const dom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (!dom) return;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / dom;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / dom;

        if (t >= 0 && t <= 1 && u >= 0) {
            const [xt, yt] = [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
            const [xu, yu] = [x3 + u * (x4 - x3), y3 + u * (y4 - y3)];

            return [(xt + xu) / 2, (yt + yu) / 2];
        } else return;
    }
}