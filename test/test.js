
var { parse } = require('../dist/mep.cjs.js');
var chai = require('chai'),
  expect = chai.expect
describe('MEP', function () {
  describe('#Empty Object', function () {
    it('should return empty string', function () {
      expect(parse({}, "")).to.equal('')
    });
  });
  describe('#普通使用', function () {
    it('should return 张三', function () {
      expect(parse({
        "name": "张三"
      }, "{name}")).to.equal('张三')
    });
  });
  describe('#sum', function () {
    it('should return 3', function () {
      expect(parse({}, "sum(1,2)")).to.equal(3)
    });
  });
  describe('#sum-2', function () {
    it('should return 22', function () {
      expect(parse({
        "age":20
      }, "sum({age},2)")).to.equal(22)
    });
  });
  describe('#条件', function () {
    it('should return 及格', function () {
      expect(parse({
        "score":80
      }, "condition({score}>60,'及格','不及格')")).to.equal("及格")
    });
  });
});