<template>
	<w-button v-if="type==='task'" color="primary" @click="addTaskDialog = true">
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
			<w-table :headers="tableHeaders" :items="users">
				<template #item-cell.checkbox="{item, label, header, index}">
					<div class="text-center">
						<w-checkbox v-model="item.checkbox"></w-checkbox>
					</div>
				</template>
			</w-table>
			<w-input class="mt2" outline>Краткое описание задачи</w-input>
			<w-textarea class="mt2" outline label="Опишите задачу подробней"></w-textarea>
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
			<div class="mt3" style="display: flex">
				<w-checkbox class="body" v-model="control" label="Добавить контроллирующего"></w-checkbox>
				<w-select class="ml2"  outline v-if="control" :items="controllers"></w-select>
			</div>
			<div class="mt2" style="display: flex; justify-content: start">
				<w-checkbox class="body" v-model="delig" label="Можно делигировать"></w-checkbox>
			</div>
		</template>
		<template #actions>
			<div style="display: flex;width: 100%;  justify-content: center">
				<w-button class="bdrs5" color="black" bg-color="green" lg>Поставить задачу</w-button>
			</div>

		</template>
	</w-dialog>
</template>

<script>


import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
export default {
	components:{VueCal},
	name: "Dialogs",
	props:{
		type:String
	},
	data:()=>({
		control:false,
		showMenu:false,
		delig:false,
		addTaskDialog:false,
		date:new Date(),
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
			{label:'Должность', key: 'position'}
		],
		users:[
			{name:'Никита Пикалов', email:'dev@mhand.ru', position:'Web-разработчик', checkbox:false},
			{name:'Алексей Шляхтин', email:'sa@mhand.ru', position:'Руководитель IT-отдела', checkbox:false},
			{name:'Олег Петкунас', email:'ak@mhand.ru', position:'Помощник сис.админа/АХО', checkbox:false},
			{name:'Марат Вагапов', email:'stp@mhand.ru', position:'Специалист тех.поддержки SetRetail/LsFusion', checkbox:false}
		]
	}),
	methods:{
		saveDeadline(){
			this.date = this.datePick.toLocaleString().substr(0,10)
		}
	}
}
</script>

<style scoped>

</style>