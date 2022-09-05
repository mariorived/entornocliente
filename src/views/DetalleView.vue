<template>
  <div class="detalle">
    <div v-if="loading"  class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="productoSeleccionado" class="content card">
      <img :src="productoSeleccionado.thumbnailUrl" :alt="`imagen ${productoSeleccionado.name}`" class="card-img-top" />
      <h2>{{ productoSeleccionado.name }}</h2>
      <p>{{ productoSeleccionado.description }}</p>
      <button class="btn btn-dark" @click="addToCart(productoSeleccionado)">Agregar al carrito</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        loading: false,
        productoSeleccionado: null,
        error: null,
      }
    },
    created() {
      // watch the params of the route to fetch the data again
      this.$watch(
        () => this.$route.params,
        () => {
          if(this.products.length === 0){
            this.ningunDato()      
          }  
          else{
            this.fetchData2()
          }
        
        },
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true }
      )
    },
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
      fetchData2() {
        this.loading = false
        this.productoSeleccionado = this.products.find(p => p.id === this.$route.params.id) 
      },
      ningunDato(){
        let cf = this;
        this.loading = true
        this.fetchData().then(
          function(res){
            cf.fetchData2()
          },
          function(err){
            console.log(err)
          },
        )
      },
      checkout(){
        alert('Paga en total $' + this.total)
      },
      ...mapActions([
        'addToCart', 'restToCart', 'fetchData'
      ])    
    }
  }
</script>