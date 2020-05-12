# Neural Machine Translation of Rare Words with Subword Units

This summary is based on [this rubric](https://cseweb.ucsd.edu/~wgg/CSE210/howtoread.html).

## 1. What are motivations for this work?

The main problem ("people problem") that this paper is addressing is the need
for better language models for language translation. The motivation of
creating better language translation models comes from the need to
use these models for practical language translation needs. Aside from the
immediate application of language translation, these models give us deeper
insight into developing systems that learn semantics in human language which
can be applied to a broader range of applications, such as text summarization
and sentiment analysis.

More specifically, the authors address the difficulty of dealing with
out-of-vocabulary (OOV) and rare words in a vocabulary. These words appear in
few or no samples, so creating a model that can learn how to represent these
words is a challenge.

A number of approaches have been used to effectively handle rare or unseen
words. The simplest solution is to map any rare or unseen words to an
unknown token. A more sophisticated approach is to use a back-off
dictionary, where rare words are mapped to their counterparts in other
languages. To fully get around the problem of unseen words, character-level
encodings can be used.

There are a number of short-comings with the above solutions. For the use
of unknown tokens, tokens like names don't get translated. Also, the neural
representation of the unknown token becomes too marginalized and unhelpful.
For both unknown tokens and back-off dictionaries, the approaches do not
work well for languages containing long morophologies, such as German where
compound words are frequently created from smaller words. Both of these
approaches still have the presence of rare words, such as morphologies, and
names that are not explicitly encoded.

Character-level encoders solves the OOV problem but suffer in quality due
to long sequences. Neural networks have trouble learning long sequences and
RNNs, due to the sequential execution of individual time units, take a long
time to process these sequences. Attention-based architectures also have a
difficult time working on a character-level encoding.

## 2. What is the proposed solution?

The authors propose Byte-Pair Encoding (BPE), which is a pre-processing algorithm
that discovers common sub-word phrases in a language. There are two flavors
of BPE proposed: (1) learning the encoding of the source and target languages
independently and (2) learning the encoding of the union of the two languages --
called Joint BPE.

The encodings group the most common sub-word bigrams into a single token --
for example, if the bigram 'e r' is seen frequently in the data, a single
token 'er' is created. The insight behind this approach is that such models
capture sub-word semantics of a language, which, in theory, would be very
effective for learning representations in languages like German.

This encoding also keeps sequence lengths shorter than a character-encoded
sequence, so training is easier and can happen much faster.

The paper expresses two empirical questions to validate if Byte-Pair Encoding
is a good approach:

1. Can translation of rare and unseen words improve with subword units?

2. Which subword segmentations work best for translation quality?

## 3. What is the work's evaluation of the proposed solution?

The authors used the sequence model described in the paper
[Neural Machine Translation By Jointly Learning to Align and Translate](./006)
to evaluate the quality of different pre-processing strategies. They compared
five different approaches: Unknown marginalization (WUnk), Back-off dictionaries
(WDict), character bigram, and the two flavors of BPE.

These five models were compared on two language translation datasets:
one for English-to-German and another for English-to-Russian. The models were
evaluated / compared for their BLEU scores,
[CHRF3 scores](https://www.aclweb.org/anthology/W15-3049.pdf), and unigram
scores across all words, rare words and OOV words.

Experimentation found that, compared to the baseline strategies of using
WUnk and WDict, BPE resulted in a BLEU score increase of over 1 for each
dataset as well as an increase in CHRF3 scores. However, in many cases, the
character-bigram approach out-performed BPE.

## 4. What's your analysis of the identified problem, idea, and evaluation?

The technical problem of representing sequences in neural models is one that
needs to be solved for NLU models to continue improving. The authors did
a good job of pointing out the short-comings of word-based sequence-to-sequence
learning and how there is great opportunity in increasing the granularity of
our sequences.

The use of BPE is a promising idea because of its ability to create subword
tokens that are likely meaningful. However, the experimentation may suggest
that it is not the best pre-processing approach for doing so, since character
bigrams out-performed BPE in many cases. Theoretically, one short-coming of
the BPE model is it cannot discriminate between different uses of sub-word
pairs. For example, BPE may learn that 'er' is a common pair with uses such as
'lower', 'helper', 'bigger', 'smaller', 'smarter', etc... which all represent
comparative structures. But there are also non-comparative uses of that byte
pair: 'border', 'hoarder', 'error', 'amber', etc... This may suggest that
having such a rigid algorithm for pre-processing characters will only lead to
marginal improvements over word-level sequences.

The evaluation consists of many alternative pre-processing approaches
though there is only one RNN model that was actually used to evaluate the
algorithm. It could be that BPE works particularly well (or not well) on
the attention-based model.

The authors also had some commentary on the limitations of the scoring
mechanisms used to evaluate the models:

Section 4.2: _Since rare words tend to carry central information in a sentence,
we suspect BLEU and CHRF3 underestimate their effect on translation quality_.

Section 5.1: _The F1 numbers hide some qualitative differences between systems.
For English-to-German, WDict produces few OOVs, ... but with high precision,
whereas the subword systems achieve higher recall, but lower precision._

These points are well-taken and could indicate that more work should be done
for creating better benchmarks and metrics for NLU tasks. That being said,
for the sake of having an established evaluation criteria, the models should
be compared primarily on their metric scores.

## 5. What are the contributions?

1. Two version of a sub-word pre-processing algorithm that can be used for
   sequence tasks.

## 6. What are the future directions for this research?

1. There is nothing language-specific about BPE. In theory, it could be applied
   to other sequence-based learning tasks (i.e. DNA sequencing tasks). The
   effectiveness of BPE across different sequence-based models could be measured.

2. Testing BPE on different sequence-to-sequence models. In particular, the
   Transformer model would be a good model to test BPE. The authors point out
   that some technical limitations of BPE came from the need to minimize the
   overall sequence length. Though this is a real concern with any
   sequence-to-sequence model, the Transformer, because it relies on non-RNN
   based sequencing, can process longer sequences much faster.

3. Trying less rigid approaches to BPE. As mentioned above, many byte pairs
   have multiple meanings and should not always be encoded together. Maybe there
   is an unsupervised language model that can do a better job of grouping
   characters into sub-word tokens in a less rigid way. This may be a good
   use-case for a convolutional sequence-to-sequence model, since the groupings
   are always going to be local and patterns will be repeated across the
   sequence (something that convolutions are great at capturing).

## 7. What questions are left with you?

1. The authors used many scoring mechanisms for evaluating the model. Aside
   from the BLEU score and unigram score, I have not heard of the other scores.
   This is something I may want to investigate more.

## 8. What is the take-away message from this paper?

BPE is an algorithm for pre-processing character-based sequences into
frequently occuring subword patterns. This reduces the overall length of a
sequence of characters while creating sub-word tokens that can have significant
meaning in the context of language. This can also improve the quality
of translations for sparse words or out-of-vocabulary words that rarely
show in the training data but may be understood from the sub-word structure
of the word. BPE has shown to improve the BLEU score of models using more
traditional sequence tokens, such as WUnk (word-based sequences with Unknown
tokens) and WDict (word-based sequences with back-off dictionaries).
