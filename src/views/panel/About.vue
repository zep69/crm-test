<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
	<w-flex wrap>
		<!--  -->
		<div class="xs3 pal pa2" >
			<w-card title="Hueta" style="border-radius: 1rem">
				<w-list :items="items" hover>
					<template #item="{ item }">
						<w-button text color="blue" @click="kaki=item.kaki">
							<w-icon class="mr1" md>{{item.icon}}</w-icon>
							{{item.label}}
						</w-button>
					</template>
				</w-list>
			</w-card>
		</div>
			<div class="xs9 pal pa2">
				<w-card title="Zalupen" v-if="kaki==='task'">
					<w-tabs :items="tabs"></w-tabs>
				</w-card>
			</div>


	</w-flex>
</template>

<script>
export default {
	data:()=>({
		tabs:[
			{title:'Gavno'},
			{title:'Jopa'},
			{title:'Mo4a'}
		],
		kaki:'task',
		items:[
			{label:'Задачи', icon:'mdi mdi-check', kaki:'task'},
			{label:'Заявки', icon:'mdi mdi-format-list-bulleted', kaki:'appl'},
			{label:'Какашки',icon:'mdi mdi-emoticon-poop', kaki:'da'},
		]
	})
}
</script>
