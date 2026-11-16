# Learning Concept Atlas — AI 工作規則

## 1. 專案目的

本專案把零散的講義、網路文章與論文轉成可持續擴充的學習概念庫。內容以原始教材的英文術語為主，提供簡潔、準確的中文輔助解釋，並用連結呈現概念、主題與來源的關係。

同一份整理結果必須同時服務兩個介面：

- `vault/`：可直接由 Obsidian 開啟的本機 Markdown Vault。
- `website/`：可部署到 GitHub Pages 的公開靜態網站。

## 2. 資料夾責任

| 路徑 | 用途 | Git 狀態 |
| --- | --- | --- |
| `raw/` | **只放未處理**的原始資料；使用者唯一需要手動投入的位置 | 忽略 |
| `source-archive/` | 成功整理後移入的原始檔本機備份 | 忽略 |
| `vault/concepts/` | 每個可重複使用概念的一份筆記 | 提交 |
| `vault/sources/` | 每個講義、文章或論文的一份來源筆記 | 提交 |
| `vault/topics/` | 受控主題的定義與索引 | 提交 |
| `vault/_system/` | 來源登錄表、待確認事項與處理紀錄 | 提交 |
| `website/` | 公開網站的 HTML、CSS、JS 與靜態索引 manifest.json | 提交 |
| `scripts/` | 維護工具與自動化腳本（如產生 manifest 索引） | 提交 |

不得將原始講義、受版權保護的 PDF、下載論文或個人資料提交到 Git。

## 3. 唯一匯入流程：`同步 raw`

使用者說「同步 raw」時，依下列順序處理 `raw/` 中每一個檔案：

1. 讀取檔名、格式、可取得的中繼資料與文字內容；支援 PDF、PPTX、Markdown、純文字與網頁文章連結。
2. 計算 SHA-256 檔案指紋，並比對 `vault/_system/source-registry.json` 的 `content_hash`。
3. 檢查標題、作者、年份、版本、章節與核心概念，判定為：`duplicate`、`revision`、`supplement` 或 `new`。
4. `duplicate` 不建立新的筆記、不搬移檔案；在處理報告記錄比對結果。
5. `revision`、`supplement`、`new` 建立或更新來源筆記、概念筆記及主題索引；不可覆寫原有來源的追溯資訊。
6. 只有在所有筆記與來源登錄都成功更新後，才可將檔案從 `raw/` 移至 `source-archive/`。執行 `python3 scripts/generate_manifest.py` 產生最新 `website/manifest.json` 靜態索引。不需手動修改 `website/` 中的 HTML 或 CSS。
7. 執行驗證後，自動將本次整理產生的可提交檔案 `git add`、建立清楚的 commit，並 `git push origin main`。
8. 推送成功後，由 GitHub Pages 自動部署 `website/`；回報處理摘要、commit ID、推送結果與網站網址。

不得在使用者只說「同步 raw」時擅自刪除任何檔案。自動 Git 推送只屬於成功的「同步 raw」流程；在一般討論、草稿修改、分類待確認或驗證失敗時，禁止自動 commit 或 push。

## 4. 來源筆記規格

每一份處理完成的來源在 `vault/sources/` 建立一個英文 kebab-case 檔名，例如 `tcp-congestion-control-lecture.md`。

```md
---
type: source
title: TCP Congestion Control
source_kind: lecture_slides # lecture_slides | article | paper | book | note
topics: [networking]
status: processed
source_file: tcp-congestion-control.pdf
content_hash: "sha256:..."
processed_at: YYYY-MM-DD
---

# TCP Congestion Control（TCP 壅塞控制）

## Summary
以自己的話摘要來源的核心主張，不貼上長段原文。

## Covered concepts
- [[Congestion Control（壅塞控制）]]
```

論文額外記錄 `authors`、`year`、`venue`、`doi` 或 `url`（可取得時）。

## 5. 概念筆記規格

一個概念只維護一份筆記；多份來源列在同一概念頁。檔名使用英文 kebab-case，例如 `backpropagation.md`。畫面標題格式固定為 `English Term（中文）`。

```md
---
type: concept
aliases: [中文名稱]
topics: [machine-learning]
sources: ["[[Source title]]"]
---

# Backpropagation（反向傳播）

## 中文速解
一句不超過 45 個中文字的白話解釋。

## Explanation
用原始教材術語說明；只寫有來源支持的內容。

## Related concepts
- [[Neural Network（神經網路）]]

## Sources
- [[Source title]]
```

每個概念必須有：標題、中文速解、至少一個來源、至少一個主題。例子與自我檢查題可選填；不要為湊格式而虛構。

## 6. 主題與標籤規則

主題是受控詞彙，不是任意標籤。先讀取 `vault/_system/topic-registry.json` 與既有 `vault/topics/`：

1. 一份來源可以有多個既有主題。
2. 先比對既有主題與同義詞；足以描述時禁止新增相似主題。
3. 只有來源的核心領域無法由既有主題描述時，才新增主題。
4. 新主題使用英文 kebab-case ID，並建立主題頁、中文名稱與一句話定義，同時更新登錄表。
5. 不確定分類時標為 `unclassified`，並記錄待確認事項；不可憑空創造標籤。

## 7. 寫作與網站規則

- 英文術語優先；中文是精確的理解輔助，不是逐字翻譯。
- 對外公開內容避免貼出講義全文、長段引用或私密資訊。
- 網站風格維持簡潔、淺色、資訊優先；不要加入登入、資料庫或不必要動畫。
- `website/index.html` 是導覽首頁。頁面透過 `website/assets/app.js` 優先讀取由 `scripts/generate_manifest.py` 產生的 `website/manifest.json` 靜態索引（並以 GitHub API 作為備援），自動顯示概念卡片、來源清單與主題索引。AI 不需為新增內容修改 HTML 或 CSS；只要依規則產生靜態索引並完成 Git push，網站重新整理後即自動顯示。
- 提交前檢查內部連結、Git 忽略規則與網站在靜態伺服器下是否可瀏覽。

## 8. 完成條件

一次匯入只有在以下項目皆完成時才算成功：來源可追溯、概念有中文速解、主題符合受控規則、Obsidian 連結可用、網站可瀏覽、原始檔安全歸檔且未加入 Git、變更已成功推送至 `main`。

