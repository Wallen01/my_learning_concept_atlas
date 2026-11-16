---
type: concept
aliases: [k 近鄰演算法, k-NN]
topics: [machine-learning]
sources: ["[[Image Classification with Linear Classifiers（使用線性分類器的影像分類）]]"]
---

# k-Nearest Neighbors（k 近鄰演算法）

## 中文速解
依據特徵空間中最近的 k 個鄰近樣本類別進行多數決的分類法。

## Explanation
The k-Nearest Neighbors (k-NN) algorithm classifies query points by computing distances (such as L1 Manhattan or L2 Euclidean distance) to all training points and taking a majority vote among the k closest samples. Training requires no computation (O(1)), but evaluation time scales linearly with dataset size (O(N)).

## Related concepts
- [[Linear Classifier（線性分類器）]]
- [[Image Classification（影像分類）]]

## Sources
- [[Image Classification with Linear Classifiers（使用線性分類器的影像分類）]]
