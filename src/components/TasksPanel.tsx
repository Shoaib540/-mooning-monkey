import type { TaskItem } from "../types";

export default function TasksPanel({ tasks }: { tasks: TaskItem[] }) {
  return (
    <div className="hud-panel h-full overflow-hidden">
      <div className="border-b border-line px-4 py-3">
        <p className="hud-label">Execution log</p>
        <p className="hud-title">Tasks</p>
      </div>
      <div className="space-y-3 overflow-y-auto p-4">
        {tasks.length === 0 && (
          <p className="font-mono text-sm text-mute">
            No tasks yet. Try weather, news, crypto, wiki, or system status.
          </p>
        )}
        {tasks.map((t) => (
          <div key={t.id} className="rounded-2xl border border-line bg-void/40 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-sm font-semibold">{t.title}</p>
              <span
                className={
                  t.status === "failed"
                    ? "font-mono text-[10px] uppercase tracking-[0.16em] text-rose"
                    : "font-mono text-[10px] uppercase tracking-[0.16em] text-signal"
                }
              >
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
