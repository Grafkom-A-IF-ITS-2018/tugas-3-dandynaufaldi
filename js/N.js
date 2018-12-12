
function NGeometry(depth, width, height, color = new Color("0xFFFF00")) {
    Geometry.call(this);

    this.type = 'geometry';
    var w = width || 4;
    var h = height || 6;
    var d = depth || 1;

    this.vertices = [
        // front left
        -2.0, -3.0, 0.0,   //2 
        -1.0, -3.0, 0.0,  //1 
        -1.0, 3.0, 0.0,   //5
        -2.0, 3.0, 0.0,   //3

        // front diagonal
        -1.0, 3.0, 0.0,   //5
        -1.0, 1.0, 0.0,   //4
        1.0, -3.0, 0.0,   //6
        1.0, -1.0, 0.0,   //7

        // front right
        1.0, -3.0, 0.0,   //6
        2.0, -3.0, 0.0,   //8
        2.0, 3.0, 0.0,    //10
        1.0, 3.0, 0.0,    //9

        // back left
        -2.0, -3.0, -1.0,   //2 
        -1.0, -3.0, -1.0,  //1 
        -1.0, 3.0, -1.0,   //5
        -2.0, 3.0, -1.0,   //3

        // back diagonal
        -1.0, 3.0, -1.0,   //5
        -1.0, 1.0, -1.0,   //4
        1.0, -3.0, -1.0,   //6
        1.0, -1.0, -1.0,   //7

        // back right
        1.0, -3.0, -1.0,   //6
        2.0, -3.0, -1.0,   //8
        2.0, 3.0, -1.0,    //10
        1.0, 3.0, -1.0,    //9


        // top diagonal
        -1.0, 3.0, 0.0,   //5
        1.0, -1.0, 0.0,   //7
        1.0, -1.0, -1.0,   //7
        -1.0, 3.0, -1.0,   //5

        // vertical inner right
        1.0, 3.0, 0.0,    //9
        1.0, -1.0, 0.0,   //7
        1.0, -1.0, -1.0,   //7
        1.0, 3.0, -1.0,    //9

        // vertical outer right
        2.0, -3.0, 0.0,   //8
        2.0, 3.0, 0.0,    //10
        2.0, 3.0, -1.0,    //10
        2.0, -3.0, -1.0,   //8

        // bottom diagonal
        -1.0, 1.0, 0.0,   //4
        1.0, -3.0, 0.0,   //6
        1.0, -3.0, -1.0,   //6
        -1.0, 1.0, -1.0,   //4

        // vertical inner left
        -1.0, 1.0, 0.0,   //4
        -1.0, -3.0, 0.0,  //1
        -1.0, -3.0, -1.0,  //1
        -1.0, 1.0, -1.0,   //4

        // vertical outer left
        -2.0, -3.0, 0.0,   //2
        -2.0, 3.0, 0.0,   //3
        -2.0, 3.0, -1.0,   //3
        -2.0, -3.0, -1.0,   //2

        // top left
        -1.0, 3.0, 0.0,   //5
        -2.0, 3.0, 0.0,   //3
        -2.0, 3.0, -1.0,   //3
        -1.0, 3.0, -1.0,   //5

        // top right
        1.0, 3.0, 0.0,    //9
        2.0, 3.0, 0.0,    //10
        2.0, 3.0, -1.0,    //10
        1.0, 3.0, -1.0,    //9

        // bottom right
        2.0, -3.0, 0.0,   //8
        1.0, -3.0, 0.0,   //6
        1.0, -3.0, -1.0,   //6
        2.0, -3.0, -1.0,   //8

        // bottom left
        -2.0, -3.0, 0.0,   //2
        -1.0, -3.0, 0.0,  //1
        -1.0, -3.0, -1.0,  //1
        -2.0, -3.0, -1.0,   //2
    ];

    this.indices = [];
    for (let i = 0; i < 16; i++) {
        this.indices = this.indices.concat([i * 4, i * 4 + 1, i * 4 + 2])
        this.indices = this.indices.concat([i * 4, i * 4 + 2, i * 4 + 3])
    }
    this.position = []
    for (let i = 0; i < this.vertices.length / 3; i++) {
        this.position.push([this.vertices[i * 3], this.vertices[i * 3 + 1], this.vertices[i * 3 + 2], 1])
    }
    this.vertices_ = Object.assign([], this.position);
    this.normals = [];
    this.textureCoord = [];
    for (let i = 0; i < this.vertices.length / 3; i++) {
        this.textureCoord.push(0.0, 0.0);
    }
    for (let i = 0; i < this.vertices.length / 6; i++) {
        this.normals.push(0.0, 0.0, 1.0);
    }
    for (let i = 0; i < this.vertices.length / 6; i++) {
        this.normals.push(0.0, 1.0, 0.0);
    }
    this.colors = []
    for (let i = 0; i < this.vertices.length / 3; i++) {
        this.colors.push(color.r / 255, color.g / 255, color.b / 255, 1.0);
    }

    this.textureSrc = undefined; //'Crate.jpg';
}

NGeometry.prototype.constructor = NGeometry;

NGeometry.prototype.render = function () {
    this.temporaryMatrixWorld = Object.assign({}, this.matrixWorld);
    document.addEventListener(this.id, this.action.bind(this));
}

NGeometry.prototype.findCenter = function () {
    let center = [0, 0, 0];
    for (let i = 0; i < this.position.length / 2; i++) {
        center[0] += this.position[i][0];
        center[1] += this.position[i][1];
        center[2] += this.position[i][2];
    }
    center[0] /= this.position.length / 2;
    center[1] /= this.position.length / 2;
    center[2] /= this.position.length / 2;
    return center;
}

NGeometry.prototype.action = function () {

}