<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated >
      <q-toolbar  style="background: radial-gradient( circle farthest-corner at 16.5% 28.1%,  rgba(15,27,49,1) 0%, rgba(0,112,218,1) 90% )">

        <q-toolbar-title class="toolbar-title">
          Le Pressing
        </q-toolbar-title>
<q-item-label 
          	class="row justify-end"
          	>
           <span><b>{{ VilleClients[ass.client] }}</b></span>
            </q-item-label>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated style="background: radial-gradient( circle farthest-corner at 16.5% 28.1%,  rgba(15,27,49,1) 0%, rgba(0,112,218,1) 90% )">
      <q-tabs dense>
        <q-route-tab
          no-caps
          class="text"
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label" />
      </q-tabs>
    </q-footer>

   <!-- <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-primary"
      :breakpoint="767"
      :width="250"
      bordered
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>

        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-grey-4"
          exact
          clickable>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
        
      </q-list>
    </q-drawer> -->
  </q-layout>
</template>

<script>
  import { openURL } from 'quasar'

  export default {
    name: 'MyLayout',
    data () {
      return {
        leftDrawerOpen: this.$q.platform.is.desktop,
        navs: [
          {
            label: 'Index',
            icon: 'list',
            to: '/index'
          },
          {
            label: 'Settings',
            icon: 'settings',
            to: '/settings'
          },
          {
            label: 'Gains',
            icon: 'attach_money',
            to: '/gains'
          },
          {
            label: 'Profile',
            icon: 'account_circle',
            to: '/profile'
          }
        ]
      }
    },
    methods: {
      openURL
    }
  }
</script>

<style lang="scss">
@media only screen and (max-width: 200px) {
    footer {
      display:none;
    }
  }
  
  
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
  .toolbar-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 19px;
  letter-spacing: 2px;
  font-weight: bold;
  color:antiquewhite;
}
.text{
  color:antiquewhite;
}
</style>
