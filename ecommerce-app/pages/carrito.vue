<template>
  <v-container>
    <h2>Carrito de Compra</h2>
    <v-divider />
    <br />
    <AgregarMetodoPagoDialog ref="agregarDialog" @close="onSubmitAgregar" />
    <div v-if="productosCarrito.length > 0">
      <v-btn append-icon="mdi-delete" @click="onLimpiar">Limpiar Carrito</v-btn>
      <br />
      <br />
      <h4 style="text-align: center">
        Hay {{ productosCarrito.length }} producto/s en el carrito
      </h4>
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
              <v-btn :to="'/productView/' + producto._id" variant="plain">
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
      <v-row>
        <v-col cols="4">
          <h4>Metodos de Pago</h4>
          <v-divider />
          <v-radio-group v-model="pago">
            <v-radio
              v-for="tarjeta in tarjetas"
              :value="tarjeta._id"
              :label="censurarNumero(tarjeta.numero)"
            />
            <v-btn
              variant="plain"
              append-icon="mdi-plus"
              @click="onAgregarMetodo"
              >Agregar Metodo de Pago</v-btn
            >
          </v-radio-group>
        </v-col>
      </v-row>
      <v-btn
        color="secondary"
        append-icon="mdi-cart"
        block
        @click="onRealizarPedido"
        >Realizar Pedido</v-btn
      >
    </div>
    <h4 v-else style="text-align: center">No hay productos en el carrito</h4>
  </v-container>
  <Toast ref="vtoast" />
</template>
<script>
export default {
  data() {
    return {
      productosCarrito: [],
      products: [],
      tarjetas: [],
      pago: null,
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
    censurarNumero(numero) {
      const ultimosCuatro = numero.toString().slice(-4);
      const cantidadDigitos = numero.toString().length - 4;
      let censura = "*".repeat(cantidadDigitos);

      return censura + " " + ultimosCuatro;
    },
    onLimpiar() {
      const session = useCookie("session");
      session.value.carrito = [];
      this.productosCarrito = [];
    },
    onAgregarMetodo() {
      this.$refs.agregarDialog.dialog = true;
    },
    async onRealizarPedido() {
      if (this.pago === null) {
        this.$refs.vtoast.show({ message: "Debes ingresar un metodo de pago", color: "error" });
        return;
      }

      let codigoProductos = [];

      this.productosCarrito.forEach((producto) => {
        codigoProductos.push(producto._id);
      });

      const response = await $fetch("http://localhost:3100/api/pedidos", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: {
          comprador: useCookie("session").value.username,
          productos: codigoProductos,
          tarjeta: this.pago,
          total: this.obtenerTotal(),
          fechaPedido: new Date(),
          fechaEntrega: new Date().setDate(new Date().getDate() + 5),
        },
      });
      if (response.ok) {
        this.$refs.vtoast.show({ message: response.ok });
        useCookie("session").value.carrito = [];
        this.productosCarrito = [];
      } else {
        this.$refs.vtoast.show({ message: response.error, color: "error" });
      }
    },
    async onSubmitAgregar() {
      const respuesta = this.$refs.agregarDialog.responseClose;
      await this.actualizarTarjetas();
      this.$refs.vtoast.show({ message: "Metodo de Pago Agregado" });
    },
    async actualizarTarjetas() {
      const session = useCookie("session");
      const response = await $fetch(
        "http://localhost:3100/api/tarjetas/" + session.value.username
      );

      if (response.error) {
      } else {
        this.tarjetas = response;
      }
    },
    async actualizarCarrito() {
      const session = useCookie("session");
      const response = await $fetch("http://localhost:3100/api/productos");
      if (response.error) {
      } else {
        this.productosCarrito = response.filter((producto) => {
          return session.value.carrito.includes(producto._id);
        });
      }
    },
  },
  async mounted() {
    await this.actualizarCarrito();
    await this.actualizarTarjetas();
  },
};
</script>
