import type { VoiceGender } from "../types";

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string };
  }>;
};

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    SpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

export function speechSupported() {
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function createRecognizer(handlers: {
  onPartial: (text: string) => void;
  onFinal: (text: string) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}) {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Ctor) return null;

  const recognition = new Ctor();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    let interim = "";
    let finalText = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const chunk = event.results[i][0].transcript;
      if (event.results[i].isFinal) finalText += chunk;
      else interim += chunk;
    }
    if (interim) handlers.onPartial(interim);
    if (finalText) handlers.onFinal(finalText.trim());
  };

  recognition.onerror = (event) => handlers.onError(event.error);
  recognition.onend = () => handlers.onEnd();

  return recognition;
}

export function pickVoice(gender: VoiceGender) {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  if (!voices.length) return null;

  const preferred =
    gender === "female"
      ? [/female/i, /zira/i, /samantha/i, /google uk english female/i, /aria/i, /jenny/i]
      : [/male/i, /david/i, /mark/i, /google uk english male/i, /guy/i, /ryan/i];

  for (const re of preferred) {
    const hit = voices.find((v) => re.test(v.name));
    if (hit) return hit;
  }

  return voices.find((v) => v.lang.toLowerCase().startsWith("en")) || voices[0];
}

export function speak(text: string, gender: VoiceGender, onEnd?: () => void) {
  if (!window.speechSynthesis) {
    onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const voice = pickVoice(gender);
  if (voice) utter.voice = voice;
  utter.rate = 1.02;
  utter.pitch = gender === "female" ? 1.08 : 0.92;
  utter.onend = () => onEnd?.();
  utter.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel();
}
