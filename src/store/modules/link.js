import api from '../../api/link';
import _ from 'lodash'

const state = {
    allLink: [],
    topLink: [],
    recentLink: [],
    oftenLink: []
}

// getters
const getters = {
}

// mutations
const mutations = {
    setLinks(state, links) {
        state.allLink = links;
    },
    setOftenLinks(state, links) {
        state.oftenLink = links;
    },
    setTopLinks(state, links){
        state.topLink = links;
    },
    setRecentLinks(state, links){
        state.recentLink = links;
    },
    putLink(state, link) {
        state.allLink.push(link);
    },
    putOftenLink(state, link){
        state.oftenLink.push(link);
    },
    removeOftenLink(state, linkId){
        state.oftenLink = _.dropWhile(state.oftenLink, (o)=>{
            return o.id == linkId;
        })
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
    getOftenLink({ commit }) {
        return new Promise((resolve, reject) => {
            api.getAllLinksUnderTag(-1)
                .then((response) => {
                    commit('setOftenLinks', response.data);
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
                resolve();
            });
        });
    },
    trashLink({ commit, state, dispatch }, linkId){
        return new Promise((resolve, reject) => {
            api.trashLink(linkId).then(response => {
                resolve();
            });
        });
    },
    visitLink({ commit, state, dispatch }, link) {
        api.visitLink(link.id);
        window.open(link.url);
    },
    upLink({ commit, state, dispatch }, linkId){
        return api.up(linkId);
    },
    downLink({ commit, state, dispatch }, linkId){
        return api.down(linkId);
    },
    addLinkToOften({ commit, state, dispatch }, link){
        return new Promise((resolve, reject) => {
            api.addToOften(link.id).then(response => {
                commit('putOftenLink', link);
                resolve();
            });
        });
    },
    removeLinkFromOften({ commit, state, dispatch }, link){
        return new Promise((resolve, reject) => {
            api.removeFromOften(link.id).then(response => {
                commit('removeOftenLink', link.id);
                resolve();
            });
        });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}