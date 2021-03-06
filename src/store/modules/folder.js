import api from '../../api/folder';

const state = {
    allFolder:[{name:''}]
}

// getters
const getters = {}

// actions
const actions = {
    getAllFolder({ commit }) {
        return new Promise((resolve, reject) => {
            api.getAllFolders()
                .then((response) => {
                    commit('setFolders', response.data);
                    resolve(response);
                })
                .catch(error => {});
        });
    },
    createFolder({ commit }, folder) {
        return new Promise((resolve, reject) => {
            api.createFolder(folder).then(response => {
                resolve();
            }).catch(error => {});
        });
    },
    
}

// mutations
const mutations = {
    setFolders(state, folders) {
        state.allFolder = folders;
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}