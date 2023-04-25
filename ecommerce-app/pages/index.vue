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
      <v-col
        cols="12"
        sm="3"
        md="4"
        v-for="producto in productosVentas"
      >
        <ProductCard
          :codigo="producto.objectID"
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
import productos from "../productosMockJSON.json";
export default {
  data() {
    return {
      productosVentas: productos,
    };
  },
  methods: {
    onBuscar(){
      alert("se busca")
    }
  },
};
</script>
