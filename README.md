# Stonic AI — JARVIS Desktop Clone

Cinematic sci-fi desktop assistant inspired by Stonic AI / JARVIS.

## Features

- Frameless **Electron** desktop app (also runs in the browser)
- Boot sequence + holographic **Core** orb
- Voice input / TTS (Web Speech API)
- Chat, World Monitor, Tasks, Memory, Settings
- Personalities: JARVIS, Mentor, Friend, Custom
- Male / female voice selection
- Local skills: open YouTube/Gmail/GitHub, search web, play music, time, diagnostics, remember notes
- Demo mode offline, or bring your own OpenAI / Groq / custom API key

## Quick start

```bash
npm install
npm run dev          # browser UI at http://127.0.0.1:5173
npm run dev:electron # desktop window
```

## Build

```bash
npm run build
npm run dist         # electron-builder output in release/
```

## Voice hotkey (Electron)

`Ctrl+Shift+S` toggles listening.

## Notes

- Chrome / Edge recommended for speech recognition.
- API keys stay in local storage on this device.
- This is an independent clone / fan-style desktop experience, not the official Stonic product.
