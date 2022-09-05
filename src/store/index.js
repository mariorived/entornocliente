import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    added: [],
    all: [
      // {
      //   id: 'cc919e21-ae5b-5e1f-d023-c40ee669520c',
      //   name: 'COBOL 101 vintage',
      //   description: 'Learn COBOL with this vintage programming book',
      //   price: 399
      // },
      // {
      //   id: 'bcd755a6-9a19-94e1-0a5d-426c0303454f',
      //   name: 'Sharp C2719 curved TV',
      //   description: 'Watch TV like never before with the brand new curved screen technology',
      //   price: 1995
      // },
      // {
      //   id: '727026b7-7f2f-c5a0-ace9-cc227e686b8e',
      //   name: 'Remmington X mechanical keyboard',
      //   description: 'Excellent for gaming and typing, this Remmington X keyboard ' +
      //     'features tactile, clicky switches for speed and accuracy',
      //   price: 595
      // }
    ]
  },
  getters: {
    allProducts: state => state.all, 
    getNumberOfProducts: state => (state.all) ? state.all.length : 0,
    cartProducts: state => {
      return state.added.map(({ id, quantity }) => {
        const product = state.all.find(p => p.id === id)
        console.log(product)
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          thumbnailUrl: product.thumbnailUrl,
          quantity
        }
      })
    }
  },
  mutations: {
    setProductos(state, payload) {
      state.all = payload
    },

    [types.ADD_TO_CART] (state, { id }) {
	    const record = state.added.find(p => p.id === id)
	    if (!record) {
	      state.added.push({
	        id,
	        quantity: 1
	      })
	    } else {
	      record.quantity++
	    }
	  },

    [types.REST_TO_CART] (state, { id }) {
      console.log(state.added.find(p => p.id === id))
	    const record = state.added.find(p => p.id === id)
	    if (!record) {
	    } else {
	      record.quantity--
	    }
      if(record.quantity == 0){
        state.added = state.added.filter((p) => p.id !== id)
      }
	  }
  },
  actions: {
    async fetchData({commit}) {
      try {
        const res = await fetch('./api.json')
        const productos = await res.json()
        commit('setProductos', productos)
        console.log(productos);
        return productos;
      } catch (error) {
        console.log(error)
      }
    },
    addToCart({ commit }, product){
      console.log('suma');
      commit(types.ADD_TO_CART, {
        id: product.id
      })
    },
    restToCart({ commit }, product){
      console.log('resta');
      console.log(product);
      commit(types.REST_TO_CART, {
        id: product.id
      })
    }
  }
})
