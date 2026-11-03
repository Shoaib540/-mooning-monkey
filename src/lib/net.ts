export async function fetchText(url: string): Promise<string> {
  if (window.shoaibDesktop?.fetchText) {
    return window.shoaibDesktop.fetchText(url);
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

export async function fetchJson<T>(url: string): Promise<T> {
  if (window.shoaibDesktop?.fetchJson) {
    return (await window.shoaibDesktop.fetchJson(url)) as T;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

export async function openExternal(url: string) {
  if (window.shoaibDesktop?.openExternal) {
    await window.shoaibDesktop.openExternal(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}
