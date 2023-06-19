<template>
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
		</template>
	</w-card>



</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	name: "DialogTask",
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
		...mapGetters(["users"])
	},
	async mounted() {
		await this.getUsers()
		console.log(this.users)
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
		...mapActions(["getUsers"]),
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