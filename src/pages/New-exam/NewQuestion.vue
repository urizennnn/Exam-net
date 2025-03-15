<template>
  <div class="h-screen w-full">
    <NavBar />
    <div class="flex flex-col gap-2 h-full bg-[#cdcccc] px-4 md:px-20">
      <div class="flex flex-col h-full bg-white">
        <!-- header -->
        <NewQuestionHeader />
        <!-- main -->
        <NewQuestionMain />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import NewQuestionHeader from "../../components/New-exam/New-question/NewQuestionHeader.vue";
import NewQuestionMain from "../../components/New-exam/New-question/NewQuestionMain.vue";
export default {
  components: {
    NavBar,
    NewQuestionHeader,
    NewQuestionMain,
  },
};
</script>
