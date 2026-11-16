---
type: concept
aliases: [正規化, 正則化]
topics: [machine-learning]
sources: ["[[Regularization and Optimization（正規化與最佳化）]]"]
---

# Regularization（正規化）

## 中文速解
在損失函數中加入模型複雜度懲罰項以防止過擬合的技巧。

## Explanation
Regularization introduces a penalty term $R(W)$ to the training loss $L = rac{1}{N}\sum L_i + \lambda R(W)$ to prevent overfitting and encourage simpler models. Common forms include L2 regularization (weight decay) that penalizes large weights and L1 regularization that promotes sparsity.

## Related concepts
- [[Loss Function（損失函數）]]
- [[Optimization（最佳化）]]
- [[Batch Normalization（批次正規化）]]

## Sources
- [[Regularization and Optimization（正規化與最佳化）]]
