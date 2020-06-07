<template>
  <div>
    {{ step }}
    <div class="step-1">
      <h1>Donate</h1>
      <p>Thank you for donating!</p>
      <form class="space-y-2" @submit.prevent="next">
        <div>
          <label class="block leading-normal" for="name">Name: </label>
          <input
            id="name"
            v-model="form.name"
            class="bg-gray-800 rounded border border-gray-700 shadow"
            type="text"
            name="name"
          />
        </div>
        <div>
          <label class="block leading-normal" for="email"
            >Email address:
          </label>
          <input
            id="email"
            v-model="form.email"
            class="bg-gray-800 rounded border border-gray-700 shadow"
            type="email"
            name="email"
          />
        </div>
        <div>
          <label class="block leading-normal" for="amount">Amount: </label>
          <input
            id="amount"
            v-model="form.amount"
            class="bg-gray-800 rounded border border-gray-700 shadow"
            type="number"
            name="amount"
            min="10"
          />
        </div>
        <div>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
    <div class="step-2">
      <h1>Complete your donation</h1>
      <p>
        Thank you, {{ form.name }}, for your generosity! Please enter your
        payment details below to complete your donation.
      </p>
      <form id="card">
        <div>
          <label for="cardholder-name">Cardholder name: </label>
          <input
            id="cardholder-name"
            v-model="form.name"
            type="text"
            name="cardholder-name"
          />
        </div>
        <div>
          <label for="card-element">Credit or debit card:</label>
          <div id="card-element"></div>
        </div>
        <div id="card-errors"></div>
        <div>
          <button id="card-button" :type="submit">
            Donate {{ form.amount }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        amount: '',
        intentSecret: ''
      },
      step: 0
    }
  },
  methods: {
    next() {
      this.step = 1
    },
    submit() {
      console.log(this.form)
    }
  }
}
</script>

<style></style>
