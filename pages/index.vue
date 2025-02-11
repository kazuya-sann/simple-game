<template>
	<div class="container">
	  <canvas 
		ref="canvas" 
		@mousedown="startDrag" 
		@mousemove="dragIcon" 
		@mouseup="stopDrag" 
		@mouseleave="stopDrag"
		@touchstart="startDrag" 
		@touchmove="dragIcon" 
		@touchend="stopDrag"
		class="game-canvas"
	  ></canvas>
	</div>
  </template>
  
  <script setup>  
  const canvas = ref(null);
  const ctx = ref(null);
  const icons = ref([]);
  const iconImages = ["images/icon1.png", "images/icon2.png", "images/icon3.png", "images/icon4.png"];
  const matchedPairs = ref(0);
  const totalPairs = 4;
  let allIconsLoaded = ref(false);
  let draggingIcon = ref(null);
  let isDragging = ref(false);

  const iconSize = 150;
  
  const loadIcons = () => {
	icons.value = [];
	let tempIcons = [];
	allIconsLoaded.value = false;
	let loadedCount = 0;
  
	for (let i = 0; i < totalPairs; i++) {
	  const icon = iconImages[i % iconImages.length];
	  const margin = iconSize;
	  tempIcons.push({ 
		image: icon, 
		x: Math.random() * (canvas.value.width - iconSize), 
		y: Math.random() * (canvas.value.height - iconSize), 
		width: iconSize, 
		height: iconSize, 
		img: new Image() 
	  });
	  tempIcons.push({ 
		image: icon, 
		x: Math.random() * (canvas.value.width - iconSize), 
		y: Math.random() * (canvas.value.height - iconSize), 
		width: iconSize, 
		height: iconSize, 
		img: new Image() 
	  });
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
  
  const getEventPosition = (event) => {
	const rect = canvas.value.getBoundingClientRect();
	let x, y;
	if (event.touches) {
	  x = event.touches[0].clientX - rect.left;
	  y = event.touches[0].clientY - rect.top;
	} else {
	  x = event.clientX - rect.left;
	  y = event.clientY - rect.top;
	}
	return { x, y };
  };
  
  const startDrag = (event) => {
	event.preventDefault(); // スクロールを防止
  
	const { x, y } = getEventPosition(event);
	
	draggingIcon.value = icons.value.find(icon =>
	  x >= icon.x && x <= icon.x + icon.width &&
	  y >= icon.y && y <= icon.y + icon.height
	);
	if (draggingIcon.value) {
	  isDragging.value = true;
	}
  };
  
  const dragIcon = (event) => {
	event.preventDefault();
  
	if (isDragging.value && draggingIcon.value) {
	  const { x, y } = getEventPosition(event);
	  draggingIcon.value.x = Math.max(0, Math.min(x - draggingIcon.value.width / 2, canvas.value.width - draggingIcon.value.width));
	  draggingIcon.value.y = Math.max(0, Math.min(y - draggingIcon.value.height / 2, canvas.value.height - draggingIcon.value.height));
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
  
		if (distance < 10) {
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
	const audio = new Audio("sounds/match.mp3");
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
  
  <style scoped>
  .container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	padding: 1rem;
  }
  
  .game-canvas {
	max-width: 100%;
	height: 100%;
	object-fit: contain;
  }
  </style>