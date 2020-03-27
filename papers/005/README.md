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

The need for developing more powerful language models is clear, and the idea of using paragraph embeddings that augment the word embeddings is interesting. This could be an interesting avenue to explore on capturing information in natural language outside of individual words / terms.

The evaluation of the paragraph vectors method across a diverse set of benchmarks and dozens of alternative methods provides strong evidence that these paragraph vectors capture valuable semantics and perform well on real-word language tasks. The authors were thorough in their experimentation.

However, a number of alternative efforts to model paragraphs were mentioned in *Section 4: Related Works* (for example, the use of auto-encoders). None of these alternative paragraph models were shown in the experiments and there is no sense of how well the authors' paragraph embeddings compare to the alternatives.

One major drawback with the paragraph embeddings is the additional *inference* step needed to train paragraph embeddings on new examples. This is a non-trivial computation and disqualifies the use of these word embeddings on many language tasks. For example, a chat bot engaged in a live conversation with another human cannot wait for a paragraph embedding to be generated on every message the user sends before putting together a response. 

The authors also went into little detail of the training procedure for these paragraph embeddings. Many questions are left on how to replicate these results: chosen hyper-parameters, number of epochs for training, and size and nature of the layers within the architecture?

## 5. What are the contributions?

This paper contributes a mechanism for creating and using paragraph embeddings in natural language tasks. Two separate neural network architectures are proposed for creating these embeddings, and some experimentation is done indicating the quality of the embeddings generated from these architectures.

## 6. What are future directions for this research?

1. Training paragraph embeddings separately from word embeddings. The authors trained the paragraph vectors simultaneous to the word vectors, but would training the word vectors and paragraph vectors in separate phases result in significantly different behavior? When training them together, the two types of vectors learn to rely on one another for sequence predictions, but if the word vectors were trained first, those vectors could not rely on the paragraph vectors for information in the sequence. Would this result in significantly different paragraph structures? There are a number of publicly-available word vectors that anyone may use for their own language tasks. How would using one of those pre-trained word embeddings work when training paragraph embeddings?

2. Performing a deeper investigation into what information is captured by these paragraph embeddings. For example, previous authors have analyzed word embeddings and have discovered that linear relationships exist between these embeddings (i.e. *v(king) - v(man) + v(woman) ~ v(queen)*. Could there also be meaningful relationships within paragraph embeddings?

3. Finding ways to mitigate (or remove) the inference step needed for using paragraph vectors on new samples. This inference step limits the usefulness of these embeddings for certain language tasks.

## 7. What questions are left with you?

1. The authors discuss the hidden layer of their paragraph embedding as a *concatenation / average* of the word / paragraph vectors. What exactly does this mean? Most previous implementations of these hidden layers is a linear combination followed by a non-linear activation function; is this what the authors meant by *averaging* or did they forgo the use of a non-linear function? While the authors use the term *averaging* throughout most of the paper, in *section 3.4: Some Further Observations*, they write "PV-DM with sum can only achieve 8.06%". My assumption is that *sum* and *averaging* both mean *linear combination followed by non-linear activation* but this is not clear from the paper. Also, the term *concatenation* is not clear either.

2. What is the loss criteria for the architecture? The authors point out the use of a softmax criteria when discussing the previous work of learning word vectors then indicate that their own architecture uses the same overall architecture. Based on this, the assumption is that the authors are also using softmax. However, one of the authors, Tomas Mikolov, previous to this paper, pioneered the skip-gram model in a separate research proposal. The skip-gram loss criteria seems superior to the softmax criteria; it is much faster and, in many cases, results in better word vectors. Why did the authors choose not to use the skip-gram loss criteria.

## 8. What is the take-away message from this paper?

This paper proposes creating paragraph vectors for language modeling. These paragraph vectors capture the semantics of a single paragraph / sentence by working in conjunction with word vectors. Two alternative neural network architectures -- PV-DM and PV-BOW-- are created for generating paragraph embeddings. The paragraph vector models achieve state-of-the-art results across a diverse set of language benchmarks, suggesting that they provide improvements over existing methods for language modeling and capture information that previous methods fail to capture.


