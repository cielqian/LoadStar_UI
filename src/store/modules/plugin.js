import api from '../../api/plugin';

const state = {
    allPlugin: []
}

// getters
const getters = {
}

// mutations
const mutations = {
    setPlugins(state, plugins){
        state.allPlugin = plugins;
    },
}

// actions
const actions = {
    getAllPlugin({ commit }) {
        return new Promise((resolve, reject) => {
            api.getAllPlugins().then((response) => {
                    commit('setPlugins',response.data);
                    resolve(response);
                })
                .catch((response) => reject());
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}