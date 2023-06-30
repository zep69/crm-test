<template>
	<button @click="handleClick" class="my-button">{{ buttonText }}</button>
</template>

<script>
export default {
	name: "vueElementChatGpt",
	data() {
		return {
			buttonText: "Нажми меня",
		};
	},
	methods: {
		handleClick() {
			alert("Кнопка была нажата!");
		},
	},
}
</script>

<style scoped>
.my-button {
	padding: 10px 20px;
	background-color: #3498db;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
</style>