<template>
  <v-container>
    <h1 style="text-align: center">Estado de Pedidos</h1>
    <v-divider />
    <br />

    <h3 style="text-align: center">Pedidos En Curso</h3>
    <VerPedidoDialog ref="pedidoDialog" />
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">Valor</th>
          <th class="text-left">Fecha de Compra</th>
          <th class="text-left">Fecha de Entrega</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidosEnCurso">
          <td>{{ pedido._id }}</td>
          <td>Q.{{ pedido.total }}</td>
          <td>{{ pedido.fechaPedido }}</td>
          <td>{{ pedido.fechaEntrega }}</td>
          <td>
            <v-btn variant="plain" @click="onVer(pedido)">Ver</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <br />
    <h3 style="text-align: center">Historial de Pedidos Entregados</h3>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">Valor</th>
          <th class="text-left">Fecha de Compra</th>
          <th class="text-left">Fecha de Entrega</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidosEntregados">
          <td>{{ pedido._id }}</td>
          <td>Q.{{ pedido.total }}</td>
          <td>{{ pedido.fechaPedido }}</td>
          <td>{{ pedido.fechaEntrega }}</td>
          <td>
            <v-btn variant="plain" @click="onVer(pedido)">Ver</v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
  <Toast ref="vtoast" />
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      pedidosEnCurso: [],
      pedidosEntregados: [],
    };
  },
  methods: {
    onVer(pedido){
      this.$refs.pedidoDialog.pedido = pedido._id
      this.$refs.pedidoDialog.actualizarProductos()
      this.$refs.pedidoDialog.dialog = true
    },
    async actualizarPedidos() {
      this.pedidosEnCurso = [];
      this.pedidosEntregados = [];
      const session = useCookie("session");
      const response = await $fetch("http://localhost:3100/api/pedidos");
      if (response.error) {
      } else {
        response.forEach((pedido) => {
          if (pedido.comprador === useCookie("session").value.username) {
            pedido.fechaPedido = moment(
              new Date(Date.parse(pedido.fechaPedido))
            ).format("YYYY-MM-DD");
            pedido.fechaEntrega = moment(
              new Date(Date.parse(pedido.fechaEntrega))
            ).format("YYYY-MM-DD");
            if (pedido.entregado) {
              this.pedidosEntregados.push(pedido);
            } else {
              this.pedidosEnCurso.push(pedido);
            }
          }
        });
      }
    },
  },
  async mounted() {
    await this.actualizarPedidos();
    console.log(this.pedidosEnCurso);
  },
};
</script>
