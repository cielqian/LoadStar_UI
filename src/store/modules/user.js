import userApi from '../../api/user';

const state = {
    tipInfo:{
    },
    alarmClocks: []
}

// getters
const getters = {
}

// actions
const actions = {
    createAlarmClock: function ({commit},clock) {
        return new Promise((resolve, reject) => {
            userApi.createAlarmClock(clock).then(response => {
                clock.id = response.data;
                commit('putAlarmClock', clock);
                resolve(clock);
            });
        });
    },
    removeAlarmClock: function ({commit},id) {
        return new Promise((resolve, reject) => {
            userApi.deleteAlarmClock(id).then(response => {
                commit('removeAlarmClock', id);
                resolve(id);
            });
        });
    },
    queryAllAlarmClock({commit}){
        return new Promise((resolve, reject) => {
            userApi.queryAllAlarmClock().then(response => {
                commit('setAlarmClock', response.data);
                resolve(response);
            });
        });
    }
}

// mutations
const mutations = {
    removeAlarmClock(state, id){
        state.alarmClocks = _.filter(state.alarmClocks, (o)=>{
            return o.id != id;
        });
    },
    putAlarmClock(state, clock){
        state.alarmClocks.push(clock);
    },
    setAlarmClock(state, clocks){
        state.alarmClocks = clocks;
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}