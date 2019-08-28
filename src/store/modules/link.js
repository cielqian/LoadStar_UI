import api from '../../api/link';
import _ from 'lodash'

const state = {
    allLink: [],//所有书签
    topLink: [],//置顶书签
    recentLink: [],//最近访问
    dashLink: [],//首页书签
    calendar: {
        visit: []
    }
}

// getters
const getters = {
}

// mutations
const mutations = {
    setLinks(state, links) {
        state.allLink = links;
    },
    setDashLinks(state, links) {
        state.dashLink = links;
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
    putDashLink(state, link){
        link.isOften = true;
        state.dashLink.push(link);
    },
    removeDashLink(state, linkId){
        state.dashLink = _.filter(state.dashLink, (o)=>{
            return o.id != linkId;
        });
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
    getDashLink({ commit }) {
        return new Promise((resolve, reject) => {
            api.getAllLinksUnderTag(1)
                .then((response) => {
                    commit('setDashLinks', response.data);
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
            if (link.isOften) {
                commit('putOftenLink', link);
            }
        });
    },
    updateLink({ commit }, link) {
        api.updateLink(link).then(response => {
            link.id = response.data;
            // commit('putLink', link);
            // if (link.isOften) {
            //     commit('putOftenLink', link);
            // }
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
    addLinkToDash({ commit, state, dispatch }, link){
        return new Promise((resolve, reject) => {
            api.addToOften(link.id).then(response => {
                commit('putDashLink', link);
                resolve();
            });
        });
    },
    removeDashLink({ commit, state, dispatch }, link){
        return new Promise((resolve, reject) => {
            api.removeFromOften(link.id).then(response => {
                commit('removeDashLink', link.id);
                resolve();
            });
        });
    },
    getCalendar({commit}, day){
        return new Promise((resolve, reject) => {
            api.getCalendar(day).then(response => {
                resolve(response);
            });
        });
    },
    getVisitList({commit}, day){
        return new Promise((resolve, reject) => {
            api.getVisitList(day).then(response => {
                resolve(response);
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