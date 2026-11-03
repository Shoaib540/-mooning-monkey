import { useCallback, useEffect, useRef, useState } from "react";
import { generateAssistantReply } from "../lib/assistant";
import type { MusicAction } from "../lib/music";
import { createTask, openExternal, runSkill } from "../lib/skills";
import {
  createRecognizer,
  speak,
  speechSupported,
  stopSpeaking,
} from "../lib/speech";
import { storage } from "../lib/storage";
import type {
  AppSettings,
  AssistantState,
  ChatMessage,
  MemoryItem,
  TaskItem,
} from "../types";

function uid() {
  return crypto.randomUUID();
}

export function useAssistant(options?: {
  onMusicAction?: (action: MusicAction) => void | Promise<void>;
  onOpenMusicView?: () => void;
}) {
  const musicRef = useRef(options);
  useEffect(() => {
    musicRef.current = options;
  }, [options]);
  const [settings, setSettingsState] = useState<AppSettings>(() =>
    storage.getSettings(),
  );
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    storage.getMessages(),
  );
  const [memory, setMemory] = useState<MemoryItem[]>(() => storage.getMemory());
  const [tasks, setTasks] = useState<TaskItem[]>(() => storage.getTasks());
  const [state, setState] = useState<AssistantState>("idle");
  const [partial, setPartial] = useState("");
  const [booted, setBooted] = useState(false);
  const listeningRef = useRef(false);
  const settingsRef = useRef(settings);
  const memoryRef = useRef(memory);
  const messagesRef = useRef(messages);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);
  useEffect(() => {
    memoryRef.current = memory;
  }, [memory]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => storage.setSettings(settings), [settings]);
  useEffect(() => storage.setMessages(messages.slice(-100)), [messages]);
  useEffect(() => storage.setMemory(memory), [memory]);
  useEffect(() => storage.setTasks(tasks.slice(-50)), [tasks]);

  const setSettings = useCallback(
    (next: AppSettings | ((s: AppSettings) => AppSettings)) => {
      setSettingsState(next);
    },
    [],
  );

  const pushMessage = useCallback((role: ChatMessage["role"], content: string) => {
    const msg: ChatMessage = {
      id: uid(),
      role,
      content,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }, []);

  const speakReply = useCallback((text: string) => {
    if (!settingsRef.current.voiceEnabled) {
      setState("idle");
      return;
    }
    setState("speaking");
    speak(text, settingsRef.current.voiceGender, () => setState("idle"));
  }, []);

  const handleUserText = useCallback(
    async (raw: string) => {
      const input = raw.trim();
      if (!input) return;

      stopSpeaking();
      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: input,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setState("thinking");

      try {
        const skill = await runSkill(input, settingsRef.current.homeCity);
        if (skill) {
          if (skill.task) setTasks((prev) => [createTask(skill.task!), ...prev]);
          if (skill.music) await musicRef.current?.onMusicAction?.(skill.music);
          if (skill.openMusicView) musicRef.current?.onOpenMusicView?.();
          if (skill.openUrl && skill.music?.type !== "play-search") {
            await openExternal(skill.openUrl);
          }
          if (skill.memory) {
            setMemory((prev) => [
              {
                id: uid(),
                key: skill.memory!.key,
                value: skill.memory!.value,
                createdAt: Date.now(),
              },
              ...prev,
            ]);
          }

          const assistantMsg: ChatMessage = {
            id: uid(),
            role: "assistant",
            content: skill.reply,
            createdAt: Date.now(),
          };
          if (skill.clearChat) setMessages([assistantMsg]);
          else setMessages((prev) => [...prev, assistantMsg]);
          speakReply(skill.reply);
          return;
        }

        const history = [...messagesRef.current, userMsg];
        const reply = await generateAssistantReply({
          settings: settingsRef.current,
          messages: history,
          memory: memoryRef.current,
          input,
        });
        pushMessage("assistant", reply);
        speakReply(reply);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unexpected assistant failure.";
        pushMessage("assistant", `Provider error: ${message}`);
        setState("idle");
      }
    },
    [pushMessage, speakReply],
  );

  const stopListening = useCallback(() => {
    listeningRef.current = false;
    setPartial("");
    setState((s) => (s === "listening" ? "idle" : s));
  }, []);

  const startListening = useCallback(() => {
    if (!speechSupported()) {
      pushMessage(
        "system",
        "Speech recognition unavailable here. Use Chat, or run Chrome/Edge / desktop build.",
      );
      return;
    }

    stopSpeaking();
    const recognition = createRecognizer({
      onPartial: (text) => setPartial(text),
      onFinal: (text) => {
        setPartial("");
        listeningRef.current = false;
        void handleUserText(text);
      },
      onError: (error) => {
        listeningRef.current = false;
        setPartial("");
        setState("idle");
        if (error !== "aborted" && error !== "no-speech") {
          pushMessage("system", `Mic error: ${error}`);
        }
      },
      onEnd: () => {
        listeningRef.current = false;
        setPartial("");
        setState((s) => (s === "listening" ? "idle" : s));
      },
    });

    if (!recognition) return;
    listeningRef.current = true;
    setState("listening");
    try {
      recognition.start();
    } catch {
      setState("idle");
    }
  }, [handleUserText, pushMessage]);

  const toggleListen = useCallback(() => {
    if (state === "listening") stopListening();
    else startListening();
  }, [startListening, state, stopListening]);

  const completeBoot = useCallback(() => {
    setBooted(true);
    if (settingsRef.current.autoGreet) {
      const greet = `Good day, ${settingsRef.current.displayName}. ${settingsRef.current.assistantName} is online — live weather, news, research, and desktop control standing by.`;
      pushMessage("assistant", greet);
      speakReply(greet);
    }
  }, [pushMessage, speakReply]);

  useEffect(() => {
    const unsub = window.shoaibDesktop?.onHotkey?.((action) => {
      if (action === "toggle-listen") toggleListen();
    });
    return () => unsub?.();
  }, [toggleListen]);

  return {
    settings,
    setSettings,
    messages,
    memory,
    tasks,
    state,
    partial,
    booted,
    speechOk: speechSupported(),
    handleUserText,
    startListening,
    stopListening,
    toggleListen,
    completeBoot,
    clearChat: () => setMessages([]),
    clearMemory: () => setMemory([]),
    removeMemory: (id: string) =>
      setMemory((prev) => prev.filter((m) => m.id !== id)),
    addMemory: (key: string, value: string) =>
      setMemory((prev) => [
        { id: uid(), key, value, createdAt: Date.now() },
        ...prev,
      ]),
    stopSpeaking: () => {
      stopSpeaking();
      setState("idle");
    },
  };
}
