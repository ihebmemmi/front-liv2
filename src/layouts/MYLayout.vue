<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background: transparent radial-gradient( circle farthest-corner at 16.5% 28.1%,  rgba(15,27,49,1) 0%, rgba(0,112,218,1) 90% )" >
        <q-toolbar-title>
          <div class="toolbar-title">Le Pressing</div>
        </q-toolbar-title>
        <q-toggle   
        v-model="dark"
        keep-color
        checked-icon="fas fa-moon"
        color="cyan"
        unchecked-icon="fas fa-sun"
        @input="changeDarkMode"
      />
        <q-btn flat @click="promptLogout()" round class="btn">
          <q-avatar size="40px">
            <i class="fas fa-sign-out-alt"></i>
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
     <q-footer class="absolute-bottom" reveal elevated style="background: radial-gradient( circle farthest-corner at 16.5% 28.1%,  rgba(15,27,49,1) 0%, rgba(0,112,218,1) 90% )">
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
  </q-layout>
</template>

<script>
  import { openURL } from 'quasar'

  export default {
    name: 'MyLayout',
    created() {
		this.dark = this.$q.dark.isActive;
    //this.dark = this.$q.localStorage.getItem("dark");
	    },
	  watch: {
		'$q.dark.isActive' (val) {
			this.dark = val;
		  }
	  },
    data () {
      return {
        dark: null,
        //leftDrawerOpen: this.$q.platform.is.desktop,
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
            label: 'Profil',
            icon: 'account_circle',
            to: '/profile'
          }
        ]
      }
    },
    methods: {
      openURL,
      logUserOut() {
      localStorage.removeItem("token");
      this.$router.push("/login");
      this.$hello('facebook').logout().then(function() {
	    alert('Signed out');
            },
      function(e) { 
	    alert('Signed out error: ' + e.error.message);
              });
    },
    promptLogout() {
        this.$q.dialog({
          title: this.$t('confirm'),
          message: this.$t('logout'),
          ok: {
            push: true
          },
          cancel: {
            color: 'negative'
          },
          persistent: true
        }).onOk(() => {
          this.logUserOut();
        })
      },
    changeDarkMode(value) {
			this.dark = value;
			this.$q.dark.set(value);
      this.$q.localStorage.set("dark", this.dark);
		}
    }
  }
</script>

<style scoped>
.toolbar-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 19px;
  letter-spacing: 2px;
  font-weight: bold;
  color:antiquewhite;
}
.q-layout {
  background-color:antiquewhite;
}

.text{
  color:antiquewhite;
}
.btn{
  color:antiquewhite;
}
</style>
