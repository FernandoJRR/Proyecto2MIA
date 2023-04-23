<template>
  <div>
    <h2 style="margin-left: 25%; margin-bottom: 1%">Registro</h2>
    <v-form
      style="width: 50%; margin-left: 25%"
      @submit.prevent="submit"
      validate-on="submit"
      ref="registroForm"
    >
      <v-text-field
        label="Username"
        variant="outlined"
        prepend-icon="mdi-account"
        v-model="username"
        :rules="usernameRules"
      ></v-text-field>
      <v-text-field
        label="Password"
        variant="outlined"
        :prepend-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:prepend="show = !show"
        v-model="password"
        :rules="passwordRules"
      ></v-text-field>

      <v-btn style="margin-top: 1%" type="submit">Registrarse</v-btn>
    </v-form>
    <v-divider
      width="1200"
      style="margin-left: 20%; margin-top: 1%"
      thickness="2"
    />
    <h4 style="margin-left: 50%">
      <nuxt-link to="/login" style="text-decoration: none; color: black">
        Inicia Sesion
      </nuxt-link>
    </h4>
    <Toast ref="vtoast" />
  </div>
</template>
<script>
export default {
  data: (vm) => ({
    show: false,

    username: "",
    usernameRules: [
      (value) => !!value || "Username requerido!",
      (value) => vm.checkUsername(value),
    ],
    password: "",
    passwordRules: [(value) => !!value || "Password requerido!"],
  }),
  methods: {
    async submit(event) {
      const results = await event;
      if (results.errors.length === 0) {
        let response = await $fetch("http://localhost:3000/api/usuarios", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: {
            tipo: "Usuario",
            username: this.username,
            password: this.password,
          },
        });
        if (response.ok) {
          this.$refs.vtoast.show({ message: response.ok });
        } else {
          this.$refs.vtoast.show({ message: response.error, color: "failure" });
        }
      }
    },
    async checkUsername(username) {
      let response = await $fetch(
        "http://localhost:3000/api/usuarios/verificarRegistro",
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
        if (response.error) {
          return resolve(response.error);
        }
        return resolve(true);
      });
    },
  },
};
</script>
