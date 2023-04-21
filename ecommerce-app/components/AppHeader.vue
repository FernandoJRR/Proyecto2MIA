<template>
  <v-app-bar>
    <v-app-bar-title>eCommerceGT</v-app-bar-title>
    <v-btn @click="toLogin" v-if="login">
      Login
    </v-btn>
    <v-btn v-else>
      Logout
    </v-btn>
  </v-app-bar>
</template>
<script>
  export default {
    data() {
      return {
        login: true
      }
    },
    methods: {
      toLogin() {
        const router = useRouter()
        router.push("/login");
      }
    },
    mounted() {
      if (localStorage.getItem("user") == null) {
        this.login = true
      } else {
        this.login = false
      }
    },
  }
</script>
