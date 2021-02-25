<template>
  <section class="background">
    <section class="overlay">
      <div class="text">
        <h1>Welcome to Meetup!</h1>
        <p>
          By Signing up/Logging in below, you can view and review your events
        </p>
      </div>
      <span
        v-if="
          messages.errorMessage !== undefined || messages.errorMessage !== ''
        "
        class="notValid"
        >{{ messages.errorMessage }}</span
      >
      <div class="inputs">
        <label for="name-input" class="labels"
          >Namn
          <span v-if="!validate.name" class="notValid">{{
            messages.nameMessage
          }}</span>
        </label>
        <input
          v-model="userData.name"
          type="text"
          id="name-input"
          @input="validateName"
        />
        <label for="email-input" class="labels"
          >Epost
          <span v-if="!validate.email" class="notValid">{{
            messages.emailMessage
          }}</span>
        </label>
        <input
          v-model="userData.email"
          type="text"
          id="email-input"
          @input="validateEmail"
        />
        <div class="radio">
          <input v-model="checked" type="checkbox" id="gdpr" class="checkbox" />
          <label for="gdpr">GDPR Ok!</label>
        </div>
      </div>
      <button
        :class="!checked ? 'orderButtonEmpty' : 'orderButton'"
        :disabled="!checked"
        @click="createUser(userData)"
      >
        Sign in!
      </button>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        name: "",
        email: "",
      },
      messages: {
        nameMessage: "",
        emailMessage: "",
        errorMessage: "",
      },
      validate: {
        name: false,
        email: false,
      },
      checked: false,
    };
  },
  methods: {
    validateName() {
      let name = document.getElementById("name-input").value;

      if (name != null && name != "") {
        this.validate.name = true;
        this.messages.name = "";
      } else {
        this.validate.name = false;
        return (this.messages.nameMessage = "Name cannot be empty");
      }
    },
    validateEmail() {
      let email = document.getElementById("email-input").value;

      if (email != null && email != "") {
        this.validate.email = true;
        this.messages.email = "";
      } else {
        this.validate.email = false;
        return (this.messages.emailMessage = "email cannot be empty");
      }
    },
    createUser(userData) {
      this.validateName();
      this.validateEmail();
      if (this.validate.name == true && this.validate.email == true) {
        this.$store.dispatch("createUser", userData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.background {
  background: transparent;
    overflow-y: auto;
  overflow-x: auto;
  margin-top: 3%;

}
.overlay {
  height: 85%;
  left: 17px;
  background: #f3e4e1;
  color: #2f2926;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
}
.text,
.inputs {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 80%;

  h1 {
    font-size: 2rem;
    text-align: center;
    width: 20rem;
    font-family: "PT Serif", serif;
    line-height: 120%;
    font-weight: 900;
  }
  p {
    width: 19rem;
    text-align: center;
    font-family: "Work Sans", sans-serif;
    font-size: 1rem;
  }
}
#name-input,
#email-input {
  width: 310px;
  height: 48px;
  border: 1px solid #2f2926;
  box-sizing: border-box;
  border-radius: 6px;
  margin-bottom: 1rem;
  background: transparent;
  outline: none;
}
#name-input[type="text"],
#email-input[type="text"] {
  font-size: 1rem;
  font-family: "Work Sans", sans-serif;
  color: #2f2926;
  padding-left: 1rem;
}

.labels {
  width: 310px;
  font-size: 0.8rem;
  font-family: "Work Sans", sans-serif;
  margin-bottom: 0.4rem;
}

.radio {
  width: 310px;
  font-family: "Work Sans", sans-serif;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
}
.checkbox {
  height: 1.1rem;
  width: 1.1rem;
  border: 1px solid black;
  border-radius: 50%;
  margin-right: 0.5rem;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
}
.checkbox:checked {
  background: #0e927d;
}

.orderButton,
.orderButtonEmpty {
  align-self: center;
}
.orderButton {
  grid-area: orderButton;
  width: 15.5rem;
  height: 3.5rem;
  justify-self: center;
  font-size: 1.5rem;
  color: white;
  background: #2f2926;
  border-radius: 3.1rem;
  font-weight: 900;
  font-family: "PT Serif", serif;
  border: none;
  outline: none;
}

.orderButtonEmpty {
  background-color: #e5674e;
  width: 15.5rem;
  height: 3.5rem;
  justify-self: center;
  font-size: 1.5rem;
  color: white;
  border-radius: 3.1rem;
  font-weight: 900;
  font-family: "PT Serif", serif;
  border: none;
  outline: none;
}

.notValid {
  color: red;
}
</style>
