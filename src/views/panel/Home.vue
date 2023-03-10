<template>
	<w-toolbar style="max-height: 3rem">
		<w-button icon="" bg-color="inherit" @click=""><img src="https://s3.timeweb.com/cd58536-mhand-bucket/crm/logo.svg" alt="" height="32"></w-button>
		<w-button text @click="$router.push('/panel/profile')">Профиль</w-button>
		<w-button text @click="$router.push('/panel/about')">Главная</w-button>

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

		<router-view/>
	</main>
</template>

<script>


export default {
	data:()=>({
		theme:false,
		openDrawer:false,
		items:[
			{label:'Home', route:"/"},
			{label: 'About', route:"/about"}
		],
		selected:null,
	}),
	computed:{

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
