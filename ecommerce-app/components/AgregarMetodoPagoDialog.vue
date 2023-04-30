<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <v-card>
      <v-form @submit.prevent="submit" validate-on="submit" ref="agregarForm">
        <v-card-title>
          <span class="text-h5">Agregar Metodo de Pago</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col>
              <v-text-field
                label="Numero de Tarjeta"
                variant="outlined"
                type="number"
                v-model="numero"
                :rules="numeroRules"
              ></v-text-field>
              <v-text-field
                label="CVV"
                variant="outlined"
                type="number"
                v-model="cvv"
                :rules="cvvRules"
              ></v-text-field>
              <h4>Fecha de Vencimiento</h4>
              <v-row>
                <v-col>
                  <v-combobox
                    label="Mes"
                    variant="outlined"
                    v-model="mes"
                    :items="[
                      '1',
                      '2',
                      '3',
                      '4',
                      '5',
                      '6',
                      '7',
                      '8',
                      '9',
                      '10',
                      '11',
                      '12',
                    ]"
                  ></v-combobox>
                </v-col>
                <v-col>
                  <v-combobox
                    label="Año"
                    variant="outlined"
                    v-model="año"
                    :items="[
                      '2023',
                      '2024',
                      '2025',
                      '2026',
                      '2027',
                      '2028',
                      '2029',
                      '2030',
                      '2031',
                      '2032',
                      '2033',
                    ]"
                  ></v-combobox>
                </v-col>
              </v-row>
            </v-col>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="onCancelar()">
            Cancelar
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" type="submit">
            Agregar
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

    numero: "",
    numeroRules: [(value) => !!value || "Numero de tarjeta requerido!"],
    cvv: "",
    cvvRules: [(value) => !!value || "CVV requerido!"],
    mes: null,
    mesRules: [(value) => !!value || "Mes requerido!"],
    año: null,
    añoRules: [(value) => !!value || "Año requerido!"],
  }),
  methods: {
    onCancelar() {
      this.$refs.agregarForm.reset();
      this.dialog = false;
    },
    async submit(event) {
      const results = await event;
      if (results.errors.length === 0) {
        let response = await $fetch("http://localhost:3100/api/tarjetas", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: {
            propietario: useCookie('session').value.username,
            numero: this.numero,
            cvv: this.cvv,
            mes: this.mes,
            año: this.año,
          },
        });
        if (response.ok) {
          this.$refs.agregarForm.reset();
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
