import axios from 'axios';
import apis from './apis';
import utils from '../utils/commonUtils';

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
    },
    changeLanguage(language){
        return new Promise((resolve, reject) => {
            axios.post(apis.theme.changeLanguage, {language:language})
            .then(function(response) {
                resolve(response);
            });
        });
    },
    triggerModule(module){
        return new Promise((resolve, reject) => {
            axios.post(utils.replace(apis.theme.triggerModule, [{key:'{moduleName}', val:module}]))
            .then(function(response) {
                resolve(response);
            });
        });
    }
}