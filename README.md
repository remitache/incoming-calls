# Character Calls App

A simple Nuxt 3 app that simulates phone calls with cartoon characters.

## Features

- Character selection (Lightning McQueen, Gabby)
- Full-screen call interface with character images
- Phone call controls (end call, mute, speaker)
- Ring tone audio (placeholder included)
- Mobile-first responsive design

## Setup

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Generate static site for deployment
npm run generate
```

## Deployment to GitHub Pages

1. Push to main branch
2. Enable GitHub Pages in repository settings
3. Set source to "GitHub Actions"
4. The workflow will automatically deploy on push

## Adding Ring Tone

Replace `/public/ring.mp3` with an actual MP3 ring tone file.

## Adding Character Images

Update the `characters` object in `pages/index.vue` with proper character image URLs.