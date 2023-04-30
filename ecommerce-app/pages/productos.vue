<template>
  <v-container>
    <h1 style="text-align: center">Productos en Venta</h1>
    <v-divider />
    <br />
    <v-btn append-icon="mdi-plus" @click="onAgregar"
      >Poner Producto en Venta</v-btn
    >
    <AgregarProductoDialog ref="agregarDialog" @close="onSubmitAgregar" />
    <ModificarProductoDialog ref="modificarDialog" @close="onSubmitModificar" />
    <br />
    <br />
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Imagen</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Precio</th>
          <th class="text-left">Descripcion</th>
          <th class="text-left">Estado</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productosUsuario">
          <td>
            <v-img
              :src="'http://localhost:3100/images/' + producto.urlImagen"
            />
          </td>

          <td>{{ producto.nombre }}</td>
          <td>Q.{{ producto.precio }}</td>
          <td>{{ producto.descripcion }}</td>
          <td v-if="producto.aceptado && producto.pedido === null">En Venta</td>
          <td v-else-if="producto.pedido !== null">Vendido</td>
          <td v-else-if="!producto.aceptado">Solicitado</td>
          <td>
            <v-btn variant="plain" @click="onModificar(producto)"
              >Modificar</v-btn
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
      productosUsuario: [],
    };
  },
  methods: {
    onModificar(productoModificar) {
      if (productoModificar.pedido !== null) {
        this.$refs.vtoast.show({
          message: "No puedes modificar un producto que ya ha sido vendido",
          color: "warning",
        });
        return;
      }
      this.$refs.modificarDialog.productoDialog = productoModificar;
      this.$refs.modificarDialog.categoria = productoModificar.categoria;
      this.$refs.modificarDialog.nombre = productoModificar.nombre;
      this.$refs.modificarDialog.precio = productoModificar.precio;
      this.$refs.modificarDialog.descripcion = productoModificar.descripcion;
      this.$refs.modificarDialog.urlImagen = productoModificar.urlImagen;
      this.$refs.modificarDialog.dialog = true;
    },
    onAgregar() {
      this.$refs.agregarDialog.dialog = true;
    },
    async onSubmitModificar() {
      const respuesta = this.$refs.modificarDialog.responseClose;
      await this.actualizarProductos();
      if (respuesta.ok) {
        if (respuesta.ok === "Producto modificado exitosamente") {
          this.$refs.vtoast.show({ message: respuesta.ok });
        } else if (respuesta.ok === "No se ha modificado el producto") {
          this.$refs.vtoast.show({ message: respuesta.ok, color: "warning" });
        }
      } else {
        this.$refs.vtoast.show({ message: respuesta.error });
      }
    },
    async onSubmitAgregar() {
      const respuesta = this.$refs.agregarDialog.responseClose;
      await this.actualizarProductos();
      this.$refs.vtoast.show({ message: "Producto Agregado" });
    },
    async actualizarProductos() {
      const session = useCookie("session");
      const response = await $fetch("http://localhost:3100/api/productos");
      if (response.error) {
      } else {
        this.productosUsuario = response.filter((producto) => {
          return session.value.username === producto.vendedor;
        });
      }
    },
  },
  async mounted() {
    await this.actualizarProductos();
  },
};
</script>
