<template>
  <v-card class="mx-auto" max-width="300">
    <v-img :src="image" max-height="300" cover></v-img>

    <v-card-item>
      <div>{{ categoria }}</div>
    </v-card-item>
    <v-card-title>{{ nombre }}</v-card-title>

    <v-card-subtitle>Q.{{ price }}</v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange-lighten-2"
        variant="text"
        :to="'/productView/' + codigo"
      >
        Ver
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    codigo: String,
    nombre: String,
    price: Number,
    description: String,
    categoria: String,
    image: String,
  },
};
</script>
