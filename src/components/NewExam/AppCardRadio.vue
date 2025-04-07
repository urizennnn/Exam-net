<template>
  <input
    type="radio"
    :id="`card-${id}`"
    name="AppCardRadio"
    :value="value"
    v-model="model"
    @click="handleClick"
  />
  <label
    :for="`card-${id}`"
    class="h-[250px] md:h-[300px] w-full rounded-lg shadow-lg flex flex-col border-2 border-[#e4e1e1]"
  >
    <section
      class="h-[70%] sm:h-[80%] bg-[#eeeeee] rounded-t-lg flex justify-center pt-6 relative"
    >
      <div
        class="border-t border-l border-r border-[#e4e1e1] w-[60%] bg-white rounded-t-lg"
      ></div>
      <template v-if="typeof top === 'string'">
        <p
          class="absolute top-6 right-4 sm:right-16 bg-[#0968a7] text-white px-2 py-1 rounded-sm font-sans font-normal text-xs sm:text-sm"
        >
          {{ top }}
        </p>
      </template>
      <template v-else>
        <div
          class="absolute right-4 sm:right-7 top-4 flex flex-row gap-1 text-white text-xs sm:text-md"
        >
          <p
            v-for="(text, index) in top"
            :key="index"
            :class="`w-8 sm:w-10 h-8 sm:h-10 ${index % 2 === 1 ? 'bg-[#0968a7]' : 'bg-[#e92b2b]'} rounded-md flex justify-center items-center`"
          >
            {{ text }}
          </p>
        </div>
      </template>
    </section>
    <section
      class="h-[30%] sm:h-[40%] bg-white flex items-center justify-center rounded-b-lg"
    >
      <p class="text-lg sm:text-2xl text-center font-sans text-[#464646]">
        {{ label }}
      </p>
    </section>
  </label>
</template>

<script lang="ts" setup>
defineProps({
  id: String,
  label: String,
  top: [String, Array],
  value: String,
});

const model = defineModel({ required: false });

const emit = defineEmits(["click"]);

function handleClick(event: Event) {
  emit("click", event);
}
</script>

<style scoped>
input {
  display: none;
}

input:checked + label {
  border: 1px solid black;
}

label {
  cursor: pointer;
}

label:hover {
  border: 1px solid black;
}
</style>
