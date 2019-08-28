import axios from 'axios';
import apis from './apis';
import utils from '../utils/commonUtils'

export default{
    getAllTags(){
        return new Promise((resolve, reject) => {
            axios.get(apis.tag.query)
            .then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
    createTag(tag){
        return new Promise((resolve, reject) => {
            axios.post(apis.tag.create, tag)
            .then(function(response) {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
    removeTag(tagId){
        return new Promise((resolve, reject) => {
            axios.delete(utils.replace(apis.tag.delete,[{key:'{tagId}', val:tagId}]))
            .then(function(response) {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    },
    queryTag(keyword){
        return new Promise((resolve, reject) => {
            axios.get(apis.tag.queryByKeyword, {params: {keyword: keyword}})
            .then(function(response) {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }
}