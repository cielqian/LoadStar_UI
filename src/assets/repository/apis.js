export default{
    baseHost:'http://localhost:9080',
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
        delete: '/link-service/api/link'
    },
    theme:{
        current: '/user-service/api/theme/current'
    }
}