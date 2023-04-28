<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <v-card>
      <v-form @submit.prevent="submit" validate-on="submit" ref="agregarForm">
        <v-card-title>
          <span class="text-h5">Modificar Usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Username"
                  variant="outlined"
                  prepend-icon="mdi-account"
                  v-model="username"
                  :rules="usernameRules"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  label="Tipo"
                  variant="outlined"
                  :items="['Administrador', 'Paqueteria']"
                  v-model="tipo"
                  :rules="tipoRules"
                ></v-select>
              </v-col>
            </v-row>
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
    usernameDialog: "",
    responseClose: {},

    username: "",
    usernameRules: [
      (value) => !!value || "Username requerido!",
      (value) => vm.checkUsername(value),
    ],
    password: "",
    passwordRules: [(value) => !!value || "Password requerido!"],
    tipo: null,
    tipoRules: [(value) => !!value || "Tipo de usuario requerido!"],
  }),
  methods: {
    onCancelar() {
      this.$refs.agregarForm.reset();
      this.dialog = false;
    },
    async submit(event) {
      const results = await event;
      if (results.errors.length === 0) {
        let response = await $fetch(
          "http://localhost:3100/api/usuarios/" + this.usernameDialog,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PATCH",
            body: {
              tipo: this.tipo,
              username: this.username,
              password: this.password,
            },
          }
        );
        if (response.ok) {
          this.responseClose = response;
          this.$refs.agregarForm.reset();
          this.close();
          this.dialog = false;
        }
      }
    },
    async checkUsername(username) {
      let response = await $fetch(
        "http://localhost:3100/api/usuarios/verificarRegistro",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: {
            username: this.username,
          },
        }
      );
      return new Promise((resolve) => {
        if (this.usernameDialog === this.username) {
          return resolve(true);
        }
        if (response.error) {
          return resolve(response.error);
        }
        return resolve(true);
      });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
