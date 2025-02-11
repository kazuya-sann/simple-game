<template>
	<div class="game-container">
	  <canvas ref="canvas" @mousedown="startDrag" @mousemove="dragIcon" @mouseup="stopDrag" @mouseleave="stopDrag"></canvas>
	</div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  const canvas = ref(null);
  const ctx = ref(null);
  const icons = ref([]);
  const iconImages = ["images/icon1.png", "images/icon2.png", "images/icon3.png", "images/icon4.png"];
  const matchedPairs = ref(0);
  const totalPairs = 4; // 画面に配置するペアの数
  let allIconsLoaded = ref(false);
  let draggingIcon = ref(null);
  let isDragging = ref(false);
  
  const loadIcons = () => {
	icons.value = [];
	let tempIcons = [];
	allIconsLoaded.value = false;
	let loadedCount = 0;
  
	for (let i = 0; i < totalPairs; i++) {
	  const icon = iconImages[i % iconImages.length];
	  tempIcons.push({ image: icon, x: Math.random() * 700, y: Math.random() * 500, width: 100, height: 100, img: new Image() });
	  tempIcons.push({ image: icon, x: Math.random() * 700, y: Math.random() * 500, width: 100, height: 100, img: new Image() });

	}
  
	tempIcons.forEach(icon => {
	  icon.img.src = icon.image;
	  icon.img.onload = () => {
		loadedCount++;
		if (loadedCount === tempIcons.length) {
		  allIconsLoaded.value = true;
		  drawIcons();
		}
	  };
	});
  
	icons.value = tempIcons;
  };
  
  const drawIcons = () => {
	if (ctx.value && allIconsLoaded.value) {
	  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
	  icons.value.forEach(icon => {
		ctx.value.drawImage(icon.img, icon.x, icon.y, icon.width, icon.height);
	  });
	}
  };
  
  const startDrag = (event) => {
	const rect = canvas.value.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	
	draggingIcon.value = icons.value.find(icon =>
	  x >= icon.x && x <= icon.x + icon.width &&
	  y >= icon.y && y <= icon.y + icon.height
	);
	if (draggingIcon.value) {
	  isDragging.value = true;
	}
  };
  
  const dragIcon = (event) => {
	if (isDragging.value && draggingIcon.value) {
	  const rect = canvas.value.getBoundingClientRect();
	  draggingIcon.value.x = event.clientX - rect.left - draggingIcon.value.width / 2;
	  draggingIcon.value.y = event.clientY - rect.top - draggingIcon.value.height / 2;
	  drawIcons();
	  checkCollision();
	}
  };
  
  const stopDrag = () => {
	isDragging.value = false;
	draggingIcon.value = null;
  };
  
  const checkCollision = () => {
	icons.value.forEach(icon => {
	  if (draggingIcon.value && icon !== draggingIcon.value && icon.image === draggingIcon.value.image) {
		const dx = icon.x - draggingIcon.value.x;
		const dy = icon.y - draggingIcon.value.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
  
		if (distance < 10) { // 接触判定
		  playSound();
		  icons.value = icons.value.filter(i => i !== icon && i !== draggingIcon.value);
		  matchedPairs.value++;
		  drawIcons();
		}
	  }
	});
  
	if (matchedPairs.value === totalPairs) {
	  setTimeout(() => {
		matchedPairs.value = 0;
		loadIcons();
	  }, 1000);
	}
  };
  
  const playSound = () => {
	const audio = new Audio("sounds/match.mp3"); // マッチ時の音
	audio.play();
  };
  
  onMounted(() => {
	if (canvas.value) {
	  canvas.value.width = 800;
	  canvas.value.height = 600;
	  ctx.value = canvas.value.getContext("2d");
	  loadIcons();
	}
  });
  </script>
  
  <!-- <style>
  .game-container {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f0f0f0;
  }
  </style>
   -->