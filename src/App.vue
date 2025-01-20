<template>
    <div class="outer-frame">
        <div>角色名称: {{ charName }}</div>
        <hr />
        <!-- Wrapper API 用法 -->
        <div v-html="wrapperApi.renderMessage(message)"></div>
    </div>
</template>

<script setup lang="ts">
import { ProjectHelper } from '@sillytavern-vue-frontend/project-helper';
import { ref } from 'vue';

// ProjectHelper的用法
const message = ref(ProjectHelper.initialMessage());
const wrapperApi = ProjectHelper.wrapperApi();
const eventEmitter = ProjectHelper.eventEmitter();
const tavernContext = ProjectHelper.tavernContext();

// 事件系统用法
eventEmitter.on('messageUpdated', (newMes) => {
    message.value = newMes;
});

// SillyTavern上下文用法
const charName = tavernContext.characters[tavernContext.characterId].name;
</script>

<style scoped lang="scss">
// 使用<style scoped>可以避免vue前端的样式影响到酒馆的其余部分。
.outer-frame {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
}
</style>
