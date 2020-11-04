import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'
const state = {
    // 存数据
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations = {
    // 直接修改state数据
    RECEIVECATEGORYLIST(state,categorList){
        state.categoryList = categorList
    },
    RECEIVEBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    RECEIVEFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
const actions = {
    // 异步action   发请求  拿数据
    async getCategoryList(context){//store对象
        // 调用reqCategoryList返回的是promise对象
        const result = await reqCategoryList()//前面已经解决错误在ajax,已经中断promise链
        if(result.code === 200){
            context.commit('RECEIVECATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){//store对象
        const result = await reqBannerList()//前面已经解决错误在ajax,已经中断promise链
        if(result.code === 200){
            commit('RECEIVEBANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){//store对象
        const result = await reqFloorList()//前面已经解决错误在ajax,已经中断promise链
        if(result.code === 200){
            commit('RECEIVEFLOORLIST',result.data)
        }
    }
}
const getters = {
//      banners(state){
//          return state.bannerList
//      }//相当于computed计算新属性
//     //  banners是根据bannerList得到的
}

export default{
    state,
    mutations,
    actions,
    getters
}