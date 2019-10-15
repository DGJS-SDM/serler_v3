/*var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});*/

const expect = require('chai').expect;
const add = require('./add.js');

describe('add', function() {
  it('should return the sum of two positive numbers', function() {
    expect(add(2, 4)).to.equal(6);
  });

  it('should return the sum of two negative numbers', function() {
    expect(add(-2, -4)).to.equal(-6);
  });

  it('should return the sum of an array of numbers', function() {
    expect(add([1,2,3,4,5])).to.equal(15);
  });
});

  
