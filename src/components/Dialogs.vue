<template>
	<w-button color="primary" @click="addTaskDialog = true">
		Поставить задачу
	</w-button>
	<w-dialog	v-model="addTaskDialog" width="1000px">
		<template #title>
			<w-icon>mdi mdi-pen-plus</w-icon> <span>Постановка задачи</span>
			<div class="spacer"></div>
			<w-button lg bg-color="red" color="white" @click="addTaskDialog = false"><w-icon>mdi mdi-close</w-icon></w-button>
		</template>
		<template #default>
			<!--<span>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</span>  -->
			<h3>Выберите кому хотите поставит задачу</h3>
			<w-table :headers="tableHeaders" :items="users2">
				<template #item-cell.checkbox="{item, label, header, index}">
					<div class="text-center">
						<w-checkbox v-model="item.checkbox"></w-checkbox>
					</div>
				</template>
			</w-table>
			<w-input class="mt2" v-model="task" outline>Краткое описание задачи</w-input>
			<w-textarea class="mt2" outline v-model="taskDiscription" label="Опишите задачу подробней"></w-textarea>
			<w-menu class="mt2" v-model="showMenu">
				<template #activator>
					<div class="mt2" style="display: flex">
						<w-input readonly outline label-position="left"  v-model="date">
							Дата дэдлайна
						</w-input>
						<w-button @click="showMenu = true" class="mr3 ml2"><w-icon>mdi mdi-calendar-import-outline</w-icon></w-button>
					</div>

				</template>


				<vue-cal
						class="vuecal--date-picker"
						xsmall
						:selected-date="datePick"
						hide-view-selector
						:time="false"
						:transitions="false"
						active-view="month"

						:disable-views="['week', 'day']"
						@cell-click="datePick = $event"
						style="width: 210px;height: 230px">

				</vue-cal>
				<w-divider></w-divider>
				<div style="display: flex">
					<div class="spacer"></div>
					<w-button @click="saveDeadline(); showMenu=false">Save</w-button>
				</div>
			</w-menu>
			<!--<div class="mt3" style="display: flex">
				<w-checkbox class="body" v-model="control" label="Добавить контроллирующего"></w-checkbox>
				<w-select class="ml2"  outline v-if="control" :items="controllers"></w-select>
			</div>
			<div class="mt2" style="display: flex; justify-content: start">
				<w-checkbox class="body" v-model="delig" label="Можно делигировать"></w-checkbox>
				<w-checkbox class="body ml2" v-model="access" label="Обязательое подтверждение от контролирующего/ответственного"></w-checkbox>
			</div>


		  -->
		</template>
		<template #actions>
			<div style="display: flex;width: 100%;  justify-content: center">
				<w-button class="bdrs5" color="black" bg-color="green" lg @click="logDeparts">Поставить задачу</w-button>
			</div>
		</template>

	</w-dialog>
</template>

<script>


import VueCal from 'vue-cal'
import {mapGetters, mapActions} from "vuex";
import 'vue-cal/dist/vuecal.css'
export default {
	components:{VueCal},
	name: "Dialogs",
	props:{
		departs:{
			type:Array,
			default(){
				return []
			}
		},
		userId:{
			type:String,
			default() {
				return ''
			}
		}
	},
	data:()=>({
		task:null,
		taskDiscription:null,
		control:false,
		showMenu:false,
		delig:false,
		access: false,
		addTaskDialog:false,
		date:new Date(),
		user:null,
		controllers:[
			{label:'Никита Пикалов'},
			{label:'Алексей Шляхтин'},
			{label:'Олег Петкунас'},
			{label:'Марат Вагапов'},
		],
		datePick:new Date(),
		tableHeaders:[
			{label:'Выбрать', key:'checkbox'},
			{label:'ФИО', key:'name'},
			{label: 'E-mail', key:'email'},
			{label:'Должность', key: 'position'},
			{label: 'Отдел', key:'depart'}
		],
		users2:[
			{name:'Никита Пикалов', email:'dev@mhand.ru', position:'Web-разработчик', checkbox:false},
			{name:'Алексей Шляхтин', email:'sa@mhand.ru', position:'Руководитель IT-отдела', checkbox:false},
			{name:'Олег Петкунас', email:'ak@mhand.ru', position:'Помощник сис.админа/АХО', checkbox:false},
			{name:'Марат Вагапов', email:'stp@mhand.ru', position:'Специалист тех.поддержки SetRetail/LsFusion', checkbox:false}
		]
	}),
	computed:{
		...mapGetters(["users", "userCrm"]),
	},
	async mounted(){
		await this.getUsers()
		console.log(this.users)
		this.users2 = []
		for(let i=0; i<this.users.length; i++){
			console.log(this.users[i].firstname)
			let name = this.users[i].firstname + ' '+this.users[i].lastname
			let email = this.users[i].workMail
			let position = this.users[i].jobTitle
			let depart= this.users[i].depart.name
			let id = this.users[i].idProfile
			let tgChat = this.users[i].tgChat
			this.users2.push({name: name, email: email, position: position, depart: depart, id: id, checkbox: false, tgChat:tgChat})
		}
		await this.getUserCrm(this.userId)
		console.log('Cons iz diag', this.userCrm)

	},
	methods:{
		...mapActions(["getUsers","getUserCrm"]),
		saveDeadline(){
			this.date = this.datePick.toLocaleString().substr(0,10)
		},
		async logDeparts(){
			console.log(this.departs)
			console.log(this.users2)
			let userArr = []
			for(let i = 0; i<this.users2.length; i++){
				if(this.users2[i].checkbox == true){
					userArr.push(this.users2[i])
				}else continue
			}
			console.log(userArr)
			let count = 0
			let date = this.date.split('.')
			date[1] = Number(date[1]) - 1
			for(let i = 0; i<userArr.length; i++){
				let count = 0
				let taskResp = await fetch('http://192.168.2.80:3000/crm/createTask', {
					method:'POST',
					headers:{
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						task:this.task,
						discriptionTask:this.taskDiscription,
						userId:this.userCrm.idProfile,
						authorName:this.userCrm.firstname +' '+ this.userCrm.lastname,
						userTask:userArr[i].id,
						deadline:new Date(date[2],date[1],date[0]),
						startDate:new Date(),
						userName: userArr[i].name
					})
				})
				if(taskResp.status == 200){
					count+=1
					this.addTaskDialog = false
				}
				let sendMail = await fetch('http://192.168.2.80:3000/crm/test/mail', {
					method:'POST',
					headers:{
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body:JSON.stringify({
						name : this.userCrm.firstname +' '+ this.userCrm.lastname,
						nameTask : this.task,
						deadline : new Date(date[2],date[1],date[0]),
						mail: userArr[i].email
					})
				})
				let dateSend = new Date(date[2],date[1],date[0]).toLocaleString().substr(0,10)
				let message = 'У Вас новая задача!\n' +
						'От: '+this.userCrm.firstname +' '+ this.userCrm.lastname+'\n' +
						'Задача:'+this.task+'\n' +
						'Выполнить до: '+dateSend
				let url = encodeURI('https://api.telegram.org/bot5058763471:AAE5IYPYmQJUOh4dr25_EZfngyUoQ1Ck1j0/sendmessage?chat_id='+userArr[i].tgChat+'&text='+message)
				let sendTg = await fetch(url)
			}

			alert('Задача поставлена '+count+' пользователям')
		},
	}
}
</script>

<style scoped>

</style>