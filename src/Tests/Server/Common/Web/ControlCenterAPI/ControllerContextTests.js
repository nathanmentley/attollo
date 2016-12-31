import assert from 'assert';

class ControllerContextTests {
    Execute() {
        describe('Web ControlCenterAPI Controller Context', function() {
            describe('#indexOf()', function() {
                it('should return -1 when the value is not present', function() {
                    assert.equal(-1, [1,2,3].indexOf(4));
                });
            });
        });
    }
}

var controllerContextTests = new ControllerContextTests();
controllerContextTests.Execute();