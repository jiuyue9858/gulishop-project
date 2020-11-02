import {reqCategoryList} from '@/api'
const state = {
    // 存数据
    categoryList:[]
}
const mutations = {
    // 直接修改state数据
    RECEIVECATEGORYLIST(state,categorList){
        state.categoryList = categorList
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
    }
}
const getters = {}

export default{
    state,
    mutations,
    actions,
    getters
}