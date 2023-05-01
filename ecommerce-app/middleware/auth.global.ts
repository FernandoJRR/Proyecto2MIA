export default defineNuxtRouteMiddleware((to, from) => {
  const session = useCookie("session");
  if (to.path === "/login" || to.path === "/login/registro") {
    if (session.value !== undefined) {
      return navigateTo("/");
    }
  }
  if (
    to.path === "/carrito" ||
    to.path === "/productos" ||
    to.path === "/pedidos"
  ) {
    if (session.value !== undefined) {
      if ((session.value as any).tipo === "Usuario") {
      } else {
        return navigateTo("/");
      }
    } else {
      return navigateTo("/");
    }
  }
  if (to.path === "/usuarios" || to.path === "/reportes") {
    if (session.value !== undefined) {
      if ((session.value as any).tipo === "Administrador") {
      } else {
        return navigateTo("/");
      }
    } else {
      return navigateTo("/");
    }
  }
  if (to.path === "/paquetes" || to.path === "/solicitudes") {
    if (session.value !== undefined) {
      if ((session.value as any).tipo === "Paqueteria") {
      } else {
        return navigateTo("/");
      }
    } else {
      return navigateTo("/");
    }
  }
});
