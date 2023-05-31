<template>
 <div class="cardSimple white--bg" :style="{width:$props.width+'rem'}">
	 <div style="padding: 1rem; display: flex; justify-content: start; border-bottom: solid 0.1rem">
		 <slot name="header">

		 </slot>
	 </div>

	 <div class="cardContent">
		 <slot name="default">

		 </slot>
	 </div>

	 <slot name="actions">

	 </slot>
 </div>
</template>

<script>
export default {
	name: "CardSimple",
	props:{
		width:{
			type:Number,
			default(){
				return 20
			}
		}
	}
}
</script>

<style scoped>
 .cardSimple{
	 border: grey solid 0.1rem;
	 border-radius: 2rem;
	 height:5rem;
	 transition: height 2s;
 }
 .cardSimple:hover{
	 height: 300px;
 }

 /*.cardSimple:hover{
	 transform:scale(2);
 }
 .cardSimple:active{
	 transform: scaleX(1.3) scaleY(3);
 }*/
 /*.cardSimple{
	 transform: scale(1.3);
 }*/
</style>