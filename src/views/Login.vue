<template>
	<w-flex column align-center justify-center>
		<w-card title="Вход в систему" title-class="blue-light5--bg">
			<w-input outline label="Логин" v-model="login"></w-input>
			<w-input
					class="mt2"
					outline
					v-model="password"
					label="Пароль"
					:type="isPassword ? 'password' : 'text'"
					:inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
					@click:inner-icon-right="isPassword = !isPassword">
			</w-input>
			<template #actions>
				<div class="spacer"></div>
				<w-button text color="error">Восстановить пароль</w-button>
				<w-button color="success" @click="loginIn()">Войти</w-button>
			</template>
		</w-card>
	</w-flex>
</template>

<script>
export default {
	name: "Login",
	data:()=>({
		isPassword:true,
		login:null,
		password:null
	}),
	mounted(){
		console.log(localStorage.token)
	},
	methods:{
		async loginIn(){
			let now = new Date()
			localStorage.tknTime =  now
			console.log("start login()")
			this.login = this.login.toLowerCase().trim()
			const body = {
				email:this.login,
				password: this.password
			}
			let request = await fetch(process.env.VUE_APP_LOGIN_HTTP, {
				method: "POST",
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(body)
			})
			if (request.status===200){
				let data = request.json()
				localStorage.token=data.token
				this.$router.push('/panel')
			}
		},

	}
}
</script>

<style scoped>

</style>