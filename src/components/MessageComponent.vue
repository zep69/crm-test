<template>
<div v-if="$props.type==true" style="display:flex">
	<div class="box">
		<img :src="$props.img" alt="">
	</div>
	<div style="display: block;">
		<div style="display: flex;margin-left: 15px; justify-content: start">
			<span>{{$props.name}}</span>
		</div>
		<div class="messageBody" style="background-color:#d9f6f2 ">
			<div style="display: flex; justify-content: start; padding: 4px">
				<span style="">{{$props.textMessage}}</span>
			</div>
			<div>
				<span style="font-size: 10px; display: flex; justify-content: end">
					{{dateFormated($props.date)}}
				</span>
			</div>

		</div>

	</div>

</div>


	<div v-if="$props.type==false" style="display:flex">

		<div style="display: block;">
			<div style="display: flex;margin-left: 15px; justify-content: end">
				<span>{{$props.name}}</span>
			</div>
			<div class="messageBody" style="background-color:#e9d9f6">
				<div style="display: flex; justify-content: end; padding: 4px">
					<span style="">{{$props.textMessage}}</span>
				</div>
				<div>
				<span style="font-size: 10px; display: flex; justify-content: start">
					{{dateFormated($props.date)}}
				</span>
				</div>

			</div>

		</div>
		<div style="margin-left:15px " class="box">
			<img :src="$props.img" alt="">
		</div>

	</div>


</template>

<script>
export default {
	name: "MessageComponent",

	props:{
		img:{
			type:String,
			default(){
				return 'https://s3.timeweb.com/cd58536-mhand-bucket/avatar/ea364c4e85a96a4fd0bff4110116881a.png'
			},

		},
		name:{
			type:String,
			default(){
				return 'User 123'
			}
		},
		textMessage:{
			type:String,
			default(){
				return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sed sem nec vulputate. Pellentesque sed pulvinar nulla, quis fermentum enim. Nam ultricies sed erat nec consequat. Quisque varius quam vel justo hendrerit suscipit. In consectetur eleifend nunc pellentesque tempus. Quisque dignissim risus odio, vel feugiat leo feugiat eu. Donec eleifend sem eu enim euismod, quis aliquet ipsum malesuada. Sed arcu neque, eleifend vel nisl eget, accumsan semper quam. Ut lacinia scelerisque augue eget posuere. Morbi sed posuere odio. Pellentesque imperdiet, libero vel vehicula venenatis, ipsum massa sagittis libero, sed sodales leo nisl et magna. '
			},
		},
		date:{
			type: Date,
			default(){
				return new Date()
			}
		},
		type:{
			type:Boolean,
			default(){
				return false
			}
		}
	},
	computed:{
		colorReturn(){
			if(this.$props.type == 'default'){
				return '#d9f6f2'
			}else {
				return '#e9d9f6'
			}
		}
	},
	mounted() {
	},
	methods:{
		dateFormated(date){
			let toFormated = new Date(date).toLocaleString().substr(0,17)
			return toFormated
		}
	}
}

</script>

<style scoped>
.box {
	position: relative;
	overflow:hidden;
	width:60px;
	height:60px;
	border:solid 2px;
	border-radius:30px;
}
.box img {
	position: absolute;
	top:50%;
	left:50%;
	-webkit-transform:translate(-50%,-50%);
	-ms-transform:translate(-50%,-50%);
	transform:translate(-50%,-50%);
	width:60px;
	height:60px;
	-o-object-fit:cover;
	object-fit:cover;
}
.messageBody{

	border-radius: 10px;
	margin-left: 10px;
	margin-top: 7px;
	width: 480px;
	padding: 4px;
	min-width: 75px;

	/*background-color: #e9d9f6;*/
}
@media screen and (max-width: 768px){
	.box{
		width:40px;
		height:40px;
		border:solid 1px;
		border-radius:20px;
	}
	.box img{
		width:40px;
		height:40px;
	}
	.messageBody{
		width: 280px;
	}
}
</style>