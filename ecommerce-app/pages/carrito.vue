<template>
</template>
<script>
export default {
  mounted() {
    const user = useCookie('session_user')
    alert(user.value)
  },
}
</script>
