# Learning Concept Atlas

將零散的講義、文章與論文整理為可連結的學習概念庫。原始檔案只需放入 `raw/`；整理後的 Markdown 可由 Obsidian 直接開啟，公開網站則以 GitHub Pages 呈現。

## 使用方式

1. 將新檔案放入 `raw/`。
2. 對 AI 說「同步 raw」。AI 必須依 [`AGENTS.md`](AGENTS.md) 的流程處理。
3. 本機以 Obsidian 開啟 `vault/`。
4. 本機預覽網站：`python3 -m http.server 8000 -d website`。

## 資料夾

- `raw/`：尚未處理的資料；不會提交至 GitHub。
- `source-archive/`：已成功處理的原始檔本機備份；不會提交至 GitHub。
- `vault/`：Obsidian 相容的 Markdown 知識庫。
- `website/`：不依賴框架的靜態 GitHub Pages 網站。
- `scripts/`：協助檢查待處理來源的工具。

詳細規則請見 [`AGENTS.md`](AGENTS.md)。

