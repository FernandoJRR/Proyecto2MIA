exports.createSession = (user, tipo) => {
  localStorage.setItem("session", {user: user, tipo: tipo})
}

exports.closeSession = () => {
  localStorage.removeItem("session")
}

