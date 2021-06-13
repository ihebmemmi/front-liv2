<template>
  <q-page class="flex flex-center" :style="styles"  >
  <q-btn :label="$t('pick')"/> 
    <p>infos</p>

  </q-page>
</template>

<script>
export default {
  props: ["assignments"],
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
