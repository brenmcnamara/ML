# Learned in Translation: Contextualized Word Vectors

This summary is based on [this rubric](https://cseweb.ucsd.edu/~wgg/CSE210/howtoread.html).

## 1. What are motivations for this work?

The main problem ("people problem") that this paper is addressing is the need
for better language models. The motivation of creating a better language model
comes from the need to use these model to solve real-word AI problems in natural
language such as speech-to-text transcription, machine translation, and semantic
analysis.

More technically, this paper addresses two major problems with state-of-the-art
language models.

The first issue is that language models are often very slow to train.
This is primarily because existing solutions (at the time of this paper) use
sequence models, which most be run sequentially. Therefore, such models have
natural bottlenecks on how fast they can be run. The authors point out two
examples: ByteNet and ConvS2S, for speeding up the overall computation of
language models using convolutional neural nets.

The second issue is that language models have trouble learning long-term
dependencies in language. For example, given the sentence: "The pie that
my mother baked that afternoon on a sunny day... was amazing." The verb "was"
depends on the subject "pie", which is a dependency that needs to be remembered
across an arbitrarily long sequence of words. In the ByteNet and Conv2S2, the
computational relationship between two words relative to their distance in
the sequence scales at O(logn) and O(n) respectively, meaning there is room
for improvement for modeling that relates long-term dependencies.

## 2. What is the proposed solution?

The authors propose a new neural architecture called the Transformer. This model
relies entirely on attention mechanisms to learn relationships between words;
no convolutions or sequences are used in the transformer architecture. As a
result, the overall computation for a transformer is much faster since all the
operations can be parallelized. Because the transformer process word tokens
in a fully connected sequence, the distance between any two words in the
sequence is constant. In theory, this should make the transformer better-suited
for learning setences with long-term dependencies between terms.

## 3. What is the work's evaluation of the proposed solution?

The authors test the transformer on three different datasets / tasks.
They test on (1) the WMT 2014 English-to-German translation dataset, (2)
the WMT 2014 English-to-French translation dataset, and (3) the Wall Street
Journal portion of the Penn Treebank dataset for _constituency parsing_.
For the first two (translation) tasks, they compare the model to 5 other
popular models (along with 3 ensembles). The transformer out-performed
all models (including the 3 ensembles). For the final task
(constituency parsing), the transformer was compared to many alternative
parsers, and achieved results comparable to the two best (Luong et al. and
Dryer et al.) despite only being trained on a small portion of the entire
dataset.

## 4. What's your analysis of the identified problem, idea, and evaluation?

The problem of building faster language models with better handling of
long-term dependencies is an important one. LSTMs and GRUs are both sequential
architectures that have been suggested to improve long-range dependency
learning. Sequential models, when combined with attention mechanisms show even
greater improvement for learning these longer-term dependencies. The authors
came up with a novel approach that scrapped everything that made sequential
models slow and started from scratch, with a unique self-attention mechanism
for learning.

The evaluation of the transformer model on the translation tasks seem
very promising. Despite a much shorter training time, they were able
to outcompete even the ensembles. This seems to suggest a drastic improvement
to existing language architectures.

## 5. What are the contributions?

1. The authors create a new language architecture call the transformer which
   outperforms previous architectures while having a training time that is
   much shorter.

2. The authors introduce multi-headed self-attention. This seems to be the key
   innovation of the transformer. Each head of the self attention mechanism
   learns a different set of attention parameters. This allows the model to
   pay attention to different aspects of the input on each head. The results
   of the multi-headed attention mechanism are concatenated and passed into
   a fully connected layer.

3. The authors use scaled-dot attention within their attention mechanism, but
   introduce a scaling factor. This scaling factor helps normalize the output
   of the attention calculation. Since the result of this calculation has
   smaller values, the gradients tend to be more stable.

4. The input of the transformer is a combination of the input embeddings. To
   encode position information into these embeddings, the authors use a
   positional encoder. Positional encoders have been used in earler papers,
   but the authors introduce their own positional encoding formula using
   sinusoids.

## 6. What are the future directions for this research?

In the conclusion, the authors mention three directions of future research:
(1) extending the transformer to problems with input / output modalities other
than text, (2) investigating using local, restricted attention mechanisms (based
on some neighborhood), and (3) making generation of outputs less sequential.

Some additional thoughts on future directions:

1. To take the authors ideas on local attention mechanisms further: having a
   local neighborhood of attention weights with some parameter sharing. Both
   convolution and sequence models provided improvements to previous
   architectures in part due to the ability of these models to incorporate
   parameter sharing. For example, since a convolution is a set of weights
   that convolves an entire tensor of inputs, patterns learned at the beginning
   of the input could inform the learning of patterns at the end of an input.
   With localized attention weights, one could think of convolving attention
   parameters over a sequence of tokens to find similar patterns at different
   parts of the sequence.

2. More investigation into positional encoders. The authors, in addition
   to using an existing positional encoder, provided their own, which was shown
   to have comparable results. How can a positional encoder capture positional
   information inside a combination of word embeddings without losing information
   of the original embedding. One thought: could making the positional-encoded
   embedding input of greater dimension than the individual word embeddings
   allow for better capture of positional information? Positional encoding
   is an important step for non-sequential models to represent sequence inputs.

3. In section 6.2, the authors make the statement: "... determining compatibility
   is not easy and ... a more sophisticated compatibility function than dot
   product may be beneficial." One could try training a transformer model with
   different compatibility parameters and weight sizes to see if any
   compatibility function seems to do much better than the alternatives.

## 7. What questions are left with you?

1. The whole concept of positional encoding confuses me. How does the sinusoidal
   function, when added to the original word embeddings, allow the model to
   figure out positional information? To me, it seems like modifying the
   embedding space in any way would cause the semantics of that space to get
   corrupted. I'm interested in further investigating this.

2. How well does the transformer comparse the sequence models for different
   sequence lengths. Because the input embeddings are combined in some way,
   is information lost? Does this cause any degradation of transformer
   performance on very long sequence?

3. During training, the sentence pairs are batched together by approximate
   sequence length. What is the reasoning behind this? Does this affect the
   overall quality of training in any way? The authors don't justify this
   decision in the paper.

4. The authors use a non-traditional beta-2 value for their adam optimizer.
   Curious if there is any reasoning behind this.

## 8. What is the take-away message from this paper?

The transformer model is a new neural network architecture for language /
sequence modeling. This model uses no RNNs and no CNNs and, as a result,
can be trained much faster. Instead, the transformer relies entirely on
attention mechanisms within the encoder and decoder to capture the relationship
between input and output sequences. The transformer outperforms other
state-of-the-art models.
