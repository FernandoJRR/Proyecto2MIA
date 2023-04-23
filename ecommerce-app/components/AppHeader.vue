<template>
  <v-app-bar>
    <v-app-bar-title>eCommerceGT</v-app-bar-title>
    <v-btn @click="toLogin" v-if="login">
      Login
    </v-btn>
    <v-btn @click="logout" v-else>
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
      },
      async logout() {
        sessionStorage.clear()
        const {session, remove} = await useSession()
        await remove()
        window.location.reload(true)
      }
    },
    async mounted() {
      const {session} = await useSession()
      if (session.value.user == null) {
        this.login = true
      } else {
        this.login = false
      }
    },
  }
</script>
