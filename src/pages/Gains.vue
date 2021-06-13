<template>
  <q-page class="flex flex-center" :style="styles"  >
  <q-btn :label="$t('pick')"/> 
    <p>gains</p>
  </q-page>
</template>

<script>
export default {
  created() {
		this.dark = this.$q.dark.isActive;
	},
	watch: {
		'$q.dark.isActive' (val) {
			this.dark = val;
		}
	},
  data() {
    return {
      dark: null
      };
  },
  computed:{

  styles () {
      if (this.dark) {
        return { 'background-color': '#171F24' }
      }
      return {'background-color': 'white'}
    }
  }
  
}
</script>
.profilcard{
  display: block;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  height: fit-content;
  width: 100%;
  max-width: 350px
}
.text1 {
  color:#0d1647;
  font-family: monospace;
  font-size: 14px;
}

.text2 {
  font-family: monospace;
  font-size: 12px;
}
.image {
  max-width: 270px;
  border: 5px solid #0d1647;
}
span[class="text1"]{
  
}
.poseimg{
  position: absolute;
  top:0;
  right: 0px;
  width: 10px;
  height: 10px;
}