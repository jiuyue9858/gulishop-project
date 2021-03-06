
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolved, rejected) {
    if (resolved === undefined && rejected === undefined) {
        return originPush.call(this, location).catch(() => { })
    } else {
        return originPush.call(this, location, resolved, rejected)
    }
}

VueRouter.prototype.replace = function (location, resolved, rejected) {
    if (resolved === undefined && rejected === undefined) {
        return originReplace.call(this, location).catch(() => { })
    } else {
        return originReplace.call(this, location, resolved, rejected)
    }
}


import routes from './routes'
import store from '@/store'

const router = new VueRouter({
    mode: 'history',
    routes,
    //切换路由的时候保证跳转到的页面滚动位置在最上方
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

// router.beforeEach((to, from, next) => {
//     let targetPath = to.path
//     if(targetPath.indexOf('/pay') === 0 || targetPath.startsWith('/trade') || targetPath.startsWith('/center')  ||targetPath.startsWith('/shopcart')){
//         if(store.state.users.userInfo.name){
//             next()
//         }else{
//             alert('请先登录')
//             next('/login?redirect=' + targetPath)
//         }
//     }else{
//         next()//放行
//     }
// })
const whiteArr = ['/login']
router.beforeEach(async (to, from, next) => {
    let userInfo = store.state.users.userInfo
    let token = store.state.users.token
    if (userInfo.name) {
        // userInfo为真  用户信息存在,而且一定登陆过(token)  用户的信息是需要通过token再次发请求获取的
        // 既然用户信息已经存在,那么说明token之前已经存在  代表之前登录过
        next()
    } else {
        // 代表用户信息不存在  代表没有通过token去请求用户数据  但是不能说明token不存在   token有可能存在有可能不存在
        if (token) {
            // token存在，代表之前登陆过，但是没有获取用户信息，此时再次访问登陆页面，不应该去
            if (to.path === '/login') {
                next('/')
            } else {
                // 通过token去请求获取用户信息存储
                try {
                    // token获取用户信息成功
                    await store.dispatch('tokenGetUserInfo')
                    next()
                } catch (error) {
                    // token失效获取用户信息失败，需要重新登陆，获取token
                    next('/login?redirect=' + to.path)
                }
            }
        }else{
            if(to.path.indexOf('/pay') === 0 || to.path.startsWith('/trade') || to.path.startsWith('/center')){
              next('/login?redirect='+to.path)
            }else{
              next()
            }
          }
    }
})
export default router