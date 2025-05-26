<script setup>
</script>

<template>
  <Header />
  <section id="section" class="relative w-full bg-zinc-300 flex items-center justify-center text-black">
    <div class="container m-auto pb-8 px-8">
      <div class="w-full flex flex-col rounded-2xl shadow-xl overflow-hidden bg-white">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
          <div class="flex items-center gap-4">
            <div class="bg-white/20 p-3 rounded-lg">
              <UIcon name="i-lucide-graduation-cap" class="text-3xl" />
            </div>
            <div>
              <h1 class="text-4xl font-bold mb-2">
                Exam Creation Guide
              </h1>
              <p class="text-blue-100 text-lg">
                Complete walkthrough for creating and managing exams
              </p>
            </div>
          </div>
        </div>

        <div class="p-8">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
            <div class="flex items-start gap-3">
              <UIcon name="i-lucide-rocket" class="text-green-600 text-2xl mt-1" />
              <div>
                <h3 class="text-lg font-semibold text-green-800 mb-2">
                  Quick Start
                </h3>
                <p class="text-green-700">
                  Follow these steps to create your first exam in minutes. Each step is designed to be intuitive and user-friendly.
                </p>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h2 class="text-2xl font-bold text-gray-800">
                Getting Started
              </h2>
            </div>
            <div class="ml-11 bg-gray-50 p-6 rounded-lg">
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-log-in" class="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 class="font-semibold text-gray-800 mb-2">
                    User Authentication
                  </h3>
                  <p class="text-gray-600">
                    Log into the platform using your credentials to access the exam creation dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h2 class="text-2xl font-bold text-gray-800">
                Creating Your Exam
              </h2>
            </div>
            <div class="ml-11 space-y-4">
              <div class="bg-gray-50 p-6 rounded-lg">
                <div class="flex items-start gap-3 mb-4">
                  <UIcon name="i-lucide-plus-circle" class="text-blue-600 text-xl mt-1" />
                  <div>
                    <h3 class="font-semibold text-gray-800 mb-2">
                      Initialize New Exam
                    </h3>
                    <p class="text-gray-600">
                      Click the "Create New Exam" button to begin the exam creation process.
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 p-6 rounded-lg">
                <div class="flex items-start gap-3 mb-3">
                  <div class="bg-purple-600 text-white px-2 py-1 rounded text-sm font-medium">
                    PDF
                  </div>
                  <h3 class="text-lg font-semibold text-purple-800">
                    Option A: PDF Upload
                  </h3>
                </div>
                <div class="ml-12 space-y-3">
                  <div class="flex items-start gap-2">
                    <UIcon name="i-lucide-upload" class="text-purple-600 text-sm mt-1" />
                    <p class="text-purple-700">
                      Upload a PDF file containing your exam questions
                    </p>
                  </div>
                  <div class="flex items-start gap-2">
                    <UIcon name="i-lucide-brain" class="text-purple-600 text-sm mt-1" />
                    <p class="text-purple-700">
                      AI automatically extracts and processes the content
                    </p>
                  </div>
                  <div class="flex items-start gap-2">
                    <UIcon name="i-lucide-edit" class="text-purple-600 text-sm mt-1" />
                    <p class="text-purple-700">
                      Review and edit questions using the built-in editor
                    </p>
                  </div>
                </div>

                <div class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div class="flex items-start gap-2">
                    <UIcon name="i-lucide-alert-triangle" class="text-amber-600 text-lg mt-0.5" />
                    <div>
                      <p class="text-sm font-medium text-amber-800">
                        Important Note
                      </p>
                      <p class="text-sm text-amber-700 mt-1">
                        AI-processed questions from PDF uploads will not appear on the student dashboard or question preview until manually reviewed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-6 rounded-lg">
                <div class="flex items-start gap-3 mb-3">
                  <div class="bg-emerald-600 text-white px-2 py-1 rounded text-sm font-medium">
                    MANUAL
                  </div>
                  <h3 class="text-lg font-semibold text-emerald-800">
                    Option B: Manual Entry
                  </h3>
                </div>
                <div class="ml-16 flex items-start gap-2">
                  <UIcon name="i-lucide-keyboard" class="text-emerald-600 text-sm mt-1" />
                  <p class="text-emerald-700">
                    Create questions manually using our intuitive question builder interface
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h2 class="text-2xl font-bold text-gray-800">
                Exam Configuration
              </h2>
            </div>
            <div class="ml-11 bg-gray-50 p-6 rounded-lg space-y-4">
              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-settings" class="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 class="font-semibold text-gray-800 mb-2">
                    Settings & Parameters
                  </h3>
                  <p class="text-gray-600 mb-3">
                    Configure your exam settings to match your requirements:
                  </p>
                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="flex items-center gap-2">
                      <UIcon name="i-lucide-clock" class="text-gray-500" />
                      <span class="text-sm text-gray-600">Time limits and duration</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <UIcon name="i-lucide-shield" class="text-gray-500" />
                      <span class="text-sm text-gray-600">Security and access controls</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <UIcon name="i-lucide-users" class="text-gray-500" />
                      <span class="text-sm text-gray-600">Student permissions</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <UIcon name="i-lucide-award" class="text-gray-500" />
                      <span class="text-sm text-gray-600">Grading preferences</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <UIcon name="i-lucide-tag" class="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 class="font-semibold text-gray-800 mb-2">
                    Exam Naming
                  </h3>
                  <p class="text-gray-600">
                    Assign a descriptive name to help identify and organize your exam
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h2 class="text-2xl font-bold text-gray-800">
                Student Management & Results
              </h2>
            </div>
            <div class="ml-11 space-y-4">
              <div class="bg-gray-50 p-6 rounded-lg">
                <div class="flex items-start gap-3 mb-4">
                  <UIcon name="i-lucide-monitor" class="text-blue-600 text-xl mt-1" />
                  <h3 class="font-semibold text-gray-800 mb-2">
                    Monitoring Dashboard
                  </h3>
                  <p class="text-gray-600">
                    Access real-time exam monitoring and student progress tracking
                  </p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-5 rounded-lg">
                  <div class="flex items-center gap-3 mb-3">
                    <UIcon name="i-lucide-user-plus" class="text-blue-600 text-lg" />
                    <h4 class="font-semibold text-blue-800">
                      Student Invitations
                    </h4>
                  </div>
                  <ul class="space-y-2 text-sm text-blue-700">
                    <li class="flex items-start gap-2">
                      <UIcon name="i-lucide-mail" class="text-blue-500 text-xs mt-1" />
                      <span>Send individual email invitations</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <UIcon name="i-lucide-upload" class="text-blue-500 text-xs mt-1" />
                      <span>Bulk upload student lists via CSV</span>
                    </li>
                  </ul>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-5 rounded-lg">
                  <div class="flex items-center gap-3 mb-3">
                    <UIcon name="i-lucide-bar-chart" class="text-green-600 text-lg" />
                    <h4 class="font-semibold text-green-800">
                      Results & Analytics
                    </h4>
                  </div>
                  <ul class="space-y-2 text-sm text-green-700">
                    <li class="flex items-start gap-2">
                      <UIcon name="i-lucide-file-text" class="text-green-500 text-xs mt-1" />
                      <span>View detailed student transcripts</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <UIcon name="i-lucide-download" class="text-green-500 text-xs mt-1" />
                      <span>Export results in multiple formats</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-5 rounded-lg">
                <div class="flex items-start gap-3">
                  <UIcon name="i-lucide-file-spreadsheet" class="text-orange-600 text-xl mt-1" />
                  <div>
                    <h4 class="font-semibold text-orange-800 mb-2">
                      CSV Upload Requirements
                    </h4>
                    <p class="text-orange-700 mb-2">
                      When using bulk upload, please ensure your data follows the correct format:
                    </p>
                    <div class="bg-white p-3 rounded border border-orange-200">
                      <p class="text-sm font-mono text-gray-700">
                        📋 Download the provided template for proper formatting
                      </p>
                      <p class="text-sm font-mono text-gray-700">
                        ✅ Verify all required fields are completed
                      </p>
                      <p class="text-sm font-mono text-gray-700">
                        📧 Ensure email addresses are valid
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-check-circle" class="text-2xl" />
              <div>
                <h3 class="text-lg font-semibold mb-1">
                  You're Ready to Go!
                </h3>
                <p class="text-green-100">
                  Follow these steps to create professional, secure, and efficient exams for your students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#section {
  min-height: calc(100dvh - 92px);
}
</style>
