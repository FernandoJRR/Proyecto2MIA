<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <v-card>
      <v-form @submit.prevent="submit" validate-on="submit" ref="agregarForm">
        <v-card-title>
          <span class="text-h5">Modificar Producto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Nombre"
                  variant="outlined"
                  v-model="nombre"
                  :rules="nombreRules"
                ></v-text-field>
                <v-text-field
                  label="Precio"
                  variant="outlined"
                  type="number"
                  v-model="precio"
                  prefix="Q"
                  min="0"
                  :rules="precioRules"
                ></v-text-field>
                <v-textarea
                  label="Descripcion"
                  variant="outlined"
                  v-model="descripcion"
                  :rules="descripcionRules"
                ></v-textarea>
                <v-select
                  label="Categoria"
                  variant="outlined"
                  :items="[
                    'Academico',
                    'Decoracion',
                    'Hogar',
                    'Literatura',
                    'Tecnologia',
                    'Otros',
                  ]"
                  v-model="categoria"
                  :rules="categoriaRules"
                ></v-select>
                <v-file-input
                  clearable
                  accept="image/*"
                  label="Imagen"
                  variant="outlined"
                  v-model="imagen"
                >
                </v-file-input>
                <small
                  >Ingresa una imagen si quieres reemplzar a la actual</small
                >
              </v-col>
              <v-col>
                <v-img :src="'http://localhost:3100/images/' + urlImagen" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="onCancelar()">
            Cancelar
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" type="submit">
            Modificar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: (vm) => ({
    dialog: false,
    productoDialog: {},
    responseClose: {},

    nombre: "",
    nombreRules: [(value) => !!value || "Nombre requerido!"],
    precio: null,
    precioRules: [
      (value) => !!value || "Precio requerido!",
    ],
    descripcion: "",
    descripcionRules: [(value) => !!value || "Descripcion requerida!"],
    categoria: null,
    categoriaRules: [(value) => !!value || "Categoria del producto requerida!"],
    imagen: null,
  }),
  methods: {
    onCancelar() {
      this.$refs.agregarForm.reset();
      this.dialog = false;
    },
    async submit(event) {
      const results = await event;
      if (results.errors.length === 0) {
        let form = new FormData();
        form.append("nombre", this.nombre);
        form.append("precio", this.precio);
        form.append("descripcion", this.descripcion);
        form.append("categoria", this.categoria);
        if (this.imagen !== null) {
          form.append("imagen", this.imagen[0]);
        }

        const response = await $fetch(
          "http://localhost:3100/api/productos/" + this.productoDialog._id,
          {
            headers: {},
            method: "PATCH",
            body: form,
          }
        );
        if (response.ok) {
          this.responseClose = response;
          this.$refs.agregarForm.reset();
          this.close();
          this.dialog = false;
        } 
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
