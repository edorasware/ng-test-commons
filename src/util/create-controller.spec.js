describe('createController method', function () {
    var testModule = angular.module('test', [])
        .controller('aTestController', function ($scope) {
            $scope.text = 'Foo Bar';
        });

    beforeEach(angular.mock.module(testModule.name));

    beforeEach(angular.mock.inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    it('should create a controller with a new scope when not provided', function () {
        var controller = createController('aTestController');

        expect(controller._scope.foo).toBeUndefined();
        expect(controller._scope.text).toBe('Foo Bar');
    });

    it('should create a controller with a new pre-populated scope when a scope prototype is provided', function () {
        var controller = createController('aTestController', {foo: 'bar'});

        expect(controller._scope.foo).toBe('bar');
        expect(controller._scope.text).toBe('Foo Bar');
    });

    it('should compile a template with a new pre-populated scope when a scope prototype is provided', function () {
        var scope = $rootScope.$new();
        scope.foo = 'bar';

        var controller = createController('aTestController', scope);

        expect(controller._scope.foo).toBe('bar');
        expect(controller._scope.text).toBe('Foo Bar');
    });
});
