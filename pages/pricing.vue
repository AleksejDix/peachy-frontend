<template>
  <div class="bg-gray-900">
    <div class="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
      <div class="text-center">
        <h2
          class="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider"
        >
          Pricing
        </h2>
        <p
          class="mt- text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10 lg:text-5xl lg:leading-none"
        >
          The right price for you, whoever you are
        </p>
        <p
          class="mt-3 max-w-4xl mx-auto text-xl leading-7 text-gray-300 sm:mt-5 sm:text-2xl sm:leading-8"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
          numquam eligendi quos odit doloribus molestiae voluptatum.
        </p>
      </div>
    </div>

    <div class="mt-16  lg:mt-20 lg:pb-20">
      <div class="relative z-0">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-center">
            <price-card
              v-for="priceCard in priceCards"
              :key="priceCard"
              :content="priceCard"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import priceCard from '~/components/priceCard'
import priceData from '~/mock/pricingCards.json'

export default {
  components: {
    priceCard
  },
  data() {
    return {
      priceCards: priceData
    }
  }
}
</script>
