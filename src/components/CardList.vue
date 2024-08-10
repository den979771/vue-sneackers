<script setup>
	import Card from "./Card.vue";

	const onClickAdd = () => {
		alert('Добавить')
	}
</script>
<template>
	<div class="grid grid-cols-4 gap-5">
		<Card :onClickAdd="onClickAdd" image-url="/sneakers/sneakers-1.jpg" title="Мужские кроссовки Nike Blazer Mid Suede" price="12999" :is-added="true"/>
		<Card :onClickAdd="onClickAdd" image-url="/sneakers/sneakers-2.jpg" title="Мужские кроссовки Nike Blazer Mid Suede" price="12999" :is-added="false"/>
		<Card :onClickAdd="onClickAdd" image-url="/sneakers/sneakers-3.jpg" title="Мужские кроссовки Nike Blazer Mid Suede" price="12999" :isFavorite="true"/>
		<Card :onClickAdd="onClickAdd" image-url="/sneakers/sneakers-4.jpg" title="Мужские кроссовки Nike Blazer Mid Suede" price="12999":is-favorite="false"/>
	</div>
</template>
