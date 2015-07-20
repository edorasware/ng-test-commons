describe('mock providers', function () {
    var testModule = angular.module('test', []);

    describe('provideMock method', function () {
        var aTestObjectService, aTestFunctionService;

        beforeEach(angular.mock.module(testModule.name, function ($provide) {
            provideMock($provide, 'aTestObjectService', ['getText']);
            provideMock($provide, 'aTestFunctionService');
        }));

        beforeEach(inject(function (_aTestObjectService_, _aTestFunctionService_) {
            aTestObjectService = _aTestObjectService_;
            aTestFunctionService = _aTestFunctionService_;
        }));

        it('should provide a mock', function () {
            aTestObjectService.getText.and.returnValue('Foo Bar');
            aTestFunctionService.and.returnValue('Foo Bar');

            expect(aTestObjectService.getText()).toBe('Foo Bar');
            expect(aTestFunctionService()).toBe('Foo Bar');
        });
    });

    describe('provideConstantMock method', function () {
        var aTestObjectService, aTestFunctionService;

        beforeEach(angular.mock.module(testModule.name, function ($provide) {
            provideConstantMock($provide, 'aTestObjectService', ['getText']);
            provideConstantMock($provide, 'aTestFunctionService');
        }));

        beforeEach(inject(function (_aTestObjectService_, _aTestFunctionService_) {
            aTestObjectService = _aTestObjectService_;
            aTestFunctionService = _aTestFunctionService_;
        }));

        it('should provide a mock', function () {
            aTestObjectService.getText.and.returnValue('Foo Bar');
            aTestFunctionService.and.returnValue('Foo Bar');

            expect(aTestObjectService.getText()).toBe('Foo Bar');
            expect(aTestFunctionService()).toBe('Foo Bar');
        });
    });

});
