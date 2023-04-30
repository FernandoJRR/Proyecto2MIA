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
        <div
          v-if="
            useCookie('session').value === undefined ||
            useCookie('session').value.tipo === 'Usuario'
          "
        >
          <div v-if="!productoDeUsuario">
            <v-btn
              v-show="!productoCarrito"
              color="primary"
              append-icon="mdi-cart"
              @click="onAgregar"
              block
            >
              Agregar al Carrito
            </v-btn>
            <v-btn
              v-show="productoCarrito"
              color="secondary"
              append-icon="mdi-close"
              @click="onEliminar"
              block
            >
              Eliminar del Carrito
            </v-btn>
          </div>
          <div v-else>
            <v-btn
              color="warning"
              append-icon="mdi-cog-outline"
              to="/productos"
              block
            >
              Modificar Producto
            </v-btn>
          </div>
        </div>
        <div v-else>
          <v-btn
            color="primary"
            append-icon="mdi-cart"
            @click="onAgregar"
            block
            disabled
          >
            Agregar al Carrito
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>El producto no ha sido encontrado</v-container>

  <Toast ref="vtoast" />
</template>
<script>
export default {
  data() {
    return {
      productoActual: null,
      productoCarrito: false,
      productoDeUsuario: false,
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
        const session = useCookie("session");
        session.value.carrito.push(this.productoActual._id);

        this.productoCarrito = true;
        this.$refs.vtoast.show({ message: "Producto agregado exitosamente!" });
      }
    },
    onEliminar() {
      const session = useCookie("session");
      session.value.carrito = session.value.carrito.filter(
        (item) => item !== this.productoActual._id
      );
      this.productoCarrito = false;
      this.$refs.vtoast.show({ message: "Producto eliminado!" });
    },
    productoEnCarrito() {
      const session = useCookie("session");
      if (session.value !== undefined) {
        const carrito = session.value.carrito;
        return carrito.includes(this.productoActual._id);
      }
    },
    async actualizarProductoActual() {
      const route = useRoute();
      const response = await $fetch(
        "http://localhost:3100/api/productos/" + route.params.productID
      );
      if (response.error) {
      } else {
        this.productoActual = response;
      }
    },
  },
  async mounted() {
    await this.actualizarProductoActual();
    const usuario = useCookie("session").value.username;
    this.productoDeUsuario = this.productoActual.vendedor === usuario;
    this.productoCarrito = this.productoEnCarrito();
  },
};
</script>
