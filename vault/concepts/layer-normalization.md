---
type: concept
aliases: [層正規化, LayerNorm]
topics: [machine-learning]
sources: ["[[CNN Architectures Supplement（卷積神經網路架構補充資料）]]"]
---

# Layer Normalization（層正規化）

## 中文速解
在單一樣本的所有特徵維度上進行標準化，適合序列與小批次的技術。

## Explanation
Layer Normalization computes the normalization statistics (mean and variance) across all feature channels for each individual sample independently of batch size. This makes it especially well suited for recurrent neural networks and transformer models where mini-batch sizes vary or sequential dependencies exist.

## Related concepts
- [[Batch Normalization（批次正規化）]]
- [[Transformer（轉換器架構）]]
- [[Recurrent Neural Network（循環神經網路）]]

## Sources
- [[CNN Architectures Supplement（卷積神經網路架構補充資料）]]
