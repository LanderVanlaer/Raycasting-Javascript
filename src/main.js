//@ts-nocheck

let walls = [];
let particles = [];

Array.prototype.change = (i, j) => [this[i], this[j]] = [this[j], this[i]]; //For sorting the points


function setup() {
    createCanvas(1000, 600);
    walls.push(
        new Boundry(600, 50, 600, 509),
        new Boundry(390, 21, 467, 501),
        new Boundry(177, 164, 665, 374),
        new Boundry(943, 584, 772, 478),
        new Boundry(581, 111, 187, 0),
        new Boundry(600, 200, 500, 157),
        new Boundry(0, 0, 1000, 0),
        new Boundry(0, 0, 0, 600),
        new Boundry(0, 600, 1000, 600),
        new Boundry(1000, 600, 1000, 0)
    );

    let rays = [];
    walls.forEach((wall, i) => {
        rays.push(new Ray(wall.pt1.x, wall.pt1.y));
        rays.push(new Ray(wall.pt2.x, wall.pt2.y));

        walls.slice(i + 1).forEach(w => {
            const intersection = calcIntersection(wall, w);
            if (intersection) {
                rays.push(new Ray(intersection[0], intersection[1]));
            }
        })
    });


    particles.push(new Particle(300, 150, rays));
}

function draw() {
    background(89);
    stroke(255);
    particles.forEach(e => {
        e.pos.x = mouseX;
        e.pos.y = mouseY;
        e.update();
        e.draw(walls);
    });
    walls.forEach(e => e.draw());
}

function calcIntersection(boundry1, boundry2) {
    const x1 = boundry1.pt1.x;
    const y1 = boundry1.pt1.y;
    const x2 = boundry1.pt2.x;
    const y2 = boundry1.pt2.y;

    const x3 = boundry2.pt1.x;
    const y3 = boundry2.pt1.y;
    const x4 = boundry2.pt2.x;
    const y4 = boundry2.pt2.y;



    const dom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (!dom) return;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / dom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / dom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
    } else return;
}