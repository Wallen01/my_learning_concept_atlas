---
type: concept
aliases: [隨機梯度下降, SGD]
topics: [machine-learning]
sources: ["[[Regularization and Optimization（正規化與最佳化）]]"]
---

# Stochastic Gradient Descent（隨機梯度下降）

## 中文速解
每次迭代使用隨機抽取的小批次資料估算梯度並更新參數的方法。

## Explanation
Stochastic Gradient Descent (SGD) estimates the gradient of the total loss across the training set using mini-batches of randomly sampled training instances. This provides computational efficiency and introduces stochasticity that helps escape flat plateaus and suboptimal local minima.

## Related concepts
- [[Optimization（最佳化）]]
- [[Adam Optimizer（Adam 最佳化器）]]
- [[Backpropagation（反向傳播）]]

## Sources
- [[Regularization and Optimization（正規化與最佳化）]]
