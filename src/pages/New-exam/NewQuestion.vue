<template>
  <div>
    <NavBar />
    <NewQuestionHeader />
    <NewQuestionMain />
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
