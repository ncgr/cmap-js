/**
  * Bounds
  * Class representing a 2D bounds, having the same properties as a DOMRect.
  * This class can be instantiated by script, unlike DOMRect object itself which
  * comes from the browser's DOM by getBoundingClientRect().
  * https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  */
import {isNil} from '../util/isNil';

export class Bounds {
  /**
  * Create a Bounds
  *
  * @param {Object} params - having the following properties:
  * @param {Number} bottom
  * @param {Number} left
  * @param {Number} right
  * @param {Number} top
  * @param {Number} width
  * @param {Number} height
  * @returns {Object}
  */
  constructor({top, left, bottom, right, width, height, allowSubpixel=true}) {
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.top = top;
    this.height = height;
    this.width = width;

    if(isNil(this.width)) this.width = this.right - this.left;
    if(isNil(this.height)) this.height = this.bottom - this.top;
    if(isNil(this.bottom)) this.bottom = this.top + this.height;
    if(isNil(this.right)) this.right = this.left + this.width;

    if(! allowSubpixel) {
      this.bottom = Math.floor(this.bottom);
      this.top = Math.floor(this.top);
      this.left = Math.floor(this.left);
      this.right = Math.floor(this.right);
      this.width = Math.floor(this.width);
      this.height = Math.floor(this.height);
      if(this.x) this.x = Math.floor(this.x);
      if(this.y) this.x = Math.floor(this.y);
    }
  }

  /**
   * Check if width or height is zero, making the Bounds effectively empty.
   */
  get isEmptyArea() {
    return ! this.width || ! this.height;
  }

  /**
   * Area of bounds (width * height)
   */
  get area() {
    return this.width * this.height;
  }

  /**
    * Class method- test whether two bounds are equal (rounds to nearest pixel)
    *
    * @param bounds1 - DOMRect or Bounds instance
    * @param bounds2 - DOMRect or Bounds instance
    * @returns Boolean
    */
  static equals(bounds1, bounds2) {
    let p, n1, n2;
    if(! bounds1 || ! bounds2)
      return false; // check for null args
    for (var i = 0; i < PROPS.length; i++) {
      p = PROPS[i];
      n1 = bounds1[p];
      n2 = bounds2[p];
      if(n1 === undefined || n2 === undefined) { // skip test, see note about x,y
        continue;
      }
      // cast properties from float to int before equality comparison
      if(Math.floor(n1) !== Math.floor(n2))
        return false;
    }
    return true;
  }

  /**
  * Class method- test whether two bounds are equal in area (rounds to nearest pixel)
  *
  * @param bounds1 - DOMRect or Bounds instance
  * @param bounds2 - DOMRect or Bounds instance
  * @returns Boolean
  */
  static areaEquals(bounds1, bounds2) {
    if(! bounds1 || ! bounds2)
      return false; // check for null args
    return Math.floor(bounds1.area) === Math.floor(bounds2.area);
  }

  /**
   * Instance method call of Bounds.equals()
   */
  equals(otherBounds) {
    return Bounds.equals(this, otherBounds);
  }

  /**
   * Area equality, rounds to integer pixel.
   */
  areaEquals(otherBounds) {
    return Bounds.areaEquals(this, otherBounds);
  }
}

// DOMRect may *not* have iterable properties, so hardcode them here
const PROPS = [
  // note: x any y may not exist!
  'bottom', 'left', 'right', 'top', 'width', 'height', 'x', 'y'
];