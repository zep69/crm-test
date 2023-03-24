<template>
	<w-toolbar style="max-height: 3rem">
		<w-button icon="" bg-color="inherit" @click=""><img src="https://s3.timeweb.com/cd58536-mhand-bucket/crm/logo.svg" alt="" height="32"></w-button>
		<w-button text @click="$router.push('/panel/profile'); infoPanel=false">Профиль</w-button>
		<w-button text @click="$router.push('/panel/about'); infoPanel=false">Главная</w-button>

		<div class="spacer"></div>
		<w-switch v-model="theme" class="ma4" @click="checkTheme(theme)">
			<template #thumb>
				<w-icon>
					{{ theme ? 'mdi mdi-weather-night' : 'mdi mdi-white-balance-sunny' }}
				</w-icon>
			</template>
		</w-switch>
		<w-button bg-color="inherit" xl icon="mdi mdi-logout" @click="logout"></w-button>
	</w-toolbar>
	<main >

		<div v-if="infoPanel">
			<div style="display: block; justify-content: start; margin-top: 2rem">
				<img src="../../../src/assets/logotype2.png"	/>
				<h1 class="primary">Привет! Это новый проект компании МегаХенд, аналог Битрикс24</h1>
				<h2 class="primary">Он еще находится в разарботке, но тут вскоре появится много функций</h2>
				<h2 class="primary">Нужно просто подождать :)</h2>
			</div>
			<div style="display: block; justify-content: start; margin-top: 2rem">
				<h3 class="primary">Какой функционал будет реализован</h3>
				<div v-for="item in itemProgress">
					<w-checkbox disabled :label="item.name" v-model="item.action"></w-checkbox>
				</div>
			</div>


		</div>

		<router-view/>
	</main>
</template>

<script>


export default {
	data:()=>({
		theme:false,
		infoPanel:true,
		openDrawer:false,
		items:[
			{label:'Home', route:"/"},
			{label: 'About', route:"/about"}
		],
		itemProgress:[
			{name:'Постановка задач', action:false},
			{name:'Топология компании', action:false},
			{name:'Заявки магазинов', action:false},
			{name:'Планировка задач и рабочего времени', action:false}
				],
		selected:null,
	}),
	computed:{

	},
	mounted() {
	},
	methods:{
		checkTheme(theme){
			if(theme === true ){
				this.$waveui.switchTheme('dark')
				localStorage.tableTheme = 'nocturnal'
			}else{
				this.$waveui.switchTheme('light')
				localStorage.tableTheme = 'default'
			}
		},
		logout(){
			localStorage.removeItem("token");
			this.$router.push("/login");
		}
	}
}
</script>
