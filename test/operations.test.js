const assert = require("assert");
const operations = require("./operations");
 
describe("Operation Tests", function(){
    it("should multiply two numbers", function(){         
        const expected = 15;
        const result = operations.multiply(3, 5);
        assert.equal(result, expected);
    });
    it("should add two numbers", function(){         
        const expected = 16;
        const result = operations.add(9, 7);
        assert.equal(result, expected);
    });
});