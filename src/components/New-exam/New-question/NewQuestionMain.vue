<template>
  <div class="h-screen flex w-full">
    <!-- Sidebar -->
    <SideBar />
    <!-- Question -->
    <Question />
  </div>
</template>

<script>
import SideBar from "./SideBar.vue";
import Question from "../New-question/Question.vue";

export default {
  components: {
    SideBar,
    Question,
  },
};
</script>
