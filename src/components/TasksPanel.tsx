import type { TaskItem } from "../types";

export default function TasksPanel({ tasks }: { tasks: TaskItem[] }) {
  return (
    <div className="hud-panel h-full overflow-hidden">
      <div className="border-b border-line px-4 py-3">
        <p className="hud-label">Task System</p>
        <p className="hud-title mt-1">Executed Directives</p>
      </div>
      <div className="space-y-3 overflow-y-auto p-4">
        {tasks.length === 0 && (
          <p className="font-mono text-sm text-mute">
            No tasks yet. Try “open github”, “play music”, or “system status”.
          </p>
        )}
        {tasks.map((t) => (
          <div key={t.id} className="rounded-sm border border-line bg-void/40 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-sm tracking-[0.12em]">{t.title}</p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                {t.status}
              </span>
            </div>
            <p className="mt-1 font-body text-sm text-mute">{t.detail}</p>
            <p className="mt-2 font-mono text-[10px] text-mute/70">
              {new Date(t.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
