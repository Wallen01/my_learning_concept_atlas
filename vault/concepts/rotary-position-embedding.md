---
type: concept
aliases: [旋轉位置編碼, RoPE]
topics: [machine-learning]
sources: ["[[Attention and Transformers Supplement（注意力機制與 Transformer 補充資料）]]"]
---

# Rotary Position Embedding（旋轉位置編碼）

## 中文速解
透過旋轉二維子空間向量以相對角度編碼位置、長度外推性佳的技術。

## Explanation
Rotary Position Embedding (RoPE) divides Query and Key vectors into 2D chunks and multiplies them by orthogonal rotation matrices according to their absolute positions. In dot-product attention, this rotation ensures the attention score depends purely on the relative token distance $(m - n)$, enabling strong context length extrapolation.

## Related concepts
- [[Positional Encoding（位置編碼）]]
- [[Transformer（轉換器架構）]]
- [[Attention（注意力機制）]]

## Sources
- [[Attention and Transformers Supplement（注意力機制與 Transformer 補充資料）]]
