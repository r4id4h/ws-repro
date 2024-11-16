<template>
  <div>
    <h1>WebSocket Proxy Test</h1>
    <button @click="connectWebSocket">Connect WebSocket</button>
  </div>
</template>

<script setup>
function connectWebSocket() {
  const ws = new WebSocket('ws://localhost:3000/ws');
  ws.onopen = () => {
    console.log('WebSocket connected');
    ws.send('Hello from Nuxt 3');
  };
  ws.onmessage = (message) => {
    console.log('Received:', message.data);
  };
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  ws.onclose = () => {
    console.log('WebSocket closed');
  };
}
</script>
