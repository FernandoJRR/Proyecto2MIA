<template>
  <v-container>
    <h2>Carrito de Compra</h2>
    <v-divider />
    <br />
    <div v-if="productosCarrito.length > 0">
      <v-btn append-icon="mdi-delete" @click="onLimpiar">Limpiar Carrito</v-btn>
      <br />
      <br />
      <h4 style="text-align:center">Hay {{ productosCarrito.length }} producto/s en el carrito</h4>
      <br />
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Imagen</th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Precio</th>
            <th class="text-left">Link</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productosCarrito">
            <td>
              <v-img
                :src="'http://localhost:3100/images/' + producto.urlImagen"
              />
            </td>
            <td>{{ producto.nombre }}</td>
            <td>Q.{{ producto.precio }}</td>
            <td>
              <v-btn :to="'/productView/' + producto.objectID" variant="plain">
                Ver Producto
              </v-btn>
            </td>
          </tr>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">Total:</th>
            <th class="text-left">Q.{{ obtenerTotal() }}</th>
            <th class="text-left"></th>
          </tr>
        </tbody>
      </v-table>
      <br />
      <ComprarDialog />
    </div>
    <h4 v-else style="text-align: center">No hay productos en el carrito</h4>
  </v-container>
</template>
<script>
import productos from "../productosMockJSON.json";
export default {
  data() {
    return {
      productosCarrito: [],
    };
  },
  methods: {
    obtenerTotal() {
      const total = this.productosCarrito.reduce(
        (acumulacion, producto) => acumulacion + producto.precio,
        0
      );

      return Math.round(total * 100) / 100;
    },
    onLimpiar() {
      const session = useCookie("session");
      session.value.carrito = [];
      this.productosCarrito = [];
    },
  },
  mounted() {
    const session = useCookie("session");
    this.productosCarrito = productos.filter((producto) =>
      session.value.carrito.includes(producto.objectID)
    );
  },
};
</script>
