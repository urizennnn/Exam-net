<template>
  <div class="h-screen w-full">
    <NavBar />
    <div class="flex flex-col gap-2 h-full bg-[#cdcccc] px-4 md:px-20">
      <div class="flex flex-col h-full bg-white">
        <!-- header -->
        <ExamformatHeader />
        <!-- main -->
        <ExamFormatMain />
      </div>
    </div>
  </div>
</template>


<script>
import NavBar from "../../components/NavBar.vue";
import ExamformatHeader from "../../components/New-exam/Choose-exam-format/ExamformatHeader.vue";
import ExamFormatMain from "../../components/New-exam/Choose-exam-format/ExamFormatMain.vue";
export default {
  components: {
    NavBar,
    ExamformatHeader,
    ExamFormatMain,
  },
};
</script>
