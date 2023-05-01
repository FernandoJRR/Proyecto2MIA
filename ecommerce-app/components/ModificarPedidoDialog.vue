<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <v-card>
      <v-form @submit.prevent="submit" validate-on="submit" ref="modificarForm">
        <v-card-title>
          <span class="text-h5">Modificar Pedido</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col>
              <v-text-field
                label="Fecha de Pedido"
                variant="outlined"
                type="date"
                v-model="fechaPedido"
                :max="fechaEntrega"
              ></v-text-field>
              <v-text-field
                label="Fecha de Entrega"
                variant="outlined"
                type="date"
                v-model="fechaEntrega"
                :min="fechaPedido"
              ></v-text-field>
            </v-col>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="onCancelar()">
            Cancelar
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" type="submit">
            Modificar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: (vm) => ({
    dialog: false,

    pedido: null,

    fechaPedido: null,
    fechaEntrega: null,

    responseClose: null,
  }),
  methods: {
    onCancelar() {
      this.$refs.modificarForm.reset();
      this.dialog = false;
    },
    async submit(event) {
      const results = await event;
      if (results.errors.length === 0) {
        let response = await $fetch(
          "http://localhost:3100/api/pedidos/" + this.pedido,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PATCH",
            body: {
              fechaPedido: this.fechaPedido,
              fechaEntrega: this.fechaEntrega,
            },
          }
        );
        if (response.ok) {
          this.responseClose = response;
          this.$refs.modificarForm.reset();
          this.close();
          this.dialog = false;
        }
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
