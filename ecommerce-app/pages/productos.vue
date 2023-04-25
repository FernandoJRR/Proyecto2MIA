<template>
  <div>
    <h1 style="text-align: center">Productos</h1>
    <br />
    <v-form>
      <v-text-field
        append-inner-icon="mdi-magnify"
        clearable
        label="Buscar"
        variant="solo"
        @click:append-inner="onBuscar"
      ></v-text-field>
    </v-form>
  </div>
</template>
