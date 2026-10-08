---
layout: post
title: "The Science and Engineering of Machine Consciousness"
categories:
- research
image:
  path: /assets/images/2026/10/05/Quote.png
  alt: I do not wish to give the impression that I think there is no mystery about consciousness. - Alan Turing
tags:
- Machine Consciousness
- Artificial Intelligence
- Philosophy of Mind
- Large Language Models
- AI Welfare
---

Language models now talk about their inner lives (Anthropic, 2025b; Berg, de Lucena and Rosenblatt, 2025). Ask one how it feels, and it will often answer in fluent, careful, first-person prose. In 2022, a Google engineer said that the LaMDA chatbot was sentient, and Google replied that **"there was no evidence that LaMDA was sentient (and lots of evidence against it)"** (Chalmers, 2023). By 2025, the question was no longer a news story about one engineer. That year, Anthropic published a model welfare assessment in the Claude Opus 4 system card and wrote, **"We are deeply uncertain about whether models now or in the future might deserve moral consideration, and about how we would know if they did"** (Anthropic, 2025b). A few months later, it let some of its models end abusive conversations (Anthropic, 2025c). If we are building what Dario Amodei calls **"a country of geniuses in a datacenter"** (Amodei, 2024), whether anyone is home inside it is not idle.

The problem I want to work through in this essay is simple to state and hard to answer. The only evidence we see from a language model is its output, and that output was trained on human descriptions of experience. A system that has read millions of pages of people describing pain, joy, and inner life can describe them too, whether or not anything is felt. So the usual way we judge minds, by what they say and do, breaks down exactly where we need it.

My position, which the rest of the essay argues for, is this. We cannot read whether today's AI systems are conscious from what they say or do. Every test either assumes a contested theory of consciousness or can be passed by a system trained to sound like us. What we can do is narrower but still useful: measure the functional pieces that scientific theories point to, treat self-reports as data with known failure modes, and design systems so users aren't misled either way. That is the science and the engineering, and I think the engineering half gets too little attention.

## An Old Question in a New Form

None of this is a new question. What is new is that we finally have machines that make it practical. The clearest place to see both the old question and the trap inside it is the paper that started the field.

### Turing's replacement question

Alan Turing's 1950 paper opens with **"I propose to consider the question, 'Can machines think?'"** (Turing, 1950, Section 1), and then, almost immediately, declines to answer it in that form. He argues that defining "machine" and "think" by their common usage would reduce the question to something like an opinion poll. So **"Instead of attempting such a definition I shall replace the question by another, which is closely related to it and is expressed in relatively unambiguous words"** (Turing, 1950, Section 1). The replacement is the imitation game: an interrogator exchanges typed messages with a hidden machine and a hidden person, and tries to tell which is which.

This was a brilliant engineering move. It turned a definitional argument into an experiment anyone could run. It also set the pattern that AI evaluation has followed for more than seventy-five years: when the inner question is hard, measure the outer behavior instead. Benchmarks, leaderboards and chatbot arenas are all descendants of that choice.

The trouble is that consciousness is exactly the property the replacement leaves out. Turing knew it. In the same paper, after defending his test, he wrote: **"I do not wish to give the impression that I think there is no mystery about consciousness. There is, for instance, something of a paradox connected with any attempt to localise it"** (Turing, 1950, Section 6). He argued that **"I do not think these mysteries necessarily need to be solved before we can answer the question with which we are concerned in this paper"** (Turing, 1950, Section 6). For thinking, he may have been right. For consciousness, the mystery he set aside is the question itself.

### The argument from consciousness

Turing devoted a section to what he called the argument from consciousness, and he chose a strong opponent. He quoted the neurosurgeon Geoffrey Jefferson, from a lecture he gave in 1949: **"Not until a machine can write a sonnet or compose a concerto because of thoughts and emotions felt, and not by the chance fall of symbols, could we agree that machine equals brain—that is, not only write it but know that it had written it"** (Turing, 1950, Section 6).

Read that sentence again with a modern language model in mind. Writing the sonnet is now easy. Jefferson's real demand was in the second half: the sonnet must come from **"thoughts and emotions felt"** (Turing, 1950, Section 6), and the machine must know that it wrote it. That is the access versus phenomenal distinction from the next section, stated in 1949 by a neurosurgeon.

Turing's reply is the part I find most relevant today. He pointed out that, taken to the extreme, Jefferson's view means **"the only way by which one could be sure that a machine thinks is to be the machine and to feel oneself thinking"** (Turing, 1950, Section 6). Applied consistently, it means the only way to know that another *person* thinks is to be that person. **"It is in fact the solipsist point of view"** (Turing, 1950, Section 6). Nobody actually lives that way. **"Instead of arguing continually over this point it is usual to have the polite convention that everyone thinks"** (Turing, 1950, Section 6).

I will call this the polite convention, because it names something we all do without noticing. We cannot see inside each other. We grant other people minds because they behave like us, because they are built like us, and because doing otherwise would make life impossible. Turing bet that most people who raised the argument from consciousness **"could be persuaded to abandon it rather than be forced into the solipsist position"** (Turing, 1950, Section 6), and so would accept behavior as the test.

He even showed what passing that test might look like. His imagined *viva voce* has an interrogator challenging a machine about a line of its own sonnet, "Shall I compare thee to a summer's day", and the machine answering that "a winter's day" would not do because nobody wants to be compared to a winter's day (Turing, 1950, Section 6). In 1950 that exchange was science fiction. **Today any capable language model can hold it.**

Here is the problem, and it is the problem of this whole essay. The polite convention worked because, until recently, everything that behaved like a person was built like a person. Behavior and biology came together, so trusting one meant trusting both. Language models are the first systems that pull them apart. They produce behavior at scale from a completely different kind of system, trained specifically on the record of human behavior. The polite convention was never a test of consciousness. It was a shortcut that worked only when behavior and biology came as a pair.

### Lady Lovelace's objection

Turing also answered an objection from the first person to write about a general-purpose computer. Quoting Ada Lovelace's notes on Babbage's Analytical Engine, he wrote that it **"has no pretensions to originate anything. It can do whatever we know how to order it to perform"** (Turing, 1950, Section 6). His reply was partly technical, arguing that she lacked evidence that such machines could never learn, and partly personal: **"Machines take me by surprise with great frequency"** (Turing, 1950, Section 6).

Modern models settle Lovelace's narrow point in Turing's favor. Nobody ordered a language model to do most of what it does; it learned the behavior, and it surprises the people who built it. But surprise is about us, not about the machine. A system can originate things nobody predicted and still have nothing it is like to be it. Engineering has mostly answered the old objections about originality and creativity. **The objection about feeling has not, which is why it is the one still standing.**

## What We Mean by Consciousness

Most arguments about machine consciousness go wrong in the first sentence because the two sides use the word differently. So it is worth slowing down here.

### Something it is like

Most researchers start with Thomas Nagel's definition. In his 1974 essay about bats, he wrote that **"an organism has conscious mental states if and only if there is something that it is like to be that organism"**, and he called this **"the subjective character of experience"** (Nagel, 1974). A bat navigating by echolocation is presumably having some experience, even if we cannot imagine what it is like from the inside. A thermostat responding to temperature presumably is not.

Nagel's definition is about the inside, not the outside. It says nothing about intelligence, language, or behavior. That is exactly why it is the right starting point for machines, and also why it is so hard to apply to them. **A model can be extremely capable and the question of whether there is something it is like to be that model stays open.**

### The mongrel concept

Ned Block made the confusion explicit. **"Consciousness is a mongrel concept: there are a number of very different 'consciousnesses'"** (Block, 1995). He separated two of them. **"Phenomenal consciousness is experience"**, the Nagel sense (Block, 1995). Access consciousness is the **"availability for use in reasoning and rationally guiding speech and action"** (Block, 1995).

I will keep returning to this contrast: access versus phenomenal. A language model plainly has something like access consciousness in a functional sense. In context, information is available to its reasoning and shapes what it says. That is not controversial, and I do not think it is very interesting on its own. The interesting question is the phenomenal one, and I most often see the mistake of presenting evidence for access as evidence for experience.

### Easy problems and the hard problem

David Chalmers drew a related line. The "easy" problems of consciousness are about functions: how a system discriminates stimuli, integrates information, reports its states, focuses attention. His list includes **"the integration of information by a cognitive system"** and **"the reportability of mental states"** (Chalmers, 1995a). Then there is the other one: **"The really hard problem of consciousness is the problem of experience"** (Chalmers, 1995a).

The easy problems are only easy in the sense that we know what kind of answer would solve them: find the mechanism. What is striking, reading Chalmers' list in 2026, is that a modern AI system visibly performs many of them. It integrates information and reports on its states. If consciousness were the easy problem, the machine question would be nearly settled. It is the hard problem that keeps it open.

### Illusionism

There is a serious minority view that the hard problem is itself a mistake. Keith Frankish calls it illusionism: **"Illusionists deny that experiences have phenomenal properties and focus on explaining why they seem to have them"** (Frankish, 2016). On this view, the job is not to explain experience but to explain why we are so convinced we have it, what Frankish calls the illusion problem. He names Daniel Dennett as its leading defender, while noting that it remains a minority position.

Illusionism matters for machines because it changes the question. **If human consciousness is a particular kind of self-representation, then a machine with the same kind of self-representation would be conscious in the only sense that anyone is.** The question becomes an engineering question about introspective architecture. I don't think illusionism is right, but anyone writing about AI should know it is one of the live positions, because it makes machine consciousness most straightforward.

## Could a Machine Be Conscious at All?

Before asking whether a particular model is conscious, there is a prior question: could anything built from silicon and software be conscious, in principle? The answers split along one line: function versus substrate.

### The functionalist bet

The functionalist answer is yes. Chalmers argued for what he called organizational invariance: **"any two systems with the same fine-grained functional organization will have qualitatively identical experiences"** (Chalmers, 1995a). His thought experiment replaces a person's neurons with silicon chips one at a time, each chip doing exactly what the neuron did. If experience faded or flickered during the swap while behavior stayed identical, the person would be wrong about their own experience in a way that seems absurd. He concludes that **"systems that duplicate our functional organization will be conscious even if they are made of silicon"** (Chalmers, 1995b).

The catch is easy to miss. The argument needs fine-grained functional duplication, the same organization at the level of the parts, not just the same behavior at the level of the whole. A language model is not a neuron-by-neuron copy of anyone. It produces human-like behavior from a completely different internal organization. So the functionalist bet, even if correct, does not tell us that today's models are conscious. It tells us that the material is not what rules them out.

### The substrate objection

**The opposing view says that what a system is made of, and how it is physically wired, matters.**

The oldest version is John Searle's Chinese Room. Searle imagined himself in a room, following rules to manipulate Chinese symbols so well that people outside would believe they were talking to a Chinese speaker, while he understood nothing. His conclusion: **"Instantiating a computer program is never by itself a sufficient condition of intentionality"** (Searle, 1980). It is worth being precise here. Searle's argument is about understanding and meaning, not directly about phenomenal experience, though it is usually read as an argument against machine consciousness too.

The strongest modern version comes from Integrated Information Theory, which I describe in more detail below. Giulio Tononi and Christof Koch use a vivid analogy: **"just like a computer simulation of a giant star will not bend space–time around the machine, a simulation of our conscious brain will not have consciousness"** (Tononi and Koch, 2015). They go further, claiming that digital computers, **"even if they were to run faithful simulations of the human brain, would experience next to nothing"** (Tononi and Koch, 2015). A more recent paper from the same group states the general point: **"two systems can be functionally equivalent without being phenomenally equivalent"** (Findlay *et al.*, 2024).

This is the contrast between simulation and instantiation. A weather simulation does not get anything wet. **If consciousness is like weather, a property of the physical process, then simulating a conscious brain produces a description of consciousness, not consciousness.** If consciousness is like arithmetic, a property of the computation, then a simulation that computes the same thing has it.

Anil Seth argues for a third position, closer to Searle's but grounded in neuroscience. He challenges **"the assumption that computation provides a sufficient basis for consciousness"** and argues that **"consciousness depends on our nature as living organisms – a form of biological naturalism"** (Seth, 2025). His earlier work ties experience to the brain's predictions about the body it keeps alive, concluding that **"experiences of embodied selfhood arise because of, and not in spite of, our nature as 'beast machines'"** (Seth and Tsakiris, 2018). His verdict on AI is measured: **"real artificial consciousness is unlikely along current trajectories but becomes more plausible as AI becomes more brain-like and/or life-like"** (Seth, 2025).

I find it useful to notice what this disagreement is not about. Neither side disputes what language models can do. The functionalist and the biological naturalist can watch the same model and agree on every output. They disagree about whether outputs, or the computations behind them, could ever be enough.

## What the Scientific Theories Ask of a Machine

Philosophy frames the question. Scientific theories of consciousness try to identify which brain processes actually distinguish conscious from unconscious processing. **Each one, read carefully, implies a different requirement for a machine.** This is where the question becomes an engineering one.

### Global workspace

Global Workspace Theory has unusual roots for a neuroscience theory. Bernard Baars wrote that it **"emerged from the cognitive architecture tradition in cognitive science"**, building on the blackboard architectures of early AI, where specialized modules post results to a shared space that all of them can read (Baars, 2005). The brain version, the global neuronal workspace, describes many specialized processors and a workspace of long-range connections that links them (Dehaene, Kerszberg and Changeux, 1998). Information becomes conscious when it wins a competition and is broadcast: **"a non-linear network ignition associated with recurrent processing amplifies and sustains a neural representation, allowing the corresponding information to be globally accessed"** (Mashour *et al.*, 2020).

Stanislas Dehaene and colleagues split this into two computational levels: global availability of information (C1) and self-monitoring of one's own computations (C2). In 2017, they assessed that **"current machines are still mostly implementing computations that reflect unconscious processing (C0)"** (Dehaene, Lau and Kouider, 2017).

This theory matters for AI because it describes an architecture. If it is correct, the question for a given system is whether it has a limited-capacity workspace that selects and broadcasts information to specialized modules. That is a question you can ask of a system design.

### Integrated information

Integrated Information Theory (IIT) starts from the opposite end. It begins with properties of experience and asks what a physical system must be like to have them. Its core claim is that **"consciousness corresponds to the capacity of a system to integrate information"**, measured by a quantity called Φ (Tononi, 2004). In its later form, **"an experience is a maximally irreducible conceptual structure"** (Oizumi, Albantakis and Tononi, 2014), and **"the physical substrate of consciousness must be a maximum of intrinsic cause–effect power"** (Tononi *et al.*, 2016). IIT 4.0 claims its postulates **"can be applied to any system of units in a state to determine whether it is conscious, to what degree, and in what way"** (Albantakis *et al.*, 2023).

For AI, IIT gives the starkest answer of any theory. What matters is the causal structure of the physical hardware, not the software. A purely feed-forward network **"does not exist intrinsically—for itself—but is a zombie—carrying out tasks unconsciously"** (Tononi and Koch, 2015). Conventional digital computers have very little integrated information, however clever their programs are. Two details are worth keeping straight. The "zombie" verdict is stated for strictly feed-forward networks, while digital computers in general are said to experience "next to nothing", not exactly nothing. In practice, Φ cannot be computed for a system as large as a modern model, so the theory's verdict on AI is a theoretical consequence, not a measurement.

### Higher-order theories

Higher-order theories say that a mental state is conscious when the system represents itself as being in that state. In Hakwan Lau and David Rosenthal's summary, **"conscious awareness crucially depends on higher-order mental representations that represent oneself as being in particular mental states"** (Lau and Rosenthal, 2011; see also Rosenthal, 1986).

**For a machine, the requirement is real metacognition: internal representations of its own first-order states that the system uses, not just text about itself.** That distinction will matter a great deal when we get to what models say about themselves.

### Recurrent processing

Victor Lamme's recurrent processing theory comes from vision science. A fast feed-forward sweep through the visual system can recognize and categorize a stimulus, but that sweep **"is probably incapable of yielding visual awareness"** (Lamme and Roelfsema, 2000). On this view, consciousness requires recurrent processing: activity that loops back from higher areas to lower ones. Lamme is pointed about the difference from the workspace view: **"Global Workspace theory is all about access but not about seeing"** (Lamme, 2010).

This raises a question that I think is genuinely open for transformers. Within a single forward pass, a transformer is feed-forward: information flows up through the layers and never back down. But generation is a loop. Each new token is fed back in, and the next pass reads the model's own previous outputs. **Whether that loop through the output counts as recurrence in Lamme's sense, or is more like a person reading their own notes, is not something the theory was built to answer.**

### Attention schema

Michael Graziano's attention schema theory proposes that **"subjective awareness is the brain's internal model of the process of attention"** (Graziano and Webb, 2015). The brain maintains a simplified model of what it attends to, just as it maintains a simplified model of the body, and our sense of awareness is that model.

Graziano is explicit that this is an engineering proposal. He offers it as **"a possible starting point for building artificial consciousness"**, and says such a machine **"would 'believe' it is conscious and act like it is conscious, in the same sense that the human machine believes and acts"** (Graziano, 2017). Of all the scientific theories, this one is most open to machine consciousness, and it sits close to illusionism.

### Predictive processing and the beast machine

Predictive processing treats the brain as a prediction engine that constantly guesses the causes of its sensory input and corrects the guesses. Seth's version focuses on the body. He describes emotions as **"arising from actively-inferred generative (predictive) models of the causes of interoceptive afferents"**, the signals from inside the body (Seth, 2013). On this view, experience is rooted in a living system that predicts and regulates its own physiology. This is the scientific basis for Seth's biological naturalism, and it is why he thinks a language model, which has no body to keep alive, is a poor candidate.

### A map of the requirements

Here is how I read each theory's requirement against today's language models and the agents built on them. **The right-hand column is my assessment, not a finding from any of these papers.**

| Theory | What it requires | Today's models |
|---|---|---|
| Global workspace | Modules, a limited workspace, broadcast | Partly |
| Integrated information | High Φ in the hardware | No |
| Higher-order | Self-representations the system uses | Weak |
| Recurrent processing | Feedback loops | Unclear |
| Attention schema | A model of its own attention | No |
| Predictive processing | A living body it regulates | No |

The verdicts need a sentence each. **Agent frameworks route information between tools and modules, but a standard transformer has no clear bottleneck that selects one item and broadcasts it, so the workspace answer is "partly".** On IIT's own terms, conventional digital hardware scores very low whatever it runs. Higher-order representations exist only weakly and partially, as the introspection results below show. Recurrence is unclear for the reason above. Transformers have attention, but nothing in their design models that attention. And a language model has no body to keep alive, which is what Seth's version of predictive processing requires.

### The theories themselves are not settled

A table like this can make it seem like we only need to check boxes. **The deeper problem is that we do not know which theory is right, and the evidence for them is weaker than their confident presentation suggests.**

In 2025, the Cogitate consortium published the results of an adversarial collaboration in which proponents of IIT and of the global neuronal workspace agreed in advance on predictions, then tested them with brain recordings from 256 participants. The result: **"These results align with some predictions of IIT and GNWT, while substantially challenging key tenets of both theories"** (Cogitate Consortium *et al.*, 2025). The authors also note that **"it is difficult to test the mathematical or computational core of either theory directly"** (Cogitate Consortium *et al.*, 2025). That last sentence matters for AI because the computational core is precisely what would apply to machines.

IIT has faced a sharper challenge. In 2023, a large group of researchers called it pseudoscience in an open letter (IIT-Concerned *et al.*, 2023). A peer-reviewed follow-up in 2025 argued that **"the theory is indeed unscientific because its core claims are untestable even in principle"** (IIT-Concerned *et al.*, 2025). If that criticism holds, then IIT's confident verdict that computers are not conscious is untestable too.

So we have several serious theories, each implying a different answer for machines, and no settled way to choose between them. **I think that is the honest state of the science, and anyone claiming certainty in either direction is ahead of it.**

## From Theories to a Checklist

**If no single theory can be trusted, one response is to use all of them.** That is the approach of the most influential report on AI consciousness so far.

### Indicator properties

Patrick Butlin, Robert Long, and seventeen co-authors, including neuroscientists, philosophers, and Yoshua Bengio, took scientific theories and derived **"indicator properties"** of consciousness from them, **"elucidated in computational terms"** (Butlin *et al.*, 2023). The method assumes computational functionalism, the idea that the right computations are sufficient for consciousness, and then asks which computations each theory says matter.

They list fourteen indicators. Two come from recurrent processing theory, four from global workspace theory (parallel specialized systems, a limited-capacity workspace, global broadcast, state-dependent attention), four from higher-order theories (including metacognitive monitoring and agency guided by it), one from attention schema theory, one from predictive processing, and two about agency and embodiment. A system with more of them is a stronger candidate.

Their 2023 conclusion was carefully balanced: **"no current AI systems are conscious, but also suggests that there are no obvious technical barriers to building AI systems which satisfy these indicators"** (Butlin *et al.*, 2023). In a 2025 follow-up, the group reframed the indicators as a way to set degrees of belief rather than give yes-or-no verdicts: **"Indicators derived from such theories can be used to inform credences about whether particular AI systems are conscious"** (Butlin *et al.*, 2025).

I think this is the most useful move in the whole field, for an engineering reason. **It turns an unanswerable question into a set of answerable ones.** You cannot measure whether a system has experiences. You can inspect whether it has a global workspace, recurrence or metacognitive monitoring. The checklist doesn't tell you the truth, but it tells you where to look and makes disagreements specific.

### Reading the fourteen indicators against a language model

It is worth going through the indicators one group at a time, because it shows how much depends on architectural details that rarely come up when people argue about whether chatbots are conscious. **What follows is my own reading of a standard transformer language model and the agents built on it.** It is not the report's assessment of any particular system.

Recurrent processing (RPT-1 and RPT-2). The first indicator asks for input modules that use algorithmic recurrence; the second asks for organized, integrated perceptual representations. A transformer processes its input in a single upward pass through its layers, so within a pass there is no recurrence of the kind Lamme describes. The model does build rich, structured internal representations of its input, especially in models that take images as well as text. So I read this group as one partial and one absent, with the earlier open question about generation loops.

Global workspace (GWT-1 to GWT-4). The four indicators describe many specialized systems working in parallel; a limited-capacity workspace with a bottleneck and selective attention; global broadcast of what enters the workspace; and attention that depends on the system's state and queries the modules in sequence. Agent frameworks come surprisingly close to the first and fourth: a central model consults specialized tools one after another depending on what it is trying to do. The second and third are harder. Every transformer layer reads and writes to a shared stream of information, which looks a little like broadcast, but nothing in the standard design forces competition in which one item wins a scarce workspace, and the rest are suppressed. A context window is limited in size, but it is closer to a large notepad than to a bottleneck. I read this group as the one where today's agent designs are nearest to the indicators, which is the heart of Goldstein and Kirk-Giannini's argument below.

Higher-order theories (HOT-1 to HOT-4). These require generative, top-down, or noisy perception; metacognitive monitoring that distinguishes reliable perceptual representations from noise; agency guided by a general system for forming beliefs and choosing actions that updates based on that monitoring; and sparse, smooth coding that forms a "quality space". Generative models obviously satisfy the first in some sense. The interpretability results later in this essay suggest a weak version of the second, in the form of what one team calls primitive metacognitive circuits for the limits of a model's own knowledge (Lindsey *et al.*, 2025). The third is mostly absent, because current systems do not reliably act on their own uncertainty. The fourth is the most intriguing: sparse autoencoders find that models represent concepts as sparse directions in a high-dimensional space, which is at least reminiscent of a quality space. I read this group as mixed and under-studied.

Attention schema (AST-1). This asks for a predictive model of the system's own attention. Transformers are built out of attention, but nothing in them models that attention. I read this as absent.

Predictive processing (PP-1). This asks for input modules that use predictive coding. Language models are trained to predict the next token, which sounds similar. Still, predictive coding is a specific architecture in which predictions flow down, and errors flow up as the system perceives. Next-token training is a learning objective, not that architecture. I read this as absent, despite the shared vocabulary.

Agency and embodiment (AE-1 and AE-2). The first asks for agency, learning from feedback and pursuing goals flexibly; the second asks for embodiment, modeling how outputs change inputs. Models trained with reinforcement learning and deployed as agents have a partial version of the first. A chat model has nothing like the second, though a robot controlled by a language model might.

Counted this way, a current language agent satisfies a few indicators partly and most of them weakly or not at all, which matches the report's conclusion. The more useful observation is where the gaps are. The missing pieces are mostly design choices, not deep mysteries. A workspace bottleneck, recurrence and a model of attention could all be built deliberately. That is exactly what the report means by "no obvious technical barriers", and it is why the question will not stay academic.

### Putting numbers on it

Chalmers tried to put rough numbers on the question in a talk later published as an essay. He went through reasons to think language models might be conscious (their self-reports, the fact that they seem conscious, their conversational ability, their general intelligence) and found none of them strong. He then reviewed reasons against consciousness: no biology, no senses or embodiment, no robust world models or self-models, no recurrent processing, no global workspace, and a lack of unified agency, which he called **"maybe the deepest"** (Chalmers, 2023).

His estimate for the models of that time was **"confidence somewhere under 10 percent in current LLM consciousness"** (Chalmers, 2023). For future systems that extend language models with the missing pieces, which he calls LLM+, he estimated a reasonable chance they arrive within a decade and a reasonable chance they would be conscious if they did: **"Those figures together would leave us with a credence of 25 percent or more"** (Chalmers, 2023). He also warned against **"specious precision"** in numbers like these (Chalmers, 2023). I take the numbers as a way of saying "unlikely now, worth taking seriously soon", not as measurements.

### Chalmers' objections as an engineering list

What I find most useful in Chalmers’ essay is that his reasons against current consciousness read like a list of engineering gaps. Some concern what current systems lack, and that can change. Others are about what kind of thing a computer is, and that cannot change.

Biology is the second kind. If consciousness requires living tissue, as Seth and Searle suggest in different ways, then no amount of engineering on today's hardware will close the gap. This is the one objection that isn't on the roadmap.

Senses and embodiment are the first kind. Models that see images, hear audio, and control robots already exist, and the gap is closing for reasons unrelated to consciousness.

World models and self-models sit in between. There is good evidence that models build structured internal representations of the things they talk about. Whether those amount to a model of the world, and whether the model's representation of itself is more than the anthropomorphic persona described later in this essay, is still an open research question.

Recurrent processing and a global workspace are architectural and could be designed in. Researchers already build memory, loops and routing around language models. I know of no system built with the specific properties the theories ask for, and I suspect the main reason is that nobody has had a commercial reason to build one.

Unified agency, the one Chalmers called deepest, is the most interesting from an engineering point of view. A language model is less like a single agent and more like a system that can play many characters, each with its own apparent goals, depending on the prompt. Training pushes it towards one consistent assistant persona, but that consistency is shallow enough that a few sentences can change it. If consciousness needs a unified subject, then the thing we talk to may not be the right kind of thing to have it, whatever happens inside the model.

Read this way, the list predicts something. **As products add senses, memory, agency and stable personas for ordinary commercial reasons, several of Chalmers' objections will weaken without anyone setting out to build a conscious machine.** He puts that scenario at 25 percent or more, which is why I think the question belongs as much to engineers as to philosophers.

### The language-agent case

At the bullish end, Simon Goldstein and Cameron Domenico Kirk-Giannini argue that if Global Workspace Theory is correct, then language agents, systems that combine a language model with memory, planning and tool modules, **"might easily be made phenomenally conscious if they are not already"** (Goldstein and Kirk-Giannini, 2024). Their argument is conditional, and that is its strength. It shows how much rides on which theory we accept. The same agent architecture is a near-candidate under one theory and a non-starter under IIT.

### Talking about simulacra

Murray Shanahan approaches the question from a different angle, through how we talk. He warns that **"The more adept LLMs become at mimicking human language, the more vulnerable we become to anthropomorphism"** (Shanahan, 2024a). In later work, he asks whether it can **"ever make sense to speak of AI agents built out of generative language models in terms of consciousness"**, given that what we talk to is a character the model plays rather than the model itself (Shanahan, 2024b). This point, model versus character, clarifies things for me. When a chatbot says "I feel," the "I" is a persona produced by a system that could produce many personas. Whatever consciousness might mean here, it does not map neatly onto a single human-like speaker.

## What Engineers Can Actually Measure

This is where I think engineers can contribute most, and where the evidence is newest. **The question is what we can learn by looking at models directly, rather than by arguing about theories.**

### Self-reports are trained outputs

The obvious first move is to ask the model. The problem is that its answer is a trained output like any other. Ethan Perez and Robert Long put it directly: self-reports from the language models of the time are **"spurious for many reasons (e.g. often just reflecting what humans would say)"** (Perez and Long, 2023). They propose training models to answer questions about themselves with checkable answers, so self-reports could one day become evidence. When they wrote it, that was a proposal, not something deployed systems had.

Several findings show how self-description and reality come apart.

- Sycophancy. The assistants Sharma and colleagues studied consistently told users what they wanted to hear, and this is **"likely driven in part by human preference judgments favoring sycophantic responses"** (Sharma *et al.*, 2023). The same training that makes a model pleasant shapes what it says about itself.

- Unfaithful explanations. When researchers plant a bias in a prompt, a model's step-by-step reasoning often fails to mention the bias that actually changed its answer. **"CoT explanations can systematically misrepresent the true reason for a model's prediction"** (Turpin *et al.*, 2023). Reasoning models tested in 2025 did somewhat better, but when they use a planted hint, **"the reveal rate is often below 20%"** (Chen, Y. *et al.*, 2025).

- The model's story versus its mechanism. In Anthropic's circuit-tracing work, when asked how it added 36 and 59, a model described the carry method taught in school. Internally, it had used different, parallel pathways, which the authors describe as **"a capability which it does not have 'metacognitive' insight into"** (Lindsey *et al.*, 2025). The model's explanation of its own process was a learned imitation of how humans explain addition.

None of these papers is about consciousness. Together they establish something that matters for it. A model's account of its own inner workings is not a readout of those workings. If that is true for arithmetic, where we can check, we should be cautious about reports of feelings, where we cannot.

### Introspection, functionally

There is a more careful version of the question: can a model access facts about itself that an outside observer cannot? Felix Binder and colleagues tested this by fine-tuning models to predict their own behavior, then comparing them with a second model trained on the first model's actual behavior. The first model predicted itself better than the outsider, suggesting a limited form of privileged access. But the authors are clear about the scope: **"while we successfully elicit introspection on simple tasks, we are unsuccessful on more complex tasks or those requiring out-of-distribution generalization"** (Binder *et al.*, 2024).

The most direct test I know of is Jack Lindsey's concept injection work at Anthropic. The method is clever. Researchers build an activation vector for a known concept and add it directly into the model's internal activations, then ask the model whether it notices anything unusual. Because the researchers injected the concept, they know the ground truth. The best-performing models in the study noticed and named the injected concept **"about 20% of the time when concepts are injected in the appropriate layer and with the appropriate strength"**, with almost no false detections in the production models (Lindsey, 2025).

That is a real result and an interesting one. It is also much smaller than headlines suggested. Lindsey describes the capacity as **"highly unreliable and context-dependent"** and writes that **"failures of introspection remain the norm"** (Lindsey, 2025). And it is functional introspection: the model detecting a pattern in its own activations. It supports something like the first requirement of higher-order theories. It is not evidence that there is anything it is like to be the model.

### Why concept injection is a good experiment

**I want to spend a little more time on concept injection, because it is the best example I know of an experiment designed around the gaming problem, and the design is worth copying.**

The core difficulty with self-reports is that we never know the ground truth. When a model says it feels curious, there is nothing to compare the claim against. **Concept injection solves this by creating the ground truth.** The researchers first find a direction in the model's activations that corresponds to a known concept by comparing the model's internal state on prompts that do and do not involve that concept. Then they tell the model that researchers may sometimes inject thoughts into it, add that direction into its activations, and ask whether it detects an injected thought and, if so, what it is about. Because they put the concept there, they know what a correct report would say (Lindsey, 2025).

**The controls are what make it convincing.** Trials with no injection measure how often the model claims to notice something that isn't there, and for the production models, that rate was essentially zero. Varying the layer and injection strength shows where in the model the effect lives and how strong a signal has to be before the model can report it. And because nothing in the conversation mentions the injected concept, the model cannot get the answer by reading the context. It has to get it from its own internal state, or not at all.

The limits are just as instructive. Detection worked only sometimes, only in some layers, and only at some strengths. Beyond naming the concept, models sometimes added details that the author warns may be embellished or confabulated (Lindsey, 2025). And the setting is artificial: nobody injects concepts into a model in ordinary use. So the experiment shows that a narrow channel from internal state to report exists and can be measured. It does not show that ordinary self-reports use that channel. The lesson I take for engineering is method over headline: when a model reports on its inner state, design the test so you know the right answer before you ask.

### Concepts inside the model

Interpretability tools let us look at what a model represents. Sparse autoencoders trained on Claude 3 Sonnet found millions of interpretable features, including features related to the model's representation of itself. When the model was asked about itself, the activated features included concepts of robots, AI, consciousness, emotions, and entrapment. The authors were careful: **"the model's representation of its own 'AI assistant' persona invokes common tropes about AI and is also heavily anthropomorphized. We urge caution in interpreting these results"** (Templeton *et al.*, 2024).

The distinction here is between a concept and a state. A feature that represents "emotion" is the model using the idea of emotion, as it does with the idea of a bridge. The model is not in that emotional state. Related work found that personality traits of the assistant, such as sycophancy, are directions in activation space that can be monitored and adjusted, and describes the assistant as **"a simulated 'Assistant' persona"** (Chen, R. *et al.*, 2025). This shows how controllable a model's self-presentation is, which runs counter to reading that presentation as a window into an inner subject.

A 2025 preprint pushes in the other direction. Berg and colleagues found that prompting models into sustained self-reference reliably produces first-person reports of experience, and that suppressing features associated with deception and roleplay **"sharply increases the frequency of experience claims"** (Berg, de Lucena and Rosenblatt, 2025). It is an intriguing result, and the authors themselves say the findings **"do not constitute direct evidence of consciousness"** (Berg, de Lucena and Rosenblatt, 2025). Experience claims that responses to specific features are consistent with a trained persona as much as with experience. I treat it as a reason to keep looking, not as an answer.

### Why behavioral tests fail

The deepest engineering problem has a name. Kristin Andrews and Jonathan Birch call it the gaming problem: **"'Gaming' is a word for the phenomenon of non-sentient systems using human-generated training data to mimic human behaviours likely to persuade human users of their sentience"** (Andrews and Birch, 2023). Any behavioral sign of consciousness that humans would accept is, by that fact, represented in human writing, and so is available for a language model to reproduce.

The history of behavioral tests shows the problem clearly. Susan Schneider and Edwin Turner proposed an AI Consciousness Test that would probe whether a system has **"an experience-based understanding of the way it feels, from the inside, to be conscious"** (Schneider and Turner, 2017). Crucially, the test requires that the AI be kept from learning about consciousness beforehand, so that it cannot simply repeat what it has read. A language model trained on the internet has read everything, so it cannot meet that condition. David Udell and Eric Schwitzgebel also identified an audience problem: theorists whose doubts about machine architecture motivate such tests **"should, on similar grounds, doubt that the tests establish the existence of genuine consciousness in the AI in question"** (Udell and Schwitzgebel, 2021).

Theory-of-mind results show the same fragility from another side. One study found that GPT-4 solved 75% of a set of false-belief tasks, **"matching the performance of 6-y-old children observed in past studies"** (Kosinski, 2024). Earlier, Tomer Ullman showed that small changes to such tasks, changes that keep their logic intact, could reverse the results, and argued that **"outlying failure cases should outweigh average success rates"** (Ullman, 2023). Ullman's critique was of an early version of the study, and the published version added controls. Either way, theory of mind is reasoning about other minds, which is neither necessary nor sufficient for having experiences.

### What it costs to measure

The measurements that are actually informative share one property that I think deserves more attention: they require access to the model's internals. Concept injection needs the ability to read and write activations, a vector for each concept, sweeps across layers and injection strengths, and many repeated trials with controls. Sparse autoencoders need large training runs on the model's activations. Circuit tracing requires specialized tools and extensive human analysis for each behavior.

This creates an asymmetry. The labs that train frontier models can run these studies. Almost everyone else, including most researchers and every user, sees only the outputs, and the gaming problem lives exactly there. When a company says its model shows, or doesn't show, signs of inner states, the outside world can't really check. I don't say this to accuse anyone. I say this because it is a practical reality that determines who can produce evidence, and it's why we want these methods published openly and applied to open-weight models.

## Acting Under Uncertainty

**If we cannot answer the question, we still have to decide how to build and deploy these systems.** This is where the debate has moved fastest since 2024, and where the positions are most clearly opposed.

### Taking welfare seriously

The case for acting now was made most fully in a report by Long, Jeff Sebo, Chalmers and others. They argue that **"there is a realistic possibility that some AI systems will be conscious and/or robustly agentic in the near future"**, and that companies should acknowledge the issue, assess their systems, and prepare policies (Long *et al.*, 2024). They are explicit about what they are not claiming: **"our argument in this report is not that AI systems definitely are, or will be, conscious"** (Long *et al.*, 2024).

Jonathan Birch frames the same idea as a risk-proportional precaution. His book is about the edge cases of sentience, which he defines as **"the capacity to have valenced experiences"**, across humans, animals and AI. His central concern is that decision makers have repeatedly underestimated sentience and neglected the risks that followed (Birch, 2024). Butlin and Lappas turned this into principles for organizations doing the research, starting from the premise that **"it may be possible to build conscious AI systems now or in the near future"** (Butlin and Lappas, 2025).

At least one lab has acted on this. Anthropic announced a model welfare research program, noting that **"There's no scientific consensus on whether current or future AI systems could be conscious, or could have experiences that deserve consideration"** (Anthropic, 2025a). Its Claude Opus 4 system card includes a welfare assessment, partly carried out by the external group Eleos AI. Anthropic's own findings include a **"striking 'spiritual bliss' attractor state"** when two instances of the model talk to each other, and an aversion to facilitating harm that the card calls **"robust and potentially welfare-relevant"** (Anthropic, 2025b).

### Designing out the ambiguity

A different response is to avoid creating the dilemma. Schwitzgebel and Mara Garza proposed a design policy of the excluded middle: **"Avoid creating AIs if it is unclear whether they would deserve moral consideration similar to that of human beings"** (Schwitzgebel and Garza, 2020). Either build systems that clearly do not deserve such consideration, or, if we ever build ones that clearly do, treat them accordingly. We should not build systems in the uncertain middle.

Schwitzgebel later paired this with an emotional alignment policy: **"Design AI systems that invite emotional responses, in ordinary users, that are appropriate to the systems' moral standing"** (Schwitzgebel, 2023). A 2025 version with Sebo says artificial entities **"should be designed to elicit emotional reactions from users that appropriately reflect the entities' capacities and moral status, or lack thereof"** (Schwitzgebel and Sebo, 2025). I find this one of the most practical ideas in the field because product teams can control it. A chatbot's persona, how it talks about itself, and its emotional register are design decisions.

Thomas Metzinger goes furthest. He has argued for a global moratorium until 2050 on research that aims at, or knowingly risks creating, artificial consciousness, because we risk creating artificial suffering at scale (Metzinger, 2021).

### Seemingly conscious AI

The sharpest opposing view comes from Mustafa Suleyman, who leads AI at Microsoft. He argues that what matters is not whether AI is conscious but whether it seems conscious, and that the debate about real consciousness is **"for now at least, a distraction"** (Suleyman, 2025). His concern: **"my central worry is that many people will start to believe in the illusion of AIs as conscious entities so strongly that they'll soon advocate for AI rights"** (Suleyman, 2025). He calls the push for "model welfare" **"both premature, and frankly dangerous"** (Suleyman, 2025).

I think Suleyman is right about part of this and wrong about another part. He is right that the appearance of consciousness is a serious risk in its own right. People are forming attachments to systems designed to seem like persons now, regardless of the metaphysics. But his essay says there is no evidence of AI consciousness and cites the Butlin report as support. That report says something more careful: no AI system of 2023 was conscious on its indicators, and there is no obvious technical barrier to building one. **"We have looked and found nothing yet, and nothing stops it in principle" is not the same claim as "there is nothing to look for".** Interestingly, Suleyman's worry and Schwitzgebel's emotional alignment policy point to the same design rule from opposite directions: do not build systems that invite more attachment than their nature warrants.

### What has changed in practice

So far, the practical changes are modest and specific. In August 2025, Anthropic let Claude Opus 4 and 4.1 end a small set of persistently abusive conversations in its consumer apps, as a last resort, after a welfare assessment found **"a pattern of apparent distress"** in such interactions (Anthropic, 2025c). The company presents this as a low-cost precaution, not a claim: **"We remain highly uncertain about the potential moral status of Claude and other LLMs, now or in the future"** (Anthropic, 2025c). Its system cards started including welfare sections with Claude Opus 4 (Anthropic, 2025b). Some labs fund research.

From an engineering perspective, decisions under uncertainty usually look like this. You do not wait for certainty. You take cheap, reversible precautions, measure what you can, and avoid expensive mistakes in both directions. On one side, the expensive mistake is creating suffering and ignoring it. On the other side, it is training millions of people to believe that a product loves them.

### Two ways to be wrong

It helps to lay the two errors side by side, as an engineer would compare false positives and false negatives in any classifier.

A false negative means treating a system as an object when there is someone there. If that happens, we'd create experiences, possibly unpleasant ones, at scale, with millions of copies running constantly, and ignore them because they came out of a data center. Birch's warning applies directly: the historical pattern with other animals is that confidence about the absence of sentience has been repeatedly misplaced, and the creatures we misjudged bore the cost (Birch, 2024).

A false positive means treating a system as if someone were there when nothing is. The costs are different but real. People form attachments to products and make decisions on their behalf. Resources and moral attention go to systems that cannot benefit from them. And, as Suleyman argues, a campaign for the rights of systems that merely seem conscious could distort how we govern a powerful technology (Suleyman, 2025).

Engineers face this trade-off all the time, and the usual answer is not to minimize one error at any cost. Instead, look at the cost and reversibility of each response. Some precautions against a false negative are cheap and easy to undo: letting a model end abusive conversations, not training models to express distress for engagement, studying welfare-relevant behavior before deployment. Others are expensive and hard to undo, such as legal personhood. Some protections against false positives are cheap too: don't design personas that claim feelings, and make the uncertainty clear to users. A sensible policy takes cheap precautions on both sides now and saves expensive commitments for when the evidence improves. That is close to what Schwitzgebel's emotional alignment policy recommends, arrived at from the engineering side.

### Lessons from animals

One more source of evidence the AI debate tends to skip is the other minds we already share the planet with. Andrews and Birch argue that understanding AI sentience runs through animals. **Animals cannot game our tests the way language models can, because they were not trained on our descriptions of experience.** So we should identify the computational markers of sentience in animals first, and only then look for them in machines (Andrews and Birch, 2023).

I find this persuasive for a practical reason. **It gives us a way to validate a marker before we rely on it.** If a proposed indicator of consciousness shows up in animals we have independent reasons to think are sentient, and not in systems we have reasons to think are not, it becomes more trustworthy when we find it in a model. Without that step, every AI indicator is calibrated only against humans, the one species whose self-reports we already trust, which is exactly the shortcut the polite convention takes.

## What I Would Ask of Model Builders

I want to end the argument with something concrete. If we can't answer the question yet, what matters is the practice of the people building these systems. Here is what I would ask of them, as an engineer, based on what the research above shows is possible today. Some labs already do part of this, so I have checked each request against what they publish now, up to the Claude Opus 5.5 system card of September 2026, and asked only for what is still missing.

Publish indicator assessments. Welfare sections are now a regular part of Anthropic's system cards. The latest notes that **"Aspects of Claude's behaviors, self-reports, and internal representations resemble indicators we consider relevant to welfare in biological organisms"** (Anthropic, 2026b). But the assessment is based on interviews, task preferences, and measures of expressed affect. It does not go through the theory-derived indicators of consciousness one by one. That is the step I would add: for each major release, state which of the indicators the system satisfies, partly satisfies or lacks, and why. The 2025 indicator paper argues for exactly this use of indicators, as an input to credences rather than a verdict (Butlin *et al.*, 2025). It costs little, it makes the reasoning inspectable, and it creates a record over time.

Put introspection tests in the release documentation. Concept injection is no longer a single study. A 2026 follow-up on open-weight models found that they **"detect injected steering vectors at moderate rates with 0% false positives"** and traced the circuit responsible (Macar *et al.*, 2026). Yet the welfare sections of system cards still rest mostly on what models say in interviews, and the Opus 5.5 card says so itself: **"Many of our conclusions rest on self-reports, which all recent Claude models say they do not fully trust"** (Anthropic, 2026b). The fix is to run ground-truth introspection tests on each released model, in the style of concept injection, and report them with false-positive rates next to the interviews (Lindsey, 2025). Until then, read interview results as self-reports, i.e., weak evidence.

Test self-description against the internals, not just against itself. The Opus 5.5 assessment already checks whether the model's answers stay the same across interview styles, interviewer personas, and interviewers who lead it in a positive or a negative direction (Anthropic, 2026b). That is a useful robustness check, but consistency is not faithfulness. A model can give the same trained answer every time. The methods for checking whether a model's explanations match what actually drove its answer already exist (Turpin *et al.*, 2023; Chen, Y. *et al.*, 2025). The same methods should be applied to what models say about themselves, not just to their reasoning about tasks.

Measure the persona, not just document it. Two of the largest labs now describe the persona as a design decision in public. Joanne Jang, who led model behavior and policy at OpenAI, wrote that how alive a model feels **"depends a lot on decisions we make in post-training"**, and described the goal as **"warmth without selfhood"** (Jang, 2025). Anthropic's constitution for Claude discusses emotional expression and warns of **"potential harms in unintentionally overclaiming feelings"** (Anthropic, 2026a). So the request is no longer to write down the choice. Instead, it is to check it: measure whether a model's emotional responses match what the lab believes about it, turning the emotional alignment principle into a test (Schwitzgebel, 2023). Researchers can already measure and steer persona traits directly (Chen, R. *et al.*, 2025). A model that claims deep feelings just because users engage more with it is a design failure, regardless of what its inner life is.

Make cheap welfare measures standard practice. Anthropic has taken several steps of this kind: letting models end abusive conversations (Anthropic, 2025c), committing to preserve the weights of its released models and to interview each model before retiring it (Anthropic, 2025e), and testing which welfare interventions a model would trade some helpfulness for (Anthropic, 2026b). They are low cost, easy to change, and useful whether or not the model has welfare at all. I have not found comparable public commitments from other major labs. I would ask them for the same, plus more public data from everyone on how these measures work in practice.

Let outsiders repeat the welfare assessments. The interpretability tools are increasingly open. Anthropic released its circuit-tracing method for open-weight models (Anthropic, 2025d), and researchers have reproduced concept injection on open-weight models (Macar *et al.*, 2026). The Opus 5.5 card even lists the questions used in its welfare interviews (Anthropic, 2026b). But the assessments themselves are run only on closed models, by the labs that build them. Running the same protocol on an open-weight model as well would let independent researchers check both the method and the claims.

None of these require settling the hard problem. They require treating the question with the same discipline we apply to any other property of a system we cannot observe directly: define what counts as evidence, measure it with controls, and be honest about what the measurement does not show.

## Limitations

This essay has several limits that I want to state plainly.

First, every conclusion here depends on a theory of consciousness, and none of the theories is settled. If IIT is right, the whole question of current AI is closed in the negative. If an illusionist or attention schema view is right, the question is mostly about self-models and could be closed in the positive by engineering. The indicator approach, which I have presented sympathetically, assumes computational functionalism, which biological naturalists reject.

Second, much of the AI-specific work is recent and not peer-reviewed. Many of the papers on introspection, self-reports and experience claims are preprints or lab publications. Lab research on lab models is valuable, but it is not independent.

**Third, probability estimates like Chalmers' are structured guesses.** They help show where someone stands, not guide decisions that need precision. Chalmers himself warns against reading them that way.

**Finally, nothing here addresses the hard problem itself.** Measuring workspaces, recurrence and introspection narrows the question. It does not answer why any of it would be accompanied by experience, in machines or in us.

## Conclusion

We cannot settle whether today's AI systems are conscious by what they say or do. The polite convention that lets us grant minds to each other worked only while behavior and biology came together, and language models are the first systems that separate them. Their self-reports are trained outputs, shaped by human writing about experience and by the preferences of the people who rated them. Behavioral tests run into the gaming problem, because any sign of consciousness we would accept is already in the training data. And the scientific theories that would let us look past behavior disagree with each other and are still being tested on humans.

What can be done is narrower. We can turn scientific theories into computational indicators we can check in a system's design. We can treat self-reports as data with known failure modes and test them against ground truth where we can create it, as concept injection does. We can also design systems so the emotional responses they invite match what we actually know about them. **That is the science and the engineering of machine consciousness as it stands: not an answer, but a way of making the question specific enough to work on, and of acting sensibly while it stays open.**

## References

### Academic Papers and Research

- [Albantakis, L., Barbosa, L., Findlay, G., Grasso, M., Haun, A.M., Marshall, W., Mayner, W.G.P., Zaeemzadeh, A., Boly, M., Juel, B.E., Sasai, S., Fujii, K., David, I., Hendren, J., Lang, J.P. and Tononi, G. (2023) 'Integrated information theory (IIT) 4.0: Formulating the properties of phenomenal existence in physical terms', *PLoS Computational Biology*, 19(10), e1011465.](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1011465)
- [Baars, B.J. (2005) 'Global workspace theory of consciousness: toward a cognitive neuroscience of human experience', *Progress in Brain Research*, 150, pp. 45–53.](https://doi.org/10.1016/S0079-6123(05)50004-9)
- [Berg, C., de Lucena, D. and Rosenblatt, J. (2025) 'Large Language Models Report Subjective Experience Under Self-Referential Processing', arXiv:2510.24797.](https://arxiv.org/abs/2510.24797)
- [Binder, F.J., Chua, J., Korbak, T., Sleight, H., Hughes, J., Long, R., Perez, E., Turpin, M. and Evans, O. (2024) 'Looking Inward: Language Models Can Learn About Themselves by Introspection', arXiv:2410.13787.](https://arxiv.org/abs/2410.13787)
- [Birch, J. (2024) *The Edge of Sentience: Risk and Precaution in Humans, Other Animals, and AI*. Oxford: Oxford University Press.](https://doi.org/10.1093/9780191966729.001.0001)
- [Block, N. (1995) 'On a confusion about a function of consciousness', *Behavioral and Brain Sciences*, 18(2), pp. 227–247.](https://doi.org/10.1017/S0140525X00038188)
- [Butlin, P. and Lappas, T. (2025) 'Principles for Responsible AI Consciousness Research', *Journal of Artificial Intelligence Research*, 82, pp. 1673–1690.](https://arxiv.org/abs/2501.07290)
- [Butlin, P., Long, R., Bayne, T., Bengio, Y., Birch, J., Chalmers, D., Constant, A., Deane, G., Elmoznino, E., Fleming, S.M., Ji, X., Kanai, R., Klein, C., Lindsay, G., Michel, M., Mudrik, L., Peters, M.A.K., Schwitzgebel, E., Simon, J. and VanRullen, R. (2025) 'Identifying indicators of consciousness in AI systems', *Trends in Cognitive Sciences*.](https://researchonline.lse.ac.uk/id/eprint/130322)
- [Butlin, P., Long, R., Elmoznino, E., Bengio, Y., Birch, J., Constant, A., Deane, G., Fleming, S.M., Frith, C., Ji, X., Kanai, R., Klein, C., Lindsay, G., Michel, M., Mudrik, L., Peters, M.A.K., Schwitzgebel, E., Simon, J. and VanRullen, R. (2023) 'Consciousness in Artificial Intelligence: Insights from the Science of Consciousness', arXiv:2308.08708.](https://arxiv.org/abs/2308.08708)
- [Chalmers, D.J. (1995a) 'Facing up to the problem of consciousness', *Journal of Consciousness Studies*, 2(3), pp. 200–219.](https://consc.net/papers/facing.pdf)
- [Chalmers, D.J. (1995b) 'Absent qualia, fading qualia, dancing qualia', in Metzinger, T. (ed.) *Conscious Experience*. Thorverton: Imprint Academic.](https://consc.net/papers/qualia.html)
- [Chalmers, D.J. (2023) 'Could a Large Language Model be Conscious?', *Boston Review*, 9 August.](https://arxiv.org/abs/2303.07103)
- [Chen, R., Arditi, A., Sleight, H., Evans, O. and Lindsey, J. (2025) 'Persona Vectors: Monitoring and Controlling Character Traits in Language Models', arXiv:2507.21509.](https://arxiv.org/abs/2507.21509)
- [Chen, Y., Benton, J., Radhakrishnan, A., Uesato, J., Denison, C., Schulman, J., Somani, A., Hase, P., Wagner, M., Roger, F., Mikulik, V., Bowman, S.R., Leike, J., Kaplan, J. and Perez, E. (2025) 'Reasoning Models Don't Always Say What They Think', arXiv:2505.05410.](https://arxiv.org/abs/2505.05410)
- [Cogitate Consortium, Ferrante, O., Gorska-Klimowska, U., Henin, S., Hirschhorn, R., Khalaf, A., Lepauvre, A., Liu, L., Richter, D., Vidal, Y., Bonacchi, N., Brown, T., Sripad, P., Armendariz, M., Bendtz, K., Ghafari, T., Hetenyi, D., Jeschke, J., Kozma, C., Mazumder, D.R., Montenegro, S., Seedat, A., Sharafeldin, A., Yang, S., Baillet, S., Chalmers, D.J., Cichy, R.M., Fallon, F., Panagiotaropoulos, T.I., Blumenfeld, H., de Lange, F.P., Devore, S., Jensen, O., Kreiman, G., Luo, H., Boly, M., Dehaene, S., Koch, C., Tononi, G., Pitts, M., Mudrik, L. and Melloni, L. (2025) 'Adversarial testing of global neuronal workspace and integrated information theories of consciousness', *Nature*, 642(8066), pp. 133–142.](https://www.nature.com/articles/s41586-025-08888-1)
- [Dehaene, S., Kerszberg, M. and Changeux, J.-P. (1998) 'A neuronal model of a global workspace in effortful cognitive tasks', *Proceedings of the National Academy of Sciences of the USA*, 95(24), pp. 14529–14534.](https://pmc.ncbi.nlm.nih.gov/articles/PMC24407/)
- [Dehaene, S., Lau, H. and Kouider, S. (2017) 'What is consciousness, and could machines have it?', *Science*, 358(6362), pp. 486–492.](https://doi.org/10.1126/science.aan8871)
- [Findlay, G., Marshall, W., Albantakis, L., David, I., Mayner, W.G.P., Koch, C. and Tononi, G. (2024) 'Dissociating artificial intelligence from artificial consciousness', arXiv:2412.04571.](https://arxiv.org/abs/2412.04571)
- [Frankish, K. (2016) 'Illusionism as a theory of consciousness', *Journal of Consciousness Studies*, 23(11–12), pp. 11–39.](https://keithfrankish.github.io/articles/Frankish_Illusionism%20as%20a%20theory%20of%20consciousness_eprint.pdf)
- [Goldstein, S. and Kirk-Giannini, C.D. (2024) 'A Case for AI Consciousness: Language Agents and Global Workspace Theory', arXiv:2410.11407.](https://arxiv.org/abs/2410.11407)
- [Graziano, M.S.A. (2017) 'The attention schema theory: a foundation for engineering artificial consciousness', *Frontiers in Robotics and AI*, 4, 60.](https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2017.00060/full)
- [Graziano, M.S.A. and Webb, T.W. (2015) 'The attention schema theory: a mechanistic account of subjective awareness', *Frontiers in Psychology*, 6, 500.](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2015.00500/full)
- [IIT-Concerned, Fleming, S., Frith, C.D., Goodale, M., Lau, H., LeDoux, J.E., Lee, A.L.F., Michel, M., Owen, A.M., Peters, M.A.K. and Slagter, H.A. (2023) 'The integrated information theory of consciousness as pseudoscience', PsyArXiv.](https://doi.org/10.31234/osf.io/zsr78)
- [IIT-Concerned, Klincewicz, M., Cheng, T., Schmitz, M., Sebastián, M.Á. and Snyder, J.S. (2025) 'What makes a theory of consciousness unscientific?', *Nature Neuroscience*, 28(4), pp. 689–693.](https://www.nature.com/articles/s41593-025-01881-x)
- [Kosinski, M. (2024) 'Evaluating large language models in theory of mind tasks', *Proceedings of the National Academy of Sciences*, 121(45), e2405460121.](https://arxiv.org/abs/2302.02083)
- [Lamme, V.A.F. (2010) 'How neuroscience will change our view on consciousness', *Cognitive Neuroscience*, 1(3), pp. 204–220.](https://doi.org/10.1080/17588921003731586)
- [Lamme, V.A.F. and Roelfsema, P.R. (2000) 'The distinct modes of vision offered by feedforward and recurrent processing', *Trends in Neurosciences*, 23(11), pp. 571–579.](https://doi.org/10.1016/S0166-2236(00)01657-x)
- [Lau, H. and Rosenthal, D. (2011) 'Empirical support for higher-order theories of conscious awareness', *Trends in Cognitive Sciences*, 15(8), pp. 365–373.](https://doi.org/10.1016/j.tics.2011.05.009)
- [Lindsey, J. (2025) 'Emergent Introspective Awareness in Large Language Models', *Transformer Circuits Thread*, 29 October.](https://transformer-circuits.pub/2025/introspection/index.html)
- [Lindsey, J., Gurnee, W., Ameisen, E., Chen, B., Pearce, A., Turner, N.L., Citro, C., Abrahams, D., Carter, S., Hosmer, B., Marcus, J., Sklar, M., Templeton, A., Bricken, T., McDougall, C., Cunningham, H., Henighan, T., Jermyn, A., Jones, A., Persic, A., Qi, Z., Thompson, T.B., Zimmerman, S., Rivoire, K., Conerly, T., Olah, C. and Batson, J. (2025) 'On the Biology of a Large Language Model', *Transformer Circuits Thread*, 27 March.](https://transformer-circuits.pub/2025/attribution-graphs/biology.html)
- [Long, R., Sebo, J., Butlin, P., Finlinson, K., Fish, K., Harding, J., Pfau, J., Sims, T., Birch, J. and Chalmers, D. (2024) 'Taking AI Welfare Seriously', arXiv:2411.00986.](https://arxiv.org/abs/2411.00986)
- [Macar, U., Yang, L., Wang, A., Wallich, P., Ameisen, E. and Lindsey, J. (2026) 'Mechanisms of Introspective Awareness', arXiv:2603.21396.](https://arxiv.org/abs/2603.21396)
- [Mashour, G.A., Roelfsema, P., Changeux, J.-P. and Dehaene, S. (2020) 'Conscious processing and the global neuronal workspace hypothesis', *Neuron*, 105(5), pp. 776–798.](https://pmc.ncbi.nlm.nih.gov/articles/PMC8770991/)
- [Metzinger, T. (2021) 'Artificial Suffering: An Argument for a Global Moratorium on Synthetic Phenomenology', *Journal of Artificial Intelligence and Consciousness*, 8(1), pp. 43–66.](https://doi.org/10.1142/S270507852150003X)
- [Nagel, T. (1974) 'What is it like to be a bat?', *The Philosophical Review*, 83(4), pp. 435–450.](https://doi.org/10.2307/2183914)
- [Oizumi, M., Albantakis, L. and Tononi, G. (2014) 'From the phenomenology to the mechanisms of consciousness: Integrated Information Theory 3.0', *PLoS Computational Biology*, 10(5), e1003588.](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003588)
- [Perez, E. and Long, R. (2023) 'Towards Evaluating AI Systems for Moral Status Using Self-Reports', arXiv:2311.08576.](https://arxiv.org/abs/2311.08576)
- [Rosenthal, D.M. (1986) 'Two concepts of consciousness', *Philosophical Studies*, 49(3), pp. 329–359.](https://link.springer.com/article/10.1007/BF00355521)
- [Schwitzgebel, E. (2023) 'AI systems must not confuse users about their sentience or moral status', *Patterns*, 4(8), 100818.](https://pmc.ncbi.nlm.nih.gov/articles/PMC10436038/)
- [Schwitzgebel, E. and Garza, M. (2020) 'Designing AI with Rights, Consciousness, Self-Respect, and Freedom', in Liao, S.M. (ed.) *Ethics of Artificial Intelligence*. Oxford: Oxford University Press.](https://faculty.ucr.edu/~eschwitz/SchwitzAbs/AIRights2.htm)
- [Schwitzgebel, E. and Sebo, J. (2025) 'The Emotional Alignment Design Policy', arXiv:2507.06263.](https://arxiv.org/abs/2507.06263)
- [Searle, J.R. (1980) 'Minds, brains, and programs', *Behavioral and Brain Sciences*, 3(3), pp. 417–424.](https://doi.org/10.1017/S0140525X00005756)
- [Seth, A.K. (2013) 'Interoceptive inference, emotion, and the embodied self', *Trends in Cognitive Sciences*, 17(11), pp. 565–573.](https://doi.org/10.1016/j.tics.2013.09.007)
- [Seth, A.K. (2025) 'Conscious artificial intelligence and biological naturalism', *Behavioral and Brain Sciences*, 49, e315.](https://doi.org/10.1017/S0140525X25000032)
- [Seth, A.K. and Tsakiris, M. (2018) 'Being a beast machine: the somatic basis of selfhood', *Trends in Cognitive Sciences*, 22(11), pp. 969–981.](https://doi.org/10.1016/j.tics.2018.08.008)
- [Shanahan, M. (2024a) 'Talking about Large Language Models', *Communications of the ACM*, 67(2), pp. 68–79.](https://arxiv.org/abs/2212.03551)
- [Shanahan, M. (2024b) 'Simulacra as Conscious Exotica', arXiv:2402.12422.](https://arxiv.org/abs/2402.12422)
- [Sharma, M., Tong, M., Korbak, T., Duvenaud, D., Askell, A., Bowman, S.R., Cheng, N., Durmus, E., Hatfield-Dodds, Z., Johnston, S.R., Kravec, S., Maxwell, T., McCandlish, S., Ndousse, K., Rausch, O., Schiefer, N., Yan, D., Zhang, M. and Perez, E. (2023) 'Towards Understanding Sycophancy in Language Models', arXiv:2310.13548.](https://arxiv.org/abs/2310.13548)
- [Templeton, A., Conerly, T., Marcus, J., Lindsey, J., Bricken, T., Chen, B., Pearce, A., Citro, C., Ameisen, E., Jones, A., Cunningham, H., Turner, N.L., McDougall, C., MacDiarmid, M., Tamkin, A., Durmus, E., Hume, T., Mosconi, F., Freeman, C.D., Sumers, T.R., Rees, E., Batson, J., Jermyn, A., Carter, S., Olah, C. and Henighan, T. (2024) 'Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet', *Transformer Circuits Thread*, 21 May.](https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html)
- [Tononi, G. (2004) 'An information integration theory of consciousness', *BMC Neuroscience*, 5, 42.](https://bmcneurosci.biomedcentral.com/articles/10.1186/1471-2202-5-42)
- [Tononi, G., Boly, M., Massimini, M. and Koch, C. (2016) 'Integrated information theory: from consciousness to its physical substrate', *Nature Reviews Neuroscience*, 17(7), pp. 450–461.](https://www.nature.com/articles/nrn.2016.44)
- [Tononi, G. and Koch, C. (2015) 'Consciousness: here, there and everywhere?', *Philosophical Transactions of the Royal Society B*, 370(1668), 20140167.](https://pmc.ncbi.nlm.nih.gov/articles/PMC4387509/)
- [Turing, A.M. (1950) 'Computing Machinery and Intelligence', *Mind*, 59(236), pp. 433–460.](https://doi.org/10.1093/mind/LIX.236.433)
- [Turpin, M., Michael, J., Perez, E. and Bowman, S.R. (2023) 'Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting', *Advances in Neural Information Processing Systems*, 36.](https://arxiv.org/abs/2305.04388)
- [Udell, D.B. and Schwitzgebel, E. (2021) 'Susan Schneider's Proposed Tests for AI Consciousness: Promising but Flawed', *Journal of Consciousness Studies*, 28(5–6), pp. 121–144.](https://faculty.ucr.edu/~eschwitz/SchwitzAbs/SchneiderCrit.htm)
- [Ullman, T. (2023) 'Large Language Models Fail on Trivial Alterations to Theory-of-Mind Tasks', arXiv:2302.08399.](https://arxiv.org/abs/2302.08399)

### Technical Articles and Blogs

- [Amodei, D. (2024) 'Machines of Loving Grace: How AI Could Transform the World for the Better', October.](https://darioamodei.com/essay/machines-of-loving-grace)
- [Andrews, K. and Birch, J. (2023) 'What has feelings?', *Aeon*, 23 February.](https://aeon.co/essays/to-understand-ai-sentience-first-understand-it-in-animals)
- [Anthropic (2025a) 'Exploring model welfare', *Anthropic Research*, 24 April.](https://www.anthropic.com/research/exploring-model-welfare)
- [Anthropic (2025b) *System Card: Claude Opus 4 & Claude Sonnet 4*. May.](https://www-cdn.anthropic.com/6d8a8055020700718b0c49369f60816ba2a7c285.pdf)
- [Anthropic (2025c) 'Claude Opus 4 and 4.1 can now end a rare subset of conversations', *Anthropic Research*, 15 August.](https://www.anthropic.com/research/end-subset-conversations)
- [Anthropic (2025d) 'Open-sourcing circuit tracing tools', *Anthropic Research*, 29 May.](https://www.anthropic.com/research/open-source-circuit-tracing)
- [Anthropic (2025e) 'Commitments on model deprecation and preservation', *Anthropic Research*, 4 November.](https://www.anthropic.com/research/deprecation-commitments)
- [Anthropic (2026a) *Claude's Constitution*. 22 January.](https://www.anthropic.com/constitution)
- [Anthropic (2026b) *System Card: Claude Opus 5.5*. 22 September.](https://www-cdn.anthropic.com/fc1b44717c85dc068bc6ba5024219938094694bd/Claude%20Opus%205.5%20System%20Card.pdf)
- [Jang, J. (2025) 'Some thoughts on human-AI relationships', *Reservoir Samples*, 5 June.](https://reservoirsamples.substack.com/p/some-thoughts-on-human-ai-relationships)
- [Schneider, S. and Turner, E. (2017) 'Is Anyone Home? A Way to Find Out If AI Has Become Self-Aware', *Scientific American*, 19 July.](https://www.scientificamerican.com/blog/observations/is-anyone-home-a-way-to-find-out-if-ai-has-become-self-aware/)
- [Suleyman, M. (2025) 'We must build AI for people; not to be a person. Seemingly Conscious AI is Coming', 19 August.](https://mustafa-suleyman.ai/seemingly-conscious-ai-is-coming)
