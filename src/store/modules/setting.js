import api from '../../api/setting';
import Vue from 'vue'
import commonUtils from '../../utils/commonUtils';

const state = {
    theme: {
        listTypeEnum:'Card',
        language: 'en'
    }
}

// getters
const getters = {
    getLanguage: (state) => {
        let language = localStorage.getItem("LS_LANGUAGE");
        if (commonUtils.isEmpty(language)) {
            language = 'en';
        }
        state.theme.language = language;
        return language;
    }
}

// mutations
const mutations = {
    setTheme(state, theme){
        state.theme = theme;
    },
    setListTypeEnum(state, listTypeEnum){
        state.theme.listTypeEnum = listTypeEnum;
    },
    setLanguage(state, language){
        state.theme.language = language;
        localStorage.setItem("LS_LANGUAGE", language);
    }
}

// actions
const actions = {
    getTheme({ commit }) {
        api.getTheme().then((response) => 
        {
            commit('setTheme',{
                listTypeEnum:response.data.listTypeEnum,
                language:response.data.language
            });
            commit('setLanguage',response.data.language);
        })
    },
    setListTypeEnum({ commit }, listTypeEnum){
        commit('setListTypeEnum', listTypeEnum);
        api.updateListType(listTypeEnum)
    },
    setLanguage({ commit }, language){
        commit('setLanguage', language);
        api.changeLanguage(language);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}