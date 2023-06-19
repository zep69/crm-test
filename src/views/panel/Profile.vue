<template>
	<div>
		<w-flex justify-center class="pa5">
			<div class="profilePage">


			<w-card class="profileData pa2" style="border-radius: 1rem">

				<br>
				<w-flex  style="height: 100%" column align-center justify-center>

					<div class="box">
						<img :src="profileData.linkAvatar">
					</div>
					<!-- <w-image
							class="bd1 sh1 bdrsr d-block mt2"
							:src="profileData.linkAvatar"
							:width="300"
							:height="300">
					</w-image> -->



					<div class="mt4 primary" style="display: flex; justify-content: center; align-content: center">
						<h1 >{{profileData.firstname}} {{profileData.lastname}}</h1>

						<w-tooltip right>
							<template #activator="{on}">
								<w-button v-on="on" class="ml1" icon="mdi mdi-pen" @click="editDialog=true" ></w-button>
							</template>
							Редактировать профиль
						</w-tooltip>
						<w-dialog transition="bounce" v-model="editDialog" width="400">
							<template #title>

									<span class="primary"> Редактирование профиля</span>
									<div class="spacer"></div>
									<w-button icon="mdi mdi-close" text class="error" lg @click="editDialog=false"></w-button>


							</template>
							<template #default>
								<EditDialog :profile="profileData"  :send-prikols="consoleLogProf" />
							</template>
						</w-dialog>

					</div>
					<h1></h1>


					<h3 class="mt2 primary">Должность: {{profileData.jobTitle}}</h3>

					<div style="display: flex; align-items: center ">
						<h3  class="mt2 primary">Отдел: {{profileData.depart.name}}</h3>
						<w-tooltip v-if="!profileData.depart.status" right>
							<template #activator="{on}">
								<w-icon v-on="on" class="bdrsr" color="red" @click="changeDepart=true" >mdi mdi-help</w-icon>

							</template>
							Оставить заявку на смену отдела
						</w-tooltip>

					</div>
					<w-dialog  persistent v-model="changeDepart" transition="scale-fade" width="300" >
						<template #title>
							<w-flex justify-space-between>
								<span color="primary" style="pointer-events: none" class="primary">Выберите отдел</span>
								<w-icon class="icon error"  @click="changeDepart=false">mdi mdi-close</w-icon>
							</w-flex>
						</template>
						<template #default>
							<w-flex justify-center align-center>
								<w-select :items="departs2" item-label-key="name" item-value-key="_id" v-model="selectItems" return-object></w-select>
							</w-flex>
						</template>
						<template #actions>
							<w-flex justify-end>
								<w-button @click="updateDeaprt">
									Accept
								</w-button>
							</w-flex>
						</template>
					</w-dialog>



					<h3 class="mt2 primary">Рабочая почта: {{profileData.workMail}}</h3>


					<h3 class="mt2 primary">Рабочий номер: {{profileData.workPhone}}</h3>

					<w-button v-if="linkTg" @click="dialogTg = true"><w-icon md>mdi mdi-link-variant</w-icon> Привязать Телеграм</w-button>
					<w-dialog v-model="dialogTg" width="600">
						<template #title>
							Привязка Телеграма к аккаунта
						</template>
						<template #default>
							<h3>Если вы хотите получать уведомление о новых задачах, вам нужно привязать свой аккаунт Телеграма к боту. Для этого сгенерируйте код, и отпрате его через команду нашему боту</h3>
							<br>
							<div class="w-divider"></div>
							<div style="display: flex; justify-content: space-between; margin-top: 1rem;">
								<w-input outline type="text" readonly v-model="profileData._id"></w-input> <!-- <w-button class="ml2" icon="mdi mdi-reload"></w-button> -->
							</div>
							<br>
							<span>Напишите боту команду "/start", после выберите в меню пункт "Войти в систему" и отправьте код боту</span>
							<br>
							<w-button @click="openTg">Чат с ботом</w-button>


						</template>
					</w-dialog>

				</w-flex>


			</w-card>
			<w-card class="statisticData primary" style="border-radius: 1rem">
				<h1>Ваши показатели</h1>
				<w-card title="Статистика задач">
					<DoughnutChart :chartData="testData"/>
				</w-card>
				<w-card class="mt2" title="Средняя по отделу">
					<div disabled="over" style="">
						<DoughnutChart :chartData="dataTest" />
					</div>



				</w-card>
			</w-card>
			</div>
		</w-flex>
		<w-overlay
				v-model="load"
				persistent="true"
				opacity="0.7"
		>
			<w-progress v-if="circleLoad" class="ma1" circle></w-progress>
			<w-card style="width:30rem" v-if="newProfile" bg-color="white">
				<template #title>
					<span class="primary">Заполните профиль</span>
				</template>
				<template #default>
					<div style="display: flex; justify-content: center">
						<div style="display: block">
							<w-input type="text" v-model="profileData.firstname" outline label="Ваше Имя"></w-input>
							<w-input class="mt2" type="text" v-model="profileData.lastname" outline label="Ваша Фамилия"></w-input>
							<w-input class="mt2" type="text" v-model="profileData.jobTitle" outline label="Ваша должность в компании"></w-input>
						</div>
						<div style="display: flex; align-items: center; justify-content: center; margin-left: 2rem">
							<w-image
									class="bd1 sh1 bdrsr d-block avatar"
									:width="100"
									:height="100"
									:src="url">
								<input  type="file" accept="image/*" style="opacity: 0"   @change="onFileChange">
							</w-image>
						</div>
					</div>
					<w-divider class="mt2"></w-divider>
					<div class="mt2" style="display: flex; justify-content: center">
						<w-input outline type="date" v-model="profileData.birthday" label="Дата рождения"></w-input>
						<w-input outline type="number" v-model="profileData.workPhone" label="Рабочий номер"> </w-input>
						<w-input outline type="string" v-model="profileData.workMail" label="Рабочая почта"></w-input>
					</div>

				</template>
				<template #actions>
					<w-flex class="justify-end">
						<w-button bg-color="success" @click="registerUser" color="success">Подтвердить</w-button>
					</w-flex>
				</template>
			</w-card>
		</w-overlay>


	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const FIND_USER = process.env.VUE_APP_BACK_HTTP+'crm/findProfile/'
const  REGISTER_USER = process.env.VUE_APP_BACK_HTTP+'crm/registerUserProfile'
import {DoughnutChart} from 'vue-chart-3'
import { Chart, registerables } from "chart.js";
import EditDialog from "../../components/EditDialog";

Chart.register(...registerables);

export default {
	name: "Profile",
	components:{DoughnutChart, EditDialog},
	data:() =>({
		load:true,
		over:true,
		dialogTg:false,
		selectItems:[],
		changeDepart:false,
		editDialog:false,
		file:null,
		dataTest: {
			labels:['Выполненные', 'Ожидают действий','Просроченные','Активные'],
			datasets:[
				{
					data: [14, 8, 4, 10],
					backgroundColor: ['#47e07c', 'rgba(217,241,103,0.86)', '#f55b75', '#768ff6',],
				}
			]
		},
		testData:{
			labels:['Выполненные', 'Ожидают действий','Просроченные','Активные'],
			datasets:[
				{
					data:[15,6,2,8],
					backgroundColor: ['#47e07c', 'rgba(217,241,103,0.86)', '#f55b75', '#768ff6'],
				}
			]
		},
		linkAvatarS3:null,
		circleLoad:false,
		url:null,
		linkTg:true,
		newProfile: false,
		userProxy:null,
		userInfo:null,
		departs2: [],
		profileData:{
			firstname:null,
			lastname:null,
			birthday:null,
			jobTitle:null,
			linkAvatar:null,
			workPhone:null,
			workMail:null,
			depart: {
				name:null
			},
			idProfile:null
		}

	}),
	computed:{
		...mapGetters(["departs", "user"])
	},
	methods:{
		...mapActions(['getDeparts', "getUser",]),
		onFileChange(e) {
			const file = e.target.files[0];
			this.file = e.target.files[0]
			console.log(this.file)
			this.url = URL.createObjectURL(file);
		},
		openTg(){
			window.open("https://t.me/MegaHand_News_Bot",'_blank')
		},
		async findUser(id){
			let response = await fetch(FIND_USER+id)
			let data = await response.json()
			if (response.status == 200){
				alert('Профиль найден')
				this.load = false
			} else {
				alert('Профиль не найден')
				this.load = true
				this.circleLoad = false
				this.newProfile = true
			}
		},
		async getFormData(file){
			let formData = new FormData()
			formData.append('file', file)
			let request = await fetch(process.env.VUE_APP_BACK_HTTP+'query/test/file',{
				method: 'POST',
				body:formData
			})
			if (request.status === 200){
				alert('Отправилось')
				let data = await request.json()
				console.log(data.link)
				this.linkAvatarS3 = data.link
			}else alert('Ошибка')
		},
		async getUserData(id){
			let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/getProfile/'+id)
			let data = await response.json()
			if(data && response.status == 200){
				this.profileData = data
				console.log('Данные получены')
				console.log(this.profileData)
			}else {
				console.log('Ошибка')
			}
		},
		logCons(){
			console.log(this.selectItems)
		},
		async updateDeaprt(){
			let request = await fetch(process.env.VUE_APP_BACK_HTTP+"crm/updateDepart", {
				method: 'PATCH',
				headers:{
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: this.selectItems._id,
					name: this.selectItems.name,
					status:false,
					idProfile: this.profileData.idProfile
				})
			})
			if(request.status == 200){
				await this.getUserData(this.userProxy._id)
				this.changeDepart = false
			}else{
				console.log('ошибка')
			}
		},
		async registerUser(){
			await this.getFormData(this.file)
			let data = this.profileData
			console.log(this.profileData.lastname)
			console.log(data)
			let request = await fetch(REGISTER_USER, {
				method: 'POST',
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstname:String(this.profileData.firstname),
					lastname:String(this.profileData.lastname),
					jobTitle:String(this.profileData.jobTitle),
					birthday:new Date(this.profileData.birthday),
					linkAvatar:String(this.linkAvatarS3),
					workPhone: Number(this.profileData.workPhone),
					workMail:String(this.profileData.workMail),
					depart:'Пусто',
					idProfile:String(this.userProxy._id),
				})
			})
			if (request.status == 200){
				alert('Вы зарегистрированы в системе')
				this.load = false
				this.newProfile = false
			}
		},
		consoleLogProf(data){
			console.log('data', data)
			this.editDialog = data.profile
		}
	},
	async mounted() {
		this.load = true
		this.circleLoad =true
		this.departs2 = await this.getDeparts()
		console.log(this.departs2[1].name)
		console.log(localStorage.mail)
		this.userInfo = await this.getUser(localStorage.mail)
		this.userProxy  = this.user
		console.log(this.userInfo._id)
		console.log(this.userProxy._id)
		await this.findUser(this.userProxy._id)
		if(this.userProxy){
			await this.getUserData(this.userProxy._id)
		}else {
			console.log('Не могу получить данные')
		}
		if(this.profileData.tgChat){
			this.linkTg = false
		}

	}
}
</script>

<style  scoped>
.w-icon:hover{
	cursor: pointer;
	background-color: rgba(173, 168, 168, 0.84);
}
avatar{
	cursor: pointer;
}
avatar:hover{
	box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}
.w-tooltip{
	border-radius: 2rem;
}
.w-dialog{
	backdrop-filter: blur(10px);
	box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.5);
}
.box {
	position: relative;
	overflow:hidden;
	width:20rem;
	height:20rem;
	border:solid 2px;
	border-radius:10rem;
}
.box img {
	position: absolute;
	top:50%;
	left:50%;
	-webkit-transform:translate(-50%,-50%);
	-ms-transform:translate(-50%,-50%);
	transform:translate(-50%,-50%);
	width:20rem;
	height:20rem;
	-o-object-fit:cover;
	object-fit:cover;
}
.profilePage {
	display: flex;
}
.profileData{
	width:40vw;
	min-width: 200px;
}
.statisticData{
	width:50vw;
	min-width: 400px;
	margin-left: 10px;
}
@media screen and (max-width: 768px){
	.box{
		width: 10rem;
		height: 10rem;
		border-radius: 5rem;
	}
	.box img{
		width: 10rem;
		height: 10rem;
	}
	.profilePage{
		display: block;
		width:100%
	}
	.profileData{
		width:100%
	}
	.statisticData{
		width:100%;
		margin-left: 0px;
		margin-top: 4px;
	}
}
</style>