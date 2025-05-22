<script setup>
</script>

<template>
  <section id="section" class="relative w-full bg-zinc-300 flex items-center justify-center text-black">
    <div class="container m-auto pb-8 px-8">
      <div class="w-full flex flex-col rounded-2xl shadow-xl overflow-hidden bg-white p-8">
        <h1 class="text-3xl font-bold mb-4">
          Exam Creation Overview
        </h1>

        <h2 class="text-2xl font-semibold mt-6 mb-2">
          Step 1: Logging In
        </h2>
        <ul class="list-disc list-inside mb-4">
          <li>User logs into the platform.</li>
        </ul>

        <h2 class="text-2xl font-semibold mt-6 mb-2">
          Step 2: Creating a New Exam
        </h2>
        <ul class="list-disc list-inside mb-4">
          <li>Click on the “Create New Exam” button.</li>
        </ul>

        <h3 class="text-xl font-medium mt-4 mb-2">
          Option A: Uploading a PDF
        </h3>
        <ul class="list-disc list-inside mb-4 ml-4">
          <li>User uploads a PDF file containing exam questions.</li>
          <li>The AI extracts data from the PDF.</li>
          <li>An editor is provided for making any necessary changes.</li>
        </ul>
        <blockquote class="border-l-4 border-gray-400 pl-4 italic text-gray-600 mb-4">
          *Disclaimer*: AI-passed questions from the upload will not appear on the student dashboard or question preview.
        </blockquote>

        <h3 class="text-xl font-medium mt-4 mb-2">
          Option B: Manual Entry
        </h3>
        <ul class="list-disc list-inside mb-4 ml-4">
          <li>User manually enters exam questions.</li>
        </ul>

        <h2 class="text-2xl font-semibold mt-6 mb-2">
          Step 3: Setting Exam Details
        </h2>
        <ul class="list-disc list-inside mb-4 ml-0">
          <li>Click “Next” to configure exam settings like time and other parameters.</li>
          <li>Assign a name to the exam.</li>
        </ul>

        <h2 class="text-2xl font-semibold mt-6 mb-2">
          Step 4: Monitoring and Results
        </h2>
        <ul class="list-disc list-inside mb-0 ml-0">
          <li>Access the monitoring result dashboard.</li>
          <li>Invite students via email for bulk upload.</li>
          <li> When choosing bulk upload, <b>Please</b> view the template provided and ensure the data is in the correct format.</li>
          <li>Students will receive an email with a link to the exam.</li>
          <li>View students’ results and transcripts in the results page.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
#section {
  min-height: calc(100dvh - 92px);
}
</style>
