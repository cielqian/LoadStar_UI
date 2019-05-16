import axios from 'axios';
import apis from './apis';
import utils from '../utils/commonUtils'

export default{
    getAllTips(){
        return new Promise((resolve, reject) => {
            axios.get(apis.tip.query)
            .then((response) => {
                resolve(response);
            });
        });
    },
    readTip(tip){
        return new Promise((resolve, reject) => {
            axios.post(apis.tip.read, tip)
            .then((response) => {
                resolve(response);
            });
        });
    }
}