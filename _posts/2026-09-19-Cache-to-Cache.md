---
layout: post
title: "Cache-to-Cache: LLMs Talking Without Text"
categories:
- programming
- research
image:
  path: /assets/images/2026/09/19/Quote.png
  alt: The tools we use have a profound (and devious!) influence on our thinking habits, and therefore, on our thinking abilities. - Edsger W. Dijkstra
tags:
- Artificial Intelligence
- Machine Learning
- Large Language Models
- LLM
- KV Cache
- Multi-Agent Systems
math: true
---

Systems that use more than one LLM already exist. One model writes code. Another does math. Another is a general assistant. They are asked to work together. Today they talk in English. The first model writes a message. The second model reads those words. The first model's inner picture of the input has to become a line of text first. **This process both loses rich semantic information and incurs token-by-token generation latency** (Fu *et al.*, 2026a, Abstract).

Weaver said sending symbols and sending meaning are two different jobs. **The semantic problems are concerned with the identity, or satisfactorily close approximation, in the interpretation of meaning by the receiver, as compared with the intended meaning of the sender** (Weaver, 1949). Text-to-text (T2T) systems such as Mixture-of-Agents, MCP, and A2A still send that meaning as more words (Wang *et al.*, 2024; Anthropic, 2024; Surapaneni *et al.*, 2025). Fu *et al.* (2026a) ask a different question:

**Can LLMs communicate beyond text?** (Fu *et al.*, 2026a, Section 1)

Their answer is Cache-to-Cache (C2C). There is a Sharer model and a Receiver model. Both read the same question. The Sharer stores what it understood in its KV-Cache (the key and value lists a model already builds while it reads). A small extra network maps that cache into the Receiver's shape. The Receiver writes the answer from both caches. It does not wait for the Sharer to write a message. **Experiments show that C2C achieves 6.4-14.2% higher average accuracy than individual models.** **It further outperforms the text communication paradigm by approximately 3.1-5.4%, while delivering an average 2.5× speedup in latency** (Fu *et al.*, 2026a, Abstract). The code is public (Fu *et al.*, 2026b).

## The Text-to-Text Bottleneck

Two kinds of multi-LLM systems are already in use.

Collaborative systems give models jobs and pass written messages. **LLMs are assigned distinct roles and proactively exchange text messages** (Fu *et al.*, 2026a, Section 1). Mixture-of-Agents is the main example: each round of models reads the last round's text and writes more text (Wang *et al.*, 2024). MCP and A2A set a common format for tools and for agent-to-agent tasks (Anthropic, 2024; Surapaneni *et al.*, 2025). **These approaches rely on text-level interfaces, where communication requires one model to generate text token-by-token and another to ingest it as input** (Fu *et al.*, 2026a, Section 2.2).

Routing systems pick one model for each question. RouteLLM trains a router so easy questions go to a cheap model and hard questions go to a strong one (Ong *et al.*, 2024). **By contrast, routing-based multi-LLM inference systems rely on passive context inheritance rather than active message exchange** (Fu *et al.*, 2026a, Section 1). **Downstream models inherit the context from preceding models in multi-round conversations, then generate follow-up responses to the new questions based on their own understanding of the conversation history** (Fu *et al.*, 2026a, Section 1).

T2T then hits three problems at once (Fu *et al.*, 2026a, Section 1):

1. **First, as a low-bandwidth medium, text introduces an information bottleneck. The high-dimensional internal representations must be repeatedly compressed into linear strings and then decompressed by the receiver LLM** (Fu *et al.*, 2026a, Section 1). Fu *et al.*'s running example is a Coder that treats `<p>` as a paragraph separator and a Writer that treats it as an unknown token.
2. **Second, natural language is inherently ambiguous, with idioms, underspecified references, and vague expressions** (Fu *et al.*, 2026a, Section 1). **Although recent agent protocols aim to standardize text messages, rigid templates remain insufficient for flexible, open-domain collaboration** (Fu *et al.*, 2026a, Section 1).
3. **Third, T2T communication incurs noticeable latency. Every exchange requires exhaustive, token-by-token decoding of contextual explanations in sequence** (Fu *et al.*, 2026a, Section 1).

Figure 1 shows the contrast. **Previous Text-to-Text (T2T) communication passes information through explicit text generation.** **Our Cache-to-Cache (C2C) communication directly projects and merges KV-Cache with rich semantics from different LLMs** (Fu *et al.*, 2026a, Section 1). T2T: the Sharer writes a message, then the Receiver reads it. C2C: no message. The two caches are mapped and mixed.

|![T2T versus C2C](/assets/images/2026/09/19/1.png)|
|:--:|
|*[From https://arxiv.org/abs/2510.03215](https://arxiv.org/abs/2510.03215)*|

|![Coder-Writer example](/assets/images/2026/09/19/2.png)|
|:--:|
|*[From https://arxiv.org/abs/2510.03215](https://arxiv.org/abs/2510.03215)*|

In Figure 2, **the Coder's ambiguous text instruction fails to convey the structural semantics of `<p>` as a paragraph separator, causing the Writer to misplace the content. C2C directly projects the Coder's KV-Cache into the Writer, transferring both the semantic understanding and precise insertion location without intermediate text generation** (Fu *et al.*, 2026a, Section 1).

## Where Cache Communication Already Exists

Other papers already reuse KV-Cache. Most of them do it for speed, and only when the models are close cousins.

Same-family reuse is about speed. DroidSpeak **enables KV cache reuse across distributed nodes running inference of different LLMs, so long as the LLMs have the same architecture**. It **selectively recomputes a few layers of the KV cache produced by another LLM and reuses the remaining layers** (Liu *et al.*, 2024). KVCOMM is a **training-free framework** that reuses shared text across agents of the same model by **aligning cache offsets of overlapping contexts under diverse prefix contexts** (Ye *et al.*, 2025). Both keep the cache inside one model family. **Unlike existing cache sharing methods that are restricted to only a single model or models with identical structure and size, our method supports sharing across different model families and varying model sizes** (Fu *et al.*, 2026a, Section 2.1).

Some papers also send KV-Cache as the message, but they pick layers instead of mapping them. Shi *et al.* (2026), in a paper also at ICLR 2026, propose **efficient communication between LLMs through selective sharing of KV pairs**. C2C instead **projects the KV-Cache from a source model into the space of a target model and merges them through a neural cache fuser** (Fu *et al.*, 2026a, Section 1). Same kind of object, different job: pick layers, or map and mix.

Sharing without text does not have to use KV-Cache. Zheng *et al.* (2025) introduce **thought communication, which enables agents to interact directly mind-to-mind, akin to telepathy**. C2C stays in the KV-Cache that the Receiver already uses when it writes the next token.

## Why KV-Cache Could Work

A model writes an answer in two stages: prefill, then decode. Prefill reads the whole question and saves a KV-Cache $$C(X)$$. Decode writes the answer one token at a time, using that cache plus the cache of tokens already written (Fu *et al.*, 2026a, Section 3.1):

$$
y_{i+1} = P\big(y_i \mid C(X) \oplus C(Y_{[0:i]})\big)
$$

**We define the LLM that provides contextual understanding or knowledge as Sharer, and the one that utilizes it as Receiver** (Fu *et al.*, 2026a, Section 3.1).

Fu *et al.* (2026a) first run two special tests, called oracles. An oracle test is allowed to use a trick that a real product might not use. The goal is to see if the idea can work at all. They ask: **(1) Benefit: can a model's capabilities be improved through KV-Cache semantic enrichment without extending sequence length? (2) Convertibility: can the KV-Cache of one model be effectively utilized by another model?** (Fu *et al.*, 2026a, Section 3.2).

Better cache, not a longer cache. Showing a few example questions before the real question often helps. Fu *et al.* (2026a) ask why. Is it because the model has more tokens to look at? Or do the examples change how the question itself is stored in the KV-Cache? They try three setups. Direct: the model reads only the question. Few-shot: the model reads the examples and the question, and it keeps that longer cache. Oracle: the model reads the same examples and question, then they **discard the exemplar segment** and keep a cache that is only as long as the question (Fu *et al.*, 2026a, Section 3.2.1). In Table 1, Direct is 58.42%, Oracle is 62.34%, and Few-shot is 63.39%. Oracle is almost as good as Few-shot, even though the cache is not longer. **Selectively applying cache enrichment to the top-performing layers (e.g., top-5) yields slightly higher accuracy than enriching all layers, while targeting the worst-performing layers leads to accuracy decline** (Fu *et al.*, 2026a, Section 3.2.1). Some layers get better. Some get worse. That is why the fuser has a gate. It can turn sharing on only for layers that help.

One model's cache can be mapped. It is not the same as the other model's cache. A small 3-layer network maps Qwen3-4B cache toward Qwen3-0.6B. **The raw KV-Caches of the two LLMs are far apart in representation space. After transformation, the mapped KV-Cache lies inside the target model's representation space** (Fu *et al.*, 2026a, Section 3.2.2). **The transformed cache occupies only a smaller subset of the target's space** (Fu *et al.*, 2026a, Section 3.2.2). The Sharer's understanding can be used. It does not fill the Receiver's whole space. Mix the two caches. Do not replace the Receiver's cache.

## Cache-to-Cache Design

The job is to copy useful understanding from the Sharer into the Receiver. Do not erase what the Receiver already stored.

During prefill, a small fuser $$F_n$$ at each layer reads the Receiver cache at layer $$n$$ and the Sharer cache at a matched layer $$G(n)$$, then adds the extra on top (Fu *et al.*, 2026a, Section 3.3.1):

$$
C^{F} = \big\{ C_n(X) + F_n\big(C_n(X),\, C^{S}_{G(n)}(X)\big) \big\}_{n=1}^{N}
$$

Then the Receiver writes the next token from that mixed cache, plus the cache of words it has already written (Fu *et al.*, 2026a, Section 3.3.1):

$$
y_{i+1} = P\big(y_i \mid C^{F}(X) \oplus C(Y_{[0:i]})\big)
$$

|![Cache fuser](/assets/images/2026/09/19/3.png)|
|:--:|
|*[From https://arxiv.org/abs/2510.03215](https://arxiv.org/abs/2510.03215)*|

The fuser has three parts. **To enhance the Receiver's KV-Cache without destructive overwriting of its information, the fuser is designed under a residual integration principle** (Fu *et al.*, 2026a, Section 3.3.2). As shown in Figure 5:

1. **Projection module concatenates the Receiver's KV-Cache with the Sharer's KV-Cache, then processes the concatenated features through a projection layer followed by a feature fusion layer** (Fu *et al.*, 2026a, Section 3.3.2).
2. **Dynamic weighting module applies an input-aware head modulation layer to dynamically reweight the projected information** (Fu *et al.*, 2026a, Section 3.3.2).
3. **Learnable gate introduces a trainable per-layer gate value that decides whether to inject the Sharer's context. The gate applies a Gumbel-sigmoid with temperature annealing to smoothly transition from differentiable during training to binary at inference** (Fu *et al.*, 2026a, Section 3.3.2).

The Receiver's cache stays. The Sharer is added, not put in its place.

When the two models are from different families, two things must be lined up. **We align them by decoding each Receiver token into its string form and re-encoding it using the Sharer's tokenizer. When one-to-many mappings occasionally occur, we select the Sharer token with maximal string coverage to preserve information.** **For layer alignment, we adopt a terminal alignment strategy: the final layers of both models are aligned first, then the penultimate layers, and so on in reverse order until reaching the shallower model's first layer** (Fu *et al.*, 2026a, Section 3.3.3). **During training, we freeze both the Sharer and Receiver models, training only the C2C module for KV-Cache fusion** (Fu *et al.*, 2026a, Section 3.3.4).

A bigger fuser (C2C-C) adds another small network and closes more of the gap between a strong Sharer and a weak Receiver. **The focus of this work is on introducing the C2C paradigm itself. For this purpose, we adopt a simple yet effective fuser design** (Fu *et al.*, 2026a, Appendix A.1.3).

## What the Experiments Show

In the main test the Receiver is always Qwen3-0.6B. The Sharer is Qwen2.5-0.5B-Instruct, Llama 3.2-1B, or Qwen3-4B-Base. Other tests also use Gemma 3, and sizes from 0.6B to 14B. The main fusors train on the first 500k samples of OpenHermes-2.5. The four tests are OpenBookQA, MMLU-Redux, ARC-Challenge, and C-Eval. There are no extra examples in the prompt (zero-shot). The model always picks the most likely next token (temperature 0). Multiple-choice answers may use at most 64 tokens. Timing uses one NVIDIA A100 and one question at a time (Fu *et al.*, 2026a, Section 4.1). They compare C2C with the Receiver alone, the Sharer alone, T2T (the Sharer writes one sentence of background and is told not to answer), and routing after Ong *et al.* (2024).

Average accuracy on the four tests, Receiver always Qwen3-0.6B:

| Sharer | Receiver | Sharer | Routing | T2T | C2C |
|---|---:|---:|---:|---:|---:|
| Qwen2.5-0.5B | 37.0 | 41.6 | 37.9 | 42.6 | 48.0 |
| Llama 3.2-1B | 37.0 | 32.4 | 34.7 | 42.4 | 46.6 |
| Qwen3-4B-Base | 37.0 | 2.6 | 18.3 | 45.8 | 48.8 |

**After applying C2C, accuracy increases by an average of 11.00%, 9.64%, and 11.88% across the three Sharers. Compared with text-to-text communication, C2C achieves an average accuracy increase of 5.36%, 4.15%, and 3.06%** (Fu *et al.*, 2026a, Section 4.2). **Query-level routing prioritizes efficiency but limits accuracy to the better of the two original models** (Fu *et al.*, 2026a, Section 4.2).

**Qwen3-4B Base as the Sharer often ignores instructions, resulting in poor standalone performance and excessively long T2T communication times. In contrast, C2C bypasses this issue**, so a weaker instruction-tuned Receiver can still use the base model's cache (Fu *et al.*, 2026a, Section 4.2).

Latency on MMLU-Redux for Sharer Qwen2.5-0.5B and Receiver Qwen3-0.6B (Fu *et al.*, 2026a, Table 3):

| | Receiver | Sharer | T2T | C2C |
|---|---:|---:|---:|---:|
| Sharer output tokens | - | 19 | 80 | 0 |
| Total time (ms) | 308 | 346 | 1596 | 445 |

T2T spends 1312 ms writing the Sharer's 80-token message. C2C spends 90 ms mixing caches instead (Fu *et al.*, 2026a, Table 3). **C2C achieves significant speedups of 3.46×, 1.51×, and 14.41× over T2T** (Fu *et al.*, 2026a, Section 4.2). Llama 3.2 looks very fast because it often writes only a single letter. Qwen2.5-Math looks very slow at T2T because it ignores the short-answer format and writes a long solution (Fu *et al.*, 2026a, Appendix A.4.3).

They also test what happens if you erase the Receiver's cache and put only the mapped Sharer cache in. Average accuracy falls to 20.70% on the four tests. If you keep the Receiver cache and add the Sharer on top, the score jumps to 44.88%. The learned gate adds another 3.07 points, to 47.95% (Fu *et al.*, 2026a, Table 8). **Compared with pure projection that discards the Receiver's cache, fusing both models' KV-Caches and retaining the Receiver's via residual connection increases accuracy by 24.18%. Adding a gate for fused layer selection further increases the average accuracy by 3.07%** (Fu *et al.*, 2026a, Section 4.4). With the same training budget, C2C also beats training the Receiver with no Sharer, and beats a setup where the same LLM is both Sharer and Receiver, while using fewer trainable weights (478M versus 596M and 529M). **This confirms that C2C improvements do not purely come from added trainable capacity or overfitting to the training set, it points to complementary contextual understanding contributed by the heterogeneous Sharer** (Fu *et al.*, 2026a, Section 4.4).

Mixing the two caches takes 90 ms at answer time (Fu *et al.*, 2026a, Table 3). The Sharer and the Receiver are not trained. Only a small extra network, the fuser, is trained. That fuser belongs to one pair of models. A new Sharer-Receiver pair needs a new fuser. During training the Receiver tries to guess the next token of the answer, and only the fuser's weights change. **With 300 training steps (less than 9 GPU hours), C2C achieves a comparable result to the final checkpoint** (Fu *et al.*, 2026a, Appendix A.4.5). A full run is about 45-54 GPU hours. **We also find that in some specific cases, C2C may fail as the contextual understanding from the Sharer model is not always accurate and can mislead the Receiver into generating the wrong answer** (Fu *et al.*, 2026a, Section 4.5).

## Limitations

A weak Sharer can hurt a strong Receiver. **Multi-LLM systems experience performance degradation when a much weaker Sharer provides noisy information to a stronger Receiver. This limitation is shared by both T2T and C2C, as Sharer semantic quality directly impacts Receiver performance** (Fu *et al.*, 2026a, Section 5).

Each pair of models needs its own fuser. **While pairwise KV-Cache communication is feasible and advantageous, scaling up the number of communicating LLMs with O(N) training cost remains an open problem** (Fu *et al.*, 2026a, Section 5). The appendix tries shared projectors and more than one Sharer. That is a sketch, not the main result (Fu *et al.*, 2026a, Appendix A.5.1 and A.5.2).

The simple fuser is not the best they tried. C2C-C closes more of the gap between a strong Sharer and a weak Receiver. They still publish the simpler one because **the focus of this work is on introducing the C2C paradigm itself** (Fu *et al.*, 2026a, Appendix A.1.3).

Matching tokens and layers is a simple rule, not a proven best method. The mapped cache covers only part of the Receiver's space. That is why they add the Sharer on top instead of replacing the Receiver.

The main tests use small Receivers, multiple-choice questions, greedy decoding, and answers of at most 64 tokens. Longer agent-style work is a case study in the appendix, not Table 4.

C2C does not replace MCP or A2A. Those still matter when the thing being sent is a tool call or a message a person will read. It does not claim that any two models can share cache this way with no training. It shows that, for a trained pair, sending cache can work better than sending the Sharer's written message.

## Conclusion

**We demonstrate that LLMs can communicate beyond text** (Fu *et al.*, 2026a, Section 6). Cache-to-Cache maps and mixes KV-Caches so a Receiver can use what a Sharer understood, without waiting for a written message. On Fu *et al.*'s tests it is more accurate than one model, and both more accurate and faster than T2T. What gets sent is the cache. Which Sharer you pick, and whether that pair was trained, still matters.

## References

### Academic Papers and Research

- [Fu, T., Min, Z., Zhang, H., Yan, J., Dai, G., Ouyang, W. and Wang, Y. (2026a) 'Cache-to-Cache: Direct Semantic Communication Between Large Language Models', *Proceedings of the International Conference on Learning Representations*.](https://arxiv.org/abs/2510.03215)
- [Liu, Y., Huang, Y., Yao, J., Feng, S., Gu, Z., Du, K., Li, H., Cheng, Y., Jiang, J., Lu, S., Musuvathi, M. and Choukse, E. (2024) 'DroidSpeak: KV Cache Sharing for Cross-LLM Communication and Multi-LLM Serving', arXiv:2411.02820.](https://arxiv.org/abs/2411.02820)
- [Ye, H., Gao, Z., Ma, M., Wang, Q., Fu, Y., Chung, M., Lin, Y., Liu, Z., Zhang, J., Zhuo, D. and Chen, Y. (2025) 'KVCOMM: Online Cross-context KV-cache Communication for Efficient LLM-based Multi-agent Systems', *Advances in Neural Information Processing Systems*.](https://arxiv.org/abs/2510.12872)
- [Shi, X., Chiesa, M., Maguire Jr, G.Q. and Kostic, D. (2026) 'KVComm: Enabling Efficient LLM Communication through Selective KV Sharing', *Proceedings of the International Conference on Learning Representations*.](https://arxiv.org/abs/2510.03346)
- [Wang, J., Wang, J., Athiwaratkun, B., Zhang, C. and Zou, J. (2024) 'Mixture-of-Agents Enhances Large Language Model Capabilities', arXiv:2406.04692.](https://arxiv.org/abs/2406.04692)
- [Ong, I., Almahairi, A., Wu, V., Chiang, W., Wu, T., Gonzalez, J.E., Kadous, M.W. and Stoica, I. (2024) 'RouteLLM: Learning to Route LLMs with Preference Data', arXiv:2406.18665.](https://arxiv.org/abs/2406.18665)
- [Zheng, Y., Zhao, Z., Li, Z., Xie, Y., Gao, M., Zhang, L. and Zhang, K. (2025) 'Thought Communication in Multiagent Collaboration', *Advances in Neural Information Processing Systems*.](https://arxiv.org/abs/2510.20733)
- [Weaver, W. (1949) 'Recent contributions to the mathematical theory of communication', in Shannon, C.E. and Weaver, W., *The Mathematical Theory of Communication*. Urbana: University of Illinois Press.](https://archive.org/details/in.ernet.dli.2015.503815)

### Technical Articles and Blogs

- [Anthropic (2024) 'Introducing the Model Context Protocol'.](https://www.anthropic.com/news/model-context-protocol)
- [Surapaneni, R., Jha, M., Vakoc, M. and Segal, T. (2025) 'Announcing the Agent2Agent Protocol (A2A)', *Google Developers Blog*, 9 April.](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [Fu, T., Min, Z., Zhang, H., Yan, J., Dai, G., Ouyang, W. and Wang, Y. (2026b) 'Cache-to-Cache source code', GitHub.](https://github.com/thu-nics/C2C)
