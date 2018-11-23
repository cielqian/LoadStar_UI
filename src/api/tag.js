import axios from 'axios';
import apis from './apis';
import utils from '../utils/commonUtils'

export default{
    getAllTags(){
        return new Promise((resolve, reject) => {
            axios.get(apis.tag.query)
            .then((response) => {
                resolve(response);
            });
        });
    },
    createTag(tag){
        return new Promise((resolve, reject) => {
            axios.post(apis.tag.create, tag)
            .then(function(response) {
                resolve(response);
            });
        });
    },
    removeTag(tagId){
        return new Promise((resolve, reject) => {
            axios.delete(utils.replace(apis.tag.delete,[{key:'{tagId}', val:tagId}]))
            .then(function(response) {
                resolve(response);
            });
        });
    }
}