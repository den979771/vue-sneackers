<script setup>
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'
import { ref, watch, computed, provide, inject } from 'vue'
import axios from 'axios'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
  cartButtonDisabled: Boolean
})

const isCreating = ref(false)
const orderId = ref(null)

const { cart } = inject('cart')

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post('https://817726d7a4da3a81.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })

    cart.value = []

    orderId.value = data.id
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}

const isEmptyCart = computed(() => cart.value.length === 0)

const buttonDisabled = computed(() => isCreating.value || isEmptyCart.value)
</script>
<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black opacity-70 z-10"></div>
  <div class="bg-white h-full w-96 fixed right-0 top-0 z-20 p-8">
    <DrawerHead />
    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!orderId"
        image-url="/package-icon.png"
        title="Корзина пуста"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
      />
      <InfoBlock
        v-else
        image-url="/order-success-icon.png"
        title="Заказ оформлен!"
        :description="`Вш заказ #${orderId} скоро будет передан курьерской доставке.`"
      />
    </div>
    <div v-else>
      <CartItemList />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} ₽</b>
        </div>
        <div class="flex gap-2">
          <span>Налог 5%</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} ₽</b>
        </div>
        <button
          :disabled="buttonDisabled"
          @click="createOrder"
          class="mt-4 transition disabled:bg-slate-300 cursor-pointer bg-lime-500 w-full rounded-xl py-4 text-white hover:bg-lime-600 active:bg-lime-700"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
