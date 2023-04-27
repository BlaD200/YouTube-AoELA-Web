import Vue from 'vue'
import App from './App.vue'

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from "@/router";
import axios from 'axios'

import infiniteScroll from 'vue-infinite-scroll'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(infiniteScroll)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    directives: {infiniteScroll},
    methods: {
        messageBoxOk(title, bodyText, okBtnStyle) {
            this.$bvModal.msgBoxOk(bodyText, {
                title: title,
                size: 'sm',
                buttonSize: 'sm',
                okVariant: okBtnStyle ? okBtnStyle : 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true,
                autoFocusButton: 'ok'
            })
        }
    },
    router
}).$mount('#app')
