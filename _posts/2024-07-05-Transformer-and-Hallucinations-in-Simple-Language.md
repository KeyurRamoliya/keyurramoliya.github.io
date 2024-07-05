---
layout: post
title: "Transformer and Hallucinations in Simple Language"
categories:
- programming
tags:
- Artificial Intelligence
- AI
- Hallucinations
- Transformers
- Language Models
- GPT-3
- GPT-4
- OpenAI
- Machine Learning
- Deep Learning
- Neural Networks
- NLP
- Natural Language Processing
- AI Ethics
- AI Safety
---

The original transformer's architecture is similar to the one below. But let's avoid discussing the way it is represented. We will use not-technical terminology to understand how LLM works and why it hallucinates.

|![TheLeanStartup](/assets/images/2024/07/05/Transformer.png)|
|:--:| 
|*https://arxiv.org/abs/1706.03762*|

Imagine a language model as a very clever talking bird that has read tons and tons of writing. This bird has read all sorts of things - old stories, people talking online, science papers, and posts from social media. But this bird doesn't just copy what it read. Instead, it has learned how language works really well. It's like the bird became a master at using words and can now make up its own stories.

Now, let's talk more about why this clever bird sometimes says things that aren't true(hallucinations):

1. **The Bird's Job is to Make Things Up:** The first thing to understand is that making up new sentences is exactly what these clever birds (language models) are supposed to do. When you ask a question, the bird doesn't look up the answer in a big book. Instead, it makes up a new answer every time.
2. **No Ready-Made Answers:** If you could look inside the bird's brain, you wouldn't find a list of facts or answers. Instead, you'd see billions and billions of numbers. The bird uses these numbers to create new sentences from scratch, like a chef making a new recipe each time.
3. **Sounds Real, But Isn't:** A lot of what the bird says sounds like it could be real information from a website or a book. But it's more like a very realistic story. Just like in a good story, things might sound true but they're actually made up.
4. **Like a Magic 8 Ball:** You can think of the bird as being like a magic toy that can give you an infinite number of answers. It's not like a big book of facts (an encyclopedia), but more like a toy that comes up with new answers all the time.
5. **Guessing Game:** The way the bird makes sentences is by playing a guessing game. If it sees the words "the sun rises," it might guess that the next word could be "in." Then it uses "the sun rises in" to guess the next word, maybe "the." Then it might guess "east." It keeps doing this over and over to make whole sentences and paragraphs.
6. **Learning from the Internet:** The bird learned to play this guessing game by reading lots and lots of text from the internet. It figured out which words often come after other words. It's like the bird has a huge list in its head that shows how likely it is for one word to come after another.
7. **Number Crunching:** When the bird is guessing the next word, it's actually doing a lot of math with all those numbers in its head. For each word it knows, it calculates how well that word would fit next in the sentence. The word with the best score is the one it chooses.
8. **Like a Word Slot Machine:** You can think of the bird as being like a special machine in a casino. When you pull the lever (or ask a question), it spins and gives you words instead of fruit symbols.

This is why the clever bird (language model) sometimes says things that aren't true. It's not working from a list of facts, but creating new sentences based on patterns it learned from reading. It's really good at making sentences that sound right, but it doesn't actually understand if they're true or not.

So, while these language models are amazing at creating text that fits what we're asking about, we need to remember that they can make mistakes or even completely make things up. They're not magical truth-tellers, but more like incredibly skilled storytellers who sometimes get carried away with their stories.

When we use these models, we need to give them clear instructions about what to talk about. We also need to check if what they say is true, especially for important things. This way, we can use their amazing ability to create text, but we can also make sure we're not believing something that isn't true.
