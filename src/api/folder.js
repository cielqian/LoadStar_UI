import axios from 'axios';
import apis from './apis';

export default{
    getAllFolders(){
        return new Promise((resolve, reject) => {
            axios.get(apis.folder.query)
            .then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    createFolder(folder){
        return new Promise((resolve, reject) => {
            axios.post(apis.folder.create, folder)
            .then(function(response) {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    removeFolder(linkId){
        return new Promise((resolve, reject) => {
            axios.delete(apis.folder.delete + '/' + linkId)
            .then(function(response) {
                resolve(response);
            });
        });
    }
}