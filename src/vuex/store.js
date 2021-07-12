import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state () {
        return {
            request: [],
            invoice: [],

            window: [],

            rename: {
                'num': '№ Заявки',
                'stg': 'Продукт',
                'dadd': 'Дата',
                'client_name': 'Клиент',
                'state': 'Статус',
                'person_phone': 'Телефон',
                'bank_name':'Банк',
                'client_city':'Город',
            },
            view: 'request',
        }
    },
    mutations: {
        fillData(state, payload){
            state[payload.name] = payload.value
        },
        changeView(state,value){
            state.view = value
        },
        addWindow(state,id) {
            if (!state.window.find(i => i.id == id) && state.request.find(i => i.id == id)) {
                state.window.push(state.request.find(i => i.id == id))
            }
        },
        addStorage(state, id){
            let storage = localStorage.getItem('window')


            if(localStorage.getItem('window') === null){
                localStorage.setItem('window', id);
                return
            }

            if( !storage.split(',').find(i=>i === id)){
                localStorage.setItem('window', storage + ',' + id );
            }
        },
        removeWindow(state,id) {
            let ind = state.window.findIndex(i=>i.id == id)
            if (ind !== -1){
                state.window.splice(ind,1)
            }
        },
        removeStorage(state, id){
            let storage = localStorage.getItem('window')
            let arr = storage.split(',')
            arr.splice(arr.findIndex(i=>i === id),1).join(',')
            localStorage.setItem('window', String(arr));
        },
        createWindow(state, id){
            let arr = Object.keys(state.request[0])
            let newObj = {}
            arr.forEach(i => newObj[i] = '')
            newObj.id = id
            state.request.push(newObj)
        },
    },
    actions: {
        addWindowStack(commit, id){
            this.commit('addWindow', id)
            this.commit('addStorage', id)
        },
        removeWindowStack(commit, id){
            this.commit('removeWindow', id)
            this.commit('removeStorage', id)
        },
        createWindowStack(){
            let id = new Date()
            id = String(id.getTime())
            this.commit('createWindow', id)
            this.commit('addWindow', id)
        }
    },
});