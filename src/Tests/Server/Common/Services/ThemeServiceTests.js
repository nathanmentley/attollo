import { Container } from 'constitute';
import assert from 'assert';

import ThemeService from '../../../../Server/Common/Services/ThemeService';
import ServiceContext from "../../../../Server/Common/ServiceContext";

class MockServiceContext {
    get Handlers() {
        return {
            Theme: {
                GetTheme: () => {
                    return "testmock";
                }
            }
        }
    }
}

class ThemeServiceTests {
    Execute() {
        describe('ThemeService', function() {
            describe('#indexOf()', function() {
                var container = new Container();
                container.bindClass(ServiceContext, MockServiceContext);
                var themeService = container.constitute(ThemeService)

                it('should return -1 when the value is not present', function() {
                    var result = themeService.GetTheme("", "")

                    assert.equal("testmock", result);
                });
            });
        });
    }
}

var themeServiceTests = new ThemeServiceTests();
themeServiceTests.Execute();