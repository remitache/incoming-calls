<template>
  <div class="container">
    <!-- Character Selection Screen -->
    <div v-if="!selectedCharacter" class="contacts-screen">
      <div class="contacts-header">
        <h1>Contacts</h1>
      </div>
      
      <div class="contacts-list">
        <div v-for="{ key, character } in sortedCharacters" :key="key" 
             @click="selectCharacter(key)" 
             class="contact-item">
          <div class="contact-avatar" :style="{ 
            backgroundImage: `url(${character.image})` 
          }">
          </div>
          <div class="contact-info">
            <div class="contact-name">{{ character.name }}</div>
            <div class="contact-status">Available</div>
          </div>
          <div class="call-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <button @click="toggleFullscreen" class="fullscreen-btn">
        {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
      </button>
      <div class="credits">
        Made by Remi Tache
      </div>
    </div>

    <!-- Video Call Screen -->
    <div v-else-if="showVideo" class="video-screen">
      <iframe 
        :src="`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&loop=1&playlist=${currentVideoId}&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1`"
        frameborder="0"
        allow="autoplay; encrypted-media"
        class="video-iframe">
      </iframe>
      <div class="video-overlay"></div>
      <button @click="endCall" class="video-hangup-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.7l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.51-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
        </svg>
      </button>
    </div>

    <!-- Call Screen -->
    <div v-else class="call-screen">
      <div class="character-bg" :style="{ 
        backgroundImage: `url(${characters[selectedCharacter].image}), ${characters[selectedCharacter].fallbackColor}`
      }">
        <div class="call-overlay">
          <div class="character-info">
            <h2>{{ characters[selectedCharacter].name }}</h2>
            <p>Calling...</p>
          </div>
          
          <div class="call-controls">
            <button @click="answerCall" class="answer-btn" :class="{ 'vibrating': !callAnswered }">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </button>
            
            <button @click="endCall" class="end-call-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.7l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.51-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
              </svg>
            </button>
            
            <button class="mute-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            </button>
          </div>
          
          <button @click="toggleFullscreen" class="fullscreen-toggle">
            {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
          </button>
        </div>
      </div>
      
      <audio ref="ringTone" loop>
        <source src="/ring.mp3" type="audio/mpeg">
      </audio>
    </div>
  </div>
</template>

<script setup>
const selectedCharacter = ref('')
const ringTone = ref(null)
const callAnswered = ref(false)
const isFullscreen = ref(false)
const showVideo = ref(false)
const currentVideoId = ref('')

import { characters as charactersConfig } from '~/config/characters.js'

const charactersData = charactersConfig
const characters = charactersData

const startCall = () => {
  nextTick(() => {
    if (ringTone.value) {
      ringTone.value.play().catch(() => {
        // Handle autoplay restrictions
      })
    }
  })
}

const answerCall = () => {
  const videoIds = charactersData[selectedCharacter.value]?.videoIds
  if (!videoIds || videoIds.length === 0) {
    return // Do nothing if no video IDs
  }
  
  // Randomly select a video ID
  const randomIndex = Math.floor(Math.random() * videoIds.length)
  currentVideoId.value = videoIds[randomIndex]
  
  callAnswered.value = true
  showVideo.value = true
  if (ringTone.value) {
    ringTone.value.pause()
    ringTone.value.currentTime = 0
  }
}

const sortedCharacters = computed(() => {
  return Object.entries(characters).map(([key, character]) => ({ key, character }))
    .sort((a, b) => a.character.name.localeCompare(b.character.name))
})

const selectCharacter = (key) => {
  selectedCharacter.value = key
  startCall()
}

const toggleFullscreen = () => {
  if (!isFullscreen.value) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const endCall = () => {
  if (ringTone.value) {
    ringTone.value.pause()
    ringTone.value.currentTime = 0
  }
  callAnswered.value = false
  showVideo.value = false
  selectedCharacter.value = ''
}

watch(selectedCharacter, (newValue) => {
  if (!newValue && ringTone.value) {
    ringTone.value.pause()
    ringTone.value.currentTime = 0
  }
})
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
}

.contacts-screen {
  height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.contacts-header {
  background: white;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.contacts-header h1 {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
  font-weight: 600;
}

.contacts-list {
  flex: 1;
  overflow-y: auto;
  background: white;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f3f4;
  cursor: pointer;
  transition: background-color 0.2s;
}

.contact-item:hover {
  background: #f8f9fa;
}

.contact-item:active {
  background: #e9ecef;
}

.contact-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 1rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.2rem;
}

.contact-status {
  font-size: 0.9rem;
  color: #28a745;
}

.call-icon {
  color: #007bff;
  padding: 0.5rem;
}

.video-screen {
  position: relative;
  height: 100vh;
  width: 100vw;
  background: black;
}

.video-iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 56.25vw;
  min-height: 100vh;
  min-width: 177.78vh;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  cursor: pointer;
}

.video-hangup-btn {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: none;
  background: #ff4757;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 1000;
}

.call-screen {
  height: 100vh;
  position: relative;
}

.character-bg {
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.call-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem 2rem;
  color: white;
}

.character-info {
  text-align: center;
  margin-top: 2rem;
}

.character-info h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.character-info p {
  font-size: 1.2rem;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.call-controls {
  position: absolute;
  bottom: 8rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.call-controls button {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.call-controls button:active {
  transform: scale(0.95);
}

.answer-btn {
  background: #2ed573;
  color: white;
}

.answer-btn.vibrating {
  animation: vibrate 0.5s infinite;
}

@keyframes vibrate {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.end-call-btn {
  background: #ff4757;
  color: white;
}

.mute-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.fullscreen-btn {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}

.fullscreen-toggle {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.credits {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  opacity: 0.7;
  color: white;
}

@media (max-width: 480px) {
  .character-info h2 {
    font-size: 2rem;
  }
  
  .call-controls {
    gap: 1.5rem;
  }
  
  .call-controls button {
    width: 75px;
    height: 75px;
  }
  
  .call-controls {
    bottom: 9rem;
    gap: 1.5rem;
  }
  
  .credits {
    font-size: 0.8rem;
  }
}
</style>