<script setup>
	import { onMounted, ref, reactive, watch, provide } from "vue";
	import axios from "axios";

	import myHeader from "./components/myHeader.vue";
	import Card from "./components/Card.vue";
	import CardList from "./components/CardList.vue";
	import Drawer from "./components/Drawer.vue";

	const items = ref([]);

	const cart = ref([]);

	const drawerOpen = ref(false);

	const filters = reactive({sortBy: "title", searchQuery: ""});

	const closeDrawer = () => {
		drawerOpen.value = false;
	};
	
	const openDrawer = () => {
		drawerOpen.value = true;
	};

	provide("cartActions", {closeDrawer, openDrawer});

	const onChangeSelect = (event) => {
		filters.sortBy = event.target.value;
	};

	const onChangeInput = (event) => {
		filters.searchQuery = event.target.value;
	};

	const fetchQuery = async () => {
		try {
			const params = {sortBy: filters.sortBy};

			if(filters.searchQuery){
				params.title = "*"+filters.searchQuery+"*";
			}
			
			const {data} = await axios.get("https://817726d7a4da3a81.mokky.dev/items", 
				{params});

			items.value = data.map((obj) => ({
				...obj,
				isFavorite: false,
				isAdded: false
			}));
		} catch(err){
			console.log(err);
		}
	};

	const fetchFavorites = async () => {
		try {
			const {data: favorites} = await axios.get("https://817726d7a4da3a81.mokky.dev/favorites");
			items.value = items.value.map(item =>{
				const favorite = favorites.find(favorite => favorite.parentId === item.id);
				
				if(!favorite){
					return item;
				}

				return {
					...item,
					isFavorite: true,
					favoriteId: favorite.id
				}
			});
		} catch(err){
			console.log(err);
		}
	};

	onMounted(async () => {
		await fetchQuery();
		await fetchFavorites();
	});

	watch(filters, fetchQuery);

	const addToCart = (item) => {
		if(!item.isAdded){
			cart.value.push(item);
			item.isAdded = true;
		} else {
			cart.value.splice(cart.value.indexOf(item),1);
			item.isAdded = false;
		}
	}


	const addToFavorite = async (item) => {
		try{
			if (!item.isFavorite){
				const obj = {
					parentId: item.id
				};
				item.isFavorite = true;
				
				const {data} = await axios.post("https://817726d7a4da3a81.mokky.dev/favorites", obj);
					
				item.favoriteId = data.id;
			} else {
				item.isFavorite = false;

				await axios.delete("https://817726d7a4da3a81.mokky.dev/favorites/" + item.favoriteId);
				
				item.favoriteId = null;
			}
		} catch(err){
			console.log(err);
		}
	};
</script>



<template>
	<div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
		<myHeader @open-drawer="openDrawer"/>
		<Drawer v-if="drawerOpen" /> 
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
					<input @input="onChangeInput" class="border rounded-md border-gray-200 py-2 pl-12 pr-4 outline-none focus:border-gray-400" placeholder="Поиск..." />
				</div>
			</div>
			<div class="mt-10">
				<CardList 
					@addToFavorite="addToFavorite" 
					:items="items" 
					@addToCart="addToCart"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>
