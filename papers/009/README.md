# Convolutional Sequence-to-Sequence Learning

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

The main issue with state-of-the-art sequence-to-sequence language models
is that these models are often very slow to train. This is primarily because
existing solutions (at the time of this paper) use sequence models, which must
be trained sequentially. Therefore, such models have natural bottlenecks on
how fast they can be trained. Language architectures that are different from
RNN's provide the benefit of training faster. One paper,
_Language modeling with Gated Linear Units_ (Dauphin et. al. 2016) has been
cited as a successful example of using an non-sequential architecture for
language modeling. In a sense, this paper builds on work previously done here
and, in particular, uses the gated linear unit (GLU) non-linearity discussed
in this work.

## 2. What is the proposed solution?

The authors propose a CNN architecture for representing the encoder / decoder
of a sequence-to-sequence language model. In this type of architecture, the
input sequence can be fed into the model as a single step. Those inputs
can be processed in parallel.

The claim put forth is that this model can be trained much faster while
providing language modeling results competitive with the existing
sequence architectures.

In particular, this model uses a number of ideas borrowed from previous works
to achieve strong results. This includes the use of a Gated Linear Unit
non-linearity (Dauphin et al 2016), residual connections (He et al 2015a),
positional embeddings, and heavy use of weight normalization during
initialization and between convolution blocks / layers.

This is the first fully convolutional architecture for sequence-to-sequence
modeling. However, it is important to point out that even though the decoder
portion of the model is convolutional, generation of the output sequence
would have to be done sequentially. This is because generating the next word
in a sequence requires as input the previously generated words.

Finally, this work also uses mutli-layer attention; every hidden layer in the
decoder has its own attention layer.

## 3. What is the work's evaluation of the proposed solution?

The authors compare there network architecture to a number of popular,
state-of-the-art architectures for sequence-to-sequence modeling: LSTM, GNMT,
ByteNet, and GRU. These models are compared on three different translation
datasets: WMT '16 English-Romanian, WMT '14 English-German, and WMT '14
English-French. An abstractive summarization task / dataset is also used to
measure the quality of the convolutional language model.

Across the 3 datasets, ConvS2S outperforms all previous state-of-the-art
models. On the English-German and English-French translation tasks, ConvS2S
has a 0.5 BLEU score improvement. On English-Romanian, the model has a 1.5
BLEU score improvement.

For text summarization, though the ConvS2S model does not achieve
state-of-the-art results, it is competitive with the best sequence-to-sequence
models.

Overall, the model took about half the GPU time needed for the next-best
machine translation architecture. In addition, the authors compare the
language generation runtime (time to compute predicted outputs for a batch
of input sequences), and the results indicate that generation speed is
an order of magnitude faster than alternative RNN-based models.

The authors also discuss different hyperparameter settings such as the
number of encoder / decoder layers, the number of attention layers, and the
kernel size of convolutions for the encoder and decoder layers.

## 4. What's your analysis of the identified problem, idea, and evaluation?

Developing faster language architectures is an important step towards
further developing language translation models. The training process for
these models take on the order of weeks or months, and iteration speed is
important for the engineering work to progress.

For network architectures to achieve significant speed-up, the intuition
is that we may need to move away from sequence models due to the fact that
they must process input sequences sequentially.

The evaluation of this paper was thorough and the discussion of different
hyperparameter settings was also helpful. This helped tease out the benefits
each of these settings provided, and the authors include helpful discussions
on how these hyperparameters made particular improvements to the network.
For example, increasing the number of encoder blocks seems to be more helpful
than increasing the number of decoder blocks. This is an interesting insight
that may help guide future iterations of this type of architecture.

The state-of-the-art results across the language tasks is promising. This
strongly indicates that a CNNs can become an important aspect of future
language models. However, due to the number of additional architectural
decisions, it is hard to tell if this model makes a significant improvement
because of the convolutional aspect of the network or because of one of the
many other decisions made that don't necessarily have to do with CNNs. For
example, the authors introduce an attention layer across every single decoder
layer. Attention mechanisms are not specific to CNNs, and I'm curious as to
how an analogous use of attention mechanisms in an RNN architecture may change
the overall quality of those models. This paper includes results of using
attention on only a subset of the decoder layers. In the case where attention
is used only on the last decoder layer, the BLEU score drops by 1.5 when
compared to attention across all layers. Could this maybe indicate that
attentiona mechanisms are the real winner in the new architecture?

## 5. What are the contributions?

1. A full CNN for sequence-to-sequence modeling. The advantages of this type
   of network are due to the increased parallelization of training and
   sequence generation which will improve the iteration speed for these models.

2. Positional encodings on the input embeddings. These encodings add information
   to the word embeddings on locations of different words.

3. Attention across all decoder layers.

## 6. What are the future directions for this research?

In the conclusion (Section 6), the authors point out that one future direction
of work includes the application of this network to other sequence-to-sequence
tasks. Some other ideas for future work:

1. Could there be advantages to a hybrid CNN / RNN architectures? For example,
   having an architecture where the input is a subset of the entire sequence,
   and each subset is processed sequentially in some parent RNN sequence. The
   authors point out that for the English-Romanian and English-French datasets,
   they only included examples that are 175 words or fewer. Having this hybrid
   architecture may allow for a network that is faster to train while also
   potentially working well with very long sequences.

2. Improvements to sequence generation. Currently, sequence generation is
   a sequential process, even if the network architecture is not sequential.
   Are there ways to speed up sequence generation? One idea is to have sequence
   generation create batches of words. While this is still sequential, if each
   prediction is a set of likely phrases, this may result in a speed up
   of generation. Investigation would need to be done to determine that doing
   so wouldn't cause a serious degradation in the overall predictive power
   of the model.

## 7. What questions are left with you?

1. How exactly are positional encoding being applied to the input embeddings?
   The authors give some indication that a positional encoding of the same
   dimension as the input embedding space is added to the embeddings, but the
   exact formula for those encodings are not specified. I may need to do
   further investigation on open-source implementations. (As a side note,
   the Transformer model also uses a positional encoding, and they specify
   that the formula for this encoding is some sort of sinusodal pattern).

2. The authors make heavy of use of weight normalization throughout the
   network. Some of the methods for normalization seem somewhat mysterious,
   such as the statement
   _We multiply the sum of the input and output of a residual block by sqrt(0.5) to have the variance of the sum_.
   The authors claim that these normalization techniques make learning more stable.
   Is there indication that these normalization techniques have contributed to
   a more stable gradient? How does a network with normalization compare to
   one without?

## 8. What is the take-away message from this paper?

By using a convolutional architecture for sequence-to-sequence generation,
there can be major improvements to the overall training speed and sequence
generation speed of a network. This is due primarily to the fact that training
becomes more parallelizable across the weights of the network. ConvS2S is the
first fully convolutional network for sequence-to-sequence modeling. By
combining this convolutional network with out architectural decisions, such
as using a Gated Linear Unit and multi-layer attention, ConvS2S achieves
state-of-the-art performance across a number of language translation datasets.
