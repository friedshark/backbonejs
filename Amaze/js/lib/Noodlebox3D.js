define([], function() {

var Noodlebox3D = Noodlebox3D || {};

var N3D = Noodlebox3D;

N3D.nbx_pointers = {};

N3D.nbx_pointers.warnings = true;



/*

// scale the depth to between 0 and 1
float scaledDepth = clamp((depth-near)/(far-near), 0.0, 1.0);
float highByte = scaledDepth;
float lowByte = fract(scaleDepth*255.0);
gl_FragColor = vec4(highByte, lowByte, 0.0, 0.0);
You can then unpack when looking it up:

glsl
vec2 bytes = texture2D(source, texcoord).xy;
float scaledDepth = bytes.x + bytes.y/255.0;

*/








/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};
N3D.glMatrix=glMatrix;

// Constants
glMatrix.EPSILON = 0.000001;
glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
glMatrix.RANDOM = Math.random;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}

//module.exports = glMatrix;




////////////////





/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

//var glMatrix = require("./common.js");

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};
N3D.vec3 = vec3;

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};


/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};











///////////////
















/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

//var glMatrix = require("./common.js");

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {};
N3D.mat4 = mat4;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};


/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.fromRotation = function(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
  // Quaternion math
  var x = q[0], y = q[1], z = q[2], w = q[3],
      x2 = x + x,
      y2 = y + y,
      z2 = z + z,

      xx = x * x2,
      xy = x * y2,
      xz = x * z2,
      yy = y * y2,
      yz = y * z2,
      zz = z * z2,
      wx = w * x2,
      wy = w * y2,
      wz = w * z2,

      sx = s[0],
      sy = s[1],
      sz = s[2],

      ox = o[0],
      oy = o[1],
      oz = o[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;

  return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
        Math.abs(eyey - centery) < glMatrix.EPSILON &&
        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};
























String.prototype.trim = String.prototype.trim || function trim() { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };


/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000/60);
         };
})();



Noodlebox3D.init = function(canvas, alpha, antialias, preserveDrawingBuffer, multiplied, callback){

    if (alpha!=true) alpha=false;
    if (antialias!=true) antialias=false;

    if (preserveDrawingBuffer!=true) preserveDrawingBuffer=false;
    if (multiplied!=true) multiplied=false;

    var gl;

    try {

        gl = canvas.getContext("webgl", {alpha:alpha,antialias:antialias,preserveDrawingBuffer:preserveDrawingBuffer,premultipliedAlpha:multiplied}) || canvas.getContext("experimental-webgl", {alpha:alpha,antialias:antialias,preserveDrawingBuffer:preserveDrawingBuffer,premultipliedAlpha:multiplied});
        gl.canvas = canvas;
        gl.viewportWidth = gl.drawingBufferWidth;
        gl.viewportHeight = gl.drawingBufferHeight;

    } catch (e) {
        if (callback) {
            callback();
        }else {
            alert("Could not initialise WebGL, sorry :-(");
        }
        return;
    }

    if (!gl) {
        if (callback) {
            callback();
        }else {
            alert("Could not initialise WebGL, sorry :-(");
        }
        return;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);

    // 2d rectangle

    gl.unit2DBuffer = Noodlebox3D.createStaticBuffer(
        gl,
        gl.ARRAY_BUFFER,
        [-1,-1,0,0, 1,-1,1,0, 1,1,1,1, 1,1,1,1, -1,1,0,1, -1,-1,0,0],
        Float32Array,
        6,
        [ ["aVertexPosition",2,gl.FLOAT] , ["aVertexUV",2,gl.FLOAT] ]
        );

    // full 3d

    gl.unit3DBuffer = Noodlebox3D.createStaticBuffer(
        gl,
        gl.ARRAY_BUFFER,
        [-1,-1,0,0,0, 1,-1,0,1,0, 1,1,0,1,1, -1,-1,0,0,0, 1,1,0,1,1, -1,1,0,0,1],
        Float32Array,
        6,
        [ ["aVertexPosition",3,gl.FLOAT] , ["aVertexUV",2,gl.FLOAT] ]
        );

    //

    gl.nbx_pointers = {};

    return gl;

};

Noodlebox3D.compileShaderScript = function(gl, idOrScript, type) {

    var str = "";

    var shaderScript = document.getElementById(idOrScript);

    if (!shaderScript) {

        str = idOrScript;

    } else {

        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        if (shaderScript.type == "x-shader/x-fragment") type="fragment";
        if (shaderScript.type == "x-shader/x-vertex") type ="vertex";

    }

    //

    var pointers=[];

    var lines=str.split(";");
    var thisLine;
    for (var i = 0; i < lines.length; i++) {
        thisLine = lines[i].trim().split(" ");
        if (thisLine[0]=="attribute"||thisLine[0]=="uniform") {
            pointers.push(thisLine);
        }
        if (thisLine[0]=="void") break;
    };

    var shader;
    if (type=="fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type=="vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    shader.nbx_pointers = pointers;

    return shader;

}

Noodlebox3D.compileProgram = function(gl, vertexShader, fragmentShader) {

        if (vertexShader.substring) vertexShader=Noodlebox3D.compileShaderScript(gl,vertexShader,"vertex");
        if (fragmentShader.substring) fragmentShader=Noodlebox3D.compileShaderScript(gl,fragmentShader,"fragment");

        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert(gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        var pointers = shaderProgram.nbx_pointers = vertexShader.nbx_pointers.concat(fragmentShader.nbx_pointers);

        var thisPointer;
        for (var i = 0; i < pointers.length; i++) {
            thisPointer = pointers[i];
            var thisPointerName = thisPointer[2].split("[")[0];
            if (shaderProgram["p_"+thisPointerName]==undefined) {
                if (thisPointer[0]=="attribute") {
                    shaderProgram["p_"+thisPointerName]=gl.getAttribLocation(shaderProgram,thisPointerName);
                } else {
                    if (thisPointer[0]=="uniform") {
                        shaderProgram["p_"+thisPointerName]=gl.getUniformLocation(shaderProgram,thisPointerName);
                    }
                }
            }
        };

        return shaderProgram;

}

Noodlebox3D.createIndexBuffer = function(gl, indexes) {

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);
        indexBuffer.numItems = indexes.length;
        indexBuffer.numberOfIndexes = indexes.length;

        return indexBuffer;

}

Noodlebox3D.createStaticBufferSet = function(gl, dataArray, numberOfVertices, indexes, dataDescription) {

      // number of vertices is obsolete

    if (!dataDescription) {

        dataDescription = indexes;
        indexes=numberOfVertices;

    }


    var buffer = Noodlebox3D.createStaticBuffer(gl, gl.ARRAY_BUFFER, dataArray, Float32Array, numberOfVertices, dataDescription);

    buffer.indexBuffer = Noodlebox3D.createIndexBuffer(gl, indexes);

    return buffer;

}

// [ ["name",length,sizeOfEachItem] , ["loc",3,4] , ["uv",2,4] ]

Noodlebox3D.createStaticBuffer = function(gl, bufferType, dataArray, dataType, numberOfVertices, dataDescription) {

        // number of vertices is obsolete

        if (!dataDescription) dataDescription = numberOfVertices;

        var newBuffer = gl.createBuffer();
        gl.bindBuffer(bufferType, newBuffer);
        gl.bufferData(bufferType, new dataType(dataArray), gl.STATIC_DRAW);

        if (dataDescription!=undefined) {

            newBuffer.nbx_description = dataDescription;

            var indexData = {};
            var indexOffset = 0;

            var itemSize;

            var totalVertexSize = 0;

            for (var i = 0; i < dataDescription.length; i++) {

                var item = dataDescription[i];
                if (item[2]==gl.FLOAT) itemSize = 4;

                newBuffer["p_"+item[0]] = {offset:indexOffset, length:item[1], type:item[2]};

                indexOffset += item[1]*itemSize;

                totalVertexSize += item[1];
            };

            newBuffer.p_stride = indexOffset;

        }

        newBuffer.itemSize = totalVertexSize;//dataArray.length / numberOfVertices;
        newBuffer.numItems = dataArray.length / totalVertexSize;// numberOfVertices;
        newBuffer.numberOfVertices = newBuffer.numItems;

        return newBuffer;

}

Noodlebox3D.vertexAttribPointers = function(gl, glProgram, buffer, normalised) {

    if (normalised == undefined) normalised = false;

    var bufferPropertyName;

    for (var i = 0; i < glProgram.nbx_pointers.length; i++) {

        if (glProgram.nbx_pointers[i][0]=="attribute") {

            bufferPropertyName = "p_"+glProgram.nbx_pointers[i][2];

            gl.vertexAttribPointer( glProgram[bufferPropertyName],
                                    buffer[bufferPropertyName].length,
                                    buffer[bufferPropertyName].type, normalised,
                                    buffer.p_stride,
                                    buffer[bufferPropertyName].offset
                                    );

        }

    };

}

Noodlebox3D.vertexAttribPointer = function(gl, glProgram, programAttributeName, buffer, bufferPropertyName, normalised) {

    if (normalised == undefined) normalised = false;

    if (bufferPropertyName == undefined) bufferPropertyName = programAttributeName;

    bufferPropertyName = "p_"+bufferPropertyName;

    gl.vertexAttribPointer( glProgram["p_"+programAttributeName],
                            buffer[bufferPropertyName].length,
                            buffer[bufferPropertyName].type, normalised,
                            buffer.p_stride,
                            buffer[bufferPropertyName].offset
                            );

}

Noodlebox3D.samplerPointer = function(gl, program, programUniformName, samplerIndex, texture) {

    gl.activeTexture(gl["TEXTURE"+samplerIndex]);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(program["p_"+programUniformName], samplerIndex);

}

Noodlebox3D.matrixPointer = function(gl, program, programMatrixName, matrix) {

    gl.uniformMatrix4fv(program["p_"+programMatrixName], false, matrix);

}

Noodlebox3D.setUniformFloat = function(gl, uniformName) {

    if (isNaN(arguments[2])){

        switch (arguments[2].length) {

            case 1:
                gl.uniform1fv(uniformName, arguments[2] );
                break;
            case 2:
                gl.uniform2fv(uniformName, arguments[2] );
                break;
            case 3:
                gl.uniform3fv(uniformName, arguments[2] );
                break;
            case 4:
                gl.uniform4fv(uniformName, arguments[2] );
                break;

        }

    } else {

        switch (arguments.length) {

            case 3:
                gl.uniform1f(uniformName, arguments[2] );
                break;
            case 4:
                gl.uniform2f(uniformName, arguments[2], arguments[3] );
                break;
            case 5:
                gl.uniform3f(uniformName, arguments[2], arguments[3], arguments[4] );
                break;
            case 6:
                gl.uniform4f(uniformName, arguments[2], arguments[3], arguments[4], arguments[5] );
                break;

        }
    }

}

Noodlebox3D.setUniformArray = function(gl, uniformName, uniformValue) {

    console.log("this function is deprecated");

        switch (uniformValue.length) {

            case 1:
                gl.uniform1fv(uniformName, uniformValue );
                break;
            case 2:
                gl.uniform2fv(uniformName, uniformValue );
                break;
            case 3:
                gl.uniform3fv(uniformName, uniformValue );
                break;
            case 4:
                gl.uniform4fv(uniformName, uniformValue );
                break;

        }

}

Noodlebox3D.clear = function(gl, color, depth) {

    if (color == undefined) color = true;
    if (depth == undefined) depth = true;

    if (color == true) color = gl.COLOR_BUFFER_BIT;
    if (depth == true) depth = gl.DEPTH_BUFFER_BIT;

    gl.clear(color | depth);

}

Noodlebox3D.createTextureFromURL = function(gl, URL, alpha, minFilter, magFilter, clamp) {

    if (minFilter==undefined) minFilter = gl.NEAREST;
    if (magFilter==undefined) magFilter = gl.NEAREST;

    var mode=gl.RGB;
    if (alpha==true) mode=gl.RGBA;

    var texture = gl.createTexture();
    var textureImage = new Image();
    textureImage.crossOrigin = "anonymous";

    texture.loaded = false;

    textureImage.onload = function(){

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, mode, mode, gl.UNSIGNED_BYTE, this);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);

        if (clamp) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        } else {

        }

        if (minFilter==gl.LINEAR_MIPMAP_NEAREST||magFilter==gl.LINEAR_MIPMAP_NEAREST) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }

        gl.bindTexture(gl.TEXTURE_2D, null);

        texture.loaded = true;

        this.onload = null;

    };

    textureImage.src = URL;

    return texture;

}

Noodlebox3D.deleteTexture = function(gl, texture) {

        //gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.deleteTexture(texture);
        //gl.bindTexture(gl.TEXTURE_2D, null);

}

Noodlebox3D.createDoubleTexture = function(gl, widthAndHeight, alpha, minFilter, magFilter, clamp) {

    var result = [ Noodlebox3D.createTexture(gl, widthAndHeight, alpha, minFilter, magFilter, clamp),
        Noodlebox3D.createTexture(gl, widthAndHeight, alpha, minFilter, magFilter, clamp)];

    result.current = 0;
    result.notCurrent = 1;

    result.flip = function () {
        if (result.current==0) {

            result.current = 1;
            result.notCurrent = 0;

        } else {

            result.current = 0;
            result.notCurrent = 1;

        }
    }

    return result;

}

Noodlebox3D.createTexture = function(gl, widthAndHeight, alpha, minFilter, magFilter, clamp) {

    if (minFilter==undefined) minFilter = gl.NEAREST;
    if (magFilter==undefined) magFilter = gl.NEAREST;

    var mode=gl.RGB;
    if (alpha==true) mode=gl.RGBA;

    var texture = gl.createTexture();

    texture.width=widthAndHeight;
    texture.height=widthAndHeight;

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texImage2D(gl.TEXTURE_2D, 0, mode, widthAndHeight, widthAndHeight, 0, mode, gl.UNSIGNED_BYTE, null);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);

    if (clamp) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);

    return texture;

}

Noodlebox3D.copyImageToTexture = function(gl, texture, imageVideoOrCanvas) {

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageVideoOrCanvas);

        gl.bindTexture(gl.TEXTURE_2D, null);

}

Noodlebox3D.createRenderableTexture = function(gl, widthAndHeight, alpha, depth, minFilter, magFilter, clamp) {

    return Noodlebox3D.createOffscreenBuffer(gl, widthAndHeight, alpha, depth, minFilter, magFilter, clamp).texture;

}


Noodlebox3D.createDoubleRenderableTexture = function(gl, widthAndHeight, alpha, depth, minFilter, magFilter, clamp) {

    var result = [Noodlebox3D.createOffscreenBuffer(gl, widthAndHeight, alpha, depth, minFilter, magFilter, clamp).texture,
            Noodlebox3D.createOffscreenBuffer(gl, widthAndHeight, alpha, depth, minFilter, magFilter, clamp).texture];

    result.current = 0;
    result.notCurrent = 1;

    result.flip = function () {
        if (result.current==0) {

            result.current = 1;
            result.notCurrent = 0;

        } else {

            result.current = 0;
            result.notCurrent = 1;

        }
    }

    return result;

}

Noodlebox3D.createOffscreenBuffer = function(gl, widthAndHeight, alpha, depth, minFilter, magFilter, clamp) {

        if (minFilter==undefined) minFilter = gl.NEAREST;
        if (magFilter==undefined) magFilter = gl.NEAREST;

        var mode=gl.RGB;
        if (alpha==true) mode=gl.RGBA;

        if (depth===undefined) depth=false;

        var frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

        frameBuffer.width = widthAndHeight;
        frameBuffer.height = widthAndHeight;

        var frameBufferTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, frameBufferTexture);

        gl.texImage2D(gl.TEXTURE_2D, 0, mode, frameBuffer.width, frameBuffer.height, 0, mode, gl.UNSIGNED_BYTE, null);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);

        if (clamp) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }

        frameBufferTexture.width=frameBuffer.width;
        frameBufferTexture.height=frameBuffer.height;

        if (depth) {

            var renderbuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, frameBuffer.width, frameBuffer.height);

        }

        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, frameBufferTexture, 0);
        if (depth) gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

        gl.bindTexture(gl.TEXTURE_2D, null);
        if (depth) gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        frameBuffer.texture = frameBufferTexture;
        if (depth) frameBuffer.renderbuffer = renderbuffer;
        frameBufferTexture.frameBuffer = frameBuffer;

        return frameBuffer;

}

Noodlebox3D.enableRenderToTexture = function(gl, renderableTexture) {

        gl.bindFramebuffer(gl.FRAMEBUFFER, renderableTexture.frameBuffer);
        gl.viewport(0, 0, renderableTexture.width, renderableTexture.height);

        gl.nbx_targetTexture = renderableTexture;

}

Noodlebox3D.disableRenderToTexture = function(gl, renderableTexture) {

        if (renderableTexture == undefined) renderableTexture = gl.nbx_targetTexture;

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

}

Noodlebox3D.startProgram = function(gl, program, optionalVertexBuffer, optionalIndexBuffer) {

    gl.useProgram(program);

    Noodlebox3D.enableAttributes(gl, program);

    gl.nbx_currentProgram = program;

    if (optionalVertexBuffer!=undefined) {

        gl.bindBuffer(gl.ARRAY_BUFFER, optionalVertexBuffer);

        Noodlebox3D.vertexAttribPointers(gl, program, optionalVertexBuffer);

    }

    if (optionalIndexBuffer!=undefined) {

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, optionalIndexBuffer);

    }

}

Noodlebox3D.endProgram = function(gl) {

    Noodlebox3D.disableAttributes(gl, gl.nbx_currentProgram);

}

Noodlebox3D.enableAttributes = function(gl, program) {

        var count = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

        for (var i = 0; i < count; i++)
        {
            gl.enableVertexAttribArray(i);
        }

}

Noodlebox3D.disableAttributes = function(gl, program) {

        var count = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

        for (var i = 0; i < count; i++)
        {
            gl.disableVertexAttribArray(i);
        }

}



























Noodlebox3D.flatFill = function(gl, colorArrayVec4) {

    if (gl.nbx_pointers.flatFillProgram===undefined) {

        gl.nbx_pointers.flatFillProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"), //"flat-fill-shader-vs"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.flat_fill_shader_fs,"fragment") // "flat-fill-shader-fs")
        );
    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.flatFillProgram, gl.unit2DBuffer);

    gl.uniform4fv(gl.nbx_pointers.flatFillProgram.p_uColor, colorArrayVec4);

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}

Noodlebox3D.differenceFilter = function(gl, texture1, texture2, colorTransformVec2) {

    if (colorTransformVec2===undefined) colorTransformVec2 = new Float32Array( [-0.1,4.2] );

    if (gl.nbx_pointers.differenceProgram===undefined) {

        gl.nbx_pointers.differenceProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.texture_difference_shader_fs,"fragment")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.differenceProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.uniform1i(gl.nbx_pointers.differenceProgram.p_uSampler1, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.uniform1i(gl.nbx_pointers.differenceProgram.p_uSampler2, 1);

    gl.uniform2fv(gl.nbx_pointers.differenceProgram.p_uColorTransform, colorTransformVec2 );

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}


Noodlebox3D.trackingFilter = function(gl, baseTexture, textureToTrack, colorTransformVec2) {

    if (colorTransformVec2===undefined) colorTransformVec2 = new Float32Array( [-4/255,4/255] );

    if (gl.nbx_pointers.trackingProgram===undefined) {

        gl.nbx_pointers.trackingProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.texture_tracking_shader_fs,"fragment")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.trackingProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, baseTexture);
    gl.uniform1i(gl.nbx_pointers.trackingProgram.p_uBase, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textureToTrack);
    gl.uniform1i(gl.nbx_pointers.trackingProgram.p_uTracker, 1);

    gl.uniform2fv(gl.nbx_pointers.trackingProgram.p_uFactors, colorTransformVec2 );

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}

Noodlebox3D.detailedTrackingFilter = function(gl, baseTexture, textureToTrack, colorTransformVec2) {

    if (colorTransformVec2===undefined) colorTransformVec2 = new Float32Array( [-4/255,4/255] );

    if (gl.nbx_pointers.detailedTrackingProgram===undefined) {

        gl.nbx_pointers.detailedTrackingProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, "detailed-texture-tracking-shader-fs","fragment")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.detailedTrackingProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, baseTexture);
    gl.uniform1i(gl.nbx_pointers.detailedTrackingProgram.p_uBase, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textureToTrack);
    gl.uniform1i(gl.nbx_pointers.detailedTrackingProgram.p_uTracker, 1);

    gl.uniform2fv(gl.nbx_pointers.detailedTrackingProgram.p_uFactors, colorTransformVec2 );

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}

Noodlebox3D.textureFillFilter = function(gl, texture, colorMultiplier, colorOffset) {

    // This is the new prototype filter

    if (colorMultiplier) {

        if (gl.nbx_pointers.transformedTextureFillProgram===undefined) {

            gl.nbx_pointers.transformedTextureFillProgram = Noodlebox3D.compileProgram(
                gl,
                Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
                Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.texture_fill_transformed_shader_fs,"fragment")
            );

        }

        Noodlebox3D.startProgram(gl, gl.nbx_pointers.transformedTextureFillProgram, gl.unit2DBuffer );

        Noodlebox3D.samplerPointer(gl, gl.nbx_pointers.transformedTextureFillProgram, "uSampler", 0, texture);

        gl.uniform4fv(gl.nbx_pointers.transformedTextureFillProgram.p_uColorMultiplier, new Float32Array(colorMultiplier));
        gl.uniform4fv(gl.nbx_pointers.transformedTextureFillProgram.p_uColorOffset, new Float32Array(colorOffset));

        gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

        Noodlebox3D.endProgram(gl);

    } else {

        if (gl.nbx_pointers.textureFillProgram===undefined) {

            gl.nbx_pointers.textureFillProgram = Noodlebox3D.compileProgram(
                gl,
                Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
                Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.texture_fill_shader_fs,"fragment")
            );

        }

        Noodlebox3D.startProgram(gl, gl.nbx_pointers.textureFillProgram, gl.unit2DBuffer );

        Noodlebox3D.samplerPointer(gl, gl.nbx_pointers.textureFillProgram, "uSampler", 0, texture);

        gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

        Noodlebox3D.endProgram(gl);

    }

}

Noodlebox3D.greyscaleFilter = function(gl, texture) {

    if (gl.nbx_pointers.greyscaleFillProgram===undefined) {

        gl.nbx_pointers.greyscaleFillProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.greyscale_fill_shader_fs,"fragment")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.greyscaleFillProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.nbx_pointers.greyscaleFillProgram.p_uSampler, 0);

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}

Noodlebox3D.burntTextureFillFilter = function(gl, texture) {

    if (gl.nbx_pointers.burntTextureFillProgram===undefined) {

        gl.nbx_pointers.burntTextureFillProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.burnt_texture_fill_shader_fs,"fragment")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.burntTextureFillProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.nbx_pointers.burntTextureFillProgram.p_uSampler, 0);

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}


Noodlebox3D.horizontalBlurFilter = function(gl, texture, factor) {

    if (factor==undefined) factor = 1.0 / 512.00;

    if (gl.nbx_pointers.horizontalBlurProgram===undefined) {

        gl.nbx_pointers.horizontalBlurProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.horizontal_blur_shader_fs, "fragment")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.horizontalBlurProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.nbx_pointers.horizontalBlurProgram.p_uSampler, 0);

    gl.uniform1fv(gl.nbx_pointers.horizontalBlurProgram.p_uFactor, new Float32Array([factor]));

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}

Noodlebox3D.verticalBlurFilter = function(gl, texture, factor) {

    if (factor==undefined) factor = 1.0 / 512.00;

    if (gl.nbx_pointers.verticalBlurProgram===undefined) {

        gl.nbx_pointers.verticalBlurProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.vertical_blur_shader_fs, "fragment")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.verticalBlurProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.nbx_pointers.verticalBlurProgram.p_uSampler, 0);

    gl.uniform1fv(gl.nbx_pointers.verticalBlurProgram.p_uFactor, new Float32Array([factor]));

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}


Noodlebox3D.blurFilter = function(gl, texture, factor) {

    if (factor==undefined) factor = 1.0 / 512.00;

    if (gl.nbx_pointers.blurProgram===undefined) {

        gl.nbx_pointers.blurProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, "blur-shader-fs")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.blurProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.nbx_pointers.blurProgram.p_uSampler, 0);

    gl.uniform1fv(gl.nbx_pointers.blurProgram.p_uFactor, new Float32Array([factor]));

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}



Noodlebox3D.circularBlurFilter = function(gl, texture, factor) {

    if (factor==undefined) factor = 1.0 / 512.00;

    if (gl.nbx_pointers.circularBlurProgram===undefined) {

        gl.nbx_pointers.circularBlurProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.circular_blur_shader_fs,"fragment")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.circularBlurProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.nbx_pointers.circularBlurProgram.p_uSampler, 0);

    gl.uniform1fv(gl.nbx_pointers.circularBlurProgram.p_uFactor, new Float32Array([factor]));

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}

Noodlebox3D.textureBlurFilter = function(gl, imageTexture, factorTexture, factor) {

    if (factor==undefined) factor = 1.0 / 512.00;

    if (Noodlebox3D.gl.nbx_pointers===undefined) {

        Noodlebox3D.gl.nbx_pointers = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.texture_blur_shader_fs,"fragment")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.textureBlurProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);
    gl.uniform1i(gl.nbx_pointers.textureBlurProgram.p_uSampler, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, factorTexture);
    gl.uniform1i(gl.nbx_pointers.textureBlurProgram.p_uFactorSampler, 1);

    gl.uniform1fv(gl.nbx_pointers.textureBlurProgram.p_uFactor, new Float32Array([factor]));

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}

Noodlebox3D.zoomBlurFilter = function(gl, imageTexture, factor) {

    if (factor==undefined) factor = 1.0 / 512.00;

    if (gl.nbx_pointers.zoomBlurProgram===undefined) {

        gl.nbx_pointers.zoomBlurProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.universal_xyuv_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.zoom_blur_shader_fs,"fragment")
        );

    }

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.zoomBlurProgram, gl.unit2DBuffer);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);
    gl.uniform1i(gl.nbx_pointers.zoomBlurProgram.p_uSampler, 0);

    gl.drawArrays(gl.TRIANGLES, 0, gl.unit2DBuffer.numItems);

    Noodlebox3D.endProgram(gl);

}

Noodlebox3D.crashtestFilter = function(gl) {

    if (gl.nbx_pointers.crashtestProgram===undefined) {

        gl.nbx_pointers.crashtestProgram = Noodlebox3D.compileProgram(
            gl,
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.crashtest_shader_vs,"vertex"),
            Noodlebox3D.compileShaderScript(gl, Noodlebox3D.script.crashtest_shader_fs,"fragment")
        );

        if (N3D.nbx_pointers.warnings) console.log("Warning crashtest filter affects gl modes");

    }

    gl.blendFunc(gl.ONE, gl.ZERO);

    gl.disable(gl.DEPTH_TEST);

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.crashtestProgram, gl.unit2DBuffer, undefined);

        gl.uniform4fv(gl.nbx_pointers.crashtestProgram.p_uColor, new Float32Array([Math.random(),Math.random(),Math.random(),1]));

        gl.drawArrays(gl.POINTS, 0, 1);

    Noodlebox3D.endProgram(gl);

}

Noodlebox3D.audioSpectrumFilter = function(gl, previousTexture, audioData) {

    if (gl.nbx_pointers.audioSpectrumProgram===undefined) {

        gl.nbx_pointers.audioSpectrumProgram = Noodlebox3D.compileProgram( gl, Noodlebox3D.script.universal_xyuv_shader_vs, Noodlebox3D.script.spectrum_shader_fs);

    }

    gl.bindTexture(gl.TEXTURE_2D, previousTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    Noodlebox3D.startProgram(gl, gl.nbx_pointers.audioSpectrumProgram, gl.unit3DBuffer);

        Noodlebox3D.samplerPointer(gl, gl.nbx_pointers.audioSpectrumProgram, "uSpectrumTexture", 1, previousTexture);

        gl.uniform1fv(gl.nbx_pointers.audioSpectrumProgram.p_uValues, new Float32Array( audioData ) );

        gl.uniform1f(gl.nbx_pointers.audioSpectrumProgram.p_uAlmostNumberOfBins, 31.99999 );
        gl.uniform1f(gl.nbx_pointers.audioSpectrumProgram.p_uOneOverTextureHeight, 1/64.00 );

        gl.drawArrays(gl.TRIANGLES, 0, gl.unit3DBuffer.numberOfVertices);

    Noodlebox3D.endProgram(gl);

}
























// basic geometry



//

Noodlebox3D.Mesh = function() {

    var my = this;

    this.vertices = [];

    this.indexes = [];

};

Noodlebox3D.Mesh.prototype.addVertices = function() {

    for (var i = 0; i < arguments.length; i++) {
        this.vertices.push(arguments[i]);
    };

}

Noodlebox3D.Mesh.prototype.addIndexes = function() {

    for (var i = 0; i < arguments.length; i++) {
        this.indexes.push(arguments[i]);
    };

}

Noodlebox3D.Mesh.prototype.addTriangle = function(v1, v2, v3, addIndexesAutomatically) {

     this.vertices.push(v1,v2,v3);

     if (addIndexesAutomatically) {
        this.indexes.push(this.vertices.length-3);
        this.indexes.push(this.vertices.length-2);
        this.indexes.push(this.vertices.length-1);
     }

}

Noodlebox3D.Mesh.prototype.set = function() {

    for (var i = this.vertices.length - 1; i >= 0; i--) {
        this.vertices[i].template = vec3.clone(this.vertices[i]);
    };

}

Noodlebox3D.Mesh.prototype.reset = function() {

    for (var i = this.vertices.length - 1; i >= 0; i--) {
        vec3.copy(this.vertices[i],this.vertices[i].template);
    };

}

Noodlebox3D.Mesh.prototype.flatten = function(fields, existingArray) {

    if (!existingArray) {

        var existingArray = [];

    }

    if (existingArray.indexes==undefined) existingArray.indexes = [];

    var offset = existingArray.length/fields.length;

    for (var j = fields.length - 1; j >= 0; j--) {

        if (fields[j]=="x") fields[j]=0;
        if (fields[j]=="y") fields[j]=1;
        if (fields[j]=="z") fields[j]=2;

    }

    for (var i = 0; i < this.vertices.length; i++) {
        for (var j = 0; j < fields.length; j++) {

            existingArray.push( this.vertices[i][fields[j]] );

        }
    };

    for (var i = 0; i < this.indexes.length; i++) {
        existingArray.indexes.push(this.indexes[i]+offset);
    };

    //existingArray.indexes = this.indexes;

    return existingArray;

}

Noodlebox3D.Mesh.prototype.transform = function(matrix) {

    for (var i = this.vertices.length - 1; i >= 0; i--) {

        vec3.transformMat4(this.vertices[i],this.vertices[i],matrix);

    };

}






//

Noodlebox3D.Grid = function(width, height) {

    var my = this;

    this.width=width;
    this.height=height;

    this.vertices = [];

    this.indexes = [];

    this.grid = [];

    var i=0;

    var tv;
    for (var x = 0; x < width; x++) {

        var column=[];

        for (var y = 0; y < height; y++) {

            tv = vec3.fromValues(x/(width-1),y/(height-1),0);
            tv.u = x/(width-1);
            tv.v = y/(height-1);

            column.push(tv);
            this.vertices.push(tv);

            if ((x>0) && (y>0)) {

                this.indexes.push(i-1);
                this.indexes.push(i);
                this.indexes.push(i-height);

                this.indexes.push(i-height-1);
                this.indexes.push(i-1);
                this.indexes.push(i-height);

            }

            i++;

        };

        this.grid.push(column);

    };

};

Noodlebox3D.Grid.prototype.calculateNormals = function() {

    var v1, v2, v3, nx=0, ny=0;

    for (var x = 0; x < this.width; x++) {

        for (var y = 0; y < this.height; y++) {

            nx=0;ny=0;
            if (x==this.width-1) nx=-1;
            if (y==this.height-1) ny=-1;

            v1 = this.grid[x+nx][y+ny];
            v2 = this.grid[x+nx+1][y+ny];
            v3 = this.grid[x+nx+1][y+ny+1];

            this.grid[x][y].normal = Noodlebox3D.getTriangleNormal(v1,v2,v3);

        };

    };

}

Noodlebox3D.Grid.prototype.set = Noodlebox3D.Mesh.prototype.set;

Noodlebox3D.Grid.prototype.reset = Noodlebox3D.Mesh.prototype.reset;

Noodlebox3D.Grid.prototype.flatten = Noodlebox3D.Mesh.prototype.flatten;

Noodlebox3D.Grid.prototype.transform = Noodlebox3D.Mesh.prototype.transform;

























// Utility functons

//

Noodlebox3D.matrix = {};
Noodlebox3D.tempMatrix = mat4.create();
Noodlebox3D.unitMatrix = mat4.create();

Noodlebox3D.matrix.appendRotation = function(matrix, radians, axis) {

    mat4.rotate(Noodlebox3D.tempMatrix,Noodlebox3D.unitMatrix,radians,axis);

    mat4.multiply(matrix, Noodlebox3D.tempMatrix, matrix);

}

Noodlebox3D.matrix.appendScale = function(matrix, xyzScaleArray) {

    mat4.scale(Noodlebox3D.tempMatrix,Noodlebox3D.unitMatrix,xyzScaleArray);

    mat4.multiply(matrix, Noodlebox3D.tempMatrix, matrix);

}

Noodlebox3D.matrix.appendTranslation = function(matrix, xyzOffset) {

    mat4.translate(matrix,matrix,xyzOffset);

}

//

Noodlebox3D.setBlend = function(gl,value) {

    if (value==="add") {

        gl.blendFunc(gl.ONE,gl.ONE);
        return;

    }

    if (value==="copy") {

        gl.blendFunc(gl.ONE,gl.ZERO);
        return;

    }

    if (value==="alpha") {

        gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
        return;

    }

    gl.blendFunc(gl.CONSTANT_ALPHA,gl.ONE_MINUS_CONSTANT_ALPHA);
    gl.blendColor(1,1,1,value);

}

//

Noodlebox3D.getTriangleNormal = function(v1, v2, v3) {

    var u = [v2[0]-v1[0], v2[1]-v1[1], v2[2]-v1[2]];
    var v = [v3[0]-v1[0], v3[1]-v1[1], v3[2]-v1[2]];

    var n = [];

    n[0] = (u[1] * v[2]) - ( u[2] * v[1]);
    n[1] = (u[2] * v[0]) - ( u[0] * v[2]);
    n[2] = (u[0] * v[1]) - ( u[1] * v[0]);

    var l = Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);

    if (l==0) return n;

    n[0]/=l;
    n[1]/=l;
    n[2]/=l;

    return n;

}

//

Noodlebox3D.SeededRandom = function(seed) {
  // LCG using GCC's constants
  this.m = 0x80000000; // 2**31;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed ? seed : Math.floor(Math.random() * (this.m-1));
}

Noodlebox3D.SeededRandom.prototype.nextInt = function() {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
}

Noodlebox3D.SeededRandom.prototype.nextFloat = function() {
  // returns in range [0,1]
  return this.nextInt() / (this.m - 1);
}

Noodlebox3D.SeededRandom.prototype.nextRange = function(start, end) {
  // returns in range [start, end): including start, excluding end
  // can't modulu nextInt because of weak randomness in lower bits
  var rangeSize = end - start;
  var randomUnder1 = this.nextInt() / this.m;
  return start + Math.floor(randomUnder1 * rangeSize);
}

Noodlebox3D.SeededRandom.prototype.choice = function(array) {
  return array[this.nextRange(0, array.length)];
}

Noodlebox3D.initCamera = function(width,height) {

    var video = document.createElement("video");
    video.setAttribute("width", width);
    video.setAttribute("height", height);
    video.width = width;
    video.height = height;

    var initVideo = function() { video.removeEventListener('playing', initVideo, false); setTimeout(function(){ video.ready = true; },1000); };

    video.addEventListener('playing', initVideo, false);

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true, toString: function(){return 'video';}}, successCallback, errorCallback);
    } else {
        errorCallback();
    }

    function successCallback(stream) {

        if (video.mozCaptureStream) {
            video.mozSrcObject = stream;
        } else {
            video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        }

        video.play();

    }

    function errorCallback(error) {

        console.log('Native web camera streaming is not supported in this browser (or maybe try reloading page)');
        alert('Native web camera streaming is not supported in this browser (or maybe try reloading page)');

    }

    return video;

}





















// Shaders

//

Noodlebox3D.script = {};

//

Noodlebox3D.script.universal_xyuv_shader_vs=""+
"attribute vec2 aVertexPosition;"+
"attribute vec2 aVertexUV;"+
"varying vec2 vTextureCoord;"+
"void main(void) {"+
"gl_Position = vec4(aVertexPosition, 1.0, 1.0) ;"+
"vTextureCoord = aVertexUV;"+
"}";

Noodlebox3D.script.flat_fill_shader_fs = ""+
"precision mediump float;"+
"uniform vec4 uColor;"+
"void main(void) {"+
"gl_FragColor = uColor;"+
"}";

Noodlebox3D.script.texture_fill_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uSampler;"+
"uniform vec4 uColorOffset;"+
"uniform vec4 uColorMultiplier;"+
"void main(void) {"+
"gl_FragColor = texture2D(uSampler,vTextureCoord);"+
"}";

Noodlebox3D.script.texture_fill_transformed_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uSampler;"+
"uniform vec4 uColorOffset;"+
"uniform vec4 uColorMultiplier;"+
"void main(void) {"+
"gl_FragColor = texture2D(uSampler,vTextureCoord)*uColorMultiplier+uColorOffset;"+
"}";

Noodlebox3D.script.circular_blur_shader_fs = "+"+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uSampler;"+
"uniform float uFactor;"+
"void main(void) {"+
"vec4 result = texture2D( uSampler , vec2(vTextureCoord.x + 0.0*uFactor, vTextureCoord.y + 1.0*uFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + 0.7071067811865475*uFactor, vTextureCoord.y + 0.7071067811865476*uFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + 1.0*uFactor, vTextureCoord.y + 0.0*uFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + 0.7071067811865476*uFactor, vTextureCoord.y -0.7071067811865475*uFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + 0.0*uFactor, vTextureCoord.y -1.0*uFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x  -0.7071067811865476*uFactor, vTextureCoord.y -0.7071067811865475*uFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x  -1.0*uFactor, vTextureCoord.y + 0.0*uFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x  -0.7071067811865476*uFactor, vTextureCoord.y -0.7071067811865475*uFactor)) ;"+
"gl_FragColor = result/8.00;"+
"}";

Noodlebox3D.script.horizontal_blur_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uSampler;"+
"uniform float uFactor;"+
"void main(void) {"+
"vec4 result = texture2D( uSampler , vec2(vTextureCoord.x - 4.0*uFactor, vTextureCoord.y)) * 0.05;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x - 3.0*uFactor, vTextureCoord.y)) * 0.09;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x - 2.0*uFactor, vTextureCoord.y)) * 0.12;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x - uFactor, vTextureCoord.y)) * 0.15;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y)) * 0.18;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + uFactor, vTextureCoord.y)) * 0.15;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + 2.0*uFactor, vTextureCoord.y)) * 0.12;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + 3.0*uFactor, vTextureCoord.y)) * 0.09;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + 4.0*uFactor, vTextureCoord.y)) * 0.05;"+
"gl_FragColor = result;"+
"}";

Noodlebox3D.script.vertical_blur_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uSampler;"+
"uniform float uFactor;"+
"void main(void) {"+
"vec4 result = texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y - 4.0*uFactor)) * 0.05;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y - 3.0*uFactor)) * 0.09;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y - 2.0*uFactor)) * 0.12;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y - uFactor)) * 0.15;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y)) * 0.18;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y + uFactor)) * 0.15;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y + 2.0*uFactor)) * 0.12;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y + 3.0*uFactor)) * 0.09;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y + 4.0*uFactor)) * 0.05;"+
"gl_FragColor = result;"+
"}";

Noodlebox3D.script.texture_blur_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform float uFactor;"+
"uniform sampler2D uSampler;"+
"uniform sampler2D uFactorSampler;"+
"void main(void) {"+
"float finalFactor = (1.0-texture2D( uFactorSampler , vTextureCoord).x)*uFactor; "+
"vec4 result = texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y + finalFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + 0.7071067811865475*finalFactor, vTextureCoord.y + 0.7071067811865476*finalFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + finalFactor, vTextureCoord.y )) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x + 0.7071067811865476*finalFactor, vTextureCoord.y -0.7071067811865475*finalFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x, vTextureCoord.y -finalFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x  -0.7071067811865476*finalFactor, vTextureCoord.y -0.7071067811865475*finalFactor)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x  -finalFactor, vTextureCoord.y)) ;"+
"result += texture2D( uSampler , vec2(vTextureCoord.x  -0.7071067811865476*finalFactor, vTextureCoord.y -0.7071067811865475*finalFactor)) ;"+
"gl_FragColor = result/8.00;"+
"}";

Noodlebox3D.script.zoom_blur_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uSampler;"+
"void main(void) {"+
"vec4 result = texture2D(uSampler,vTextureCoord)*0.2;"+
"result += texture2D(uSampler,vec2((vTextureCoord.x-0.5)*0.9+0.5,vTextureCoord.y*0.9) )*0.2;"+
"result += texture2D(uSampler,vec2((vTextureCoord.x-0.5)*0.8+0.5,vTextureCoord.y*0.8) )*0.2;"+
"result += texture2D(uSampler,vec2((vTextureCoord.x-0.5)*0.7+0.5,vTextureCoord.y*0.7) )*0.2;"+
"result += texture2D(uSampler,vec2((vTextureCoord.x-0.5)*0.6+0.5,vTextureCoord.y*0.6) )*0.2;"+
"gl_FragColor = result;"+
"}";

Noodlebox3D.script.greyscale_fill_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uSampler;"+
"void main(void) {"+
"gl_FragColor = texture2D(uSampler,vTextureCoord);"+
"gl_FragColor.x += gl_FragColor.y+gl_FragColor.z;"+
"gl_FragColor.x /= 3.00;"+
"gl_FragColor.y = gl_FragColor.x;"+
"gl_FragColor.z = gl_FragColor.x;"+
"}";

Noodlebox3D.script.burnt_texture_fill_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uSampler;"+
"void main(void) {"+
"gl_FragColor = texture2D(uSampler,vTextureCoord);"+
"gl_FragColor.x = sin(gl_FragColor.x*1.5707963267948966192313216916398)*0.8;"+
"gl_FragColor.y = sin(gl_FragColor.y*1.5707963267948966192313216916398)*0.5;"+
"gl_FragColor.z = gl_FragColor.z*gl_FragColor.z*0.4;"+
"gl_FragColor.xyz *= 0.3;"+
"}";

Noodlebox3D.script.texture_difference_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uSampler1;"+
"uniform sampler2D uSampler2;"+
"uniform vec2 uColorTransform;"+
"void main(void) {"+
"vec4 c = abs(texture2D(uSampler1, vTextureCoord)-texture2D(uSampler2, vTextureCoord));"+
"float b = (max(max(c.x,c.y),c.z)+uColorTransform.x)*uColorTransform.y;"+
"gl_FragColor = vec4(b,b,b,b);"+
"}";

Noodlebox3D.script.texture_tracking_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uBase;"+
"uniform sampler2D uTracker;"+
"uniform vec2 uFactors;"+
"void main(void) {"+
"vec4 base = texture2D(uBase, vTextureCoord);"+
"vec4 c = texture2D(uTracker, vTextureCoord)-base;"+
"gl_FragColor = vec4( "+
"    base.x + clamp(c.x,uFactors.x,uFactors.y),"+
"    base.y + clamp(c.y,uFactors.x,uFactors.y),"+
"    base.z + clamp(c.z,uFactors.x,uFactors.y),"+
"    1.0);"+
"}";


Noodlebox3D.script.xyzuvm_shader_vs = ""+
"attribute vec3 aVertexPosition;"+
"attribute vec2 aVertexUV;"+
"uniform mat4 ufMatrix;"+
"varying vec2 vTextureCoord;"+
"void main(void) {"+
"gl_Position = ufMatrix*vec4(aVertexPosition, 1.0) ;"+
"vTextureCoord = aVertexUV;"+
"}";



Noodlebox3D.script.xyzuvm_shader_fs = ""+
"precision mediump float;"+
"varying vec2 vTextureCoord;"+
"uniform sampler2D uTextureSampler;"+
"void main(void) {"+
"gl_FragColor = texture2D(uTextureSampler,vTextureCoord);"+
"}";
Noodlebox3D.script.crashtest_shader_vs = ""+
"attribute vec2 aVertexPosition;"+
"attribute vec2 aVertexUV;"+
"uniform vec4 uColor;"+
"varying vec4 vColor;"+
"void main(void) {"+
"gl_Position =  vec4(aVertexPosition.x,aVertexPosition.y,aVertexUV.x,aVertexUV.x) ;"+
"gl_Position = vec4(-1.0,1.00,0.0,1.0);"+
"gl_PointSize = 2.0;"+
"vColor = uColor;"+
"}";


Noodlebox3D.script.crashtest_shader_fs = ""+
"precision mediump float;"+
"varying vec4 vColor;"+
"void main(void) {"+
"gl_FragColor = vColor;"+
"}";



Noodlebox3D.script.spectrum_shader_fs = ""+
"precision mediump float;"+
"uniform sampler2D uSpectrumTexture;"+
"uniform float uValues[32];"+
"uniform float uAlmostNumberOfBins;"+
"uniform float uOneOverTextureHeight;"+
"varying vec2 vTextureCoord;"+
"void main(void) {"+
"float vValue;"+
"int i = int(vTextureCoord.x*uAlmostNumberOfBins);"+
"if (vTextureCoord.y<uOneOverTextureHeight) {"+
"for (int x = 0; x < 32; x++) { if (x == i) vValue = uValues[x]; }"+
"gl_FragColor = vec4(vValue,vValue,vValue,1.0);"+
"} else {"+
"gl_FragColor = texture2D(uSpectrumTexture,vTextureCoord+vec2(0.0,-uOneOverTextureHeight));"+
"}"+
"}";

    return N3D;
});
