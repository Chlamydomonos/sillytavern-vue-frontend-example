import './assets/main.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { ProjectHelper } from '@sillytavern-vue-frontend/project-helper';

// APP的导出方式
ProjectHelper.acceptVueApp(() => {
    const app = createApp(App);
    // 如果要使用其他Vue插件，在这里写app.use(xxx)
    return app;
});
