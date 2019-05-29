import axios from 'axios';
import apis from './apis';

export default{
    getAll(page){
        return new Promise((resolve, reject) => {
            axios.get(apis.passbook.all, {params:page})
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
    }
}