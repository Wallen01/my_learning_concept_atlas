---
type: concept
aliases: [閘控循環單元, GRU]
topics: [machine-learning]
sources: ["[[RNN Evolution to GRU and LSTM（從經典 RNN 到 GRU 與 LSTM 的演進）]]"]
---

# Gated Recurrent Unit（閘控循環單元）

## 中文速解
簡化 LSTM 架構、僅保留更新門與重置門的高效循環神經網路。

## Explanation
The Gated Recurrent Unit (GRU) is a streamlined variant of LSTM that merges the cell state and hidden state into a single state vector. It utilizes two gates—an update gate and a reset gate—to balance new input integration and past memory retention with fewer parameters and lower computational overhead.

## Related concepts
- [[Recurrent Neural Network（循環神經網路）]]
- [[Long Short-Term Memory（長短期記憶網路）]]

## Sources
- [[RNN Evolution to GRU and LSTM（從經典 RNN 到 GRU 與 LSTM 的演進）]]
