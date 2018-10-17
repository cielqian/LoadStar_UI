import api from '../../api/link';

const state = {
    allLink: [],
    topLink: [],
    recentLink: []
}

// getters
const getters = {
}

// mutations
const mutations = {
    setLinks(state, links) {
        state.allLink = links;
    },
    setTopLinks(state, links){
        state.topLink = links;
    },
    setRecentLinks(state, links){
        state.recentLink = links;
    },
    putLink(state, link) {
        state.allLink.push(link);
    }
}

// actions
const actions = {
    getAllLink({ commit }) {
        return new Promise((resolve, reject) => {
            api.getAllLinks()
                .then((response) => {
                    commit('setLinks', response.data.items);
                    resolve();
                })
                .catch((response) => reject());
        });
    },
    getRecentLink({ commit }){
        api.getRecentLinks()
        .then((response) => {
            commit('setRecentLinks', response.data)
        })
    },
    getTopLink({ commit }){
        api.getTopLinks()
        .then((response) => {
            commit('setTopLinks', response.data)
        })
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
        return new Promise((resolve, reject) => {
            api.removeLink(linkId).then(response => {
                dispatch('getAllLink');
                resolve();
            });
        });
    },
    visitLink({ commit, state, dispatch }, linkId) {
        api.visitLink(linkId);
    },
    upLink({ commit, state, dispatch }, linkId){
        return api.up(linkId);
    },
    downLink({ commit, state, dispatch }, linkId){
        return api.down(linkId);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}