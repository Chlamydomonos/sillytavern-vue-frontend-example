<template>
    <div class="outer-frame">
        <div>角色名称: {{ charName }}</div>
        <hr />
        <div v-html="rendered"></div>
    </div>
</template>

<script setup lang="ts">
import { ProjectHelper } from '@sillytavern-vue-frontend/project-helper';
import { computed, ref } from 'vue';

// ProjectHelper的用法
const message = ref(ProjectHelper.initialMessage());
const wrapperApi = ProjectHelper.wrapperApi();
const eventEmitter = ProjectHelper.eventEmitter();

// tavernContext函数会再返回一个函数，因为每次调用获得的SillyTavern上下文可能会有变化
const tavernContextGetter = ProjectHelper.tavernContext();
const tavernContext = tavernContextGetter();

// 事件系统用法
eventEmitter.on('messageUpdated', (newMes) => {
    message.value = newMes;
});

//Wrapper API用法
const rendered = computed(() => {
    // return ProjectHelper.wrapperApi().renderMessage(message.value);
    // 以上一句是错误的，因为ProjectHelper通过Vue依赖注入获得数据，而Vue依赖注入只能在setup上下文中调用
    // 正确做法是用一个变量缓存ProjectHelper返回的值并使用
    return wrapperApi.renderMessage(message.value);
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
