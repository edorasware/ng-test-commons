module.exports = function (currentSpec) {
    return function (template, scope) {
        var commons = require('./commons')(currentSpec), invoke = commons.getInvoke();

        return invoke(compileTemplateFactory)(template);

        function compileTemplateFactory($compile) {
            return function (template) {
                var createScope = commons.getCreateScope(),
                    localScope = createScope(scope),
                    compiledTemplate = $compile(template)(localScope);
                localScope.$digest();

                return compiledTemplate;
            };
        }
    };
};
