# Neural Machine Translation By Jointly Learning to Align and Translate

This summary is based on [this rubric](https://cseweb.ucsd.edu/~wgg/CSE210/howtoread.html).

## 1. What are motivations for this work?

The primary motivation is to develop natural language systems that do a better
job of capturing the meaning of human languages. In particular, this paper
examines the problem of machine translation (translating from one human language
to another by an automated system). This is a difficult, open problem due to the
complex nature of language, and progress in this domain is needed.

The paper examines advancements in neural networks around encoder-decoder
architectures. These architectures use an RNN encode an input sequence in one
language, generate a fixed-size vector representation of that sequence, then use
that learned vector representation as a prior to a decoder architecture that
tries to spit out a sequence of words in a different language that has the same
meaning as the input.

While this has brought about strong results in the domain of machine translation,
the best machine translation systems at the time still did not rely entirely
on neural networks. Encoder-Decoder networks, though promising degrade dramatically
in quality the longer the input sequence. The authors point out that a major
limitation of the encoder-decoder architecture is that the output of the encoder
network is a fixed size array. This limits the ability of a network to represent
longer, potentially more complex, sentences.

## 2. What is the proposed solution?

The authors propose some tweaks to the existing encoder-decoder model. Instead
of simply passing a single, fixed-sized vector into the decoder, they found
a way to make the decoder a function of a variable number of sequence vectors.
To make this work, all the hidden states of the encoder for each time _t_
(representing the t-th input symbol) are fed into the an alignment feed-forward
network. This alignment network computes a weight, _alpha_, for each encoder-decoder
element pair, which determines how much an input word should affect a particular
output word. These learned weights are then applied across all the hidden units
of the encoder network and passed into the given decoder output. The hypothesis
is that this network will achieve better results because (1) each output of the
decoder is a function of a variable number of hidden states, and (2) the
alignment weights will learn to put greater emphasis on parts of the input
that are more relevant to a particular output symbol.

## 3. What is the work's evaluation of the proposed solution?

The authors use the BLEU score to evaluate the quality of the machine
translations. This is a standard measure of translation quality (first
introduced in [this](https://www.aclweb.org/anthology/P02-1040.pdf) paper).

The BLEU score of the augmented encoder-decoder network (called RNNsearch)
is compared to the original encoder-decoder architecture (called RNNencdec) and
a non-Neural Network model (Moses). The RNNSearch and RNNencdec algorithms are
also trained on parallel corpera (corpera where a version of multiple
languages is available) containing examples with 30 or fewer symbols
(RNNsearch-30 and RNNencdec-30) and examples with 50 or fewer symbols
(RNNsearch-50 and RNNencdec-50). The BLEU scores of these different models
are also compared on examples with different input sequence lengths to check
how well the quality of translations are mantained for longer sequences.

From the results, it is clear that RNNsearch outperforms RNNencdec. For
shorter sequences, the two models are comparable, but as sequence length
increases, the RNNsearch algorithm maintains translation quality while the
RNNencdec degrades.

During pre-processing, any new words never seen before were assigned to a
special `UNK` token. The RNNsearch algorithm did not outperform Moses over the
entire set of examples, but when examples with `UNK` elements were removed,
RNNsearch did outperform Moses.

## 4. What is your analysis of the identified problem, idea, and evaluation?

The problem this paper tackles is clearly important. For machine translation
systems to become generally useful, they need to work on longer sequences of
text, which is one of the primary problems this paper addresses.

The idea that motivated this network architecture is very promising. I can see
with hindsight over all the subsequent research that evolved from this paper
that not only was the alignment network a successful innovation, but some of
the core principles that motivated the network were significant. In particular,
the alignment network allows the network to learn an attention model over the
input sequence. The concept of using an attention model has been a significant
advancement of deep learning research.

The evaluation of the resulting network is strong. Experiments show clearly
that the new network architecture maintains performance better than the previous
RNNsearch model. However, the BLEU score measures over examples of different
lengths does not include the Moses model, which would be helpful to see. This
model outperformed the RNNsearch model across all examples, but there is no
indication how well Moses does on text of different lengths. Also, the BLEU
scores over different-length text measuring text greater than 60 symbols long.
The evaluation showed that the translations perform well on 60-length sequences,
but how about longer? Is there a breaking point for this model?

## 5. What are the contributions?

1. The primary contribution of this paper is an altnerative encoder-decoder
architecture that incorporates an alignment feed-forward network.

2. A second, though arguably more important, contribution of this paper is the
use of attention based models. In principle, the alignment network is indicating
which parts of the input the model should pay attention to. This principle
of attention-based networks can be an innovative step forward in network
architectures.

## 6. What are future directions for this research?

1. The authors point out that the Moses model outperforms RNNsearch with the
presence of unknown symbols. This requires further exploration. One idea is,
instead of using an UNK symbol, to perform test-time inferencing over the
unknown word. However, the disadvantage to this approach is an increased
run-time cost of the algorithm.

2. Evaluate RNNsearch on other corpera of different languages. The test set
used in this experiment was an English-to-French dataset. English and French
are very similar languages. What datasets exist in other languages and how well
does this model perform on those datasets (for example, German or Arabic, which
are languages with very different grammatical structures than English).

3. The alignment network uses a weighted sum of input hidden states to compute
a new vector that is fed into a particular time point of the decoder. However,
this approach results in a loss of ordering information. Could this ordering
information be important when condition on some context? Is there a new
alignment architecture that can keep some ordering information in tact?

## 7. What questions are left with you?

1. The RNNsearch and RNNencdec algorithms are evaluated on examples of
different lengths, but this stops at examples of length 60. Is this a limitation
of the available dataset? How well do these RNN models work on very long
sequences (100+ words)? Would a Bleu score even be a good measure to use for
very long sequences?

## 8. What is the take-away message for this paper?

RNN encoder-decoder networks are used for different natural language tasks;
in particular, they are used for machine translation. The problem with RNN
encoder-decoder networks for machine translation is that they are not good
at translating long sequences of text. The authors introduce a new RNN
encoder-decoder network that introduces an alignment network. This alignment
network serves two main purposes: (1) it allows for the decoder to take as
input a variable number of inputs (which are the hidden states from each
encoder time point) (2) it forced particular outputs in the decoder sequence
to pay attention to particular input examples that provide the greatest
context. Overall, the result is the new RNN encoder-decoder model performs
comparably well to the original RNN encoder-decoder on short translation
examples, but outperforms greatly as the examples grow in input length.
