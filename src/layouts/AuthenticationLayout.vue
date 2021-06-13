<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background: transparent radial-gradient( circle farthest-corner at 16.5% 28.1%,  rgba(15,27,49,1) 0%, rgba(0,112,218,1) 90% )" >
        <q-toolbar-title
          ><div class="toolbar-title">Le Pressing</div>
        </q-toolbar-title>

        <q-tabs dense  shrink>
        <q-route-tab no-caps name="Login" label="Login" to="/login" class="text"/>
        <q-route-tab no-caps name="Register" label="Register" to="/register" class="text"/>
      </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
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
a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  border-radius: max;
  padding: 1rem 1rem;
  display: inline-block;
}
a:hover,
a:active,
a.active,
a.router-link-active {
  font-weight: bold;
  color:antiquewhite;
  border-color:beige;
}
.text{
  color:antiquewhite;
}
</style>
