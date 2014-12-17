var _ = require('lodash'), windowFunctions;

beforeEach(function () {
    var currentSpec = this, mockProviders = require('./mock-providers');

    windowFunctions = {
        compileTemplate: require('./compile-template')(currentSpec),
        createController: require('./create-controller')(currentSpec),
        provideMock: mockProviders.provideMock,
        provideConstantMock: mockProviders.provideConstantMock
    };

    registerWindowFunctions(windowFunctions);
});

afterEach(function () {
    deregisterWindowFunctions(windowFunctions);
});

function registerWindowFunctions(fns) {
    _.forEach(fns, registerWindowFunction);

    function registerWindowFunction(fn, fnName) {
        if (window[fnName]) {
            throw new Error('A window property with the name: "' + fnName + '" already exists.');
        }
        window[fnName] = fn;
    }
}

function deregisterWindowFunctions(fns) {
    _.forEach(fns, deregisterWindowFunction);

    function deregisterWindowFunction(fn, fnName) {
        if (!window[fnName]) {
            throw new Error('A window property with the name: "' + fnName + '" does not exist.');
        }
        window[fnName] = undefined;
    }
}
