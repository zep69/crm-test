<template>
	<w-toolbar style="max-height: 3rem">
		<w-button icon="" bg-color="inherit" @click="openDrawer=!openDrawer"><img src="https://s3.timeweb.com/cd58536-mhand-bucket/crm/logo.svg" alt="" height="32"></w-button>
		<w-button text @click="$router.push('/panel')">Home</w-button>
		<w-button text @click="$router.push('/panel/about')">About</w-button>

		<div class="spacer"></div>
		<w-button bg-color="inherit" xl icon="mdi mdi-logout" @click="logout"></w-button>
	</w-toolbar>
	<main >
		<w-drawer style="margin-top: 3rem" v-model="openDrawer" left absolute width="220px">
			<!-- <w-list
					v-model="selected"
					:items="items"
					color="blue"
					@item-click="$router.push({path:items[selected-1].route})"
			>

			</w-list> -->

			<w-flex column>
				<div style="display: flex;justify-items: start;margin-left: 1rem" v-for="item in items" :key="item.label">
					<w-button class="mt2"	text @click="$router.push(item.route)">{{item.label}}</w-button>
				</div>

			</w-flex>

		</w-drawer>
		<router-view/>
	</main>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
	data:()=>({
		openDrawer:false,
		items:[
			{label:'Home', route:"/"},
			{label: 'About', route:"/about"}
		],
		selected:null,
	}),
	methods:{
		logout(){
			localStorage.removeItem("token");
			this.$router.push("/login");
		}
	}
}
</script>
