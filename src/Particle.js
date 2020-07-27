//@ts-nocheck
class Particle {
    constructor(x, y, rays = []) {
        this.pos = createVector(x, y);
        this.rays = rays;
    }

    draw(boundrys) {
        this.rays.forEach((ray, i) => {
            ray.draw(boundrys);
        })
        fill(255);
        circle(this.pos.x, this.pos.y, 20);
    }

    update() {
        this.rays.forEach(e => {
            e.update(this);
        });
    }
}