import userApi from '../../api/user';

const state = {
    tipInfo:{
    }
}

// getters
const getters = {
    getTipInfo: state => {
        let tipInfo = state.tipInfo;
        if (!tipInfo.drag) {
            let storageTipInfo = localStorage.getItem("LS_TIP");
            if (!storageTipInfo) {
                state.tipInfo = {
                    drag:false,
                    trashLink: false,
                    contentMenu: false
                }
            }else{
                state.tipInfo = JSON.parse(storageTipInfo);
            }
        }
        tipInfo = state.tipInfo;
        return tipInfo;
    }
}

// actions
const actions = {
    readTip({commit}, tip){
        commit('readTip', tip);
    },
    loadAllTipInfo({commit}){
        commit('loadAllTipInfo');
    }
}

// mutations
const mutations = {
    readTip(state, tip){
        state.tipInfo[tip] = true;
        userApi.readTip({tip:tip});
        // localStorage.setItem("LS_TIP", JSON.stringify(state.tipInfo));
    },
    loadAllTipInfo(state){
        userApi.getAllTips().then(res => {
            res.data.forEach(element => {
                state.tipInfo[element.tip] = element.hasRead;
            });
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}