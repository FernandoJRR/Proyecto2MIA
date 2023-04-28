export default defineNuxtRouteMiddleware((to, from) => {
  const session = useCookie('session')
  if (to.path === "/carrito" || to.path === '/productos') {
    if (session.value !== undefined) {
      if ((session.value as any).tipo === "Usuario") {
      } else {
        return navigateTo('/');
      }
    } else {
      return navigateTo('/');
    }
  }
  if (to.path === "/usuarios") {
    if (session.value !== undefined) {
      if ((session.value as any).tipo === "Administrador") {
      } else {
        return navigateTo('/');
      }
    } else {
      return navigateTo('/');
    }
  }
  if (to.path === "/paquetes") {
    if (session.value !== undefined) {
      if ((session.value as any).tipo === "Paqueteria") {
      } else {
        return navigateTo('/');
      }
    } else {
      return navigateTo('/');
    }
  }
});
