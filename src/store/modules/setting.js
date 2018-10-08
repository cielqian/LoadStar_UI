import api from '../../api/setting';

const state = {
    theme: {
        listTypeEnum:'Card'
    }
}

// getters
const getters = {
}

// mutations
const mutations = {
    setTheme(state, theme){
        state.theme = theme;
    },
    setListTypeEnum(state, listTypeEnum){
        state.theme.listTypeEnum = listTypeEnum;
    }
}

// actions
const actions = {
    getTheme({ commit }) {
        api.getTheme().then((response) => commit('setTheme', {listTypeEnum:response.data.listTypeEnum}))
    },
    setListTypeEnum({ commit }, listTypeEnum){
        commit('setListTypeEnum', listTypeEnum);
        api.updateListType(listTypeEnum)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}