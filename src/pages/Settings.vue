<template>
<q-page class="q-pa-md" :style="styles">
  <q-select
    v-model="lang"
    :options="langOptions"
    label="Language"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />

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
		},
     lang(lang) {
      this.$i18n.locale = lang
    }
	},
  data() {
    return {
      dark: null,
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'fr', label: 'Français' },
      ]
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
