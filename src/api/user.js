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
    },
    createAlarmClock(clock){
        return new Promise((resolve, reject) => {
            axios.post(apis.alarmClock.create, clock)
            .then((response) => {
                resolve(response);
            });
        });
    },
    deleteAlarmClock(id){
        return new Promise((resolve, reject) => {
            axios.delete(utils.replace(apis.alarmClock.delete,[{key:'{id}', val:id}]))
            .then(function(response) {
                resolve(response);
            });
        });
    },
    queryAllAlarmClock(){
        return new Promise((resolve, reject) => {
            axios.get(apis.alarmClock.all)
            .then(function(response) {
                resolve(response);
            });
        });
    }
}