import axios from 'axios';
import apis from './apis';

export default{
    signIn(account, cb, errorCb){
        var form = new FormData();
        form.append("scope", "ui");
        form.append("grant_type", "password");
        form.append("username", account.username);
        form.append("password", account.password);

        return new Promise((resolve, reject) => {
            axios.post(apis.auth.signIn, form, {
                headers: {
                      'Content-Type': 'multipart/form-data'
                },
            })
            .then(function(response) {
                resolve(response);
            })
            .catch(error => reject(error));
        });
    },
    userInfo(cb, errorCb){
        return new Promise((resolve, reject) => {
            
            axios.get(apis.auth.userInfo)
            .then(function(response) {
                cb(response);
                resolve(response);
            })
            .catch(error => reject(error));
        });
    }
}