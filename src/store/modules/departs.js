const DEPARTS_URL = process.env.VUE_APP_BACK_HTTP+'crm/getDerapts'
const FIND_USER_ID = process.env.VUE_APP_BACK_HTTP+'crm/getProfileId/'
const GET_USERS = process.env.VUE_APP_BACK_HTTP+'crm/getUsers'
const GET_USER_CRM = process.env.VUE_APP_BACK_HTTP+'crm/getProfile/'
export default {

	actions: {

		async getDeparts(ctx) {
			const resp = await fetch(DEPARTS_URL,{
				method : 'GET',
				headers:{
					'Content-Type': 'application/json;charset=utf-8'
				}
			})
			const result = await resp.json()
			console.log(result)
			return result
			ctx.commit('setDeparts', result)
		},
		async getUser(ctx, mail){
			let resp = await fetch(FIND_USER_ID+mail)
			let result = await resp.json()
			ctx.commit('setUser', result)
			return result
		},
		async getUsers(ctx){
			let resp = await fetch(GET_USERS)
			let data = await resp.json()
			ctx.commit('setUsers', data)
		},
		async getUserCrm(ctx, id){
			let resp = await fetch(GET_USER_CRM+id)
			let data = await resp.json()
			ctx.commit('setUserCrm', data)
		}

	},
	mutations: {
		setDeparts(state, result) {
			state.departs = result
		},
		setUser(state, user){
			state.user = user

			//
		},
		setUsers(state,users){
			state.users = users
		},
		setUserCrm(state,userCrm){
			state.userCrm = userCrm
		}
	},
	state: {
		departs: [],
		user :null,
		users:[],
		userCrm:null
	},



	getters: {
		departs: s => s.departs,
		user: s => s.user,
		users: s => s.users,
		userCrm: s => s.userCrm
	}
}