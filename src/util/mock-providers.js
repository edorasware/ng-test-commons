module.exports = {
    provideMock: provideMock,
    provideConstantMock: provideConstantMock
};

function provideMock($provide, mockName, mockMethods) {
    var mock = createMock(mockName, mockMethods);
    $provide.value(mockName, mock);

    return mock;
}

function provideConstantMock($provide, mockName, mockMethods) {
    var mock = createMock(mockName, mockMethods);
    $provide.constant(mockName, mock);

    return mock;
}

function createMock(mockName, mockMethods) {
    return mockMethods ? jasmine.createSpyObj(mockName, mockMethods) : jasmine.createSpy(mockName);
}
