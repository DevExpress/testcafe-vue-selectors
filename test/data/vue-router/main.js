import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Foo from './components/foo.vue';
import Bar from './components/bar.vue';

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
];

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router,
    data () {
        return {
            rootProp1: 1
        };
    }
});
