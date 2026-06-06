---
layout: post
title: "The Software Engineering Velocity Illusion"
categories:
- programming
image:
  path: /assets/images/2026/06/06/Quote.png
  alt: Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler
tags:
- Artificial Intelligence
- AI
- Software Development
- Code Quality
- security
- AI Coding Agents
- Developer Tools
- Technical Debt
- Software Engineering
---

AI coding agents are no longer a novelty. They are being used in production workflows at companies of every size, praised in engineering blogs, featured in product launches, and adopted by developers who are measuring their output in thousands of lines per day. The tools are impressive. The demos are convincing. The promise is simple: write faster, ship more, do more with less.

***But are we actually building better software?***

I have been watching this closely, and what I have observed over the past couple of months does not fully match the story being told. What started as a personal unease gradually became a pattern and that pattern turns out not to be unique to the teams I have seen. It is playing out industry wide.

## My Observations

The concerns below are things I first noticed in practice. I am listing them not as abstract warnings but as observations from working software environments. Each one deserves more attention than it typically gets in the excitement around AI tooling.

### Poor Code Quality Is Accumulating

The first thing I noticed was how much code was being thrown away. Not deleted intentionally as part of refactoring but discarded because it simply did not work as the system started growing and complexity increases. **Code churn, the percentage of code discarded shortly after being written, has increased since AI-assisted coding became widespread.** The velocity numbers look good. The retention numbers do not.

Past year feels like the inflection point. Before that, the adoption was experimental. After that it became mainstream and that is when the quality debt started compounding. **Teams were generating more code than ever, but a growing portion of that code was not surviving long enough to matter.**

Beyond outright churn, there is a quieter accumulation of code that technically works but is poorly constructed. I have seen what I now think of as the "almost-right" tax, **code that passes review, passes tests, and then breaks under conditions nobody thought to test for, because the logic was never properly understood by anyone who shipped it.**

There is also a pattern of over engineering for edge cases that will never occur. **AI generates defensive code for improbable scenarios, adding complexity without adding value.** The irony is that this makes the codebase harder to read and maintain, which is the opposite of what the tooling was supposed to do.

The other symptom I have noticed is developers are spending more time fixing AI generated code than they spent writing code the old way. The generation is fast. The correction is not.

### Speed Is Being Confused With Efficiency

This is the one that bothers me most because it is the hardest to see in the moment. **Velocity is visible. The downstream cost is not.**

A developer who generates a hundred lines in ten minutes looks productive. But if forty of those lines need manual debugging, the real time cost is hidden in someone else's queue, in a future sprint, in a production incident. **The debugging tax on failed AI generated code is real, and it is not showing up in the metrics people use to justify the tools.**

There is also what I think of as trust debt. **Code accumulates in the codebase that functions correctly but that nobody on the team genuinely understands.** It passes tests. It ships. Nobody knows why it works. And when it stops working, and it will, nobody knows where to begin.

The other indicator I watch is refactoring. Healthy codebases have a rhythm of cleaning: moving logic, deleting the unnecessary, consolidating the duplicated. **That rhythm is slowing down.** Adding new code with AI assistance is fast and satisfying. Cleaning old code is slow and unrewarding. The incentive structure has shifted in the wrong direction.

### Security Is Getting Worse

As described above code that nobody fully understood and shipped at a pace that left no room for scrutiny does not stay contained to quality and reliability. It surfaces as security vulnerabilities. **AI generated code introduces security vulnerabilities at a rate that should give any engineering team pause, and the root cause is not hard to trace: poor quality code shipped fast is also insecure code.** The rate is not improving with newer or larger models. The vulnerability density in AI generated code is meaningfully higher than in human written code, and it is growing.

When the "almost-right" tax goes unnoticed and trust debt accumulates, the codebase develops blind spots. Security issues live in exactly those blind spots, in logic nobody reviewed carefully, in dependencies nobody verified, in edge cases the AI handled defensively but incorrectly. The confidence and the reality are pointing in opposite directions, which is exactly the condition in which serious breaches happen.

New security findings traced back to AI generated code have been growing sharply. This is not a future risk. It is happening now.

### Uptime and Reliability Are Suffering

Poor code quality, speed that skips scrutiny, and a growing surface of security vulnerabilities do not stay isolated in their respective lanes. They converge, and where they converge is production. **The accumulated weight of all above problems feeds directly into reliability problems.** Systems that were stable become less stable. Incidents increase. On-call rotations get busier.

The almost-right code that passed review eventually meets a condition nobody anticipated. The trust debt fails silently until it does not. The security blind spots opened by fast, unreviewed code become the entry points for incidents. **None of these failures announce themselves during development. They announce themselves at two in the morning.**

**The specific pattern I have observed is code that passes every functional test and then fails in production, if tests are written at all.** When the AI generates the code and the AI generates the tests, both are shaped by the same blind spots. The tests verify what the AI thought to ask, not what the system actually needs to survive. They could not verify what was not thought of. Functional correctness and actual production quality are not the same thing, and the gap between them is widening.

## The Concerns Nobody Is Talking About

Above concerns are the visible ones. There are others that I find equally worrying and that get less attention as of now.

### The Codebase Is Getting Bloated

AI generates code in isolation. Each prompt is its own context. **It does not know what already exists in the codebase, so it recreates logic that already exists instead of reusing it.** The result is duplicated code blocks appearing across different parts of the system, often doing the same thing in slightly different ways.

I am seeing copy-paste code outpacing refactored code. **The accumulated weight of this duplication makes every future change more expensive.** Fixing a bug in one place does not fix it in the three places where the same logic was independently regenerated.

The framing I keep coming back to: **AI is like a credit card for technical debt.** It lets you spend now and pay later, and the interest rate is compounding. 😁

### Supply Chain Attacks Are Evolving

This one is relatively new but it is serious. **AI coding agents sometimes generate code that references packages that do not exist.** They hallucinate library names that are plausible but fictional. Attackers have learned this, and they register those hallucinated names as real packages containing malicious code.

A developer or agent installs what looks like a legitimate dependency. The name looked right. The AI suggested it. **Nobody checked whether it actually existed in the registry before it was installed.**

The threat model has shifted. Attackers are no longer only targeting developers, **they are targeting the AI agents themselves**, crafting packages and content specifically designed to be discovered and chosen by automated coding tools.

### Autonomous Agents Are a New Attack Surface

When an AI coding agent has access to a codebase, it reads files. It reads README files, code comments, configuration files, issue descriptions. **Any of those can contain malicious instructions placed there specifically to redirect the agent's behaviour.** This is prompt injection.

The access surface compounds the problem. **Agents operate with developer level permissions: access to source code, environment secrets, deployment pipelines, often with less human oversight.** The blast radius of a compromised agent is significant.

Secret leakage is also higher in AI assisted repositories than in traditionally written ones. Credentials, API keys, and internal identifiers find their way into generated code more often than most teams realise.

### The Human Cost

The concern I find most difficult to quantify but easiest to observe in practice, **developers are shipping code they do not fully understand.** Not because they are careless but because the workflow no longer requires understanding as a precondition of shipping.

The review process is also changing. **Reviewers are approving AI generated code more readily.** The output looks professional. It is well-formatted, sensibly named, and syntactically clean. That surface plausibility lowers vigilance. Poor design choices hidden beneath a clean surface pass review in ways they might not have before.

**The skill gap this creates is quiet and slow moving.** Nobody loses the ability to code overnight. But the muscle of reading unfamiliar code critically, of understanding why something works before shipping it, weakens without exercise.

## Conclusion

All of the above can be summarised in a single observation. **AI does not automatically improve software delivery. It amplifies the engineering system it operates within.**

Teams with strong testing cultures, disciplined review processes, and a genuine commitment to code quality are finding that AI tooling makes them faster without meaningfully degrading their output. **The guardrails they already had in place absorbed the noise.**

Teams without those foundations are finding that AI makes them faster at accumulating the exact problems I described above. More code, more bugs, more debt, more risk, arriving faster than before.

**The tool is not the variable. The engineering culture it lands in is the variable.** That is an uncomfortable conclusion because it means the teams that most need help from these tools are the ones least equipped to use them safely.

The velocity gains from AI coding agents are real. I am not arguing otherwise. **Code does get written faster. Features do ship sooner.** That part of the story is true.

But velocity is not efficiency, and speed is not quality. **The downstream costs: rework, review burden, latent defects, security debt, bloated codebases, and widening skill gaps, are real too, and they are not showing up in the metrics that get celebrated.**

The teams suffer the most from these symptoms share a common pattern. They adopted the speed. **They did not adopt the discipline that makes the speed sustainable.**
