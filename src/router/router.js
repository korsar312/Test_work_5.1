import Vue from 'vue';
import VueRouter  from 'vue-router';

import Main from '../pages/Main'
import About from '../pages/About'


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'main',
        component: Main,
    },
    {
        path: '/about/:id',
        name: 'about',
        component: About,
    },
]

export const router = new VueRouter({
    routes
})




