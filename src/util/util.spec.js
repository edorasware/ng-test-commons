require('./util.js');

describe('util', function () {
    var utilModule = angular.module('util', []),
        _ = require('lodash');

    describe('compileTemplate method', function () {
        var $rootScope;

        utilModule.directive('aTest', function () {
            return {
                template: '<div>Foo {{text}}</div>'
            };
        });

        beforeEach(angular.mock.module('util'));

        beforeEach(angular.mock.inject(function (_$rootScope_) {
            $rootScope = _$rootScope_;
        }));

        it('should compile a template with a new scope when not provided', function () {
            var compiledTemplate = compileTemplate('<div a-test></div>');

            expect(compiledTemplate.text()).toBe('Foo ');
        });

        it('should compile a template with a new pre-populated scope when a prototype provided', function () {
            var compiledTemplate = compileTemplate('<div a-test></div>', {text: 'Bar'});

            expect(compiledTemplate.text()).toBe('Foo Bar');
        });

        it('should compile a template with a provided scope', function () {
            var scope = $rootScope.$new();
            scope.text = 'Bar';

            var compiledTemplate = compileTemplate('<div a-test></div>', scope);

            expect(compiledTemplate.text()).toBe('Foo Bar');
        });
    });

    describe('createController method', function () {
        utilModule.controller('aTestController', function ($scope) {
            $scope.text = 'Foo Bar';
        });

        beforeEach(angular.mock.module('util'));

        it('should create a controller', function () {
            var controller = createController('aTestController');

            expect(controller._scope.text).toBe('Foo Bar');
        });
    });

    describe('provideMock method', function () {
        var aTestObjService,
            aTestFunctionService;

        beforeEach(angular.mock.module('util', function ($provide) {
            provideMock($provide, 'aTestService', ['getText']);
            provideMock($provide, 'aTestFunctionService');
        }));

        beforeEach(inject(function (_aTestService_, _aTestFunctionService_) {
            aTestObjService = _aTestService_;
            aTestFunctionService = _aTestFunctionService_;
        }));

        it('should provide a mock', function () {
            aTestObjService.getText.andReturn('Foo Bar');
            aTestFunctionService.andReturn('Foo Bar');

            expect(aTestObjService.getText()).toBe('Foo Bar');
            expect(aTestFunctionService()).toBe('Foo Bar');
        });
    });

    describe('provideConstantMock method', function () {
        var aTestConstant;

        beforeEach(angular.mock.module('util', function ($provide) {
            provideConstantMock($provide, 'aTestConstant');
        }));

        beforeEach(inject(function (_aTestConstant_) {
            aTestConstant = _aTestConstant_;
        }));

        it('should provide a mock', function () {
            aTestConstant.andReturn('Foo Bar');

            expect(aTestConstant()).toBe('Foo Bar');
        });
    });

    describe('testWithAllValuesBut', function () {
        it('should execute the callback function 8 times if first argument is not a string with a JS type valid', function () {
            var callback = jasmine.createSpy('callback');

            testWithAllValuesBut('anyString', callback);

            expect(callback.calls.length).toBe(8);
        });

        _.forEach([
            ['string', 'text'],
            ['number', 0],
            ['boolean', true],
            ['null', null],
            ['undefined', undefined],
            ['function', _.noop]
        ], function (value) {
            it('should not execute the callback with an argument of type "' + value[0] + '"', function () {
                var callback = jasmine.createSpy('callback');

                testWithAllValuesBut(value[0], callback);

                expect(callback).not.toHaveBeenCalledWith(value[1]);
            });
        });

        it('should not execute the callback with an argument of type "object" or "array"', function () {
            var callback = jasmine.createSpy('callback');

            testWithAllValuesBut(['object', 'array'], callback);

            expect(callback).not.toHaveBeenCalledWith({});
            expect(callback).not.toHaveBeenCalledWith([]);
        });
    });
});
