<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Ver Pedido</span>
      </v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Imagen</th>
              <th class="text-left">Nombre</th>
              <th class="text-left">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="producto in productosPedido">
              <td>
                <v-img
                  :src="'http://localhost:3100/images/' + producto.urlImagen"
                />
              </td>
              <td>{{ producto.nombre }}</td>
              <td>Q.{{ producto.precio }}</td>
            </tr>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">Total:</th>
              <th class="text-left">Q.{{ obtenerTotal() }}</th>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="onCerrar()">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: (vm) => ({
    dialog: false,

    productosPedido: [],
    codigosPedido: [],
    pedido: null,
  }),
  methods: {
    obtenerTotal() {
      const total = this.productosPedido.reduce(
        (acumulacion, producto) => acumulacion + producto.precio,
        0
      );

      return Math.round(total * 100) / 100;
    },
    onCerrar() {
      this.dialog = false;
      this.productosPedido = [];
      this.codigosPedido = [];
      this.pedido = null;
    },
    async actualizarProductos() {
      const responseCodigos = await $fetch(
        "http://localhost:3100/api/pedidos/" + this.pedido
      );
      this.codigosPedido = responseCodigos.productos
      const response = await $fetch("http://localhost:3100/api/productos");
      if (response.error) {
      } else {
        this.productosPedido = response.filter((producto) => {
          return this.codigosPedido.includes(producto._id);
        });
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
