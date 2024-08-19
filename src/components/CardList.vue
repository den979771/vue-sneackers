<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavorite: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>
<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :onClickAdd="isFavorite ? null : () => emit('addToCart', item)"
      :onClickFavorite="isFavorite ? null : () => emit('addToFavorite', item)"
      :isFavorite="item.isFavorite"
      :favoriteId="item.favoriteId"
      :isAdded="item.isAdded"
    />
  </div>
</template>
