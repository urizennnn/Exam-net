import { StorybookConfig } from '@storybook/vue3-vite';
const config: StorybookConfig = {
  stories: ['../packages/admin/src/**/*.stories.ts'],
  addons: ['@storybook/addon-actions', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  }
};
export default config;
