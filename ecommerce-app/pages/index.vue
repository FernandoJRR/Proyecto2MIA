<template>
  <v-container>
    <v-form>
      <v-text-field
        append-inner-icon="mdi-magnify"
        clearable
        label="Buscar"
        variant="solo"
        @click:append-inner="onBuscar"
      ></v-text-field>
    </v-form>
    <h1 style="text-align: center">Ultimos Productos</h1>
    <br />
    <v-row>
      <v-col cols="12" sm="3" md="4" v-for="producto in productosVentas">
        <ProductCard
          :codigo="producto._id"
          :nombre="producto.nombre"
          :price="producto.precio"
          :description="producto.descripcion"
          :categoria="producto.categoria"
          :image="'http://localhost:3100/images/' + producto.urlImagen"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      productosVentas: [],
    };
  },
  methods: {
    onBuscar() {
      alert("se busca");
    },
    async actualizarProductos() {
      const response = await $fetch("http://localhost:3100/api/productos");
      if (response.error) {
      } else {
        this.productosVentas = response.filter((producto) => {
          return producto.pedido === null && producto.aceptado
        }).reverse();
      }
    },
  },
  async mounted() {
    await this.actualizarProductos();
  },
};
</script>
