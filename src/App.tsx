import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "./components/BootSequence";
import ChatPanel from "./components/ChatPanel";
import CoreOrb from "./components/CoreOrb";
import MemoryPanel from "./components/MemoryPanel";
import SettingsPanel from "./components/SettingsPanel";
import Sidebar from "./components/Sidebar";
import StatusHud from "./components/StatusHud";
import TasksPanel from "./components/TasksPanel";
import TitleBar from "./components/TitleBar";
import WorldMonitor from "./components/WorldMonitor";
import { useAssistant } from "./hooks/useAssistant";
import type { ViewId } from "./types";

export default function App() {
  const [view, setView] = useState<ViewId>("core");
  const assistant = useAssistant();

  return (
    <div className="flex h-screen flex-col overflow-hidden text-ink">
      {!assistant.booted && <BootSequence onDone={assistant.completeBoot} />}

      <TitleBar />

      <div className="flex min-h-0 flex-1">
        <Sidebar view={view} onChange={setView} />

        <main className="relative min-w-0 flex-1 overflow-hidden p-3 md:p-5">
          <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:44px_44px] opacity-[0.18]" />
          <div className="pointer-events-none absolute inset-0 scanlines opacity-20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              className="relative z-10 h-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {view === "core" && (
                <div className="grid h-full gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="hud-panel flex flex-col items-center justify-center overflow-hidden p-4">
                    <CoreOrb
                      state={assistant.state}
                      gender={assistant.settings.voiceGender}
                      name={assistant.settings.assistantName}
                      onTap={assistant.toggleListen}
                    />
                    <div className="mt-2 w-full max-w-3xl">
                      <StatusHud
                        state={assistant.state}
                        settings={assistant.settings}
                        speechOk={assistant.speechOk}
                        partial={assistant.partial}
                      />
                    </div>
                  </div>
                  <div className="min-h-[320px]">
                    <ChatPanel
                      messages={assistant.messages}
                      state={assistant.state}
                      onSend={assistant.handleUserText}
                      onListen={assistant.toggleListen}
                      onStopSpeak={assistant.stopSpeaking}
                      onClear={assistant.clearChat}
                    />
                  </div>
                </div>
              )}

              {view === "chat" && (
                <ChatPanel
                  messages={assistant.messages}
                  state={assistant.state}
                  onSend={assistant.handleUserText}
                  onListen={assistant.toggleListen}
                  onStopSpeak={assistant.stopSpeaking}
                  onClear={assistant.clearChat}
                />
              )}

              {view === "world" && <WorldMonitor />}
              {view === "tasks" && <TasksPanel tasks={assistant.tasks} />}
              {view === "memory" && (
                <MemoryPanel
                  memory={assistant.memory}
                  onAdd={assistant.addMemory}
                  onRemove={assistant.removeMemory}
                  onClear={assistant.clearMemory}
                />
              )}
              {view === "settings" && (
                <SettingsPanel
                  settings={assistant.settings}
                  onChange={assistant.setSettings}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
