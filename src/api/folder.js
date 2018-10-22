import axios from 'axios';
import apis from './apis';
import utils from '../utils/commonUtils'

export default{
    getAllFolders(){
        return new Promise((resolve, reject) => {
            axios.get(apis.folder.query)
            .then((response) => {
                resolve(response);
            });
        });
    },
    createFolder(link){
        return new Promise((resolve, reject) => {
            axios.post(apis.link.create, link)
            .then(function(response) {
                resolve(response);
            });
        });
    },
    removeFolder(linkId){
        return new Promise((resolve, reject) => {
            axios.delete(apis.link.delete + '/' + linkId)
            .then(function(response) {
                resolve(response);
            });
        });
    }
}