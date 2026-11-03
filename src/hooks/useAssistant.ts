import { useCallback, useEffect, useRef, useState } from "react";
import { generateAssistantReply } from "../lib/assistant";
import { createTask, openTarget, runSkill } from "../lib/skills";
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

export function useAssistant() {
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

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => storage.setSettings(settings), [settings]);
  useEffect(() => storage.setMessages(messages.slice(-80)), [messages]);
  useEffect(() => storage.setMemory(memory), [memory]);
  useEffect(() => storage.setTasks(tasks.slice(-40)), [tasks]);

  const setSettings = useCallback((next: AppSettings | ((s: AppSettings) => AppSettings)) => {
    setSettingsState(next);
  }, []);

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

  const speakReply = useCallback(
    (text: string) => {
      if (!settingsRef.current.voiceEnabled) {
        setState("idle");
        return;
      }
      setState("speaking");
      speak(text, settingsRef.current.voiceGender, () => setState("idle"));
    },
    [],
  );

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
        const skill = await runSkill(input);
        if (skill) {
          if (skill.task) {
            setTasks((prev) => [createTask(skill.task!), ...prev]);
          }
          if (skill.openUrl) await openTarget(skill.openUrl);

          if (/^remember/i.test(input) || /\bremember that\b/i.test(input)) {
            const value = input.replace(/^.*remember(?: that)?\s+/i, "").trim();
            if (value) {
              setMemory((prev) => [
                {
                  id: uid(),
                  key: "note",
                  value,
                  createdAt: Date.now(),
                },
                ...prev,
              ]);
            }
          }

          const assistantMsg: ChatMessage = {
            id: uid(),
            role: "assistant",
            content: skill.reply,
            createdAt: Date.now(),
          };

          if (/\b(clear (chat|conversation)|reset chat)\b/i.test(input)) {
            setMessages([assistantMsg]);
          } else {
            setMessages((prev) => [...prev, assistantMsg]);
          }

          speakReply(skill.reply);
          return;
        }

        const history = [...messages, userMsg];
        const reply = await generateAssistantReply({
          settings: settingsRef.current,
          messages: history,
          memory,
          input,
        });
        pushMessage("assistant", reply);
        speakReply(reply);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unexpected assistant failure.";
        const fallback = `I hit a provider error: ${message}`;
        pushMessage("assistant", fallback);
        setState("idle");
      }
    },
    [memory, messages, pushMessage, speakReply],
  );

  const stopListening = useCallback(() => {
    listeningRef.current = false;
    setPartial("");
    if (state === "listening") setState("idle");
  }, [state]);

  const startListening = useCallback(() => {
    if (!speechSupported()) {
      pushMessage(
        "system",
        "Speech recognition is unavailable in this browser. Type in Chat instead.",
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
        if (listeningRef.current) {
          listeningRef.current = false;
          setState("idle");
        }
        setPartial("");
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
    storage.setBooted(true);
    if (settingsRef.current.autoGreet) {
      const greet = `Good day, ${settingsRef.current.displayName}. ${settingsRef.current.assistantName} is online. How may I assist you?`;
      pushMessage("assistant", greet);
      speakReply(greet);
    }
  }, [pushMessage, speakReply]);

  const clearChat = useCallback(() => setMessages([]), []);
  const clearMemory = useCallback(() => setMemory([]), []);
  const removeMemory = useCallback((id: string) => {
    setMemory((prev) => prev.filter((m) => m.id !== id));
  }, []);
  const addMemory = useCallback((key: string, value: string) => {
    setMemory((prev) => [
      { id: uid(), key, value, createdAt: Date.now() },
      ...prev,
    ]);
  }, []);

  useEffect(() => {
    const unsub = window.stonicDesktop?.onHotkey?.((action) => {
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
    clearChat,
    clearMemory,
    removeMemory,
    addMemory,
    stopSpeaking: () => {
      stopSpeaking();
      setState("idle");
    },
  };
}
