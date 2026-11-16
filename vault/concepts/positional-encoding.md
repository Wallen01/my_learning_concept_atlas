---
type: concept
aliases: [位置編碼]
topics: [machine-learning]
sources: ["[[Attention and Transformers Supplement（注意力機制與 Transformer 補充資料）]]"]
---

# Positional Encoding（位置編碼）

## 中文速解
為無序的自注意力機制注入序列前後順序資訊的嵌入向量表示。

## Explanation
Because standard Self-Attention operates on sets of tokens without an inherent sense of sequence order, positional encoding vectors are added to or combined with token representations. Classic approaches employ sinusoidal functions of varying frequencies, while learned or relative embeddings encode sequential inductive biases.

## Related concepts
- [[Transformer（轉換器架構）]]
- [[Rotary Position Embedding（旋轉位置編碼）]]
- [[Permutation Equivariance（置換等變性）]]

## Sources
- [[Attention and Transformers Supplement（注意力機制與 Transformer 補充資料）]]
