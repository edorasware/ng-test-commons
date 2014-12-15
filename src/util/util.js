var _ = require('lodash');

module.exports = {
    registerWindowFunctions: registerWindowFunctions,
    deregisterWindowFunctions: deregisterWindowFunctions,
    getInjector: getInjector
};

beforeEach(function () {
    registerWindowFunctions({
        compileTemplate: compileTemplate,
        createController: createController,
        provideMock: provideMock,
        provideConstantMock: provideConstantMock,
        testWithAllValuesBut: testWithAllValuesBut
    });
});

afterEach(function () {
    deregisterWindowFunctions([
        'compileTemplate', 'createController', 'provideMock', 'provideConstantMock', 'testWithAllValuesBut'
    ]);
});

function registerWindowFunctions(fns) {
    _.forEach(fns, registerWindowFunction);

    function registerWindowFunction(fn, name) {
        if (window[name]) {
            throw new Error('A window property with the name: "' + name + '" already exists.');
        }
        window[name] = fn;
    }
}

function deregisterWindowFunctions(names) {
    _.forEach(names, function (name) {
        window[name] = undefined;
    });
}

function compileTemplate(template, scope) {
    return getInjector().invoke(compileTemplateFactory)(template);

    function compileTemplateFactory($rootScope, $compile) {
        return function (template) {
            var localScope = createScope(scope),
                compiledTemplate = $compile(template)(localScope);
            localScope.$digest();

            return compiledTemplate;
        };

        function createScope(scope) {
            if (!scope) {
                return $rootScope.$new();
            }

            if (scope && _.isPlainObject(scope)) {
                return _.extend($rootScope.$new(), scope);
            }

            return scope;
        }
    }
}

function createController(controllerName) {
    return getInjector().invoke(controllerFactory)(controllerName);

    function controllerFactory($rootScope, $controller) {
        return function (controllerName) {
            var scope = $rootScope.$new(),
                controller = $controller(controllerName, {$scope: scope});
            controller._scope = scope;

            return controller;
        };
    }
}

function provideMock($provide, mockName, mockMethods) {
    var mock = mockMethods ? jasmine.createSpyObj(mockName, mockMethods) : jasmine.createSpy(mockName);
    $provide.value(mockName, mock);

    return mock;
}

function provideConstantMock($provide, mockName) {
    var mock = jasmine.createSpy(mockName);
    $provide.constant(mockName, mock);

    return mock;
}

function getInjector() {
    var injector;

    inject(function ($injector) {
        injector = $injector;
    });

    return injector;
}

function testWithAllValuesBut(valueToSkip, expectFn) {
    var allPossibleValues = {
            stringValue: 'text',
            numberValue: 0,
            booleanValue: true,
            nullValue: null,
            undefinedValue: undefined,
            objectValue: {},
            arrayValue: [],
            functionValue: _.noop
        },
        valuesToSkip = _.isArray(valueToSkip) ? _.map(valueToSkip, concatValue) : [concatValue(valueToSkip)];

    _.forEach(allPossibleValues, function (value, key) {
        if (!_.contains(valuesToSkip, key)) {
            expectFn(value);
        }
    });

    function concatValue(str) {
        return _.isString(str) ? str.concat('Value') : '';
    }
}
