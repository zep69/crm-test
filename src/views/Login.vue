<template>

	<w-flex column align-center justify-center>
		<w-card title="Вход в систему" title-class="blue-light5--bg">
			<template #default>
				<w-input outline label="Логин(e-mail)" :label-color="inputStyle" :color="inputStyle" v-model="login"></w-input>
				<w-input
						class="mt2"
						:color="inputStyle"
						outline
						v-model="password"
						label="Пароль"
						:label-color="inputStyle"
						:type="isPassword ? 'password' : 'text'"
						:inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
						@click:inner-icon-right="isPassword = !isPassword"
						@keypress="logInKey"

				>
				</w-input>
				<div class="mt2" v-if="error">
					<span class="error size--xs">Неверный логин или пароль</span>
				</div>
			</template>

			<template #actions>
				<div class="spacer"></div>
				<w-button text color="error" @click="forgetPassDialog=true">Восстановить пароль</w-button>
				<w-button color="success" @click="loginIn()">Войти</w-button>
			</template>
		</w-card>
		<w-dialog v-model="forgetPassDialog" width="400px">
			<template #title>
				Введите e-mail
			</template>
			<template #default>
				<w-input type="email" outline v-model="mail"></w-input>
			</template>
			<template #actions>

				<w-flex style="display: flex; justify-content: end;">

					<w-button color="black" bg-color="green" @click="changeEmail(mail)">Восстановить</w-button>
				</w-flex>

			</template>
		</w-dialog>
		<w-dialog  v-model="confirmDialog" width="400px">
			<template #title>
				Введите код из письма
			</template>
			<template #default>
				<div style="display: flex; flex-direction: row;">
					<v-otp-input
							ref="otp"
							v-model="otp"
							:num-inputs="6"
							input-classes="otp-input"
							separator="-"
					/>
				</div>
			</template>
			<template #actions>
				<w-flex	justify-end>
					<w-button bg-color="green" color="black" @click="logOtp">Проверить</w-button>
				</w-flex>

			</template>
		</w-dialog>
		<w-dialog v-model="dialogPassChange" width="400px">
			<template #title>
				<span>Смените пароль</span>
			</template>



			<w-input
					v-model="newPass"
					outline
					label="Введите новый пароль"
					:color="isTrue ? 'primary':'red'"
					:type="isNewPas ? 'password' : 'text'"
					:inner-icon-right="isNewPas ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
					@click:inner-icon-right="isNewPas = !isNewPas">
			</w-input>
			<w-input
					class="mt2"
					v-model="newPassRetry"
					 outline
					label="Еще раз"
					:color="isTrue ? 'primary':'red'"
					:type="isNewPasSec ? 'password' : 'text'"
					:inner-icon-right="isNewPasSec ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
					@click:inner-icon-right="isNewPasSec = !isNewPasSec">
			</w-input>
			<span class="blink body" v-if="!isTrue">ПАРОЛИ ДОЛЖНЫ СОВПАДАТЬ</span>

				<w-flex class="mt2" align-center justify-end>
					<w-button @click="changePassword">Сменить</w-button>
				</w-flex>

		</w-dialog>
	</w-flex>
</template>

<script>
import {mapActions} from "vuex";
import {mapGetters} from "vuex";

export default {
	name: "Login",
	data:()=>({
		dialogPassChange:false,
		isPassword:true,
		error:false,
		inputStyle:'primary',
		newPass:null,
		newPassRetry:null,
		isNewPas:true,
		isNewPasSec: true,
		isTrue:true,
		login:null,
		mail:null,
		password:null,
		code:'',
		forgetPassDialog:false,
		confirmDialog:false,
		otp:null,
	}),
	computed:{
		...mapGetters(["user"])
	},
	mounted(){
		console.log(localStorage.token)

	},
	methods:{
		...mapActions(["getUser"]),
		async changeEmail(email){
			let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/chngePass/'+email,{
				method:"POST",
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
			})

			if(response.status ==200){
				let data = await response.json()
				console.log(data.number)
				this.code = Number(data.number)
				console.log(this.code)
				this.forgetPassDialog = false
				this.confirmDialog = true
			}else {
				alert('Что-то пошло не так')
			}

		},
		checkColor(){
			if (this.newPass == this.newPassRetry){
				this.isTrue = true
			}else{
				this.isTrue = false
			}
		},
		async changePassword(){
			this.checkColor()
			if (this.isTrue){
				let request = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/newPass',{
					method:'PATCH',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify({
						mail:this.mail,
						password: this.newPass
					})
				})
				if (request.status == 200){
					alert('Пароль успешно изменен!')
					this.dialogPassChange = false
				}else {
					alert('Что-то пошло не так(')
				}
			}
		},
		plusString(temp){
			let joba = ''
			for(let i=0; i<temp.length;i++){
				joba+=temp[i]
			}
			return Number(joba)
		},
		logOtp(){
			let temp = this.plusString(this.$refs.otp.otp)
			console.log(this.$refs.otp.otp)
			console.log(this.otp)
			console.log(temp)
			if(temp == this.code){
				this.confirmDialog = false
				this.dialogPassChange = true

			}
		},
		async logInKey(e){
			let key = e.keyCode
			if(key===13){
				await this.loginIn()
			}
		},
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
				localStorage.mail = this.login
				await this.getUser(this.login)
				console.log(this.user)
				console.log(data)
				this.$router.push('/panel')
			}else{
				this.inputStyle = 'error'
				this.error = true
				alert('Неверные логин или пароль')

			}
		},

	}
}
</script>

<style>

.popa{
	display: flex;
	justify-content: center;
}

.otp-input {
	width: 40px;
	height: 40px;
	padding: 5px;
	margin: 0 10px;
	font-size: 20px;
	border-radius: 4px;
	border: 1px solid rgba(0, 0, 0, 0.3);
	text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
	background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
input::placeholder {
	font-size: 15px;
	text-align: center;
	font-weight: 600;
}

.blink{
	color: red;
	animation: blink 2s infinite;
}
@keyframes blink {
	from {opacity: 1} to {opacity:0}
}


</style>