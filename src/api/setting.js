import axios from 'axios';
import apis from './apis';

export default{
    getTheme(){
        return new Promise((resolve, reject) => {
            axios.get(apis.theme.current)
            .then(function(response) {
                resolve(response);
            });
        });
    },
    updateListType(listType){
        return new Promise((resolve, reject) => {
            axios.post(apis.theme.updateListType, {listType:listType})
            .then(function(response) {
                resolve(response);
            });
        });
    }
}