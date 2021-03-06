export default{
    baseHost: process.env.NODE_ENV == 'production'?  'https://loadstar.top' : 'http://localhost:9080',
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
        addToOften: '/link-service/api/link/{linkId}/addToDash',
        removeFromOften: '/link-service/api/link/{linkId}/removeFromDash'
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
    },
    plugin:{
        query: '/user-service/api/plugin',
    },
    passbook:{
        create: '/user-service/api/passbook',
        update: '/user-service/api/passbook/{id}',
        delete: '/user-service/api/passbook/{id}',
        all: '/user-service/api/passbook'
    },
    alarmClock:{
        create: '/user-service/api/clock',
        delete: '/user-service/api/clock/{id}',
        all: '/user-service/api/clock'
    },
    calendar: {
        visitCalendar: '/link-service/api/link/calendar/visit/month/{day}',
        visitDay: '/link-service/api/link/calendar/visit/day/{day}',
    }
}