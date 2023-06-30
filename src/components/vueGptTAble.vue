<template>
	<table class="my-table">
		<thead>
		<tr>
			<th>Заголовок 1</th>
			<th>Заголовок 2</th>
			<th>Заголовок 3</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="(item, index) in tableData" :key="index">
			<td>{{ item.column1 }}</td>
			<td>{{ item.column2 }}</td>
			<td>{{ item.column3 }}</td>
		</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name:'vueGptTable',
	data() {
		return {
			tableData: [
				{ column1: "Значение 1", column2: "Значение 2", column3: "Значение 3" },
				{ column1: "Значение 4", column2: "Значение 5", column3: "Значение 6" },
				{ column1: "Значение 7", column2: "Значение 8", column3: "Значение 9" },
			],
		};
	},
};
</script>

<style>
.my-table {
	width: 100%;
	border-collapse: collapse;
}

.my-table th,
.my-table td {
	padding: 10px;
	border: 1px solid #ccc;
}

.my-table th {
	background-color: #f2f2f2;
	font-weight: bold;
}

.my-table tbody tr:nth-child(even) {
	background-color: #f9f9f9;
}

.my-table tbody tr:hover {
	background-color: #ebebeb;
}

.my-table td {
	text-align: center;
}
</style>
