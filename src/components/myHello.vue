 <script setup>
	defineProps({
		title: String,
		price: Number
	})
</script>
<template>
	<div class="product text-slate-500">
		<h2>Товар: {{title}}</h2>
		<h3>Цена: {{price}} </h3>
	</div>
</template>
<style>
	.product{
		border: 1px solid blue;
		padding: 10px;
		margin-bottom: 10px;
	}
</style>
