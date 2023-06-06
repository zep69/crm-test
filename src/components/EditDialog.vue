<template>
	<w-flex column justify-center align-center>
		<div style="display: flex; justify-content: space-around ">
			<w-input type="text"  label="Имя" v-model="profileData.firstname" outline></w-input>
			<w-input class="ml2" label="Фамилия" type="text" v-model="profileData.lastname"  outline></w-input>
		</div>
		<div style="display: flex; justify-content: center; margin-top: 4px;">
			<w-input label="E-mail" type="text" v-model="profileData.workMail" outline></w-input>
			<w-input class="ml2" label="Номер телефона" type="number" v-model="profileData.workPhone" outline></w-input>
		</div>
		<div class="mt2">
			<w-input label="Должность" type="text" v-model="profileData.jobTitle" outline></w-input>
		</div>
		<div class="mt2 box" >
			<img  :src="profileData.linkAvatar" >
			<input type="file" size="100" accept="image/*" style="z-index: 2; height: 100%;  position: relative; opacity: 0" @change="uploadFile" >
		</div>

	</w-flex>
	<div style="display: flex; justify-content: end; margin-top: 9px;">
		<w-button class="success--bg" @click="sendPrikoles">Подтвердить</w-button>
	</div>

</template>

<script>
export default {
	name: "EditDialog",
	props:{
		profile:{
			type:Object,
			default(){
				return Object()
			}
		},
		sendPrikols:{
			type:Function
		}
	},
	data:()=>({
		profileData:{},
		file:null,
		linkAvatarS3:null
	}),
 	mounted() {
		this.profileData = this.profile
		console.log('Eto props', this.profileData)
	},
	methods:{
		async pushUpdates(){
			console.log(this.profileData)
		},
		async sendPrikoles(){
			if(this.file != null){
				await this.getFormData(this.file)
				let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/updateProfileSimply',{
					method:'PATCH',
					headers:{
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						_id:this.profileData._id,
						firstname:this.profileData.firstname,
						lastname:this.profileData.lastname,
						birthday:this.profileData.birthday,
						linkAvatar:this.linkAvatarS3,
						workPhone:this.profileData.workPhone,
						workMail:this.profileData.workMail,
						jobTitle:this.profileData.jobTitle,
					})
				})
				if(response.status == 200){
					alert('Профиль обновлен')
					this.sendPrikols({
						profile:false
					})
				}else{
					alert('Ошибка')
				}
			}else{
				let response = await fetch(process.env.VUE_APP_BACK_HTTP+'crm/updateProfileSimply',{
					method:'PATCH',
					headers:{
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						_id:this.profileData._id,
						firstname:this.profileData.firstname,
						lastname:this.profileData.lastname,
						birthday:this.profileData.birthday,
						linkAvatar:this.profileData.linkAvatar,
						workPhone:this.profileData.workPhone,
						workMail:this.profileData.workMail,
						jobTitle:this.profileData.jobTitle,
					})
				})
				if (response.status == 200){
					alert('Профиль обновлен без аватара')
					this.sendPrikols({
						profile:false
					})
				} else{
					alert('Ошибка 123')
				}
			}

		},
		async getFormData(file){
			let formData = new FormData()
			formData.append('file', file)
			let request = await fetch(process.env.VUE_APP_BACK_HTTP+'query/test/file',{
				method: 'POST',
				body:formData
			})
			if (request.status === 200){
				alert('Отправилось')
				let data = await request.json()
				console.log(data.link)
				this.linkAvatarS3 = data.link
				console.log('Link', this.linkAvatarS3)
			}else alert('Ошибка')
		},
		uploadFile(e){
			const file = e.target.files[0]
			this.file = e.target.files[0]
			console.log(this.file)
			this.profileData.linkAvatar = URL.createObjectURL(file)
		}
	}
}
</script>

<style scoped>
.box {
	position: relative;
	overflow:hidden;
	width:240px;
	height:240px;
	border:solid 2px;
	border-radius:10rem;
}
.box img {
	position: absolute;
	top:50%;
	left:50%;
	-webkit-transform:translate(-50%,-50%);
	-ms-transform:translate(-50%,-50%);
	transform:translate(-50%,-50%);
	width:240px;
	height:240px;
	-o-object-fit:cover;
	object-fit:cover;
}

.box::before{
	content: "Сменить фото";
	display: block;
	color: #e4e4e4;
	margin-top: 80%;
	justify-content:center;
	align-content: center;
	position: absolute;
	top: 0; right: 0; bottom: 0; left: 0;
	inset: 0 0 0 0;
	background: hsl(202, 10%, 21%);
	z-index: 1;
	opacity:70%;
	transition: transform .3s ease;
}
.box:hover:before{
	transform: scaleY(1);
	transform-origin: bottom ;
}
.box::before{
	transform: scaleY(0);
	transform-origin: bottom ;
}

</style>