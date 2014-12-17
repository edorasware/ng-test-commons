var _ = require('lodash');

module.exports = function (currentSpec) {
    return {
        getInvoke: getInvoke,
        getCreateScope: getCreateScope
    };

    function getInvoke() {
        return getInjector().invoke;
    }

    function getCreateScope() {
        return function (scope) {
            if (!scope) {
                return getRootScope().$new();
            }

            if (scope && _.isPlainObject(scope)) {
                return _.extend(getRootScope().$new(), scope);
            }

            return scope;
        };
    }

    function getRootScope() {
        return getInjector().get('$rootScope');
    }

    function getInjector() {
        if (!currentSpec) {
            throw new Error('Injector required from outside of an spec.');
        }

        return currentSpec.$injector;
    }
};
