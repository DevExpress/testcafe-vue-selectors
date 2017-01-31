import { Selector } from 'testcafe';

export default (selector) => {
    if (selector !== void 0 && typeof selector !== 'string')
        throw new Error(`If selector option is present it should be a string, but it was ${typeof selector}`);

    return Selector(complexSelector => {
        function validateVueVersion () {
            var SUPPORTED_VUE_VERSION = 2;
            var vueVersion            = parseInt(window.Vue.version.split('.')[0], 10);

            if (vueVersion < SUPPORTED_VUE_VERSION)
                throw new Error('testcafe-vue-selectors supports Vue version 2.x and newer');
        }

        function walkDomNodes (node, fn) {
            if (node.childNodes) {
                for (var i = 0; i < node.childNodes.length; i++) {
                    var childNode = node.childNodes[i];

                    var isInstanceFound = fn(childNode);

                    if (!isInstanceFound)
                        walkDomNodes(childNode, fn);
                    else
                        break;
                }
            }
        }

        function findFirstRootInstance () {
            var instance = null;

            walkDomNodes(document, (node) => {
                instance = node.__vue__;

                return !!instance;
            });

            return instance;
        }

        function getComponentTagNames (componentSelector) {
            return componentSelector
                .split(' ')
                .filter(el => !!el)
                .map(el => el.trim().toLowerCase());
        }

        function getComponentTag (instance) {
            return instance.$options.name ||
                   instance.$options._componentTag ||
                   instance.$options.__file ||
                   '';
        }

        function filterNodes (root, tags) {
            var foundComponents = [];

            function walkVueComponentNodes (node, tagIndex, checkFn) {
                if (checkFn(node, tagIndex)) {
                    if (tagIndex === tags.length - 1) {
                        foundComponents.push(node.$el);
                        return;
                    }

                    tagIndex++;
                }

                for (var i = 0; i < node.$children.length; i++) {
                    var childNode = node.$children[i];

                    walkVueComponentNodes(childNode, tagIndex, checkFn);
                }
            }

            walkVueComponentNodes(root, 0, function (node, tagIndex) {
                var componentTag = getComponentTag(node);

                return tags[tagIndex] === componentTag;
            });

            return foundComponents;
        }

        if (!window.Vue)
            return document.querySelectorAll(complexSelector);

        validateVueVersion();

        var rootInstance = findFirstRootInstance();

        if (!complexSelector)
            return rootInstance.$el;

        var componentTags = getComponentTagNames(complexSelector);

        return filterNodes(rootInstance, componentTags);
    })(selector).addCustomDOMProperties({
        vue: node => {
            function getData (instance, prop) {
                var result = {};

                Object.keys(prop).forEach(function (key) {
                    result[key] = instance[key];
                });


                return result;
            }

            function getProps (instance) {
                return getData(instance, instance.$options.props || {});
            }

            function getState (instance) {
                var props   = instance._props || instance.$options.props;
                var getters = instance.$options.vuex && instance.$options.vuex.getters;
                var result  = {};

                Object.keys(instance._data)
                    .filter(function (key) {
                        return !(props && key in props) && !(getters && key in getters);
                    })
                    .map(function (key) {
                        result[key] = instance._data[key];
                    });

                return result;
            }

            function getComputed (instance) {
                return getData(instance, instance.$options.computed || {});
            }

            var nodeVue = node.__vue__;

            if (!nodeVue)
                return null;

            return {
                props:    getProps(nodeVue),
                state:    getState(nodeVue),
                computed: getComputed(nodeVue)
            };
        }
    });
};
