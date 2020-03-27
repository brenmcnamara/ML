# Distributed Representations of Sentences and Documents

This summary is based on [this rubric](https://cseweb.ucsd.edu/~wgg/CSE210/howtoread.html).

## 1. What are the motivations for the work?

The main problem ("people problem") that this paper addresses is the need for better language models. The motivation of creating a better language model comes from the ability of these models to solve real-word AI problems in natural language such as speech-to-text transcription, machine translation, and semantic analysis.

More technically, these models do not adequately capture the semantics latent within natural language, and this limits the ability for a machine to perform well on natural language tasks. Solutions such as bag-of-words and bag-of-ngrams do not understand the relationship with individual words in language (for example, these models don't understand that the word "powerful" is more similar to the word "strong" than "Paris"). These models also fail to capture the significance of word ordering. Word embeddings, which is a more recent improvement, solves some of the major shortcomings of language modeling, but still fails to capture information from a wider context of text beyond the individual words.

## What is the proposed solution?

This paper proposes augmenting the concept of word embedding by introducing a sentence / paragraph embedding. While the word embeddings capture the semantics of a single word within the global context, paragraph embeddings capture the overall meaning of a single paragraph (or snippet of text). The theory is that these additional embeddings, having captured information of the word sequences within a context, can fill in the gaps that word vectors cannot.

The authors introduce two alternative architectures for learning paragraph embeddings. The first architecture, called the *Distributed Memory Model for Paragraph Vectors* (PV-DM), takes as input a single paragraph embedding (for the current paragraph) alongside a fixed-length sequence of word embeddings (representing a sequence that exists within the paragraph) and predicts the next word in the sequence. The second architecture, called the *Distributed Bag-of-Word version of Paragraph Vectors* (PV-BOW), takes as input a single paragraph embedding and predicts the words that show up in some random window within the paragraph.

As a technical note, when using the paragraph embedding model on unseen samples, new paragraph embeddings must be generated for those samples before they could be applied to a specific modeling / prediction task. This requires an intial training step where paragraph vectors are learned for the paragraphs in the task.

## What is the work's evaluation of the proposed solution?

The paragraph embedding model is compared to a number of other popular language models on three datasets. The first dataset is the Stanfard Sentiment Analysis Treebank Dataset which contains movie reviews from Rotten Tomatoes. The authors compare the paragraph vector model to: Naive Bayes, SVMs, Bigram Naive Bayes, Word Vectors, Recursive Neural Networks, Matrix Vector-RNN, and Recursive Neural Tensor Networks. Two separate types of experiments are done using this dataset: one tests the accuracy of these models on a binary (positive / negative) sentiment analysis task and the other tests the accuracy on a more fine-grained (very negative, negative, neutral, positive, very positive) task.

The second dataset is the IMDB sentiment analysis dataset. This dataset is different in that the reviews are lengthier and require models to capture information over a larger context. The paragraph vector model is compared to more than a dozen alternative methods on a basic sentiment analysis prediction task.

The final dataset contains results returned by popular search queries. Each result contains a description of the website that matched the result, which is included when displaying those web pages. These results are split into training sample as follows: each training sample contains a triplet of returned search results: two of those results belong to the same query while the third is from a different query. The model is given two search results as input and must compute a distance between them. If the model is given a triplet and gives predicts a closer distance between the two matching results than two non-matching results, the model has made a correct prediction on that particular sample. Four separate methods are compared using this learning task: bag-of-words, bag-of-bigrams, word vectors, and paragraph vectors.

On all the above benchmarks, the paragraph vectors out-performs the alternative models (meaning it has higher accuracy across the test samples).

An important note: the paragraph vectors used in the experiments is a combination of the PV-DM and PV-BOW (the paragraph vectors returned from each architecture are contactenated and fed into the learning task). The authors point out that PV-DM achieves state-of-the-art results on its own but the combination of the two paragraph vectors achieves the best results. PV-BOW does not perform as well as PV-DM.

## 4. What's your analysis of the identified problem, idea, and evaluation?


