export default defineNuxtRouteMiddleware((to, from) => {
  const usuario = useCookie('session_user')
  const tipo = useCookie('session_tipo')
  if (to.path === "/carrito") {
    if (usuario.value !== undefined) {
      if (tipo.value === "Usuario") {
      } else {
        return navigateTo('/');
      }
    } else {
      return navigateTo('/');
    }
  }
});
