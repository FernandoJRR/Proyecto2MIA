<template>
  <v-container>
    <h1 style="text-align: center">Administracion de Paqueteria</h1>
    <v-divider />
    <br />

    <v-table>
      <thead>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">Valor</th>
          <th class="text-left">Cliente</th>
          <th class="text-left">Estado</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidosEnCurso">
          <td>
            <v-img
              :src="'http://localhost:3100/images/' + producto.urlImagen"
            />
          </td>

          <td>{{ pedido._id }}</td>
          <td>Q.{{ pedido.Valor }}</td>
          <td>{{ pedido.cliente }}</td>
          <td v-show="!pedido.entregado">En Curso</td>
          <td v-show="pedido.entregado">Entregado</td>
          <td>
            <v-btn
              variant="plain"
              @click="onVer(pedido)"
              >Ver</v-btn
            >
            <v-btn
              variant="plain"
              @click="onEntregar(pedido)"
              >Entregar</v-btn
            >
            <v-btn
              variant="plain"
              @click="onModificar(pedido)"
              >Modificar</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
