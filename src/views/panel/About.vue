<template>
  <div class="about">
  </div>

	<w-flex wrap>
		<!--  -->
		<div class="navPhone xs2 pal pa2">
			<div  class="drawer">
				<w-flex column justify-center>
					<w-button icon="mdi mdi-menu" xl text></w-button>
					<div v-for="item in items">
						<w-button text :icon="item.icon"  xl  @click="kaki=item.kaki" :color="item.color">

						</w-button>
					</div>
					<!-- 	<w-list :items="items" style="justify-content: center">
						<template #item="{ item }">
							<div style="display: flex; justify-content: center">
								<w-button text :icon="item.icon"  xl  @click="kaki=item.kaki" :color="item.color"></w-button>
							</div>


						</template>
					</w-list> -->

				</w-flex>
			</div>
		</div>
		<div class="navFull xs2 pal pa2" >
			<w-card color="primary" title="Вкладки" style="border-radius: 1rem; z-index: 2">
				<w-list :items="items" style="width: 100%; overflow: scroll" >
					<template #item="{ item }">
						<w-button text  lg  @click="kaki=item.kaki" :color="item.color">
							<w-icon class="mr1" md>{{item.icon}}</w-icon>
							{{item.label}}
						</w-button>
					</template>
				</w-list>
			</w-card>
		</div>
			<div class="xs10 pal pa2">
				<w-card color="primary"  v-if="kaki==='task'">
					<template #title>
						<span>Задачи</span>
						<div class="spacer"></div>
						<!-- <w-button color="primary">Поставить задачу</w-button> -->
						<Dialogs :departs="departs2" :user-id="userLoad._id"/>
					</template>

					<w-tabs :items="tabs" card transition="slide-fade-down">
						<template #item-title="{item}">
							<w-icon :class="item.color" >{{ item.icon }}</w-icon>
							<span :class="item.color">{{item.title}}</span>
						</template>
						<template #item-content="{item}">
								<vue-good-table
										:columns="item.headers"
										:rows="item.data"
										v-on:row-dblclick="onRowClick"
										:search-options="{enabled: true, trigger: 'enter' }"
										:theme="tabTheme"
										:row-style-class="rowStyleClassFn"

								>
									<template #table-row="props">
										<div v-if="props.column.field=='progress'">
											<w-progress size="4em" circle :stroke="8" v-model="props.row.progress">
												<strong>{{ props.row.progress }}%</strong>
											</w-progress>
										</div>
									</template>
								</vue-good-table>

							<w-dialog
									v-model="dialogTask"
									persistent
									width="1000px"
							>
								<template #title>
									<div>

									</div>
									<w-icon md> {{item.icon}}</w-icon>
									{{item.title}}
									<div class="spacer">
									</div>
									<w-button lg text @click="dialogTask=false">
										<w-icon md>mdi mdi-close-circle</w-icon>
									</w-button>
								</template>
								<template #default>
									<div style="display: flex; justify-content: start">
										<h3>Задача от: </h3><span>{{selectRow.author.name}}</span>
									</div>
									<div style="display: flex; justify-content: start">
										<h3>Задача: </h3><span>{{selectRow.nameTask}}</span>
									</div>
									<div style="display: flex; justify-content: start">
										<w-textarea label="Описание задачи" label-position="left" class="mt2" readonly outline :model-value="selectRow.discriptionTask"></w-textarea>
									</div>
									<w-divider class="ma3" color="green"/>
									<div style="display: flex; justify-content: center">
										<h3>Ход выполнения</h3>
									</div>
									<div style="display: flex">
										<div class="xs3 pa2">
											<w-card title="Список">
												<template #default>
													<w-checkboxes :items="selectRow.list" v-model="selectRow.selected"></w-checkboxes>
													<w-divider color="blue" class="ma2"/>
													<w-button text color="blue" @click="addToListDialog = true"><w-icon>mdi mdi-plus</w-icon> Добавить пункт </w-button>
													<w-dialog v-model="addToListDialog" width="250px">
														<template #title>
															<w-flex justify-space-between>
																Добавить пункт
																<w-icon @click="addToListDialog=false">mdi mdi-close</w-icon>
															</w-flex>


														</template>
														<template #default>
															<w-input v-model="newListComponent" outline></w-input>
														</template>
														<template #actions>
															<w-flex justify-end>
																<w-button @click="pushToList">Добавить</w-button>
															</w-flex>
														</template>
													</w-dialog>
												</template>
											</w-card>
										</div>
										<div class="xs9 pa2">
											<w-card title="Заметки выполнения">
												<template #default>
													<w-textarea v-model="selectRow.notes" outline></w-textarea>
												</template>
											</w-card>

										</div>
										<div class="xs3 pa2">
											<w-card title="Сменить статус">

												<w-select v-model="selectStatus" :items="statuses" item-label-key="label" item-value-key="label" ></w-select>

											</w-card>
										</div>

									</div>
									<w-flex justify-center align-center>
										<w-card>
											<template #title>
												На сколько готова задача
											</template>
											<template #default>
												<w-slider v-model="selectRow.progress" step="1" thumb-label></w-slider>
											</template>
										</w-card>
									</w-flex>
								</template>
								<template #actions>
									<div class="spacer"></div>
									<w-button color="black" v-if="selectRow.status == 'active'" bg-color="green" @click="updateTask(selectRow);dialogTask=false">Подтвердить изменения </w-button>
								</template>
							</w-dialog>
						</template>
					</w-tabs>
				</w-card>

				<w-card class="mt2 primary" v-if="kaki === 'task'">
					<template #title> Поставленные задачи</template>
					<template #default>
						<w-tabs :items="tabsActive" card transition="slide-fade-down">
							<template #item-title="{item}">
								<w-icon :class="item.color" >{{ item.icon }}</w-icon>
								<span :class="item.color">{{item.title}}</span>
							</template>

							 <template #item-content="{item}">
								<vue-good-table
										:columns="item.headers"
										 :rows="item.data"
										v-on:row-dblclick="onRowClickCheck"
										:search-options="{enabled: true, trigger: 'enter' }"
										:theme="tabTheme"
										:row-style-class="rowStyleClassFn"


								>
									<template #table-row="props">
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

				<w-dialog v-model="dialogTaskControl" width="800">
					<template #title>
						<h2>Информация о задачи</h2>
						<div  class="spacer"></div>
						<w-button lg bg-color="red" color="white" @click="dialogTaskControl=false"><w-icon>mdi mdi-close</w-icon></w-button>
					</template>
					<template #default>
						<DialogTask :task="selectRow"/>
					</template>
					<template #actions>
						<w-flex class="row justify-end">
							<w-button class="error--bg" @click="deleteDialog=true">Удалить задачу</w-button>
						</w-flex>

					</template>
				</w-dialog>
				<w-dialog v-model="deleteDialog" width="350">
					<template #title>Оповещение</template>
					<template #default>Вы действительно хотите удалить задачу {{selectRow.nameTask}}?</template>
					<template #actions>
						<w-flex class="row justify-center">
							<w-button class="success--bg" @click="deleteTask(selectRow._id, selectRow)">Да</w-button>
							<w-button class="ml2 error--bg" @click="deleteDialog=false">Нет</w-button>
						</w-flex>
					</template>
				</w-dialog>



				<w-card title="Сотрудники Компании" v-if="kaki==='da'">
					<div v-for="item in kakashonki">
						<w-card class="mt2" :title="item.name" style="border-radius: 1rem">
							<w-flex class="row align-center justify-start">
								<w-image
										class="bd1 sh1 bdrsr d-block"
										:width="200"
										:height="200"
										:src="item.img"></w-image>
								<w-flex class="column justify-center">
									<p class="ml2">{{item.discription}}</p>
									<w-flex class="row justify-center align-center">
										<w-button outline lg color="info-dark1" @click="clickToLink(item.telega)"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
																							width="30" height="30"
																							viewBox="0,0,256,256"
																							style="fill:#000000;">
											<g fill="#13b3f4" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M25.1543,3.98438c-0.32506,0.01434 -0.62791,0.10902 -0.89453,0.2168c-0.24975,0.10046 -1.204,0.50974 -2.70703,1.1543c-1.50434,0.64512 -3.49626,1.50031 -5.62109,2.41406c-4.24968,1.8275 -9.02743,3.88464 -11.47461,4.9375c-0.09202,0.03958 -0.41311,0.14215 -0.75391,0.4082c-0.3408,0.26605 -0.70312,0.81735 -0.70312,1.43164c0,0.49534 0.23607,0.98744 0.5332,1.28125c0.29714,0.29381 0.61154,0.43894 0.88086,0.54883c0.97717,0.39871 4.00778,1.63891 4.58008,1.87305c0.20141,0.61698 1.29835,3.97253 1.55273,4.79492c0.16769,0.5427 0.32732,0.8826 0.53516,1.15234c0.10392,0.13487 0.22471,0.25307 0.37109,0.3457c0.05851,0.03702 0.12266,0.06554 0.1875,0.0918l0.00391,0.00195c0.01494,0.006 0.02782,0.01618 0.04297,0.02148c0.02858,0.01 0.0477,0.0112 0.08594,0.01953c0.15232,0.04919 0.30611,0.08008 0.44336,0.08008c0.58516,0 0.94336,-0.32227 0.94336,-0.32227l0.02149,-0.01562l3.00977,-2.60352l3.65039,3.45313c0.0514,0.07268 0.53074,0.73047 1.58789,0.73047c0.6277,0 1.12563,-0.31497 1.44531,-0.65039c0.31968,-0.33542 0.51885,-0.6878 0.60352,-1.13086v-0.00195c0.07919,-0.41867 3.44336,-17.68945 3.44336,-17.68945l-0.00586,0.02344c0.09848,-0.44951 0.12429,-0.86814 0.01563,-1.28125c-0.10867,-0.41311 -0.39499,-0.80864 -0.75,-1.02148c-0.35497,-0.2128 -0.70229,-0.27801 -1.02734,-0.26367zM24.9668,6.07422c-0.0048,0.02919 0.00359,0.01451 -0.00391,0.04883l-0.00195,0.01172l-0.00195,0.01172c0,0 -3.3225,17.04989 -3.44531,17.69922c0.00899,-0.04904 -0.0321,0.04846 -0.07422,0.10742c-0.05955,-0.04105 -0.18164,-0.09375 -0.18164,-0.09375l-0.01953,-0.02148l-4.98633,-4.7168l-3.52539,3.04688l1.04883,-4.19922c0,0 6.55617,-6.78664 6.95117,-7.18164c0.318,-0.316 0.38477,-0.42616 0.38477,-0.53516c0,-0.146 -0.07609,-0.25195 -0.24609,-0.25195c-0.153,0 -0.35875,0.14875 -0.46875,0.21875c-1.4331,0.91354 -7.72466,4.58039 -10.54492,6.2207c-0.44819,-0.18342 -3.5619,-1.45798 -4.61719,-1.88867c0.00799,-0.0035 0.00536,-0.00226 0.01367,-0.00586c2.44782,-1.05314 7.22358,-3.11026 11.47266,-4.9375c2.12454,-0.91362 4.11797,-1.76946 5.62109,-2.41406c1.47998,-0.63467 2.50833,-1.07147 2.625,-1.11914z"></path></g></g>
										</svg> Написать в телеграм</w-button>

										<h3 class="ml2">Тел.:</h3><span class="row ml1">{{item.number}}</span>

										<h3 class="ml2">E-mail:</h3><span class="row ml1">{{item.mail}}</span>

									</w-flex>
								</w-flex>

							</w-flex>


						</w-card>

					</div>
				</w-card>
				<w-card title="Заявки" v-if="kaki==='appl' && userCrm.admin">
					<template #default>
						<div>
							<h3>Template for application</h3>
							<br>
							<ApplicationPage type="departs"/>
							<br>
							<CardSimple width="20">
								<template #header>
									<h3>Simple header</h3>
								</template>
								<template #default>
									<h3>Deafult</h3>
								</template>
							</CardSimple>
						</div>
					</template>
				</w-card>

				<w-card title="Планировщик" disabled v-if="kaki==='calendar'">
					<vue-cal style="height: 500px"></vue-cal>
				</w-card>
			</div>



	</w-flex>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import Dialogs from "../../components/Dialogs";
import DialogTask from "../../components/DialogTask";
import {mapGetters, mapActions} from "vuex";
import ApplicationPage from "../../components/ApplicationPage";
import CardSimple from "../../components/CardSimple";

export default {
	components:{
		Dialogs,
		VueCal,
		DialogTask,
		ApplicationPage,
		CardSimple
	},
	data:()=>({
		dialogTask:false,
		tabTheme:'default',
		selectStatus:'',
		deleteDialog:false,
		userLoad :{
			_id:null,
			mail:null
		},
		selectRow:{
			id:null,
			firstName:null,
			lastName:null,
		},
		addToListDialog:false,
		newListComponent:null,
		statuses:[
			{label:'Поставлена', value:'active'},
			{label:'Взята в работу', value:'active'},
			{label:'На обсуждении/Согласовании', value:'active'},
			{label:'Выполнена, ожидает подтверждения', value: 'waiting'},
			{label:'Приостановлена', value:'waiting'},
			{label:'Отменена', value:'gone'},
			{label:'Просрочена', value:'gone'},
			{label:'Готова/Выполнена', value:'done'},
		],
		selectIndex:null,
		headers:[
			{ label: 'Номер задачи', field: 'id' },
			{ label: 'От кого', field: 'firstName' },
			{ label:'Дата постановки задачи', field: 'dateIn'},
			{label:'Дэдлайн задачи', field:'deadline'}
		],
		data:[
			{ id: 1, firstName: 'Floretta', lastName: 'Sampson', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleTimeString().substr(0,10) },
			{ id: 2, firstName: 'Nellie', lastName: 'Lynn' ,dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleTimeString().substr(0,10)},
			{ id: 3, firstName: 'Rory', lastName: 'Bristol', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleTimeString().substr(0,10) },
			{ id: 4, firstName: 'Daley', lastName: 'Elliott', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleTimeString().substr(0,10) },
			{ id: 5, firstName: 'Virgil', lastName: 'Carman', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleTimeString().substr(0,10) }
		],

		tabsActive:[
			{title:'Активные задачи', color:'blue', icon:'mdi mdi-progress-clock',
				headers:[
					{label:'Задача',field:'nameTask'},
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
					{label:'Ответственный',field:'userName'},
					{ label:'Дата постановки задачи', field: 'startDate', width:'130px' },
					{ label:'Дэдлайн задачи', field:'deadline',width:'100px' },
					{label:'Статус', field:'nameStatus',width:'100px'  },
					{ label: 'Прогресс задачи', field: 'progress',width:'100px' },
				],
				data:[]
			},
		],

		tabs:[
			{title:'Текущие задачи',color:'blue', icon:"mdi mdi-progress-clock",
				headers:[
					//{ label: 'Номер задачи', field: 'id', width:'90px' },
					{ label:'Задача', field:'nameTask' },
					{ label: 'От кого', field: 'author.name', width:'200px' },
					{ label:'Дата постановки задачи', field: 'startDate', width:'130px' },
					{ label:'Дэдлайн задачи', field:'deadline',width:'100px' },
					{label:'Статус', field:'nameStatus',width:'100px'  },
					{ label: 'Прогресс задачи', field: 'progress',width:'100px' },

				],
				data:[
					{ id: 1, firstName: 'Алексей Шляхтин', task:'Таск менеджер, свой аналог Битрикса',checkboxes:[{label:'Обсудить',value:1},{label:'Начать',value:2}], selected:[1], status:'На обсуждении', discription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleString().substr(0,10), progress:50 },
					{ id: 2, firstName: 'Олег Петкунас' , task:'Нужна возможность планировать свой день', status:'Выполняется',dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleString().substr(0,10), progress:20},
					{ id: 3, firstName: 'Марат Вагапов', task:'Помощь с настройкой nodejs telegram api', status:'Приостановлена', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleString().substr(0,10), progress:26 },
					{ id: 4, firstName: 'Дюльдин Александр', task:'Отчет о проделанной работе за Февраль 2023', status:'Выполнена, ожидает подтверждения', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleString().substr(0,10),progress:99 },
					{ id: 5, firstName: 'Virgil', task:'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',status:'На согласовании', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleString().substr(0,10), progress:90 }
				]
			},
			{
				title:'Ожидают действий', color:'orange', icon:'mdi mdi-progress-question',
				headers: [
					{ label:'Задача', field:'nameTask' },
					{ label: 'От кого', field: 'author.name', width:'200px' },
					{ label:'Дата постановки задачи', field: 'startDate', width:'130px' },
					{ label:'Дэдлайн задачи', field:'deadline',width:'100px' },
					{label:'Статус', field:'nameStatus',width:'100px'  },
					{ label: 'Прогресс задачи', field: 'progress',width:'100px' },

				],
				data:[
					{ id: 1, firstName: 'Floretta', task:'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',checkboxes:[{label:'sdadasda',value:1},{label:'alhdkbda',value:2}], selected:[1], status:'На обсуждении', discription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleString().substr(0,10), progress:50 },
					{ id: 2, firstName: 'Nellie' , task:'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.', status:'Выполняется',dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleString().substr(0,10), progress:20},
					{ id: 3, firstName: 'Rory', task:'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.', status:'Приостановлена', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleString().substr(0,10), progress:26 },
					{ id: 4, firstName: 'Daley', task:'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.', status:'Выполнена, ожидает подтверждения', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleString().substr(0,10),progress:74 },
					{ id: 5, firstName: 'Virgil', task:'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',status:'На согласовании', dateIn: new Date().toLocaleString().substr(0,10), deadline:new Date(2023, 4,15).toLocaleString().substr(0,10), progress:90 }
				]
			},
			{title:'Выполненные',color:'green', icon:"mdi mdi-progress-check", headers:[
					{ label:'Задача', field:'nameTask' },
					{ label: 'От кого', field: 'author.name', width:'200px' },
					{ label:'Дата постановки задачи', field: 'startDate', width:'130px' },
					{ label:'Дэдлайн задачи', field:'deadline',width:'100px' },
					{label:'Статус', field:'nameStatus',width:'100px'  },
					{ label: 'Прогресс задачи', field: 'progress',width:'100px' },

				],
				data:[
					{ id: 1, firstName: 'F23loretta', lastName: 'Sampson' },
					{ id: 2, firstName: 'Nel2lie', lastName: 'Lynn' },
					{ id: 3, firstName: 'Rory12', lastName: 'Bristol' },
					{ id: 4, firstName: 'Dal255ey', lastName: 'Elliott' },
					{ id: 5, firstName: 'Vir22gil121', lastName: 'Carman' }
				]},
			{title:'Отклоненные/Просроченные',color:'red', icon:'mdi mdi-progress-close', headers:[
					{ label:'Задача', field:'nameTask' },
					{ label: 'От кого', field: 'author.name', width:'200px' },
					{ label:'Дата постановки задачи', field: 'startDate', width:'130px' },
					{ label:'Дэдлайн задачи', field:'deadline',width:'100px' },
					{label:'Статус', field:'nameStatus',width:'100px'  },
					{ label: 'Прогресс задачи', field: 'progress',width:'100px' },

				],
				data:[
					{ id: 1, firstName: 'F23lo@retta', lastName: 'S@@ampson' },
					{ id: 2, firstName: 'Nel@@2lie', lastName: 'Ly@nn' },
					{ id: 3, firstName: 'Rory12', lastName: 'Br@@istol' },
					{ id: 4, firstName: 'Dal255@@ey', lastName: 'Elliot$#@t!@@' },
					{ id: 5, firstName: 'Vir22gil@@@121', lastName: 'C@@@@arman' }
				]}
		],
		kaki:'task',
		items:[
			{label:'Задачи', icon:'mdi mdi-check', kaki:'task', color:'primary'},
			{label:'Заявки', icon:'mdi mdi-format-list-bulleted', kaki:'appl', color:'primary'},
			{label:'Компания',icon:'mdi mdi-office-building-outline', kaki:'da', color:'orange'},
			{label: 'Планировщик', icon:'mdi mdi-calendar-clock', kaki: 'calendar', color:'red'}
		],
		kakashonki:[
			{name:'Олег Петкунас', img:'https://s3.timeweb.com/cd58536-mhand-bucket/avatar/photo_2023-03-19_17-26-40.jpg', discription:'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. ', telega:'https://t.me/mhand_ak', number:'+79966237451', mail:'ak@mhand.ru'},
			{name:'Георгий Хачатрян', img:'https://s3.timeweb.com/cd58536-mhand-bucket/avatar/photo_2023-01-10_12-03-02.jpg', discription:'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.', telega:'https://t.me/megahendsupport', number:'+79991726381', mail:'stp1@mhand.ru'}
		],
		departs2:Proxy,
		dialogTaskControl:false,
	}),
	computed:{
		...mapGetters(["departs", "user", "userCrm", "users"]),
		checkTheme(){
			if (this.$waveui.theme === 'dark'){
				this.tabTheme = 'nocturnal'
			}else{
				this.tabTheme = 'default'
			}
		},


	},
	async mounted(){

		console.log(this.$waveui.theme)
		console.log("Users", this.users)
		this.tabTheme = localStorage.tableTheme
		setInterval(()=>{
			if (this.$waveui.theme === 'dark'){
				this.tabTheme = 'nocturnal'
			}else{
				this.tabTheme = 'default'
			}
		},1000)
		console.log(localStorage.mail)
		this.userLoad = await this.getUser(localStorage.mail)
		console.log(this.user._id)
		console.log(this.user)
		//await this.getActiveTask()
		await this.loadTask()

		this.departs2 =  await this.getDeparts()
		await this.getUserCrm(this.user._id)
		console.log('Ebalo' , this.userCrm)
		await this.getControlTask()
		this.changeTime()

	},
	methods:{
		...mapActions(['getUser', "getDeparts", "getUserCrm", "getUsers"]),
		async getActiveTask(){
			let id = this.user._id
			let resp = await fetch(process.env.VUE_APP_BACK_HTTP+"crm/getTaskActive/"+id)
			if(resp.status == 200){
				let data = await resp.json()
				this.tabs[0].data = data
				console.log(data)
			}else{
				this.tabs[0].data = []
				console.log('Не нашел задачи')
			}
		},
		async getWaitingTask(){
			let id = this.user._id
			let resp = await fetch(process.env.VUE_APP_BACK_HTTP+"crm/getTaskWaiting/"+id)
			if(resp.status == 200){
				let data = await resp.json()
				this.tabs[1].data = data
				console.log(data)
			}else{
				this.tabs[1].data = []
				console.log('Не нашел задачи')
			}
		},
		async getDoneTask(){
			let id = this.user._id
			let resp = await fetch(process.env.VUE_APP_BACK_HTTP+"crm/getTaskDone/"+id)
			if(resp.status == 200){
				let data = await resp.json()
				this.tabs[2].data = data
				console.log(data)
			}else{
				this.tabs[2].data = []
				console.log('Не нашел задачи')
			}
		},
		async getGoneTask(){
			let id = this.user._id
			let resp = await fetch(process.env.VUE_APP_BACK_HTTP+"crm/getTaskGone/"+id)
			if(resp.status == 200){
				let data = await resp.json()
				this.tabs[3].data = data
				console.log(data)
			}else{
				this.tabs[3].data = []
				console.log('Не нашел задачи')
			}
		},
		async loadTask(){
			await this.getActiveTask()
			await this.getWaitingTask()
			await this.getDoneTask()
			await this.getGoneTask()
		},

		clickToLink(link){
			window.open(link,"_blanc")
		},
		changeTime(){
			for(let i =0; i<this.tabs[0].data.length; i++){
				this.tabs[0].data[i].startDate = new Date(this.tabs[0].data[i].startDate).toLocaleString().substr(0,10)
				this.tabs[0].data[i].deadline = new Date(this.tabs[0].data[i].deadline).toLocaleString().substr(0,10)
				/*for(let j=0; j<this.statuses.length; j++){
					if(this.tabs[0].data[i].status == this.statuses[j].value){
						//this.tabs[0].data[i].status = this.statuses[j].label
					}
				}*/
			}
			for (let i=0; i<this.tabsActive.length; i++){
				for(let j=0; i<this.tabsActive[i].data.length; j++){
					this.tabsActive[i].data[j].startDate = new Date(this.tabsActive[i].data[j].startDate).toLocaleString().substr(0,10)
					this.tabsActive[i].data[j].deadline = new Date(this.tabsActive[i].data[j].deadline).toLocaleString().substr(0,10)
				}
			}

		},
		onRowClick(params){
			this.selectIndex = params.row

			this.selectRow = Object.assign({}, this.selectIndex)
			this.dialogTask=true
			this.selectIndex = params.pageIndex
			console.log(this.selectRow)
			console.log(this.selectIndex)
		},
		onRowClickCheck(params){
			this.selectIndex = params.row
			this.selectRow = Object.assign({}, this.selectIndex)
			this.dialogTaskControl = true
			this.selectIndex = params.pageIndex
		},
		pushToList(){
			let index = this.selectRow.list.length +1
			this.selectRow.list.push({label:this.newListComponent, value:index})
			this.addToListDialog = false
			this.newListComponent = null
		},
		async getControlTask(){
			let id = this.user._id
			let name = this.userCrm.firstname + ' ' + this.userCrm.lastname
			let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/getControllerTask/'+id+'/'+this.userCrm.firstname+'/'+this.userCrm.lastname)
			this.tabsActive[0].data = []
			this.tabsActive[1].data = []
			this.tabsActive[2].data = []

			let data = await response.json()
			if (data !=[]){
				for(let i=0; i < data.length; i++){
					if (data[i].status == 'active'){
						this.tabsActive[0].data.push(data[i])
					}
					if(data[i].status == 'done'){
						this.tabsActive[1].data.push(data[i])
					}
					if(data[i].status == 'gone'){
						this.tabsActive[2].data.push(data[i])
					}
				}
			}
		},
		consoleLoggSelectedRow(){
			console.log(this.selectRow)
			console.log(this.selectIndex)
			this.tabs[0].data[this.selectIndex]= this.selectRow
			console.log(this.selectStatus)
			let idStatus = ''
			for (let i =0; i<this.statuses.length; i++){
				if(this.statuses[i].label==this.selectStatus){
					idStatus = this.statuses[i].value
				}else continue
			}
			this.tabs[0].data[this.selectIndex].status = idStatus
			this.tabs[0].data[this.selectIndex].nameStatus = this.selectStatus
		},
		rowStyleClassFn(row){
			let date = new Date()
			let dateArr = row.deadline.split('.')
			let dateDeadline = new Date(dateArr[2], dateArr[1]-1, dateArr[0])
			if(row.status === 'active'){
				if (dateDeadline> date){
					if(this.tabTheme == 'default'){
						return 'backTableGreen'
					}else{
						return 'backTableGreenDark'
					}

				}else{
					if(this.tabTheme != 'default'){
						return 'backTableRedDark'
					}else{
						return 'backTableRed'
					}
				}
			}

			//return row.progress > 50 ? 'red' : 'green'
		},
		async updateTask(task){
			let idStatus = ''
			for (let i =0; i<this.statuses.length; i++){
				if(this.statuses[i].label==this.selectStatus){
					idStatus = this.statuses[i].value
				}else continue
			}
			let resp = await fetch(process.env.VUE_APP_BACK_HTTP+"crm/updateTask/"+task._id, {
				method:"PATCH",
				headers:{
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					status:idStatus,
					notes:task.notes,
					progress:task.progress,
					nameStatus:this.selectStatus,
					list:task.list,
					selected:task.selected,
				})
			})
			if (resp.status == 200){
				alert('Задача обновлена')
				this.tabs[0].data = []
				this.tabs[1].data = []
				this.tabs[2].data = []
				this.tabs[3].data = []
				await this.loadTask()
				this.changeTime()
				location.reload()
				this.selectStatus = ''
				this.dialogTask = false
			}else{
				alert('Error')
			}
		},
		async deleteTask(id, row){
			let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/deleteTask',{
				method:'DELETE',
				headers:{
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body:JSON.stringify({
					id:id
				})
			})
			if (response.status == 200){
				this.deleteDialog =false
				this.dialogTaskControl =false
				let userTask = null
				for(let i = 0; i<this.users.length; i++){
					if(row.user == this.users[i].idProfile){
						userTask = this.users[i]
						console.log('userTask', userTask)
						if(userTask.tgChat){
							let message = 'Ваша задача: "'+this.selectRow.nameTask+'" - была удалена автором'
							let url = encodeURI('https://api.telegram.org/bot5058763471:AAE5IYPYmQJUOh4dr25_EZfngyUoQ1Ck1j0/sendmessage?chat_id='+userTask.tgChat+'&text='+message)
							let resp = fetch(url)
						}
						break
					}else continue
				}

				await this.getControlTask()
				await this.loadTask()
				this.changeTime()
				alert('Задача удалена')

			}else{
				alert('Что-то пошло не так')
			}
		}
	}
}
</script>
<style>
 .w-dialog{
	 backdrop-filter: blur(10px);
 }
 .vue-good-table{
 }
 .backTableGreen{
	 background-color: #d0fcd2;
	 border:2px solid rgba(79, 75, 75, 0.93);

 }

 .backTableRed{
	 background-color: #f6d8d4;
	 border:2px solid rgba(79, 75, 75, 0.93);
	 transition: all 2s;
 }

 .backTableGreenDark{
	 background-color: #2b562b;
	 border:2px solid rgba(166, 157, 157, 0.93);
 }
 .backTableRedDark{
	 background-color: #692316;
	 border:2px solid rgba(166, 157, 157, 0.93);
 }
 .navFull{

 }
 .navPhone{
	 display: none;
 }
 .drawer{
	 width: 100%;
	 border:solid 1px #dee2e0;
 }
 @media screen and (max-width: 768px){
	 .navFull{display: none}
	 .navPhone{display: inherit;}
 }
</style>