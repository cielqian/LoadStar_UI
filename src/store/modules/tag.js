import api from '../../api/tag';

const state = {
    allTag:[]
}

// getters
const getters = {}

// actions
const actions = {
    getAllTag({ commit }) {
        return new Promise((resolve, reject) => {
            api.getAllTags()
                .then((response) => {
                    commit('setTags', response.data);
                    resolve();
                })
                .catch((response) => reject());
        });
    },
    createTag({ commit }, tag) {
        api.createTag(tag).then(response => {
            tag.id = response.data;
            commit('putTag', tag);
        });
    },
    removeTag({ commit, state, dispatch }, tagId) {
        return new Promise((resolve, reject) => {
            api.removeTag(tagId).then(response => {
                dispatch('getAllTag');
                resolve();
            });
        });
    },
}

// mutations
const mutations = {
    setTags(state, tags) {
        state.allTag = tags;
    },
    putTag(state, tag){
        state.allTag.push(tag);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}