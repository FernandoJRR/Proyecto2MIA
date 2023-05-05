<template>
  <v-container>
    <h1 style="text-align: center">Reportes</h1>
    <v-divider />
    <br />
    <br />
    <v-select label="Reporte" :items="items" v-model="reporteSelect"></v-select>
    <v-row
      v-show="
        reporteSelect !==
          'Top 10 clientes que más productos tienen a la venta' &&
        reporteSelect !== null
      "
    >
      <v-col>
        <v-text-field
          label="Fecha Inicial"
          variant="outlined"
          type="date"
          v-model="fechaInicial"
          :max="fechaFinal"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Fecha Final"
          variant="outlined"
          type="date"
          v-model="fechaFinal"
          :min="fechaInicial"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn
      color="primary"
      append-icon="mdi-chart-tree"
      @click="onVerReporte"
      block
      >Ver Reporte</v-btn
    >
    <v-table v-show="hayReporte">
      <thead>
        <tr>
          <th class="text-left" v-for="key in Object.keys(reporte[0])">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fila in reporte">
          <td v-for="llave in Object.keys(reporte[0])">{{ fila[llave] }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      reporteSelect: null,
      fechaInicial: null,
      fechaFinal: null,
      items: [
        "Top 10 productos más vendidos en un intervalo de tiempo",
        "Top 5 clientes que más ganancias por compras han generado en un intervalo de tiempo",
        "Top 5 clientes que más productos han vendido en un intervalo de tiempo",
        "Top 10 clientes que más pedidos han realizado en un intervalo de tiempo",
        "Top 10 clientes que más productos tienen a la venta",
      ],
      reporte: [{key:1}],
      hayReporte: false,
    };
  },
  methods: {
    async onVerReporte() {
      const codigoReporte = this.items.indexOf(this.reporteSelect) + 1;

      console.log(
        "http://localhost:3100/api/reportes/" +
          codigoReporte +
          "/" +
          (codigoReporte <= 4
            ? "fechaInicial=" +
              this.fechaInicial +
              "&fechaFinal=" +
              this.fechaFinal
            : "")
      );

      const response = await $fetch(
        "http://localhost:3100/api/reportes/" +
          codigoReporte +
          "/" +
          (codigoReporte <= 4
            ? "?fechaInicial=" +this.fechaInicial +"&fechaFinal=" +this.fechaFinal
            : "")
      );
      if (response.ok) {
        this.hayReporte = true;
        this.reporte = response.ok;
      }
    },
  },
};
</script>
