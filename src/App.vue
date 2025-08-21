<template>
	<HeaderComp />
	<div style="padding: 10px">
		<div>欢迎使用electron + vue3 + vite框架</div>
		<div>名称：{{ state.appName }}</div>
		<div>版本：{{ state.version }}</div>
		<button @click="methods.onSend">发送通知给主进程</button>
	</div>
</template>

<script setup lang="ts">
import HeaderComp from '@/components/header/index.vue';

const state = {
	appName: __APP_NAME,
	version: __APP_VERSION__
};

const methods = {
	onSend() {
		window.ipcRenderer.invoke('child-process-message', state.appName);
	}
};
</script>
