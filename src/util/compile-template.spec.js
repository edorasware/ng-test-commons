describe('compileTemplate method', function () {
    var testModule = angular.module('test-compile-template', [])
        .directive('aTest', function () {
            return {
                template: '<div>Foo {{text}}</div>'
            };
        }), $rootScope;

    beforeEach(angular.mock.module(testModule.name));

    beforeEach(angular.mock.inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    it('should compile a template with a new scope when not provided', function () {
        var compiledTemplate = compileTemplate('<div a-test></div>');

        expect(compiledTemplate.text()).toBe('Foo ');
    });

    it('should compile a template with a new pre-populated scope when a scope prototype is provided', function () {
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
