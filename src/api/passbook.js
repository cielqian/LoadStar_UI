import axios from 'axios';
import apis from './apis';
import utils from '../utils/commonUtils';

export default{
    getAll(page){
        return new Promise((resolve, reject) => {
            axios.get(apis.passbook.all, {params:page})
            .then((response) => {
                resolve(response);
            });
        });
    },
    remove(id){
        return new Promise((resolve, reject) => {
            axios.delete(utils.replace(apis.passbook.delete,[{key:'{id}', val:id}]))
            .then((response) => {
                resolve(response);
            });
        });
    },
    createPassbook(passbook){
        return new Promise((resolve, reject) => {
            axios.post(apis.passbook.create, passbook)
            .then((response) => {
                resolve(response);
            });
        });
    },
    update(id, passbook){
        return new Promise((resolve, reject) => {
            axios.put(utils.replace(apis.passbook.update,[{key:'{id}', val:id}]), passbook)
            .then((response) => {
                resolve(response);
            });
        }); 
    }
}