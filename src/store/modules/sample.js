import userApi from '../../api/user';

// state
const state = {
    intro: {
        home: true,
        folder: true
    },
    linkSamples: [{
        "comment": "",
        "createTime": 1558003644000,
        "folderId": "1128505748250230786",
        "icon": "http://a.trellocdn.com/prgb/dist/images/ios/apple-touch-icon-152x152-precomposed.0307bc39ec6c9ff499c8.png",
        "id": "1128975225903419393",
        "isDelete": false,
        "lastSeen": 1558494896000,
        "name": "",
        "sortIndex": 1,
        "thumbnail": "",
        "title": "Trello",
        "updateTime": null,
        "url": "https://trello.com/b/ZN0z064P/loadstar-110",
        "userId": "1128503863460048897",
        "visitedCount": 3
    }],
    folderSamples: [{
        "childs": [],
        "code": "default",
        "folder": true,
        "id": "1128505748250230786",
        "name": "未归档",
        "system": true
    },
    {
        "childs": [],
        "code": "trash",
        "folder": true,
        "id": "1128505748694827010",
        "name": "回收站",
        "system": true
    }]
}

// getters
const getters = {
}

// mutations
const mutations = {
    finishSample (state, sample) {
        state.intro[sample] = false;
        userApi.readTip({tip: sample});
    },
    setSample(state, intro){
        state.intro[intro.tip] = !intro.hasRead;
    }
}

// actions
const actions = {
    finishSample({commit}, sample){
        commit('finishSample', sample);
    },
    loadAllTipInfo({commit}){
        return new Promise((resolve, reject) => {
            userApi.getAllTips().then(res => {
                res.data.forEach(element => {
                    commit('setSample', element);
                });
                resolve(state.intro);
            })
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}