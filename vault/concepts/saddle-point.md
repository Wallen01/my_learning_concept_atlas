---
type: concept
aliases: [鞍點]
topics: [machine-learning]
sources: ["[[Regularization and Optimization Supplement（正規化與最佳化補充資料）]]"]
---

# Saddle Point（鞍點）

## 中文速解
梯度為零但並非極值，易使高維梯度最佳化停滯的臨界點。

## Explanation
A saddle point is a critical point where the gradient $
abla L(w) = 0$, but the Hessian matrix contains both positive and negative eigenvalues. In high-dimensional deep learning loss surfaces, saddle points and surrounding plateaus are far more common than true local minima and can severely slow down optimization.

## Related concepts
- [[Optimization（最佳化）]]
- [[Adam Optimizer（Adam 最佳化器）]]

## Sources
- [[Regularization and Optimization Supplement（正規化與最佳化補充資料）]]
