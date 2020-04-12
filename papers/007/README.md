# Learned in Translation: Contextualized Word Vectors

This summary is based on [this rubric](https://cseweb.ucsd.edu/~wgg/CSE210/howtoread.html).

## 1. What are motivations for this work?

The main problem ("people problem") that this paper is addressing is the need
for better language models. The motivation of creating a better language model
comes from the need to use these model to solve real-word AI problems in natural
language such as speech-to-text transcription, machine translation, and semantic
analysis.

More technically, this paper addresses the need for deeper, more contextualized
representations of natural language to use that work across different
sub-domains of natural language. At the time this paper is written, word
embeddings are a popular choice for transfer learning across NLU tasks.
However, word embeddings suffer from two major disadvantages: (1) each word
in an embedding, for the most part, has context-independent meaning, and (2)
the word embedding representations are shallow (represent a single layer of
a network). [Paragraph vectors](../005/README.md) is one attempt at addressing
the contextual problem of word vectors by adding a separate paragraph / document
vector. However, these representations are still shallow and fixed, and this
approach introduces a need for a non-trivial training step during inference.
In general, RNNs and, more specifically, encoder-decoder networks have shown to
do a good job at capturing deeper contextual representations of language.
However, at the time of this research, there is no popularized mechanism for
capturing these deeper contextual representations in such a way that can be
transfered across problems.

## 2. What is the proposed solution?

The solution this is presented is to use a machine translation training task
with an encoder-decoder network to learn contextualized
representations of language which can be applied to many NLU problems. This
approach, in theory, solves the two problems of word embeddings described above:
it adds contextual understanding of words and the representation is deep, which
should give it the capacity of capturing richer information from language.
The authors train on a two-layer bi-LSTM encoder-decoder network with
attention. The network is trained on English-German translations and the
deep, pre-trained network can be applied to NLU tasks. The authors use a
biattentive classification network (BCN) with the pre-trained weights for
transfering learning from this network to text classification problems. For
question-answering tasks, the authors use a Dynamic Coattention Network to
transfer learning from this pre-trained task.

## 3. What is the work's evaluation of the proposed solution?

The authors compare performance of this network compared to a number of
other state-of-the-art networks, include many different LSTM architectures
(P-LSTM, CT-LSTM, TE-LSTM, bmLSTM, SA-LSTM, oh-LSTM, and LSTM-CNN), SVM, NTI,
etc... (a full list of these different architectures can be found on page 8
of the original paper). These different networks are compared across a number
of sub-domains and datasets: SST-2 and SST-5 for sentiment classification,
IMDb for text classification, SNLI for entailment, SQuAD for Question-Answering,
and TREC-6 and TREC-50 for question classification. Overall, the CoVe networks
two of the six learning tasks.

Across the 6 datasets / tasks, 3 separate versions of the pre-trained network
were used: (1) a network using GloVe embeddings with character-level n-grams,
(2) another network using GloVe embeddings with CoVe embeddings, and (3) a final
network using GloVe, CoVe, and character n-gram embeddings. The purpose of these
three networks is to determine how much value the contextual vector adds to the
overall learning compared to sequences without contextual vectors. Of
the three networks GloVe+Char < GloVe+CoVe < GloVe+CoVe+Char.

## 4. What's your analysis of the identified problem, idea, and evaluation?

The problem this paper addresses is an important problem within NLU. For
there to be good applications to use across NLU tasks, practitioners need a way
to train network architectures in a reasonable amount of time. Due to the
extreme computational demands of deep neural network training, having
pre-trained networks that work across sub-domains speeds up the training
process and allows for quicker iterations.

The solution can be broken down into the following: (1) using encoder-decoder
architectures for deep contextual representations of words and (2) using machine
translation as the task for training contextual representations. Both points
seem like promising avenues for capturing language semantics. Specifically on
the use of machine translation to create language models, the paper does not
discuss any alternatives. For encoder-decoder networks, the natural use case
is machine translation. Could there be better alternative learning tasks for
language modeling? Or could the choice of languages dramatically affect the
ability of a network to learn good contextual representations.

The evaluation takes into account a number of alternative representations and
a number of sub-domains. However, the CoVe network achieves state-of-the-art
in 2 of the 6 tasks, which may suggest that these pre-trained networks are not
as universally useful as the authors claim.

## 5. What are the contributions?

1. The authors introduce a method for creating contextual embeddings of symbols
   which can be applied to language tasks.

2. The authors experiment with machine translation as a task for generating
   a general-purpose deep, contextual language model.

3. The use of a biattentive classification network to transfer contextual
   embeddings to other language tasks.

## 6. What are the future directions for this research?

1. Could experimenting with different machine translation tasks result in
   significantly different results? The authors used an English-German for
   machine translation. Would other languages be better-suited for the
   purposes of creating a good language model? Could translating two more
   similar languages (such as English and French) give better / worse
   results? Is there potentially a way to perform multiple language
   translation tasks simultaneously and would that result in a language model
   that performs better?

2. The authors created an elaborate network structure (i.e. biattentive
   classification network) to transfer the contextual embeddings to other
   language tasks. Overall, as researchers continue to experiment with
   pre-trained networks for language modeling, are there standard practices
   for how to transfer these layers into other architectures? There is some
   need for more general research / discussion on the state of transfer
   learning within NLU.

## 7. What questions are left with you?

1. The authors discuss biattentive classification networks (BCN) and Dynamic
   Coattention Netowkrs (DCN) for transfer learning. I am not familiar with
   either of these networks and what advantages they provide, and would like to
   do more investigation into these architectures.

2. The authors compare transfer learning with networks that use GloVe+Char
   vectors, GloVe+CoVe vectors, and GloVe+CoVe+Char vectors. In any case that
   CoVe embeddings are being used, GloVe embeddings are also being used. Is
   there a reason for this? Have the authors tried using CoVe alone? Are CoVe
   embeddings not capturing enough information of the language to exist on
   their own?

## 8. What is the take-away message from this paper?

CoVe embeddings are deep, contextual word vectors that can be used across
different natural language domains. These embeddings are created with a
two-layer bi-LSTM encoder-decoder network architecture trained on a machine
translation task. These embeddings capture a lot of contextual information
between words that don't with standard word embeddings (GloVe and Word2Vec),
and can be used to augment existing language tasks.
