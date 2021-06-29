import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import CartModule from "@/store/cart";
import User from "@/store/user";

Vue.use(Vuex);

// interface StoreType {
//     cart: CartModule
//   }

const vuexLocal = new VuexPersist({
  key: "cart",
  storage: window.localStorage,
  modules: ["cart"],
});

const vuexLocalUser = new VuexPersist({
  key: "user",
  storage: window.localStorage,
  modules: ["user"],
});

export const cart_store = new Vuex.Store({
  modules: { cart: CartModule, user: User },
  plugins: [vuexLocal.plugin, vuexLocalUser.plugin],
});
