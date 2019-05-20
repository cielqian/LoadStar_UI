export default{
    baseHost: process.env.NODE_ENV == 'production'?  'http://139.9.234.51:9080' : 'http://localhost:9080',
    // baseHost:'http://loadstar.top:9080',
    auth:{
        signUp:'/user-service/api/account',
        signIn: '/auth-service/oauth/token',
        userInfo: '/user-service/api/account/current'
    },
    link:{
        analysis: '/link-service/open/link/analysis',
        create: '/link-service/api/link',
        update: '/link-service/api/link',
        query: '/link-service/api/link',
        search: '/link-service/api/link/search',
        delete: '/link-service/api/link',
        visit: '/link-service/api/link/{linkId}/visit',
        up: '/link-service/api/link/{linkId}/up',
        down: '/link-service/api/link/{linkId}/down',
        top: '/link-service/api/link/top',
        recent: '/link-service/api/link/recent',
        underFolder: '/link-service/api/folder/{folderId}/link',
        underTag: '/link-service/api/tag/{tagId}/link',
        trash: '/link-service/api/link/trash/{linkId}',
        deleteByFolder: '/link-service/api/folder/{folderId}/link',
        move: '/link-service/api/link/{linkId}/to/{folderId}',
        addToOften: '/link-service/api/link/{linkId}/addToOften',
        removeFromOften: '/link-service/api/link/{linkId}/removeFromOften'
    },
    folder: {
        query: '/link-service/api/folder/current',
        delete: '/link-service/api/folder/{folderId}',
        create: '/link-service/api/folder/current',
    },
    tag:{
        query: '/link-service/api/tag/current',
        queryByKeyword: '/link-service/api/tag',
        create: '/link-service/api/tag',
        delete: '/link-service/api/tag/{tagId}',
    },
    theme:{
        current: '/user-service/api/theme/current',
        updateListType: '/user-service/api/theme/listType',
        changeLanguage: '/user-service/api/theme/language',
        triggerModule: '/user-service/api/theme/modules/{moduleName}'
    },
    tip:{
        query: '/user-service/api/tip/current',
        read: '/user-service/api/tip/read'
    }
}