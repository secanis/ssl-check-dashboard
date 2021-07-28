import Vue from 'vue';
import Vuex from 'vuex';
import { extractVuexModule, createProxy } from 'vuex-class-component';
import Cache from './cache';
import { Module } from '@nestjs/common';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        ...extractVuexModule(Cache),
    },
});

const vxm = {
    cache: createProxy(store, Cache),
};

export default () => {
    return store;
};
