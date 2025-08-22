<template>
	<div class="header">
		<div class="flex-10">
			<img src="@/assets/logo.jpg" width="25px" alt="" />
            <div style="font-size: 12px;font-weight: 700;">标题</div>
		</div>
		<div class="flex-10" style="margin-right: 15px;">
            <div class="menu-item" @click="onMinimize">
                <img src="@/assets/icon/minimize.png" width="20px" alt=""></img>
            </div>
            <div class="menu-item" @click="onMaximize">
                <img :src="menuDynamicsIcon" width="20px" alt=""></img>
            </div>
            <div class="menu-item" @click="onClose">
                <img src="@/assets/icon/close.png" width="20px" alt=""></img>
            </div>
        </div>
	</div>
	<!-- 占位 -->
	<div class="header-placeholder"></div>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./index.css" scoped></style>
