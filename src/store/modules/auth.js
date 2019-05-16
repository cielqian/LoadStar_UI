import api from '../../api/auth';
import userApi from '../../api/user';
import utils from "../../utils/commonUtils";
import router from '../../router';

const state = {
    loginInfo: {
        hasLogined: false,
        username:'',
        nickname:'',
        accessToken: ''
    },
    tipInfo:{
    }
}

// getters
const getters = {
    getAccessToken: state => {
        let token = state.loginInfo.accessToken;
        if(utils.isEmpty(token)){
            token = localStorage.getItem("LS_ACCESS_TOKEN");
        }
        return token;
    },
    hasLogined: state => {
        return utils.isNotEmpty(getters.getAccessToken(state));
    },
    getUserInfo: state => {
        return {
            username: state.loginInfo.username,
            nickname: state.loginInfo.nickname
        }
    },
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
// mutations
const mutations = {
    setLoginInfo(state,loginInfo){
        state.loginInfo.hasLogined = loginInfo.hasLogined;
        state.loginInfo.accessToken = loginInfo.accessToken;
        if (loginInfo.hasLogined) {
            localStorage.setItem("LS_ACCESS_TOKEN", loginInfo.accessToken);
        }else{
            localStorage.removeItem("LS_ACCESS_TOKEN");
            state.loginInfo.username = '';
            state.loginInfo.nickname = '';
        }
    },
    setUserInfo(state, userInfo){
        state.loginInfo.username = userInfo.username;
        state.loginInfo.nickname = userInfo.nickname;
    },
    readTip(state, tip){
        state.tipInfo[tip] = true;
        userApi.readTip({tip:tip});
        // localStorage.setItem("LS_TIP", JSON.stringify(state.tipInfo));
    }
}

// actions
const actions = {
    checkLoginInfo({commit, getters, state,dispatch}){
        let token = getters.getAccessToken;
        if(utils.isNotEmpty(token)){
            commit('setLoginInfo', {hasLogined:true,accessToken:token});
            if(utils.isEmpty(state.loginInfo.username)){
                dispatch('getUserInfo');
                dispatch('getTheme')
            }
        }else{
            commit('setLoginInfo', {hasLogined:false,accessToken:''});
            router.push('Login');
        }
    },
    getUserInfo({ commit}){
        api.userInfo((response) => commit('setUserInfo', response.data))
    },
    signIn({ commit, dispatch }, account) {
        return new Promise((resolve, reject) => {
            api.signIn(account)
                .then((response) => {
                    commit('setLoginInfo', { hasLogined: true, accessToken: response.access_token });
                    dispatch('getUserInfo');
                    router.push('Home');
                    resolve();
                }).catch((response) => reject(response));
        });
    },
    signOut({commit}){
        commit('setLoginInfo', {hasLogined:false,accessToken:''});
        router.push('Login');
    },
    readTip({commit}, tip){
        commit('readTip', tip);
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}