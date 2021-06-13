<template>
  <q-page class="flex flex-center" :style="styles"  >
  <q-btn :label="$t('pick')"/> 
    <p>completed</p>
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
