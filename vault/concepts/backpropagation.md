---
type: concept
aliases: [反向傳播]
topics: [machine-learning]
sources: ["[[Neural Networks and Backpropagation（神經網路與反向傳播）]]"]
---

# Backpropagation（反向傳播）

## 中文速解
從誤差往回計算各層參數梯度，使模型能有效更新權重的演算法。

## Explanation
Backpropagation uses the chain rule to propagate the loss gradient from the output layer to earlier layers. The resulting gradients are used by an optimizer to update learnable parameters.

## Related concepts
- [[Neural Network（神經網路）]]

## Sources
- [[Neural Networks and Backpropagation（神經網路與反向傳播）]]

