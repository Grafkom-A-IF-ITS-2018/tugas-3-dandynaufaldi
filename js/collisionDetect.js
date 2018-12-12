// Collision Detector

class CollisionDetector {
    constructor(box, r) {
        this.box = box;
        this.r = r;

        this.THRESHOLD = 0.05;
    }

    buildCollider() {
        let point = this.box.position;
        this.BACK = this.calcPlaneEq(point[2], point[3], point[6]);
        this.FRONT = this.calcPlaneEq(point[1], point[4], point[5]);
        this.RIGHT = this.calcPlaneEq(point[1], point[3], point[5]);
        this.LEFT = this.calcPlaneEq(point[0], point[2], point[4]);
        this.BOTTOM = this.calcPlaneEq(point[1], point[2], point[3]);
        this.TOP = this.calcPlaneEq(point[4], point[5], point[6]);
    }

    calcPlaneEq(p1, p2, p3) {
        console.log(p1)
        // create 2 vector that lies on plane
        let v1 = [], v2 = [], normVec = []
        v1 = vec3.subtract(v1, p2, p1)
        v2 = vec3.subtract(v2, p3, p1)

        // calc norm vec from v1 and v2 cross product as
        // norm vec perpendicular to plane
        normVec = vec3.cross(normVec, v1, v2)

        // constant for plane equation
        // dot product from norm vec and any point on plane
        let point = p1.map(x => -x)
        let D = 0
        D = vec3.dot(normVec, point)
        // console.log(normVec)
        return normVec.concat(D)
    }

    calcPointPlaneDist(planeEq, point) {
        // planeEq = Ax + By + Cz + D, represented as [A, B, C, D]
        // point = [x, y, z]
        let p = point
        let numerator = Math.abs(planeEq[0] * p[0] +
            planeEq[1] * p[1] +
            planeEq[2] * p[2] + planeEq[3])
        let planeEqCoef = planeEq.slice(0, 3)
        let denominator = Math.sqrt(planeEqCoef.map(x => x * x).reduce((a, b) => a + b, 0))
        return numerator / denominator
    }

    detect() {
        let pos = this.r.position;
        for (let i = 0; i < pos.length; i++) {
            if (this.calcPointPlaneDist(this.TOP, pos[i]) < this.THRESHOLD && dir[1] > 0) { dir[1] *= -1; rotater *= -1; console.log("TOP"); return; }
            if (this.calcPointPlaneDist(this.TOP, pos[i]) < this.THRESHOLD && dir[1] < 0) { return; }
        }
        for (let i = 0; i < pos.length; i++) {
            if (this.calcPointPlaneDist(this.BOTTOM, pos[i]) < this.THRESHOLD && dir[1] < 0) { dir[1] *= -1; rotater *= -1; console.log("BOTTOM"); return; }
            if (this.calcPointPlaneDist(this.BOTTOM, pos[i]) < this.THRESHOLD && dir[1] > 0) { return; }
        }
        for (let i = 0; i < pos.length; i++) {
            if (this.calcPointPlaneDist(this.FRONT, pos[i]) < this.THRESHOLD && dir[2] > 0) { dir[2] *= -1; rotater *= -1; console.log("FRONT"); return; }
            if (this.calcPointPlaneDist(this.FRONT, pos[i]) < this.THRESHOLD && dir[2] < 0) { return; }
        }
        for (let i = 0; i < pos.length; i++) {
            if (this.calcPointPlaneDist(this.BACK, pos[i]) < this.THRESHOLD && dir[2] < 0) { dir[2] *= -1; rotater *= -1; console.log("BACK"); return; }
            if (this.calcPointPlaneDist(this.BACK, pos[i]) < this.THRESHOLD && dir[2] > 0) { return; }
        }
        for (let i = 0; i < pos.length; i++) {
            if (this.calcPointPlaneDist(this.RIGHT, pos[i]) < this.THRESHOLD && dir[0] > 0) { dir[0] *= -1; rotater *= -1; console.log("RIGHT"); return; }
            if (this.calcPointPlaneDist(this.RIGHT, pos[i]) < this.THRESHOLD && dir[0] < 0) { return; }
        }
        for (let i = 0; i < pos.length; i++) {
            if (this.calcPointPlaneDist(this.LEFT, pos[i]) < this.THRESHOLD && dir[0] < 0) { dir[0] *= -1; rotater *= -1; console.log("LEFT"); return; }
            if (this.calcPointPlaneDist(this.LEFT, pos[i]) < this.THRESHOLD && dir[0] < 0) { return; }
        }
    }
}