// Learning Concept Atlas — Dynamic loader
// Reads vault/concepts/, vault/sources/, vault/topics/
// Combines direct relative static fetch (fast, zero quota) with GitHub API directory listing

const OWNER = 'Wallen01';
const REPO  = 'my_learning_concept_atlas';
const API   = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;
const BLOB  = `https://github.com/${OWNER}/${REPO}/blob/main`;

// Built-in fallbacks if GitHub API rate limit (403) is reached
const FALLBACKS = {
  'vault/topics': ['machine-learning.md'],
  'vault/concepts': [
    'attention.md',
    'backpropagation.md',
    'convolutional-neural-network.md',
    'neural-network.md',
    'recurrent-neural-network.md',
    'transformer.md'
  ],
  'vault/sources': [
    'attention-and-transformers.md',
    'image-classification-with-cnns.md',
    'neural-networks-and-backpropagation.md',
    'recurrent-neural-networks.md'
  ]
};

// ── helpers ──────────────────────────────────────────────────────────

async function fetchDir(path) {
  try {
    const res = await fetch(`${API}/${path}`);
    if (res.ok) {
      const items = await res.json();
      const files = items.filter(f => f.name.endsWith('.md')).map(f => ({ name: f.name, path: f.path }));
      try { localStorage.setItem('cached_' + path, JSON.stringify(files)); } catch (e) {}
      return files;
    }
  } catch (e) {
    // network or api error, proceed to fallback
  }

  // 1. Try localStorage cache
  try {
    const cached = localStorage.getItem('cached_' + path);
    if (cached) return JSON.parse(cached);
  } catch (e) {}

  // 2. Use default fallback list
  const defaults = FALLBACKS[path] || [];
  return defaults.map(name => ({ name, path: `${path}/${name}` }));
}

async function fetchRaw(path) {
  // First attempt: direct relative fetch from the deployed site (fast & no rate limits)
  try {
    const localRes = await fetch(path);
    if (localRes.ok) return await localRes.text();
  } catch (e) {}

  // Second attempt: GitHub Raw API
  const res = await fetch(`${API}/${path}`, {
    headers: { Accept: 'application/vnd.github.raw+json' }
  });
  if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
  return res.text();
}

function parseTitleLine(md) {
  // Match first H1: # English Term（中文名稱）
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

// ── loaders ──────────────────────────────────────────────────────────

async function loadTopics() {
  const container = document.getElementById('topic-list');
  try {
    const files = await fetchDir('vault/topics');
    if (files.length === 0) {
      clearStatus(container);
      container.textContent = '尚無主題。';
      return;
    }
    const topics = await Promise.all(files.map(async f => {
      const md = await fetchRaw(f.path);
      const { en, zh } = parseTitleLine(md);
      const desc = md.replace(/^---[\s\S]*?---\s*/, '').replace(/^#.+\n*/, '').trim().split('\n')[0] || '';
      return { en, zh, desc, path: f.path };
    }));
    clearStatus(container);
    container.innerHTML = '';
    for (const t of topics) {
      const div = document.createElement('div');
      div.className = 'topic-card';
      div.innerHTML = `<h3><a href="${BLOB}/${t.path}">${t.en}</a> <small>${t.zh}</small></h3><p>${t.desc}</p>`;
      container.appendChild(div);
    }
  } catch (e) {
    setError(container, `無法讀取主題：${e.message}`);
  }
}

async function loadConcepts() {
  const container = document.getElementById('concept-list');
  try {
    const files = await fetchDir('vault/concepts');
    if (files.length === 0) {
      clearStatus(container);
      container.textContent = '尚無概念。';
      return;
    }
    const concepts = await Promise.all(files.map(async f => {
      const md = await fetchRaw(f.path);
      const { en, zh } = parseTitleLine(md);
      const quick = parseQuickExplain(md);
      return { en, zh, quick, path: f.path };
    }));
    clearStatus(container);
    container.innerHTML = '';
    for (const c of concepts) {
      const article = document.createElement('article');
      // Relative path to the concept markdown file
      article.innerHTML = `<h3><a href="${c.path}">${c.en}</a> <span>${c.zh}</span></h3><p>${c.quick}</p>`;
      container.appendChild(article);
    }
  } catch (e) {
    setError(container, `無法讀取概念：${e.message}`);
  }
}

async function loadSources() {
  const container = document.getElementById('source-list');
  try {
    const files = await fetchDir('vault/sources');
    if (files.length === 0) {
      clearStatus(container);
      container.innerHTML = '<li>尚無來源。</li>';
      return;
    }
    const sources = await Promise.all(files.map(async f => {
      const md = await fetchRaw(f.path);
      const { en } = parseTitleLine(md);
      const fm = parseFrontmatter(md);
      const kind = parseSourceKind(fm);
      return { en, kind, path: f.path };
    }));
    clearStatus(container);
    container.innerHTML = '';
    for (const s of sources) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${BLOB}/${s.path}">${s.en}</a> <span>${s.kind}</span>`;
      container.appendChild(li);
    }
  } catch (e) {
    setError(container, `無法讀取來源：${e.message}`);
  }
}

// ── init ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadTopics();
  loadConcepts();
  loadSources();
});
