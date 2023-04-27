import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/views/Home";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/watch',
            name: 'WatchVideo',
            component: () => import("@/views/VideoView")
        },
        {
            path: '/upload',
            name: 'UploadVideo',
            component: () => import("@/views/UploadVideo")
        }
    ]
})
