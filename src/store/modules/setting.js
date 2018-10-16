import api from '../../api/setting';
import commonUtils from '../../utils/commonUtils';

const state = {
    theme: {
        listTypeEnum:'Card',
        language: 'en',
        modules: [{ module: "Recently", show: false }, { module: "Top", show: false }]
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
    },
    isShowModule: (state) => (moduleName) => {
        for (let index = 0; index < state.theme.modules.length; index++) {
            const cur = state.theme.modules[index];
            if (cur.module === moduleName) {
                return cur.show;
            }
        }
        return false;
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
    },
    triggerModule(state, module){
        for (let index = 0; index < state.theme.modules.length; index++) {
            const cur = state.theme.modules[index];
            if (cur.module === module) {
                cur.show = !cur.show;
            }
        }
    }
}

// actions
const actions = {
    getTheme({ commit }) {
        api.getTheme().then((response) => 
        {
            commit('setTheme',{
                listTypeEnum:response.data.listTypeEnum,
                language:response.data.language,
                modules: JSON.parse(response.data.modules)
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
    },
    triggerModule({ commit }, module){
        // commit('triggerModule', module);
        api.triggerModule(module);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}