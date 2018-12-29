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
        tags.forEach(element => {
            let ran = Math.floor((Math.random()*5)+1);
            switch (ran) {
                    case 1:
                    element.type = 'info';
                    break;
                    case 2:
                    element.type = 'success';
                    break;
                    case 3:
                    element.type = 'warning';
                    break;
                    case 4:
                    element.type = 'danger';
                    break;
                default:
                    break;
            }
        });
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