<template>
 <body >
  <div class="q-pa-sm">
    <q-form @submit="Login" @reset="onReset">
      <br />
      <br />
      <div class="titre">
        Se Connecter !
      </div>
      <br />
      <div class="form-control">
        <q-input
          dark
          rounded
          outlined
          type="email"
          v-model="login.email"
          label="Email"
          hint="Email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Champ vide * ']"
        />
      </div>
      <div class="form-control">
        <q-input
          dark
          rounded
          outlined
          :type="isPwd ? 'password' : 'text'"
          v-model="login.password"
          hint="Mot de passe"
          label="Mot de passe"
          lazy-rules
          :rules="[val => (val !== null && val !== '') || 'Champ vide * ']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>

      <br />
      <div class="">
        <div class="flex flex-center">
          <q-btn
            label="Connecter"
            type="submit"
            icon-right="login"
            no-caps
            rounded
            class="butcol"
          />
          <q-space/>
          <q-btn
            no-caps
            label="Réinitialiser"
            type="reset"
            rounded
            icon-right="cancel"
            color="negative"
            flat
          /> 
        </div>
      </div>
    </q-form>
  </div>
 </body>
</template>

<script>
export default {
  data() {
    return {
      isPwd: true,
      login: {
      email: null,
      password: null
      }

      // accept: false
    };
  },

  methods: {
    async Login() {
      // if (login.email === null || login.password === null) {
      //   return (
      //     this.$q.notify({
      //       color: "red",
      //       message: "Veuillez remplir tout les champs"
      //     }),
      //     this.$router.push("/register")
      //   );
      // } else {
      try {
        let res = await this.$axios.post(`/livreur/login`, this.login);
        let token = res.data.token;
        localStorage.setItem("token", token);
        if (token) {
          console.log("acces, token: ", token);
          return (
            this.$q.notify({
              color: "warning",
              message: "Connexion avec succés"
            }),
            this.$router.push("/index")
          );
        }
      } catch (err) {
        console.log("failed", err.res);
        return this.$q.notify({
          color: "red",
          message: "Vérifiez vos données"
        });
      }
      // if (res) {
      //   console.log("acces");
      //   this.$router.push("/");
      // } else {
      //   console.log("failed");
      // }
      // if (this.accept !== true) {
      //   this.$q.notify({
      //     color: "red-5",
      //     textColor: "white",
      //     icon: "warning",
      //     message: "You need to accept the license and terms first"
      //   });
      // } else {
      //   this.$q.notify({
      //     color: "green-4",
      //     textColor: "white",
      //     icon: "cloud_done",
      //     message: "Submitted"
      //   });
      // }
    },

    onReset() {
      this.login.email = null;
      this.login.password = null;
      // this.accept = false;
    }
    

  }
    
};
</script>

<style scoped>
body:before {
    content: '';
	position: fixed;
	width: 100vw;
	height: 100vh;
  background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url("~assets/laundry-saloon-567951_1920.jpg");
	background-position: center;
	background-position: center center;
	background-repeat: no-repeat;
	background-attachment: fixed;
	-webkit-background-size: cover;
	background-size: cover;
	-webkit-filter: blur(2px);
	-moz-filter: blur(2px);
	filter: blur(2px);
}
form {
  margin: 5rem auto;
  max-width: 350px;
  border-radius: 50px;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
}
.form-control {
  margin: 0.5rem 0;
}

.butcol {
  color:black;
  background-color:antiquewhite;
}
.butcol:hover{
  background:antiquewhite;
  opacity: 0.6;

}
.align {
  display: flex;
  align-items: center;
  justify-content: center;
}
.titre {
  color:antiquewhite;
  font-weight: bold;
  font-style: italic;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-family: "Courier New", Courier, monospace;
}
.btnFacebook{
  border-radius: 4px;
  background: #395697;
  color:antiquewhite;
  border:0px transparent;  
  text-align: center;
  margin:5px;
  display: inline-block;
}
.btnFacebook:hover{
        color:antiquewhite;
        background: #395697;
        opacity: 0.6;
        
    }
.bruh{
  z-index: 1;
}
</style>
