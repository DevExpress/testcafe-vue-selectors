const { Selector } = require('testcafe');

module.exports = Selector(complexSelector => {
    window['%findVueRoot%'] = (node = document) => {
        const treeWalker = document.createTreeWalker(
            node,
            NodeFilter.SHOW_ELEMENT,
            () => NodeFilter.FILTER_ACCEPT,
            false
        );

        let instance = node.__vue__;

        while (!instance && treeWalker.nextNode())
            instance = treeWalker.currentNode.__vue__;

        return instance;
    };

    window['%vueSelector%'] = (complexSelector_, vueRoots = null) => {
        function validateSelector (selector) {
            if (selector !== void 0 && typeof selector !== 'string')
                throw new Error('If the selector parameter is passed it should be a string, but it was ' + typeof selector);
        }

        function validateVueVersion (rootInstance) {
            const MAJOR_SUPPORTED_VUE_VERSION = 2;
            const vueVersion                  = parseInt(findVueConstructor(rootInstance).version.split('.')[0], 10);

            if (vueVersion < MAJOR_SUPPORTED_VUE_VERSION)
                throw new Error('testcafe-vue-selectors supports Vue version 2.x and newer');
        }

        function findVueConstructor (rootInstance) {
            let Vue = Object.getPrototypeOf(rootInstance).constructor;

            while (Vue.super)
                Vue = Vue.super;

            return Vue;
        }

        function getComponentTagNames (componentSelector) {
            return componentSelector
                .split(' ')
                .filter(el => !!el)
                .map(el => el.trim());
        }

        function getComponentTag (instance) {
            return instance.$options.name ||
                   instance.$options._componentTag ||
                   instance.$options.__file ||
                   '';
        }

        function isRef (selector) {
            return selector.indexOf('ref:') !== -1;
        }

        function getRef (selector) {
            if (selector.indexOf('ref:') === 0 && selector.split('ref:')[1])
                return selector.split('ref:')[1];

            throw new Error('If the ref is passed as selector it should be in the format \'ref:ref-selector\'');
        }

        function getRefOfNode (node) {
            if (node.$vnode && node.$vnode.data)
                return node.$vnode.data.ref;
            return null;
        }

        function filterNodes (roots, tags) {
            const foundComponents = [];

            function walkVueComponentNodes (node, tagIndex, checkFn) {
                if (checkFn(node, tagIndex)) {
                    if (tagIndex === tags.length - 1) {
                        if (foundComponents.indexOf(node.$el) === -1)
                            foundComponents.push(node.$el);
                        return;
                    }

                    tagIndex++;
                }

                for (let i = 0; i < node.$children.length; i++) {
                    const childNode = node.$children[i];

                    walkVueComponentNodes(childNode, tagIndex, checkFn);
                }
            }

            roots.forEach(root => {
                walkVueComponentNodes(root, 0, (node, tagIndex) => {
                    if (isRef(tags[tagIndex])) {
                        const ref = getRef(tags[tagIndex]);

                        return ref === getRefOfNode(node);
                    }
                    return tags[tagIndex] === getComponentTag(node);
                });
            });

            return foundComponents;
        }


        validateSelector(complexSelector_);
        
        const rootInstances = vueRoots ? vueRoots : [];

        if (!vueRoots) {
            const documentRoot = window['%findVueRoot%']();

            if (documentRoot) 
                rootInstances.push(documentRoot);

            if (!documentRoot)
                return null;
        }

        rootInstances.map(validateVueVersion);

        if (!complexSelector_)
            return rootInstances.map(node => node.$el);

        const componentTags = getComponentTagNames(complexSelector_);

        return filterNodes(rootInstances, componentTags);
    };

    return window['%vueSelector%'](complexSelector);
}).addCustomMethods({
    getVue: (node, fn) => {
        function getData (instance, prop) {
            const result = {};

            Object.keys(prop).forEach(key => {
                result[key] = instance[key];
            });


            return result;
        }

        function getProps (instance) {
            return getData(instance, instance.$options.props || {});
        }

        function getState (instance) {
            const props   = instance._props || instance.$options.props;
            const getters = instance.$options.vuex && instance.$options.vuex.getters;
            const result  = {};

            Object.keys(instance._data)
                .filter(key => !(props && key in props) && !(getters && key in getters))
                .forEach(key => {
                    result[key] = instance._data[key];
                });

            return result;
        }

        function getComputed (instance) {
            return getData(instance, instance.$options.computed || {});
        }

        function getComponentReference (instance) {
            return instance.$vnode && instance.$vnode.data && instance.$vnode.data.ref;
        }

        const nodeVue = node.__vue__;

        if (!nodeVue)
            return null;

        const props    = getProps(nodeVue);
        const state    = getState(nodeVue);
        const computed = getComputed(nodeVue);
        const ref      = getComponentReference(nodeVue);

        if (typeof fn === 'function')
            return fn({ props, state, computed, ref });

        return { props, state, computed, ref };
    }
}).addCustomMethods({
    findVue: (nodes, selector) => {
        return window['%vueSelector%'](selector, nodes.map(window['%findVueRoot%']));
    },
}, { returnDOMNodes: true });
