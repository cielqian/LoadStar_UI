import api from '../../api/link';

const state = {
    allLink: []
}

// getters
const getters = {
}

// mutations
const mutations = {
    setLinks(state, links) {
        state.allLink = links;
    },
    putLink(state, link) {
        state.allLink.push(link);
    }
}

// actions
const actions = {
    getAllLink({ commit }) {
        api.getAllLinks((response) => commit('setLinks', response.data.items))
    },
    analysisLink({ commit }, link) {
        return api.analysisLink(link);
    },
    createLink({ commit }, link) {
        api.createLink(link).then(response => {
            link.id = response.data;
            commit('putLink', link);
        });
    },
    removeLink({ commit, state, dispatch }, linkId) {
        api.removeLink(linkId).then(response => {
            dispatch('getAllLink');
            // commit('setLinks', remove(state.allLink, function(n) {
            //     return n.id == linkId;
            // }));
        });
    },
    visitLink({ commit, state, dispatch }, linkId) {
        api.visitLink(linkId);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}