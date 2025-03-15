<template>
  <div class="flex justify-center px-4">
    <div class="flex flex-col gap-8 bg-white w-full md:w-[80%] justify-center items-center text-center">
      <h1 class="text-2xl md:text-3xl font-sans text-[#464646] font-medium tracking-wide">
        Choose exam format
      </h1>
      <p class="italic text-[#818181] font-medium text-sm md:text-base">
        How will this look for students?
      </p>

      <!-- cards -->
      <Cards />

      <div class="flex flex-col lg:flex-row items-center gap-4 font-sans text-[#464646] font-medium text-sm md:text-base">
        <p>Neither, skip digital questions</p>
        <i class="fa-solid fa-angles-right"></i>
      </div>
    </div>
  </div>
</template>


<script>
import Cards from "../Choose-exam-format/Cards.vue";
export default {
  name: "Test",
  components: {
    Cards,
  },
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>
