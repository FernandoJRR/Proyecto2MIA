<template>
  <v-container v-if="productoActual !== null">
    <v-row>
      <v-col>
        <v-img
          :src="'http://localhost:3100/images/' + productoActual.urlImagen"
        ></v-img>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <h2>{{ productoActual.nombre }}</h2>
        <br />
        <h3>Q.{{ productoActual.precio }}</h3>
        <br />
        <h3>Sobre este producto</h3>
        <h4>{{ productoActual.descripcion }}</h4>
        <br />
        <v-btn color="primary" append-icon="mdi-cart" @click="onAgregar" block>
          Agregar al Carrito
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>El producto no ha sido encontrado</v-container>

  <Toast ref="vtoast" />
</template>
<script>
import productos from "../../productosMockJSON.json";
export default {
  data() {
    return {
      productoActual: null,
      productosVentas: productos,
    };
  },
  methods: {
    onAgregar() {
      const session = useCookie("session");
      if (session.value == null) {
        this.$refs.vtoast.show({
          message: "Debes iniciar sesion para agregar productos",
          color: "primary",
          icon: "mdi-alert-circle-outline",
        });
      } else {
        this.$refs.vtoast.show({ message: "Producto agregado exitosamente!" });
      }
    },
  },
  mounted() {
    console.log(productos);
    for (let index = 0; index < productos.length; index++) {
      const product = productos[index];
      const route = useRoute();
      const id = product.objectID;
      console.log(product);
      if (id == route.params.productID) {
        this.productoActual = product;
        break;
      }
    }
    console.log("este " + this.productoActual);
  },
};
</script>
