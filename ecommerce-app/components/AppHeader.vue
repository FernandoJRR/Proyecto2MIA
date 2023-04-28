<template>
  <v-app-bar>
    <v-app-bar-title>
      <nuxt-link to="/" style="text-decoration: none; color: black">
        eCommerceGT
      </nuxt-link>
      <v-btn to="/productos" v-if="tipo === 'Usuario'"> Productos </v-btn>
    </v-app-bar-title>
    <v-btn @click="toLogin" v-if="login"> Login </v-btn>
    <div v-else>
      <v-btn
        prepend-icon="mdi-cart-outline"
        v-if="tipo === 'Usuario'"
        to="/carrito"
      >
        Carrito
      </v-btn>
      <v-btn
        prepend-icon="mdi-account-group"
        v-else-if="tipo === 'Administrador'"
        to="/usuarios"
      >
        Usuarios
      </v-btn>
      <v-btn
        prepend-icon="mdi-cart-outline"
        v-else-if="tipo === 'Paqueteria'"
        to="/paquetes"
      >
        Paquetes
      </v-btn>
      <v-btn prepend-icon="mdi-account" disabled>
        <h5>{{ user }}</h5>
      </v-btn>
      <v-btn @click="logout"> Logout </v-btn>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      login: true,
      user: "",
      tipo: "",
    };
  },
  methods: {
    toLogin() {
      const router = useRouter();
      router.push("/login");
    },
    async logout() {
      //cierre de sesion
      const session = useCookie("session");
      session.value = null;

      window.location.reload(true);
    },
  },
  async beforeMount() {
    const session = useCookie("session");
    if (session.value == null) {
      this.login = true;
    } else {
      this.login = false;
      this.user = session.value.username;
      this.tipo = session.value.tipo;
    }
  },
};
</script>
