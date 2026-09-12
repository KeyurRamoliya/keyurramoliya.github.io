---
layout: post
title: "The Polysemy of Mechanistic Interpretability"
categories:
- programming
- research
image:
  path: /assets/images/2026/09/06/Quote.png
  alt: Mathematics is the art of giving the same name to different things. - Henri Poincaré
tags:
- Mechanistic Interpretability
- Language Models
- NLP
- Artificial Intelligence
- Interpretability
---

The term mechanistic interpretability now appears in workshops, reading groups, grants, and much of the new work on language models. The growth has not come with a shared definition. **Researchers, whether experienced or new to the field, often ask what makes some interpretability research “mechanistic”** (Saphra and Wiegreffe, 2024, Section 1). The paper [*Mechanistic?*](https://arxiv.org/abs/2410.09087) by Naomi Saphra and Sarah Wiegreffe attempts to answer that question by treating the confusion as data: the word has drifted, and the drift tracks a split between two communities that both study language models.

**The rise of the term mechanistic interpretability has accompanied increasing interest in understanding neural models—particularly language models. However, this jargon has also led to a fair amount of confusion** (Saphra and Wiegreffe, 2024, Abstract). Two papers can both be labelled mechanistic and still disagree about what was measured: a causal circuit, a look at activations, a lab affiliation, or simply "interpretability" in 2024.

**When work is labelled as mechanistic interpretability research, the label may refer to** four different things (Saphra and Wiegreffe, 2024, Section 1):

1. **Narrow technical definition: A technical approach to understanding neural networks through their causal mechanisms** (Saphra and Wiegreffe, 2024, Section 1).
2. **Broad technical definition: Any research that describes the internals of a model, including its activations or weights** (Saphra and Wiegreffe, 2024, Section 1).
3. **Narrow cultural definition: Any research originating from the MI community** (Saphra and Wiegreffe, 2024, Section 1).
4. **Broad cultural definition: Any research in the field of AI—especially LM—interpretability** (Saphra and Wiegreffe, 2024, Section 1).

**Exacerbating this confusion, mechanistic interpretability in the narrow cultural definition describes the authors of a paper, rather than their methods or objectives** (Saphra and Wiegreffe, 2024, Section 1). That is a different claim from naming a method.

**We argue that the polysemy of mechanistic is the product of a critical divide within the interpretability community** (Saphra and Wiegreffe, 2024, Abstract). The rest of the paper traces that divide and argues for bridging it.

## So What Is Mechanistic?

**Before the term mechanistic described a cultural movement, NLPI researchers occasionally used the term mechanisms to refer to internal algorithmic implementation, as suggested by Marr’s levels of analysis** (Saphra and Wiegreffe, 2024, Section 2). The technical meaning is older than the community label. The paper starts there, then shows how coinage and culture pulled the word away from that meaning.

### Narrow Technical Definition: Causal Mechanisms

**Mechanistic interpretability derives its name from causal mechanisms** (Saphra and Wiegreffe, 2024, Section 2.1). In a causal model, a mechanism is a function that takes some variables as causes and produces others as effects, under regularities that behave like laws. **Causal mechanisms are a necessary component of any causal model explaining an outcome** (Saphra and Wiegreffe, 2024, Section 2.1).

**The narrow technical definition of MI thus describes research that discovers causal mechanisms explaining all or some part of the change from neural network input to output at the level of intermediate model representations** (Saphra and Wiegreffe, 2024, Section 2.1). The claim is not only “the model does X.” It is “these internal parts implement X, and intervening on them changes X.”

The paper’s running example is induction heads. **One mechanistic interpretation explains how an LM can predict “B” from the input sequence “ABABA” using induction heads: attention heads that search for a previous occurrence of “A” in combination with other heads that attend to the token that follows it** (Saphra and Wiegreffe, 2024, Section 2.1; Olsson *et al.*, 2022). The behavior is pattern completion. The mechanism is a pair of attention operations on intermediate states, not a black-box input/output test.

That definition **requires causal methods of understanding, but excludes those that do not investigate intermediate neural representations, such as behavioral testing with input-output pairs** (Saphra and Wiegreffe, 2024, Section 2.1; Ribeiro *et al.*, 2020). Checklists and evals still matter for knowing *that* a model does something. Under this definition, they are not mechanistic. **It also excludes non-causal methods, such as describing representational structure or correlating activation features with particular inputs and outputs** (Saphra and Wiegreffe, 2024, Section 2.1). A probe that reads a concept from a hidden state is not, by itself, a mechanism.

Psychology prefers explanations that name causal mechanisms, not only correlations. **Tan (2022) argues that likewise, explanations in machine learning should focus on causal mechanisms linking input and output** (Saphra and Wiegreffe, 2024, Section 2.1; Tan, 2022). Real systems have many paths to an outcome, so a complete causal graph would not be usable. **Therefore, explanation requires distillation** (Saphra and Wiegreffe, 2024, Section 2.1). Humans distill by keeping proximal mechanisms. Networks can be intervened on directly, so interpretability can distill by **causal abstraction**: a coarser causal model that remains a faithful simplification of the true one (Geiger *et al.*, 2021).

Some later causal-interpretability work wants an even narrower bar: **explanation through a complete end-to-end causal pathway from model inputs to outputs via intermediate neural representations** (Saphra and Wiegreffe, 2024, Section 2.1; Geiger *et al.*, 2021). **This definition excludes most early work in MI, and has not yet been widely adopted** (Saphra and Wiegreffe, 2024, Section 2.1). Induction heads fail it. **Induction heads, for example, only describe one component in the causal pathway—under the end-to-end definition, one would also need to explain how the model identifies the input “ABABA” as a 2-token repeating pattern, and then how the model predicts “B” after attending to earlier occurrences of it** (Saphra and Wiegreffe, 2024, Section 2.1). A real circuit can still be incomplete. Completeness is a higher standard, not the definition the field actually uses.

### Coinage and the Broad Technical Definition

**The term mechanistic interpretability was coined by Chris Olah and first publicly used in the Distill.pub Circuits thread, a series of blogposts by OpenAI researchers between March 2020–April 2021** (Saphra and Wiegreffe, 2024, Section 2.2; Olah *et al.*, 2020). **The first post set out to “understand the mechanistic implementations of neurons in terms of their weights”** (Saphra and Wiegreffe, 2024, Section 2.2; Olah *et al.*, 2020). After that group moved to Anthropic, the Transformer Circuits reports used the phrase until it became mainstream.

Elhage *et al.* (2021) provided the first explicit definition of MI (Saphra and Wiegreffe, 2024, Section 2.2): **attempting to reverse engineer the detailed computations performed by Transformers, similar to how a programmer might try to reverse engineer complicated binaries into human-readable source code** (Elhage *et al.*, 2021). The reverse-engineering analogy is the one that stuck. The ICML 2024 Mechanistic Interpretability workshop used similar wording: reverse-engineering algorithms into human-understandable mechanisms, often by examining weights and activations to identify circuits.

**While this definition still implicitly focuses on causal mechanisms, current MI research rarely makes reference to causality** (Saphra and Wiegreffe, 2024, Section 2.2). Once the job is “look at weights and activations,” many papers treat **any inspection of model internals** as mechanistic. **This semantic drift may have been inevitable—how could we reverse engineer a network without first inspecting its internal components?** (Saphra and Wiegreffe, 2024, Section 2.2). That is the broad technical definition. The further jump, using the word to label a community rather than a method, is what the paper says was less inevitable.

## A History of Two Language-Model Interpretability Communities

**Our current terminological confusion results from a historical accident: MI started as a movement with distinct technical objectives in computer vision, but ultimately moved into NLP without engaging the existing community which was already pursuing similar objectives** (Saphra and Wiegreffe, 2024, Section 3). The clash is not primarily “circuits versus probes.” It is two groups arriving at language models from different rooms.

### NLP Interpretability Before the Name

**NLP researchers published focused analyses of linguistic structure in neural models as early as 2016, primarily studying recurrent architectures like LSTMs** (Saphra and Wiegreffe, 2024, Section 3.1). The field grew with Transformers (Vaswani *et al.*, 2017). **The first BlackBoxNLP workshop was held in 2018** and became one of the most popular workshops at ACL conferences (Saphra and Wiegreffe, 2024, Section 3.1). ACL added an Interpretability and Analysis track in 2020.

**In many ways, the early NLPI field—which related model behavior to particular components, layers, and geometric properties—would be familiar to anyone in the current MI community** (Saphra and Wiegreffe, 2024, Section 3.1). **Not only is current research often reinventing their methods and rediscovering their findings, it is also repeating the same epistemological debates** (Saphra and Wiegreffe, 2024, Section 3.1). Those debates are the same contrasts the later MI literature treats as new: correlation versus causation, simple features versus subnetworks, unconstrained probes versus constrained interpretations.

**Distributional semantics.** After word2vec, NLP spent years interpreting embeddings geometrically. That line of work faded as a craze, but **still influences neural interpretability methods** (Saphra and Wiegreffe, 2024, Section 3.1.1). Additive structure in representation space reappears in task vectors, steering vectors, and a large fraction of recent MI papers. Critics already noted that embedding geometry need not track downstream behavior, and that frequency can dominate meaning. **These critiques remain salient to modern correlational interpretability methods, including similarity-based metrics** (Saphra and Wiegreffe, 2024, Section 3.1.1).

**Attention maps.** Attention was treated as a window into syntax, with both correlational and causal papers in BERT-era NLP. **NLPI researchers also identified some limitations of attention for interpretability** (Saphra and Wiegreffe, 2024, Section 3.1.2), including the finding that attention weights do not reliably explain a model’s output (Jain and Wallace, 2019). MI still attributes stereotyped behavior to heads and still uses attention as a saliency map, **though more frequently with results that are causally validated** (Saphra and Wiegreffe, 2024, Section 3.1.2). The tool is shared. The difference is often whether someone ran an intervention, not whether someone looked at attention.

**Neuron analysis and localization.** Early NLP work tied individual neurons to sentiment, syntax, bias, or token sequences, sometimes with causal checks. **MI research has largely pursued similar goals of localizing model behaviors to fine-grained model components, including neurons, through its focus on finding “circuits”** (Saphra and Wiegreffe, 2024, Section 3.1.3). A circuit is a subgraph that faithfully stands in for the full model on a narrow task. Single-neuron stories were already criticized as too small for the model; **polysemanticity** (one unit, many unrelated concepts) is the same problem MI now tries to fix with sparse autoencoders. **Like earlier neuron analysis methods, it also requires expensive causal validation** (Saphra and Wiegreffe, 2024, Section 3.1.3).

**Probing.** Probes extract linguistic information from hidden states. Lower layers look local; the stack can resemble a classical NLP pipeline. The probing literature was then attacked for weak baselines, for reading information out of random embeddings, and for missing causal grounding (Belinkov, 2022). Designs got simpler or more constrained. In this telling, the logit lens is a probe that uses the model's own unembedding (nostalgebraist, 2020). **The logit lens—like other probing methods before it—has been criticized for providing a largely incomplete causal explanation** (Saphra and Wiegreffe, 2024, Section 3.1.4). Recent MI linear probes and SAEs **inherit many critiques from the classic probing literature, including a lack of causal grounding** (Saphra and Wiegreffe, 2024, Section 3.1.4).

If a method looks new because the citation list starts in 2021, it may still be a known NLPI tool with a new name.

### How Mechanistic Interpretability Began as a Culture

**Not long ago “machine learning” referred primarily to computer vision research** (Saphra and Wiegreffe, 2024, Section 3.2.1). In that setting, interpretability mostly meant pixel-level gradient saliency. NLP had its own toolkit (geometry, attention, probes, neurons) and only borrowed saliency occasionally.

**When Chris Olah first described “mechanistic interpretability” in 2020, then, this was the cultural landscape of the ML field: Machine learning mostly meant image classification and interpretability mostly meant feature saliency** (Saphra and Wiegreffe, 2024, Section 3.2.1). **Olah has confirmed on multiple occasions that he coined the term to differentiate circuit analysis from saliency methods, which were subject to increasing skepticism at the time** (Saphra and Wiegreffe, 2024, Section 3.2.1). The contrast was sharp in vision. **The MI paradigm was crucial and novel within computer vision—but the community around it didn’t stay in computer vision** (Saphra and Wiegreffe, 2024, Section 3.2.1).

**The Circuits thread itself changed focus from vision to language in 2021, with the subsequent discovery of induction heads moving beyond existing efforts to characterize individual predictable attention heads to instead interpret the interaction between pairs of such heads** (Saphra and Wiegreffe, 2024, Section 3.2.2; Elhage *et al.*, 2021; Olsson *et al.*, 2022). NLPI researchers were interested. **Unlike in computer vision, MI’s goals and methods represented a direct continuation of the existing field** (Saphra and Wiegreffe, 2024, Section 3.2.2).

**Instead of a difference in methodology, the MI community brought a distinct culture to LM analysis** (Saphra and Wiegreffe, 2024, Section 3.2.2). Many arrived from outside NLP, often via arguments that language models posed existential risk and that understanding internals might help. **Until mid-2023, most MI research was shared on blogs or forums such as LessWrong and The AI Alignment Forum; on Discord and Slack; or at invite-only workshops** (Saphra and Wiegreffe, 2024, Section 3.2.2). Academic publication was optional; some alignment writers argued against publishing, on the grounds that it would advance capabilities.

Neel Nanda’s widely read field guide **avoided a strict technical definition of mechanistic interpretability, instead stating it “feels distinct,” differentiated by its “culture,” “research taste,” and epistemics** (Saphra and Wiegreffe, 2024, Section 3.2.2; Nanda, 2022). Attempts to draw a clean technical line produced odd splits: activation patching counted as MI, while ROME, which uses activation patching to edit models, was filed as non-MI. Gradient saliency, the thing the term was coined to *exclude*, **has re-emerged as another tool in the MI toolbox** (Saphra and Wiegreffe, 2024, Section 3.2.2).

**To whatever degree mechanistic originally reflected a formal notion of causal mechanisms, few researchers retain such a strict definition today. Instead, the formation of a separate, parallel language model interpretability community has led the term to its narrow cultural definition** (Saphra and Wiegreffe, 2024, Section 3.2.2).

When that network started publishing in conferences, the mismatch became public. NLPI researchers argued that MI work failed to cite roughly five years of *ACL literature, reinvented probes, and rediscovered tools. **And yet, despite these tensions, the energy and resources of the growing MI community could not be denied. Many NLPI researchers subsequently began to use the term mechanistic interpretability to signal their engagement with the MI conversation** (Saphra and Wiegreffe, 2024, Section 3.2.3).

### Broad Cultural Definition: We Are All Mechanistic Now

**Who wouldn’t want to work on mechanistic interpretability? Students need advisors. Funders need grant recipients. There is free pizza** (Saphra and Wiegreffe, 2024, Section 3.3). The paper is not joking about the incentive. Because so much growth and funding sits under that label, **the term has ceased to distinguish two separate communities and has grown into its broad cultural definition, encompassing the work of all interpretability researchers** (Saphra and Wiegreffe, 2024, Section 3.3).

Embracing the word has not erased every difference. Traditional NLPI still leans on linguistics and automata theory; those topics are niche but growing in MI. MI still leans on circuits, training dynamics, and follow-ups to Anthropic results such as sparse autoencoders, tools with NLPI ancestors that the citation trail often skips. There are signs of mixing: joint workshops, NLPI speakers at MI meetings, more MI work at general ML conferences. The remaining gap is often venue and bibliography, not the object of study.

## What the Four Uses Are For

After the history, the taxonomy is the part that remains usable.

| Use | Names | Does not name |
|---|---|---|
| Narrow technical | Causal mechanisms through internals | Evals, correlational probes |
| Broad technical | Any look at weights or activations | The community of the authors |
| Narrow cultural | Work from the MI community | A method |
| Broad cultural | Interpretability, especially of LMs | A technical distinction |

**The narrow cultural definition describes the authors of a paper, rather than their methods or objectives** (Saphra and Wiegreffe, 2024, Section 1). If the goal is to read a result, the technical column matters. If the goal is to understand why two similar papers cite disjoint literatures, the cultural column matters.

Induction heads stay in the narrow technical cell only if the claim is causal and about intermediate representations. They leave that cell if the write-up is only an attention map, and they fail the end-to-end causal-abstraction bar if the rest of the path is unspecified. That is the paper’s own example of why the word is doing too much work.

## Limitations

The paper makes it clear that this “history” turns on events only a couple of years old. **Popular MI tutorials and guides often begin their LM literature review in 2021-2022, providing a limited window for many new entrants to the field** (Saphra and Wiegreffe, 2024, Section 3). That is both a finding and a limit: the story is recent, and the authors are participants in it.

The cultural coding of papers (MI if lead authors entered through alignment, NLPI if they are tied to ACL interpretability) is a heuristic. **Not all of it is referred to as MI by the authors themselves** (Saphra and Wiegreffe, 2024, Section 3). A paper can sit in an MI venue and still reject the cultural definition.

**Mechanistic is just one example of the imprecise and ambiguous language used in interpretability research** (Saphra and Wiegreffe, 2024, Section 1). Appendix A compares it with other vague terms in NLPI. The authors argue this case is different because the ambiguity **exposes a cultural divide—one which is worth bridging for the sake of scientific progress** (Saphra and Wiegreffe, 2024, Section 1). They do not claim the four definitions will collapse into one, or that causal circuits have solved interpretability, or that the alignment case for MI is settled.

## Conclusion

**Whatever terminological confusion and ideological tension they have brought to the interpretability field, the MI community is also responsible for its newfound popularity** (Saphra and Wiegreffe, 2024, Section 4). The interest is real. **NLPI and MI researchers alike are motivated by social responsibility, intellectual curiosity, and the possibility of improving our tools** (Saphra and Wiegreffe, 2024, Section 4). Many MI researchers are also in the alignment community, **where the value of MI is questioned** (Saphra and Wiegreffe, 2024, Section 4). Consensus there could move away from interpretability. Some people and some funding would leave. **Others are likely to continue pursuing our shared objectives** (Saphra and Wiegreffe, 2024, Section 4).

**Our communities have too much in common: scientific curiosity and a belief that we should understand the tools we use. We will all continue striving for that objective as long as there are opaque models to understand. Why not, therefore, also aim to connect?** (Saphra and Wiegreffe, 2024, Section 4).

The paper’s last claim is not a new definition. It is a request: stop using *mechanistic* as a wall between two groups that are already measuring overlapping things.

## References

### Academic Papers and Research

- [Saphra, N. and Wiegreffe, S. (2024) 'Mechanistic?', arXiv:2410.09087.](https://arxiv.org/abs/2410.09087)
- [Tan, C. (2022) 'On the diversity and limits of human explanations', *Proceedings of NAACL-HLT*, pp. 2173–2188.](https://aclanthology.org/2022.naacl-main.158/)
- [Elhage, N., Nanda, N., Olsson, C., Henighan, T., Joseph, N., Mann, B., Askell, A., Bai, Y., Chen, A., Conerly, T., DasSarma, N., Drain, D., Ganguli, D., Hatfield-Dodds, Z., Hernandez, D., Jones, A., Kernion, J., Lovitt, L., Ndousse, K., Amodei, D., Brown, T., Clark, J., Kaplan, J., McCandlish, S. and Olah, C. (2021) 'A mathematical framework for transformer circuits', *Transformer Circuits Thread*.](https://transformer-circuits.pub/2021/framework/index.html)
- [Olsson, C., Elhage, N., Nanda, N., Joseph, N., DasSarma, N., Henighan, T., Mann, B., Askell, A., Bai, Y., Chen, A., Conerly, T., Drain, D., Ganguli, D., Hatfield-Dodds, Z., Hernandez, D., Johnston, S., Jones, A., Kernion, J., Lovitt, L., Ndousse, K., Amodei, D., Brown, T., Clark, J., Kaplan, J., McCandlish, S. and Olah, C. (2022) 'In-context learning and induction heads', *Transformer Circuits Thread*.](https://transformer-circuits.pub/2022/in-context-learning-and-induction-heads/index.html)
- [Jain, S. and Wallace, B.C. (2019) 'Attention is not Explanation', *Proceedings of NAACL-HLT*, pp. 3543–3556.](https://aclanthology.org/N19-1357/)
- [Ribeiro, M.T., Wu, T., Guestrin, C. and Singh, S. (2020) 'Beyond accuracy: behavioral testing of NLP models with CheckList', *Proceedings of the 58th Annual Meeting of the ACL*, pp. 4902–4912.](https://aclanthology.org/2020.acl-main.442/)
- [Belinkov, Y. (2022) 'Probing classifiers: promises, shortcomings, and advances', *Computational Linguistics*, 48(1), pp. 207–219.](https://aclanthology.org/2022.cl-1.7/)
- [Geiger, A., Lu, H., Icard, T. and Potts, C. (2021) 'Causal abstractions of neural networks', *Advances in Neural Information Processing Systems*, 34.](https://arxiv.org/abs/2106.02997)
- [Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, Ł. and Polosukhin, I. (2017) 'Attention is all you need', *Advances in Neural Information Processing Systems*, 30.](https://arxiv.org/abs/1706.03762)

### Technical Articles and Blogs

- [Olah, C., Cammarata, N., Schubert, L., Goh, G., Petrov, M. and Carter, S. (2020) 'Zoom in: an introduction to circuits', *Distill*.](https://distill.pub/2020/circuits/zoom-in/)
- [Nanda, N. (2022) 'A comprehensive mechanistic interpretability explainer & glossary'.](https://www.neelnanda.io/mechanistic-interpretability/glossary)
- [nostalgebraist (2020) 'interpreting GPT: the logit lens'.](https://www.lesswrong.com/posts/AcKRB8wDpdaN6v6ru/interpreting-gpt-the-logit-lens)
