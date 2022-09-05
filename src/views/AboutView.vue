<template>
  <div class="about">
    <div class="cart">
      <h1 class="title">Carrito</h1>
      
      <p v-show="!productsCarrito.length">
        <i>El carrito esta Vacio</i>
        <br>
        <router-link to="/">Ir a la tienda</router-link>
      </p>
      
      <table class="table is-striped" v-show="productsCarrito.length">
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in productsCarrito" track-by="id">
            <td>{{ p.name }}</td>
            <td>${{ p.price }}</td>
            <td>
              <button class="btn btn-dark" @click="addToCart(p)">+</button>
              <button class="btn btn-dark" @click="restToCart(p)">-</button>
              {{ p.quantity }}
            </td>
          </tr>
          <tr>
            <td><b>Total:</b></td>
            <td></td>
            <td><b>${{ total }}</b></td>
          </tr>
        </tbody>
      </table>
      
      <p><button v-show="productsCarrito.length" class='button is-primary' @click='checkout'>Checkout</button></p>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  
  export default {
    computed: {
      ...mapGetters({
        productsCarrito: 'cartProducts',
        products: 'allProducts',
      }),
      total () {
        return this.productsCarrito.reduce((total, p) => {
          return total + p.price * p.quantity
        }, 0)
      }
    },
    methods: {
      checkout(){
        alert('Debe abonar $' + this.total)
      },
      ...mapActions([
        'addToCart', 'restToCart'
      ])    
    }
  }
  </script>