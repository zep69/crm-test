<template>
	<div style="overflow: scroll; height: 500px">


	<div class="rowStyle">
		<h3 class="primary">Ответственный:</h3>
		<span class="primary">{{$props.task.userName}}</span>
	</div>
	<div class="rowStyle" v-if="$props.taskControl">
		<h3 class="primary">Задача от:</h3>
		<span class="primary">{{$props.task.author.name}}</span>
	</div>
	<div class="rowStyle">
		<h3 class="primary">Задача:</h3>
		<span class="primary">{{ $props.task.nameTask }}</span>
	</div>
	<div class="rowStyle">
		<h3 class="primary">Описание задачи:</h3>
		<span class="primary">{{ $props.task.discriptionTask }} </span>
	</div>
	<div class="rowStyle">
		<h3 class="primary">Статус:</h3>
		<span class="primary">{{ $props.task.nameStatus }}</span>
	</div>

	<w-divider class="mt2"></w-divider>

	<w-card>
		<template #title>
			<h3 class="primary">Ход выполнения</h3>
		</template>
		<template #default>
			<div style="display: flex; justify-content: center; margin-top: 1rem;">
				<w-card readonly>
					<template #title>
						<span class="primary">Check-list</span>
					</template>
					<template #default>
						<w-checkboxes  v-model="$props.task.selected" :items="$props.task.list"></w-checkboxes>
					</template>
				</w-card>


				<w-divider class="ml2" vertical></w-divider>
				<w-textarea class="ml2 primary" label="Notes" outline readonly v-model="$props.task.notes" ></w-textarea>
				<w-divider class="ml2" vertical></w-divider>
				<w-card class="ml2">
					<template #title>
						<span class="primary">%Done task</span>
					</template>
					<template #default>
						<div style="display: flex ; justify-content: center; align-content: center">
							<w-progress class="primary" size="8em" color="blue" :stroke="8" circle v-model="$props.task.progress">
								<strong>{{$props.task.progress}}%</strong>
							</w-progress>
						</div>
					</template>
				</w-card>
			</div>
			<div class="ma2 w-divider"></div>
			<div class="mt2">
				<span class="primary">Контролирующий</span>
				<div style="display: flex; justify-content: start; overflow: scroll">
					<div v-for="user in $props.task.visitor" class="mr2">
						<w-tag class="primary" xl>{{ user.name }}</w-tag>
					</div>

					<w-button v-if="!$props.taskControl" class="" icon="mdi mdi-plus" text lg @click="addVisitor=true"></w-button>
				</div>
				<w-dialog v-model="addVisitor" persistent width="500">
					<template #title>
						Добавить контролирующего
						<div class="spacer"></div>
						<w-button icon="mdi mdi-close" color="red" text xl @click="addVisitor=false"></w-button>
					</template>
					<template	#default>
						<w-table :headers="header" :items="users">
							<template #item-cell.checkbox="{item, label, header, index}">
								<div class="text-center">
									<w-checkbox v-model="item.checkbox"></w-checkbox>
								</div>
							</template>
						</w-table>
					</template>
					<template #actions>
						<w-flex justify-end>
							<w-button class="success--bg" @click="addVisitors($props.task._id)">Добавить</w-button>
						</w-flex>
					</template>
				</w-dialog>
			</div>
			<div class="ma2 w-divider"></div>
			<div style="position: relative">
				<div style="display: flex; justify-content: center">
					<span>Комментарии</span>
				</div>
				<div style="border: solid 1px grey; height: 280px; border-radius: 15px">
					<div style="height: 230px; overflow: scroll">
						<div v-for="item in $props.task.comments">
							<div :style="checkFlex(item.id)">
								<MessageComponent :date="item.time" :type="checkType(item.id)" :img="item.avatar" :text-message="item.text" :name="item.name" ></MessageComponent>
							</div>

						</div>
						<!--<div  style="padding: 10px; display: flex; justify-content: start">
								<MessageComponent :type="true" img="https://s3.timeweb.com/cd58536-mhand-bucket/avatar/photo_2023-03-19_17-26-40.jpg" name="Олег Даунов" text-message="Я дурачина простофиля"></MessageComponent>
						</div>
						<div style="padding: 10px; display: flex; justify-content: end">
							<MessageComponent :type="false" img="https://s3.timeweb.com/cd58536-mhand-bucket/avatar/ee510c8cd92207f90edbc5b631471cd9.jpeg" name="Никита Пикалов" text-message="Согласен"></MessageComponent>
						</div>  -->

					</div>

					<div style=" position: absolute; bottom: 10px;width: 100%">
						<w-flex  class="row justify-center" justify-center>
							<input type="text" v-model="textComment" @keypress="commentKey" style=" border-radius: 7rem; width: 400px">
							<w-button icon="mdi mdi-send-circle" text  xl @click="addComment"></w-button>
						</w-flex>



					</div>
				</div>


			</div>
		</template>
	</w-card>

	</div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MessageComponent from "./MessageComponent";

export default {
	name: "DialogTask",
	components:{
		MessageComponent
	},
	props:{
		task:{
			value:Object,
			default(){
				return {}
			}
		},
		taskControl:{
			value:Boolean,
			default() {
				return false;
			}
		}
	},
	data: ()=>({
		selected:[],
		progress:50,
		textComment:'',
		addVisitor:false,
		text:'dadadsasad mjadni abd akshdb habd sajhhdh kjksbd ksndk a',
		items: [
				{ label: 'Choice 1', value: 1 },
				{ label: 'Choice 2', value: 2 },
				{ label: 'Choice 3', value: 3 }
		],
		header:[
			{label:"Выбрать", key:"checkbox"},
			{label: "ФИО", key:"name"},
			{label:"Отдел", key:"departName"}
		]
	}),
	computed:{
		...mapGetters(["users","userCrm"])
	},
	async mounted() {
		await this.getUsers()
		console.log(this.users)
		console.log(this.$props.task)
		for(let i=0;i<this.users.length;i++){
			this.users[i].checkbox = false
			this.users[i].name = this.users[i].firstname + ' ' + this.users[i].lastname
			this.users[i].departName= this.users[i].depart.name
		}
		if(this.$props.task.visitor){
			for(let i=0; i< this.$props.task.visitor.length; i++){
				for(let j=0;j<this.users.length; j++){
					if(this.$props.task.visitor[i].id == this.users[j].idProfile){
						this.users[j].checkbox = true
					}
				}
			}
		}


	},
	methods:{
		...mapActions(["getUsers","getUserCrm"]),
		async addComment(){
			let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/addComment/'+this.$props.task._id,{
				method:'PATCH',
				headers:{
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body:JSON.stringify({
					id:this.userCrm.idProfile,
					avatar:this.userCrm.linkAvatar,
					time:new Date(),
					name:this.userCrm.firstname + ' '+this.userCrm.lastname,
					text:this.textComment,
				})
			})
			if(response.status == 200){
				alert('Комемнтарий для задачи добавлен')
				window.location.reload()
			}else alert('Ошибка')
		},
		async commentKey(e){
			let key = e.keyCode
			if(key===13){
				await this.addComment()
			}
		},
		async addVisitors(task){
			let arr = []
			for(let i = 0; i<this.users.length; i++){
				if(this.users[i].checkbox){
					let name = this.users[i].firstname + ' ' + this.users[i].lastname
					arr.push({id:this.users[i].idProfile, name:name, tg:this.users[i].tgChat})
				}
			}
			console.log(task)
			console.log(arr)

			let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/taskPushVisitor', {
				method:'PATCH',
				headers:{
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					idTask: task,
					arrVisitors: arr
				})
			})
			if (response.status == 200){
				this.addVisitor = false
				alert('Контролирующие добавлены')
				for(let i=0; i<arr.length; i++ ){
					console.log(arr[i])
					let message = 'Вас добавили контролирующем за задачей\n' +
							'Задача: '+this.$props.task.nameTask+'\n' +
							'Задача от: '+this.$props.task.author.name+'\n' +
							'Задача для: '+this.$props.task.userName+'\n' +
							'Описание: '+this.$props.task.discriptionTask+'\n' +
							'Чтобы следить за ходом выполнения задачи, перейдите на сайт http://185.82.24.227'
					let url = encodeURI('https://api.telegram.org/bot5058763471:AAE5IYPYmQJUOh4dr25_EZfngyUoQ1Ck1j0/sendmessage?chat_id='+arr[i].tg+'&text='+message)
					let response  = await fetch(url)
				}
			}


		},
		checkType(id){
			if(id == this.userCrm.idProfile){
				return false
			}else{
				return true
			}
		},
		checkFlex(id){
			if(id == this.userCrm.idProfile){
				return "padding: 10px; display: flex; justify-content: end"
			}else{
				return "padding: 10px; display: flex; justify-content: start"
			}
		}

	}
}
</script>

<style scoped>

.rowStyle{
	display: flex;
	justify-content: start;
	align-items: end;
}

</style>