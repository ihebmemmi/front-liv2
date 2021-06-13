<template>
 <body >
  <div class="q-pa-sm">
    <q-form @submit.prevent="registerUser">
      <q-img style="max-width:55px" src="~assets/rrrr.png" />
      <br />
      <div class="titre">
        Créer votre compte ici !
      </div>
      <br />
      <br />

      <div class="form-control">
        <q-input
          dark
          rounded
          outlined
          v-model="register.nom"
          label="Nom"
          hint="Entrez votre nom de famille"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Champ vide * ']"
        />
      </div>
      <div class="form-control">
        <q-input
          dark
          rounded
          outlined
          v-model="register.prenom"
          label="Prénom"
          hint="Entrer votre prénom"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Champ vide * ']"
        />
      </div>

      <div class="form-control">
        <q-input
          dark
          rounded
          outlined
          type="email"
          v-model="register.email"
          label="Email"
          hint="Entrez votre Email"
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
          v-model="register.password"
          hint="Mot de passe"
          label="*****************"
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
      <div class="form-control">
        <q-input
          dark
          rounded
          outlined
          :type="isPwd2 ? 'password' : 'text'"
          v-model="confirmPassword"
          hint="Confirmer votre mot de passe"
          label="*****************"
          lazy-rules
          :rules="[
            val =>
              (val !== null && val !== '') ||
              'Veuillez confirmer votre mot de passe'
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
            />
          </template>
        </q-input>
      </div>
      <br />
      <div class="align">
        <q-btn
          no-caps
          class="butcol"
          label="S'inscrire"
          icon-right="login"
          type="submit"
          @click="registerUser()"
          rounded
        />
        <q-btn
          no-caps
          type="reset"
          @click="onReset()"
          label="Réinitialiser"
          icon-right="cancel"
          color="negative"
          rounded
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
 </body>
</template>

<script>
export default {
  name: "RegisterUser",

  data() {
    return {
      isPwd2: true,

      isPwd: true,
      register: {
        prenom: null,
        nom: null,
        password: null,
        email: null
      },
      confirmPassword: null
      //accept: false
    };
  },
  methods: {
    onReset() {
      this.register.prenom = null;
      this.register.nom = null;
      this.register.password = null;
      this.register.email = null;
      this.confirmPassword = null;
    },
    async registerUser() {
      if (
        this.confirmPassword === "" ||
        this.register.password === null ||
        this.register.nom === null ||
        this.register.email === null ||
        this.register.prenom === null
      ) {
        return this.$q.notify({
          color: "negative",
          message: "Veuillez remplir tout les champs"
        });
      } else if (this.register.password != this.confirmPassword) {
        return this.$q.notify({
          color: "negative",
          message: "Confirmez votre mot de passe"
        });
      } else if (this.register.password === this.confirmPassword) {
        try {
          let response = await this.$axios.post(
            "/livreur/register",
            this.register
          );
          console.log(response);
          // let token = response.data.token;
          // if (token) {
          //   localStorage.setItem("jwt", token);
          //this.$router.push("/");
          console.log("succes");
          return (
            this.$q.notify({
              color: "warning",
              message: "Succes, utilisateur crée"
            }),
            this.$router.push("/login")
          );
        } catch {
          return this.$q.notify({
            color: "negative",
            message: "Email deja utilisé"
          });
        }
      }
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
  max-width: 350rem;
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
</style>
