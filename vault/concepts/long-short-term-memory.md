---
type: concept
aliases: [長短期記憶網路, LSTM]
topics: [machine-learning]
sources: ["[[RNN Evolution to GRU and LSTM（從經典 RNN 到 GRU 與 LSTM 的演進）]]"]
---

# Long Short-Term Memory（長短期記憶網路）

## 中文速解
透過細胞狀態與三個閘門控制資訊進出，緩解梯度消失的循環網路。

## Explanation
Long Short-Term Memory (LSTM) mitigates the vanishing gradient problem in recurrent networks by separating memory into an explicit cell state ($c_t$) and hidden state ($h_t$). Information flow is modulated by three gates: the forget gate, input gate, and output gate, allowing gradients to persist across many time steps.

## Related concepts
- [[Recurrent Neural Network（循環神經網路）]]
- [[Gated Recurrent Unit（閘控循環單元）]]

## Sources
- [[RNN Evolution to GRU and LSTM（從經典 RNN 到 GRU 與 LSTM 的演進）]]
