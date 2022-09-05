<template>
  <div class="hello">
    <!-- {{msg}} -->
    <div>
      <h1 class="title">Todos los Productos</h1>
      <p>{{length}} productos</p>

      <div class="container">
        <div class="row">
          <div class="card productos" v-for="product in products" track-by="id">
            <div class="card-body">
              <img :src="product.thumbnailUrl" :alt="`imagen ${product.name}`" class="card-img-top" />
              <h5 class="card-title">
                <p>{{product.description}}</p>
              </h5>
              <p class="card-text">$<span>{{product.price}}</span></p>
              <button class="btn btn-dark" @click="ir(product)">ver</button>
              <button class="btn btn-dark" @click="addToCart(product)">Comprar</button>
              <button class="btn btn-dark" @click="restToCart(product)">Sacar</button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  
  created(){
    this.fetchData();
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: mapGetters({
    products: 'allProducts',
    length: 'getNumberOfProducts'
  }),
  methods:{
    ...mapActions([
      'addToCart', 'restToCart', 'fetchData'
    ]),
    ir(p){
      this.$router.push({ path: '/detalle/'+ p.id })
    },
  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.productos{
  position: relative;
  width: 30%;
  padding: 5em;
  background-color: black;
  color: white;
  display: inline-flex;
  margin: 1em;
}
</style>
