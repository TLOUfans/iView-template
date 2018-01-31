import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';
import {routers, otherRouter, appRouter} from './router';

Vue.use(VueRouter);

// 路由配置(即定义路由)
const RouterConfig = {
    // mode: 'history',
    routes: routers
};
//创建router实例，然后传"routes"配置
export const router = new VueRouter(RouterConfig);
// 你可以使用 router.beforeEach 注册一个全局前置守卫：(来自vue-router官网)
router.beforeEach((to, from, next) => {
    /* 每个守卫方法接收三个参数：(来自vue-route官网)
       to: Route: 即将要进入的目标 路由对象
       from: Route: 当前导航正要离开的路由
       next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
            next(): 进行管道中的下一个钩子。（即replace: true）
            next(false): 中断当前的导航。
            next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。
    */
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
        window.console.log('LY:已经锁屏（输入其他页面则直接跳转locking锁屏页面）---判断锁定状态');
        next({
            replace: true,
            name: 'locking'
        });
    } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
        window.console.log('LY:已经锁屏（输入locking锁屏页面）---判断锁定状态');
        next(false);// 中断当前的导航。
    } else {
        if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            window.console.log('LY:未登录(输入其他页面则直接跳转登录页login)--判断是否已经登录且前往的页面不是登录页');
            next({
                name: 'login'
            });
        } else if (Cookies.get('user') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            window.console.log('LY:已登录（输入login就直接跳转到首页home）--判断是否已经登录且前往的是登录页');
            Util.title();
            next({
                name: 'home_index'
            });
        } else {
            const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
            if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                if (curRouterObj.access === parseInt(Cookies.get('access'))) {
                    Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else { // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...routers], to.name, router, next);
            }
        }
    }
});

router.afterEach((to) => {
    Util.openNewPage(router.app, to.name, to.params, to.query);
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
