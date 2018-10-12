import axios from 'axios';
import apis from './apis';
import utils from '../utils/commonUtils'

export default{
    getAllLinks(cb, errorCb){
        axios.get(apis.link.query)
        .then((response) => {
            cb(response);
        }).catch((err)=>{
            errorCb(err);
        });
    },
    analysisLink(link, cb, errorCb){
        return new Promise((resolve, reject) => {
            axios.post(apis.link.analysis, link)
            .then(function(response) {
                resolve(response);
            });
        });
    },
    createLink(link){
        return new Promise((resolve, reject) => {
            axios.post(apis.link.create, link)
            .then(function(response) {
                resolve(response);
            });
        });
    },
    removeLink(linkId){
        return new Promise((resolve, reject) => {
            axios.delete(apis.link.delete + '/' + linkId)
            .then(function(response) {
                resolve(response);
            });
        });
    },
    visitLink(linkId){
        axios.put(utils.replace(apis.link.visit,[{key:'{linkId}', val:linkId}]))
        .then(function(response) {
        });
    },
    up(linkId){
        return new Promise((resolve, reject) => {
            axios.put(utils.replace(apis.link.up,[{key:'{linkId}', val:linkId}]))
            .then(function(response) {
                resolve(response);
            });
        });
    },
    down(linkId){
        return new Promise((resolve, reject) => {
            axios.put(utils.replace(apis.link.down,[{key:'{linkId}', val:linkId}]))
            .then(function(response) {
                resolve(response);
            });
        });
    }
}