//@ts-nocheck
class Particle {
    constructor(x, y, rays = []) {
        this.pos = createVector(x, y);
        this.rays = rays;
    }

    draw(boundrys) {
        let points = [];
        this.rays.forEach(ray => {
            ray.draw(boundrys);
            points.push(...ray.points);
        })


        points = this.sortPoints(points);

        fill(54);
        stroke(0);
        beginShape();
        points.forEach(p => {
            if (!p) return console.log("skip");;
            vertex(p[0], p[1]);
        });
        endShape(CLOSE);


        fill(255);
        circle(this.pos.x, this.pos.y, 20);
    }

    update() {
        this.rays.forEach(e => {
            e.update(this);
        });
    }

    sortPoints(points) {
        let array = [];
        const degreesPoints = points.map(p => {
            const distance = Math.hypot(this.pos.x - p[0], this.pos.y - p[1]);
            const cos = (p[0] - this.pos.x) / distance;
            const sin = (this.pos.y - p[1]) / distance;

            if (sin < 0) return Math.PI * 2 - Math.acos(cos);
            else return Math.acos(cos)
        });
        for (let j = 0; j < points.length; j++) {
            let value = Infinity;
            let index = -1;
            for (let i = 0; i < degreesPoints.length; ++i) {
                if (array.some(pt => pt.i == i)) continue;
                if (degreesPoints[i] < value) {
                    index = i;
                    value = degreesPoints[i];
                }
            }
            array.push({
                i: index,
                point: points[index]
            });
        }
        return array.map(x => x.point);
    }
}