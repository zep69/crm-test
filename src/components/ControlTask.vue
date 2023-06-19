<template>
	<w-card>
		<template #title>
			<span class="primary">Задачи на контроле</span>
		</template>
		<template #default>
			<w-tabs :items="tab" card>
					<template #item-title="{item}">
						<w-icon :class="item.color" >{{ item.icon }}</w-icon>
						<span :class="item.color">{{item.title}}</span>
					</template>
				<template #item-content="{item}">
					<vue-good-table
							:columns="item.headers"
							:rows="item.data"
							:search-options="{enabled: true, trigger: 'enter' }"
							v-on:row-dblclick="onRowClickCheck"
							:theme="checkTheme"

					>
						<template #table-row="props">
							<div v-if="props.column.field=='startDate'">
								<span>{{formatDate(props.row.startDate)}}</span>
							</div>
							<div v-if="props.column.field=='deadline'">
								<span>{{formatDate(props.row.deadline)}}</span>
							</div>
							<div v-if="props.column.field=='progress'">
								<w-progress size="4em" circle :stroke="8" v-model="props.row.progress">
									<strong>{{ props.row.progress }}%</strong>
								</w-progress>
							</div>
						</template>
					</vue-good-table>
				</template>
			</w-tabs>
		</template>
	</w-card>
	<w-dialog v-model="dialogTask">
		<template #title>
			<span class="primary">Информация о задаче</span>
		</template>
		<template #default>
			<DialogTask :task="selectRow" task-control="true"/>
		</template>
	</w-dialog>
</template>

<script>
import DialogTask from "./DialogTask";
export default {
	name: "ControlTask",
	components:{
		DialogTask
	},
	props:{
		idProfile:{
			type:String,
			default(){
				return ''
			}
		},
		themeTable:{
			value:String,
			default() {
				return "default";
			}
		}
	},
	data:()=>({
		dataTask:[],
		dialogTask:false,
		tab:[
			{title:'Активные задачи', color:'blue', icon:'mdi mdi-progress-clock',
				headers:[
					{label:'Задача',field:'nameTask'},
					{label:'Задача от', field:'author.name'},
					{label:'Ответственный',field:'userName'},
					{ label:'Дата постановки задачи', field: 'startDate', width:'130px'},
					{ label:'Дэдлайн задачи', field:'deadline',width:'100px' },
					{label:'Статус', field:'nameStatus',width:'100px'  },
					{ label: 'Прогресс задачи', field: 'progress',width:'100px' },
				],
				data:[]
			},
			{title:'Готовые', color:'green', icon:'mdi mdi-progress-check',
				headers:[
					{label:'Задача',field:'nameTask'},
					{label:'Задача от', field:'author.name'},
					{label:'Ответственный',field:'userName'},
					{ label:'Дата постановки задачи', field: 'startDate', width:'130px' },
					{ label:'Дэдлайн задачи', field:'deadline',width:'100px' },
					{label:'Статус', field:'nameStatus',width:'100px'  },
					{ label: 'Прогресс задачи', field: 'progress',width:'100px' },
				],
				data:[]
			},
			{title:'Отмененные', color:'red', icon:'mdi mdi-progress-close',
				headers:[
					{label:'Задача',field:'nameTask'},
					{label:'Задача от', field:'author.name'},
					{label:'Ответственный',field:'userName'},
					{ label:'Дата постановки задачи', field: 'startDate', width:'130px' },
					{ label:'Дэдлайн задачи', field:'deadline',width:'100px' },
					{label:'Статус', field:'nameStatus',width:'100px'  },
					{ label: 'Прогресс задачи', field: 'progress',width:'100px' },
				],
				data:[]
			},

		],
		selectIndex:null,
		selectRow: {},

	}),
	computed:{
		checkTheme(){
			if(this.$waveui.theme == 'dark'){
				return 'nocturnal'
			}else return 'default'
		}
	},
	methods:{
		async getTaskVisitor(){
			let id = this.$props.idProfile
			let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/getVisitorTask/'+id)
			if (response.status == 200){
				let data = await response.json()
				this.dataTask = data
				console.log(data)
			}else{
				console.log('Error')
			}
		},
		formatDate(date){
			let dateForm = new Date(date).toLocaleString().substr(0,10)
			return dateForm
		},
		onRowClickCheck(params){
			this.selectIndex = params.row
			this.selectRow = Object.assign({}, this.selectIndex)
			this.dialogTask = true
			this.selectIndex = params.pageIndex
		},
	},
	async mounted(){
		await this.getTaskVisitor()
		for(let i= 0; i<this.dataTask.length; i++){
			if(this.dataTask[i].status == 'active'){
				this.tab[0].data.push(this.dataTask[i])
			}else if(this.dataTask[i].status == 'done'){
				this.tab[1].data.push(this.dataTask[i])
			}else{
				this.tab[2].data.push(this.dataTask[i])
			}
		}
	}
}
</script>

<style scoped>

</style>