---
type: concept
aliases: [批次正規化, BatchNorm]
topics: [machine-learning]
sources: ["[[CNN Architectures Supplement（卷積神經網路架構補充資料）]]"]
---

# Batch Normalization（批次正規化）

## 中文速解
在批次維度上將特徵標準化並學習縮放偏移，以加速與穩定訓練的技術。

## Explanation
Batch Normalization standardizes activation values across the mini-batch dimension to zero mean and unit variance during training, followed by learnable scale ($\gamma$) and shift ($eta$) parameters. This accelerates convergence, mitigates vanishing/exploding gradients, and reduces sensitivity to parameter initialization.

## Related concepts
- [[Layer Normalization（層正規化）]]
- [[Convolutional Neural Network（卷積神經網路）]]
- [[Residual Network（殘差網路）]]

## Sources
- [[CNN Architectures Supplement（卷積神經網路架構補充資料）]]
