<template>
  <v-container>
    <h1 style="text-align: center">Solicitudes de Venta</h1>
    <v-divider />
    <br />
    <br />
    <h4 v-show="productosSolicitudes.length === 0" style="text-align: center">No hay solicitudes de productos</h4>
    <v-table v-show="productosSolicitudes.length > 0">
      <thead>
        <tr>
          <th class="text-left">Imagen</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Precio</th>
          <th class="text-left">Descripcion</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productosSolicitudes">
          <td>
            <v-img
              :src="'http://localhost:3100/images/' + producto.urlImagen"
            />
          </td>

          <td>{{ producto.nombre }}</td>
          <td>Q.{{ producto.precio }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>
            <v-btn variant="plain" @click="onAceptar(producto)"
              >Aceptar Solicitud</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
  <Toast ref="vtoast" />
</template>
<script>
export default {
  data() {
    return {
      productosSolicitudes: [],
    };
  },
  methods: {
    async onAceptar(producto){
        const response = await $fetch("http://localhost:3100/api/productos/"+producto._id, {
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: {
            field: "aceptado",
            value: true
          },
        });
        if (response.ok) {
          this.$refs.vtoast.show({ message: "Producto Aceptado" });
          this.actualizarProductos()
        } else {
          this.$refs.vtoast.show({ message: response.error, color: "error" });
        }
    },
    async actualizarProductos() {
      const session = useCookie("session");
      const response = await $fetch("http://localhost:3100/api/productos");
      if (response.error) {
      } else {
        this.productosSolicitudes = response.filter((producto) => {
          return !producto.aceptado
        });
      }
    },
  },
  async mounted() {
    await this.actualizarProductos();
  },
};
</script>
