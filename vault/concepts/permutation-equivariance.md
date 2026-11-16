---
type: concept
aliases: [置換等變性]
topics: [machine-learning]
sources: ["[[Attention and Transformers Supplement（注意力機制與 Transformer 補充資料）]]"]
---

# Permutation Equivariance（置換等變性）

## 中文速解
當輸入順序發生置換時，模型輸出結果也會產生相同順序置換的特性。

## Explanation
A function $f$ exhibits permutation equivariance if reordering its input elements results in the identical reordering of its output elements: $f(\pi(X)) = \pi(f(X))$. Standard Self-Attention and point cloud networks naturally satisfy permutation equivariance across rows/tokens when no positional encoding is applied.

## Related concepts
- [[Transformer（轉換器架構）]]
- [[Positional Encoding（位置編碼）]]

## Sources
- [[Attention and Transformers Supplement（注意力機制與 Transformer 補充資料）]]
