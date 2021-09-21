import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import NProgress from "nprogress"
import 'nprogress/nprogress.css' // progress bar style
import store from "../store";


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: routes
});
router.beforeEach((to, from, next) => {
    NProgress.start()
    if(to.path=="/login"){
        // if(store.getters['user/token']){
        //     console.log('router/index','有token所以路由重定向回home')
        //     next({
        //         path:'/home'
        //     })
        // }else{
            next()
        // }
    }
    next()
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})
export default router;
