<template>
	<div class="rowStyle">
		<h3>Ответственный:</h3>
		<span class="primary">{{$props.task.userName}}</span>
	</div>
	<div class="rowStyle">
		<h3>Задача:</h3>
		<span class="primary">{{ $props.task.nameTask }}</span>
	</div>
	<div class="rowStyle">
		<h3>Описание задачи:</h3>
		<span class="primary">{{ $props.task.discriptionTask }} </span>
	</div>
	<div class="rowStyle">
		<h3>Статус:</h3>
		<span class="primary">{{ $props.task.nameStatus }}</span>
	</div>

	<w-divider class="mt2"></w-divider>

	<w-card>
		<template #title>
			<h3>Ход выполнения</h3>
		</template>
		<template #default>
			<div style="display: flex; justify-content: center; margin-top: 1rem;">
				<w-card readonly>
					<template #title>
						<span>Check-list</span>
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
						<span>%Done task</span>
					</template>
					<template #default>
						<div style="display: flex ; justify-content: center; align-content: center">
							<w-progress size="8em" color="blue" :stroke="8" circle v-model="$props.task.progress">
								<strong>{{$props.task.progress}}%</strong>
							</w-progress>
						</div>
					</template>
				</w-card>
			</div>
		</template>
	</w-card>



</template>

<script>
export default {
	name: "DialogTask",
	props:{
		task:{
			value:Object,
			default(){
				return {}
			}
		}
	},
	data: ()=>({
		selected:[],
		progress:50,
		text:'dadadsasad mjadni abd akshdb habd sajhhdh kjksbd ksndk a',
		items: [
				{ label: 'Choice 1', value: 1 },
				{ label: 'Choice 2', value: 2 },
				{ label: 'Choice 3', value: 3 }
		]
	}),
	mounted() {

	},
	methods:{

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