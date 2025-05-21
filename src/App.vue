<script setup></script>

<script setup>
import {
  Cloudinary,
} from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName:
      "cloudinary://98744186858335:HelAut7EHo7HiDX_ht5LlLLHUJk@dt9mahfbl",
  },
});
</script>

<template>
  <UApp>
    <RouterView />
  </UApp>
</template>
