
<script setup>
	import { onMounted, ref, watch } from "vue";
	import axios from "axios";

	import myHeader from "./components/myHeader.vue";
	import Card from "./components/Card.vue";
	import CardList from "./components/CardList.vue";
	import Drawer from "./components/Drawer.vue";

	const items = ref([]);
	const sortBy = ref("");
	const searchQuery = ref("");

	const onChangeSelect = (event) => {
		sortBy.value = event.target.value;
	};

	

	onMounted(async () => {
		try{
			const {data} = await axios.get("https://817726d7a4da3a81.mokky.dev/items");

			items.value = data;

		} catch(err){
			console.log(err);
		}
	});

	watch(sortBy, async () => {
		try{
			const {data} = await axios.get("https://817726d7a4da3a81.mokky.dev/items?sortBy=" + sortBy.value);
			items.value = data;
		} catch(err){
			console.log(err);
		}
	});

</script>



<template>
	<div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
		<myHeader/>
<!--		<Drawer/> -->
		<div class="p-10">
			<div class="flex justify-between items-center">
				<h3 class="mb-8 text-3xl text-bold">Все кроссовки</h3>
				<div class="flex gap-4">
					<select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
						<option value="title">По названию</option>
						<option value="price">По цене (дешевые)</option>
						<option value="-price">По цене (дорогие)</option>
					</select>
				</div>
				<div class="relative">
					<img class="absolute top-3 left-4" src="/search.svg" alt="Search"/>
					<input class="border rounded-md border-gray-200 py-2 pl-12 pr-4 outline-none focus:border-gray-400" placeholder="Поиск..." />
				</div>
			</div>
			<div class="mt-10">
				<CardList :items="items"/>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>
