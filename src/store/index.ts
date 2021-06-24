import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import CartModule from '@/store/cart'

Vue.use(Vuex)

// interface StoreType {
//     cart: CartModule
//   }

const vuexLocal = new VuexPersist({
    key: "cart",
    storage: window.localStorage
})

export const cart_store = new Vuex.Store({
    modules: { cart: CartModule },
    plugins: [vuexLocal.plugin]
})
