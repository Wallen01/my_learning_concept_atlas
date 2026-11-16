// Learning Concept Atlas — Dynamic loader
// Reads website/manifest.json (fast, zero quota, offline friendly)
// With fallback to GitHub API and built-in fallbacks if needed

const OWNER = 'Wallen01';
const REPO  = 'my_learning_concept_atlas';
const API   = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;
const BLOB  = `https://github.com/${OWNER}/${REPO}/blob/main`;

// ── helpers ──────────────────────────────────────────────────────────

async function loadManifest() {
  try {
    const res = await fetch('manifest.json');
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // proceed to fallback
  }
  return null;
}

function parseTitleLine(md) {
  const m = md.match(/^#\s+(.+)/m);
  if (!m) return { en: '(untitled)', zh: '' };
  const full = m[1].trim();
  const parts = full.match(/^(.+?)（(.+?)）$/);
  if (parts) return { en: parts[1].trim(), zh: parts[2].trim() };
  return { en: full, zh: '' };
}

function parseQuickExplain(md) {
  const m = md.match(/## 中文速解\s*\n(.+)/);
  return m ? m[1].trim() : '';
}

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const obj = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w_]*):\s*(.+)/);
    if (kv) obj[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return obj;
}

function parseSourceKind(fm) {
  const raw = fm.source_kind || '';
  const map = {
    lecture_slides: 'lecture slides',
    article: 'article',
    paper: 'paper',
    book: 'book',
    note: 'note'
  };
  return map[raw] || raw || 'source';
}

function setError(el, msg) {
  el.classList.remove('status-loading');
  el.classList.add('status-error');
  el.textContent = msg;
}

function clearStatus(el) {
  el.classList.remove('status-loading');
}

// ── renderers ────────────────────────────────────────────────────────

function renderTopics(topics) {
  const container = document.getElementById('topic-list');
  clearStatus(container);
  if (!topics || topics.length === 0) {
    container.textContent = '尚無主題。';
    return;
  }
  container.innerHTML = '';
  for (const t of topics) {
    const div = document.createElement('div');
    div.className = 'topic-card';
    div.innerHTML = `<h3><a href="${BLOB}/${t.path}">${t.en}</a> <small>${t.zh || ''}</small></h3><p>${t.desc || ''}</p>`;
    container.appendChild(div);
  }
}

function renderConcepts(concepts) {
  const container = document.getElementById('concept-list');
  clearStatus(container);
  if (!concepts || concepts.length === 0) {
    container.textContent = '尚無概念。';
    return;
  }
  container.innerHTML = '';
  for (const c of concepts) {
    const article = document.createElement('article');
    article.innerHTML = `<h3><a href="${BLOB}/${c.path}">${c.en}</a> <span>${c.zh || ''}</span></h3><p>${c.quick || ''}</p>`;
    container.appendChild(article);
  }
}

function renderSources(sources) {
  const container = document.getElementById('source-list');
  clearStatus(container);
  if (!sources || sources.length === 0) {
    container.innerHTML = '<li>尚無來源。</li>';
    return;
  }
  container.innerHTML = '';
  for (const s of sources) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${BLOB}/${s.path}">${s.en}</a> <span>${s.kind || 'source'}</span>`;
    container.appendChild(li);
  }
}

// ── fallback loader via GitHub API ───────────────────────────────────

async function fetchDir(path) {
  try {
    const res = await fetch(`${API}/${path}`);
    if (res.ok) {
      const items = await res.json();
      return items.filter(f => f.name.endsWith('.md')).map(f => ({ name: f.name, path: f.path }));
    }
  } catch (e) {}
  return [];
}

async function fetchRaw(path) {
  try {
    const localRes = await fetch(path);
    if (localRes.ok) return await localRes.text();
  } catch (e) {}

  const res = await fetch(`${API}/${path}`, {
    headers: { Accept: 'application/vnd.github.raw+json' }
  });
  if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
  return res.text();
}

async function loadFallback() {
  // Load Topics
  try {
    const topicFiles = await fetchDir('vault/topics');
    const topics = await Promise.all(topicFiles.map(async f => {
      const md = await fetchRaw(f.path);
      const { en, zh } = parseTitleLine(md);
      const desc = md.replace(/^---[\s\S]*?---\s*/, '').replace(/^#.+\n*/, '').trim().split('\n')[0] || '';
      return { en, zh, desc, path: f.path };
    }));
    renderTopics(topics);
  } catch (e) {
    setError(document.getElementById('topic-list'), `無法讀取主題：${e.message}`);
  }

  // Load Concepts
  try {
    const conceptFiles = await fetchDir('vault/concepts');
    const concepts = await Promise.all(conceptFiles.map(async f => {
      const md = await fetchRaw(f.path);
      const { en, zh } = parseTitleLine(md);
      const quick = parseQuickExplain(md);
      return { en, zh, quick, path: f.path };
    }));
    renderConcepts(concepts);
  } catch (e) {
    setError(document.getElementById('concept-list'), `無法讀取概念：${e.message}`);
  }

  // Load Sources
  try {
    const sourceFiles = await fetchDir('vault/sources');
    const sources = await Promise.all(sourceFiles.map(async f => {
      const md = await fetchRaw(f.path);
      const { en } = parseTitleLine(md);
      const fm = parseFrontmatter(md);
      const kind = parseSourceKind(fm);
      return { en, kind, path: f.path };
    }));
    renderSources(sources);
  } catch (e) {
    setError(document.getElementById('source-list'), `無法讀取來源：${e.message}`);
  }
}

// ── init ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  const manifest = await loadManifest();
  if (manifest && manifest.concepts && manifest.concepts.length > 0) {
    renderTopics(manifest.topics);
    renderConcepts(manifest.concepts);
    renderSources(manifest.sources);
  } else {
    // fallback if manifest.json is not available
    loadFallback();
  }
});
