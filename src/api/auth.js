import axios from 'axios';
import apis from './apis';

export default{
    signIn(account, cb, errorCb){
        var form = new FormData();
        form.append("scope", "ui");
        form.append("grant_type", "password");
        form.append("username", account.username);
        form.append("password", account.password);

        axios.post(apis.auth.signIn,  form, {
                      headers: {
                            'Content-Type': 'multipart/form-data'
                      },
                  })
        .then((response) => {
            cb(response);
        }).catch((err)=>{
            errorCb(err);
        });
    },
    userInfo(cb, errorCb){
        axios.get(apis.auth.userInfo)
        .then((response) => {
            cb(response);
        }).catch((err)=>{
            errorCb(err);
        });
    }
}