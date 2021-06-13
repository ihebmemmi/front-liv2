<template>
  <q-page class="q-pa-md" :style="styles">
   <div class="flex flex-center">
   <base-card>
    <q-btn
    no-caps
    :class="assignedButtonMode"
    @click="setSelectedTab('assigned')">
     {{ $t('assigned') }}
    </q-btn>
    <q-btn
    no-caps
    :class="completedButtonMode"
    @click="setSelectedTab('completed')" >
     {{ $t('completed') }}
    </q-btn>
    </base-card>
   </div>
  <keep-alive>
    <component :is="selectedTab" :dark="dark"></component>
  </keep-alive>
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
      selectedTab: 'assigned',
      dark:null
      };
  },
   methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    }
  },
  computed: {
    assignedButtonMode() {
      return this.selectedTab === 'assigned' ? null : 'flat';
    },
    completedButtonMode() {
      return this.selectedTab === 'completed' ? null : 'flat';
    },
    styles () {
      if (this.dark) {
        return { 'background-color': '#171F24' }
      }
      return {'background-color': 'white'}
    },
  },
  components: {
			'base-button' : require('components/UI/BaseButton.vue').default,
      'base-card' : require('components/UI/BaseCard.vue').default,
      'assigned' : require('src/components/Assigned.vue').default,
      'completed' : require('src/components/Completed.vue').default
		}
}
</script>
<style scoped>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #0d1647;
  border: 1px solid #0d1647;
  color: antiquewhite;
  cursor: pointer;
  font-family: monospace;
  font-size: 11px;
  font-weight: bold;
}

button:hover,
button:active {
  background-color: #0d1647;
  border-color: antiquewhite;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.flat:hover,
.flat:active {
  background-color: #edd2ff;
}
.flat.body--dark{
  color:antiquewhite;
}
#btn{
  margin-right:100px;
}
/*body.body--dark {
  background: rgb(26, 74, 122)
}*/
</style>
