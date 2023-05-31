<template>
	<div v-if="type === 'departs'" >
		<div>
			<w-card>
				<template #title>
					Подтверждение отдела
				</template>
				<template #default>
					 <w-table :headers="label" :items="items" @row-click="onRowClick"> </w-table>


				</template>
			</w-card>
			<w-dialog persistent v-model="departsDialog" transition="bounce"  width="400">
				<template #title>
					{{cardContent.name}}
				</template>
				<template #default>
					<w-flex class="row justify-start align-center">
						<h3>Выбрали отдел:</h3><span>{{cardContent.depart}}</span>
					</w-flex>
					<w-flex class="row justify-start align-center">
						<w-checkbox v-model="changeDepart" name="checkbox1">
							<span>Сменить отдел</span>
						</w-checkbox>
						<w-select class="ml2" v-if="changeDepart" v-model="selectedIndexDepart" outline :items="departs2" item-value-key="_id" item-label-key="name">
							Выберите отдел
						</w-select>
					</w-flex>

				</template>

				<template #actions>

					<w-flex class="row justify-end">
						<w-button class="error--bg mr2" @click="departsDialog=false">Отклонить</w-button>
						<w-button class="success--bg" @click="changeDepartFunc();departsDialog=false">Подтвердить</w-button>
					</w-flex>
				</template>

			</w-dialog>
		</div>
	</div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
	name: "ApplicationPage",
	props:{
		type:String
	},
	data:()=>({
		departsDialog:false,
		items:[
			{name:'Test test', depart:'Test'},
			{name:'Test2 test2', depart:'Test2'},
			{name:'Test3 test3', depart:'Test3'},
			{name:'Test4 test4', depart:'Test4'},
		],
		selectedIndexDepart:'',
		label:[
			{label:'Имя', key:'name'},
			{label:'Выбранный отдел', key:'depart'}
		],
		cardContent:{
			name:null,
			depart:null
		},
		departs2:[],
		changeDepart:false
	}),
	computed:{
		...mapGetters(["users", "departs"])
	},
	async mounted(){
	  await this.fetchData()
		this.departs2 = await this.getDeparts()
		console.log("Departs", this.departs2)
	},
	methods:{
		...mapActions(["getUsers","getDeparts"]),
		async fetchData(){
			await this.getUsers()
			this.items = []
			console.log(this.users)
			for(let i=0; i<this.users.length; i++){
				let name = this.users[i].firstname + ' '+this.users[i].lastname
				let status = this.users[i].depart.status
				let depart = this.users[i].depart.name
				let id = this.users[i]._id
				if(status == false){
					this.items.push({name:name, depart: depart, id:id})
				}else continue
			}
		},
		onRowClick(item, index){
			let data = item
			this.cardContent.name = data.item.name
			this.cardContent.depart = data.item.depart
			this.cardContent.id = data.item.id
			this.departsDialog = true
			console.log(this.cardContent)
		},
		async changeDepartFunc(){
			if(this.changeDepart == false){
				console.log("Id Profile",this.cardContent.id)
				let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/acceptDepart', {
					method:'POST',
					headers:{
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body:JSON.stringify({
						id:this.cardContent.id
					})
				})
				if (response.status == 200){
					await this.fetchData()
				}else{
					alert('Ошибка')
				}
			}else{
				console.log("Id Depart",this.selectedIndexDepart)
				let tempDepart = null
				for(let i=0; i<this.departs2.length;i++){
					if(this.departs2[i]._id == this.selectedIndexDepart){
						tempDepart = this.departs2[i]
						break
					}else continue
				}
				let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/changeDepartAdmin', {
					method:'POST',
					headers:{
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body:JSON.stringify({
						id:this.cardContent.id,
						departId:tempDepart._id,
						departName:tempDepart.name,
					})
				})
				if (response.status == 200){
					await this.fetchData()
				}else{
					alert('Ошибка')
				}
			}
		}
	}
}
</script>

<style scoped>

</style>