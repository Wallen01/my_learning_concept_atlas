---
type: concept
aliases: [殘差網路, ResNet]
topics: [machine-learning]
sources: ["[[CNN Architectures（卷積神經網路經典架構）]]", "[[CNN Architectures Supplement（卷積神經網路架構補充資料）]]"]
---

# Residual Network（殘差網路）

## 中文速解
透過跳躍連接學習殘差映射，解決極深層網路退化問題的 CNN 架構。

## Explanation
Residual Networks (ResNets) introduce shortcut (skip) connections that bypass one or more layers, formulating layer mappings as residual functions $H(x) = F(x) + x$. This identity shortcut allows smooth gradient flow during backpropagation, enabling networks with dozens or hundreds of layers to train successfully.

## Related concepts
- [[Convolutional Neural Network（卷積神經網路）]]
- [[AlexNet（AlexNet 架構）]]
- [[Batch Normalization（批次正規化）]]

## Sources
- [[CNN Architectures（卷積神經網路經典架構）]]
- [[CNN Architectures Supplement（卷積神經網路架構補充資料）]]
