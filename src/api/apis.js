console.log(process.env.NODE_ENV)
export default{
    baseHost: process.env.NODE_ENV == 'production'?  'http://loadstar.top:9080' : 'http://localhost:9080',
    // baseHost:'http://loadstar.top:9080',
    auth:{
        signUp:'/user-service/api/account',
        signIn: '/auth-service/oauth/token',
        userInfo: '/user-service/api/account/current'
    },
    link:{
        analysis: '/link-service/open/link/analysis',
        create: '/link-service/api/link',
        query: '/link-service/api/link',
        delete: '/link-service/api/link',
        visit: '/link-service/api/link/{linkId}/visit'
    },
    theme:{
        current: '/user-service/api/theme/current',
        updateListType: '/user-service/api/theme/listType',
        changeLanguage: '/user-service/api/theme/language'
    }
}