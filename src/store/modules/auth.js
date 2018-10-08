import api from '../../api/auth';
import utils from "../../utils/commonUtils";
import router from '../../router';

const state = {
    loginInfo: {
        hasLogined: false,
        username:'',
        accessToken: ''
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
        }
    },
    setUserInfo(state, userInfo){
        state.loginInfo.username = userInfo.username;
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
    signIn({ commit ,dispatch}, account){
        api.signIn(account
            , (response) => {
                commit('setLoginInfo', {hasLogined:true,accessToken:response.access_token});
                dispatch('getUserInfo');
                router.push('Home');
        })
    },
    signOut({commit}){
        commit('setLoginInfo', {hasLogined:false,accessToken:''});
        router.push('Login');
    }
}

export default{
    state,
    getters,
    mutations,
    actions
}