<template>
  <v-container>
    <h2>Administracion de Usuarios</h2>
    <v-divider />
    <br />
    <v-btn color="primary" append-icon="mdi-plus" @click="onAgregar">
      Agregar Usuario
    </v-btn>
    <AgregarUsuarioDialog ref="agregarDialog" @close="onSubmitAgregar" />
    <ModificarUsuarioDialog ref="modificarDialog" @close="onSubmitModificar" />
    <br />
    <br />
    <h3 style="text-align: center">Usuarios Registrados</h3>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Username</th>
          <th class="text-left">Tipo</th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuariosRegistrados">
          <td>{{ usuario.username }}</td>
          <td>{{ usuario.tipo }}</td>
          <td>
            <v-btn
              variant="plain"
              @click="onModificar(usuario.username, usuario.tipo)"
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
      usuariosRegistrados: [],
    };
  },
  methods: {
    onModificar(username, tipo) {
      this.$refs.modificarDialog.usernameDialog = username;
      this.$refs.modificarDialog.username = username;
      this.$refs.modificarDialog.tipo = tipo;
      this.$refs.modificarDialog.dialog = true;
    },
    onAgregar() {
      this.$refs.agregarDialog.dialog = true;
    },
    async onSubmitAgregar() {
      await this.actualizarUsuarios()
      this.$refs.vtoast.show({ message: "Usuario Agregado" });
    },
    async onSubmitModificar() {
      const respuesta = this.$refs.modificarDialog.responseClose
      await this.actualizarUsuarios()
      if (respuesta.ok) {
        if (respuesta.ok === "Usuario modificado exitosamente") {
          this.$refs.vtoast.show({ message: respuesta.ok });
        } else if (repuesta.ok === "No se ha modificado al usuario") {
          this.$refs.vtoast.show({ message: respuesta.ok, color: "warning" });
        }
      } else {
        this.$refs.vtoast.show({ message: respuesta.error });
      }
    },
    async actualizarUsuarios() {
      const response = await $fetch("http://localhost:3100/api/usuarios");
      if (response.error) {
      } else {
        this.usuariosRegistrados = response.filter(
          (usuario) => usuario.tipo !== "Usuario"
        );
      }
    },
  },
  async mounted() {
    await this.actualizarUsuarios()
  },
};
</script>
