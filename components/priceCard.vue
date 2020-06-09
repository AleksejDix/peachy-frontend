<template>
  <div
    class="priceCard mt-10 pr-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4"
  >
    <div class="relative z-10 rounded-lg shadow-xl">
      <div
        class="pointer-events-none absolute inset-0 rounded-lg border-2 border-indigo-600"
      ></div>
      <div
        v-if="content.popular"
        class="absolute inset-x-0 top-0 transform translate-y-px"
      >
        <div class="flex justify-center transform -translate-y-1/2">
          <span
            class="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm leading-5 font-semibold tracking-wider uppercase text-white"
          >
            Most popular
          </span>
        </div>
      </div>
      <div class="bg-white rounded-t-lg px-6 pt-12 pb-10">
        <div>
          <h3
            id="tier-growth"
            class="text-center text-3xl leading-9 font-semibold text-gray-900 sm:-mx-6"
          >
            {{ content.title }}
          </h3>
          <div class="mt-4 flex items-center justify-center">
            <span
              class="px-3 flex items-start text-6xl leading-none tracking-tight text-gray-900 sm:text-6xl"
            >
              <span class="mt-2 mr-2 text-4xl font-medium">
                $
              </span>
              <span class="font-extrabold">
                {{ priceMethod.price }}
              </span>
            </span>
            <span class="text-2xl leading-8 font-medium text-gray-500">
              / {{ priceMethod.type }}
            </span>
          </div>
          <div
            class="relative mx-auto w-10 mt-2 select-none transition duration-200 ease-in"
          >
            <input
              id="toggle"
              v-model="checkbox"
              type="checkbox"
              name="toggle"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="toggle"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        </div>
      </div>
      <div
        class="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10"
      >
        <ul>
          <li
            v-for="tag in content.tags"
            :key="tag"
            class="flex mt-4 items-start"
          >
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p class="ml-3 text-base leading-6 font-medium text-gray-500">
              {{ tag }}
            </p>
          </li>
        </ul>
        <div class="mt-10">
          <form id="subscription-form" @submit.prevent="submit">
            <div id="card-element"></div>
            <div role="alert">{{ error }}</div>
            <button type="submit">Subscribe</button>
          </form>
          <div class="rounded-lg shadow-md">
            <a
              href="#"
              class="block w-full text-center rounded-lg border border-transparent bg-indigo-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150"
              aria-describedby="tier-growth"
            >
              Join Web Zurich
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: Function
    }
  },
  data() {
    return {
      priceId: 'price_1GqwinD0sFyJjJM7c3iEi4Z6',
      isStripeLoaded: false,
      elements: null,
      card: null,
      error: null,
      stripe: null,
      checkbox: false
    }
  },
  computed: {
    style() {
      return {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      }
    },
    priceMethod() {
      return this.checkbox ? this.content.price.month : this.content.price.year
    }
  },
  watch: {
    isStripeLoaded() {
      this.initStripe()
    }
  },
  mounted() {
    this.createStripeUser()
  },
  methods: {
    submit() {
      this.createPaymentMethod()
    },
    initStripe() {
      if (process.client) {
        // eslint-disable-next-line
        this.stripe = Stripe('pk_test_qWSTqzVW8zrhjYD9Aey3gr0J')
        const elements = this.stripe.elements()
        this.cardElement = elements.create('card', { style: this.style })
        this.cardElement.mount('#card-element')
        this.cardElement.on('change', this.showCardError)
      }
    },
    showCardError(event) {
      if (event.error) {
        this.error = event.error.message
      } else {
        this.error = ''
      }
    },
    async createPaymentMethod() {
      try {
        const { paymentMethod } = await this.stripe.createPaymentMethod({
          type: 'card',
          card: this.cardElement
        })
        console.log('paymentMethod', paymentMethod)
        this.createSubscription(paymentMethod.id)
      } catch (error) {
        console.log(error)
      }
    },
    async createSubscription(paymentMethodId) {
      const priceId = this.priceId
      try {
        const response = await this.$axios.post('subscriptions', {
          paymentMethodId,
          priceId
        })
        console.log('createSubscription Response', response)
      } catch (error) {
        console.log('createSubscription Error', error)
      }
    },
    async createStripeUser() {
      if (this.$auth.loggedIn) {
        try {
          const response = await this.$axios.post(`/customers`)

          if (response.status === 200) {
            console.log(response)
          }

          return response
        } catch (error) {
          this.error = error.response.data.data
          return error
        }
      }
    }
  },
  head() {
    return {
      title: 'Payment Page - My awesome project', // Other meta information
      script: [
        {
          hid: 'stripe',
          src: 'https://js.stripe.com/v3/',
          defer: true,
          callback: () => {
            this.isStripeLoaded = true
          }
        }
      ]
    }
  }
}
</script>

<style>
.priceCard {
  transition: transform 0.5s ease;
}

.priceCard:hover {
  transform: scale(1.05);
}

.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68d391;
}
</style>
