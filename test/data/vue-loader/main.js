import Vue from 'vue';
import App from './components/app.vue';

new Vue({
    el:     '#app',
    render: h => h(App),
    data () {
        return {
            rootProp1: 1
        };
    }
});
