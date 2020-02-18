# Distributed Representations of Words and Phrases and Their Compositionality

## What are the motivations for this work?

The main problem ("people problem") that this paper is addressing is the need for better language models.
The motivation of creating a better language model comes from the need to use these model to solve real-word
AI problems in natural language such as speech-to-text transcription, machine translation, and semantic analysis.
Specifically, this paper looks at (1) getting a better understanding of word vector representations whichh are
frequently used in language modeling and (2) improving the computational cost of computing these words vectors.
Better compute times make these massive neural network algorithms potentially much cheaper to run, considering that
they typically require days of compute time on specialized machines.

The main technical problem this paper attempts to solve is increasing the speed of computation on skip-gram
models, which are shown to be effective at generating word vector representations. The authors explore new approaches
for faster computation of these models while also maintaining (and even improving) the overall accuracy of the model.

Another technical problem this paper examines: the ability to identify common multi-word phrases in the corpus, such
as `New York Times` or `Volga River`, which could potentially have very different meaning than the individual words
in the phrase.

## What is the proposed solution?

This paper proposes using negative sampling as an alternative learning objective to the more common softmax
objective. Negative Sampling roughly approximates the Softmax objective, and the authors hypothesize that this
approximation is good enough for the practical purposes of generating meaningful vector representations while
also improving the computation time.

To learn common phrases in the corpus, the authors use a pre-processing algorithm that makes 2-4 passes over the
entire corpus while combining shorter words and phrases based on the frequency of the bigrams and unigrams.

## What is the work's evaluation of the proposed solution?

There are multiple evaluation metrics presented in this paper. The first mentioned is an evaluation metric from
a cited work, which is a dataset of analogies, which test that linear combinations of word vectors contain semantic
meaning. For example, the dataset contains the analogy *Athens : Greece :: Baghdad :: Iráq*. If the closest word
vector to the linear combination: `w("Athens") - w("Greece") + w("Baghdad")` is `w("Iráq")`, then the word
vector is considered to have predicted this analogy correctly. The dataset contains a combination of semantic
analogies, such as the one listed above, and a set of syntactic analogies, such as *quick : quickly :: slow : slowly*,
and the models are evaluated on semantic and syntactic analogies separately.

The authors use a separate dataset for evaluating common phrases, similar to the analogy dataset described above.

The main contribution of this paper is a faster learning algorithm, so the authors also compare the computation time
of the model with the negative sampling objective compared to two alternative neural networks which also model skip-gram
predictions. The computation time is measured in minutes of training.

## What is your analysis of the identified problem, idea, and evaluation?

Overall, the work is very promising. Word vector representations are used frequently in Natural Language Understanding
and a major setback with these vectors has always been the training time. The negative sampling objective was shown to
reduce computation time compared to the alternatives while also maintaining (and potentially improving) the overall
quality of the word vectors. The evaluation of the word vectors using an analogy dataset demonstrates the quality
of the word vectors to form linear relationships between words.

However, the evaluation metrics left some ambiguity in the quality of the algorithm. Firstly, their claim was that negative
sampling is a faster learning objective, but their comparison of the the computation time of the different models was vague:
there was no indication as to what hardware the algorithm was running on or whether the neural network architectures being
compared were using the same convergence / stopping policies. This left the reader with a fuzzy understanding that the
negative sampling algorithm was faster, without a clear indication as to how much faster.

The analogies datasets used to evaluate the word vector representations seemed somewhat subjective, since the list of
analogies were compiled by human beings manually. An interesting property of word vectors is, due to how they are trained,
they can capture features and relationships of words that are not explicitly obvious to humans. Having a learning
objective that is defined so rigidly by humans may be evaluating the word vectors in the wrong way. The analogies datasets
also fail to generalize to other corpera. For example, evaluating whether word vectors can be used to capture information
of country capitals would work well with a model trained on a corpus of Shakespeare sonnets. Finally, the analogies datasets
test for linear relationships between words, while there can be non-linear relationships between words. However, the authors
made clear they were interested in exploring these linear relationships, so this type of evaluation was intentional and
likely suited for the particular applications the authors had in mind.

## What are the contributions?

1. The main contribution is a faster learning object, Negative Sampling, for generating word vector representations.

2. The paper also explores a pre-processing step for combining words into common phrases. This pre-processing algorithm
   is presented with a phrase-based analogies dataset to be used for evaluating models trained on the particular corpus
   that the authors used.

3. The authors present some interesting analysis / intuition behind why word vector representation tend to form linear
   relationships:
   
   *The additive property of the vectors can be explained by inspecting the training objective. The word vectors are in
   a linear relationship with the inputs to the softmax nonlinearity. As the word vectors are trained to predict the
   surrounding words in the sentence, the vectors can be seen as representing the distribution of the context in which
   a word appears. These values are related logarithmically to the probabilities computed by the output layer, so the
   sum of two word vectors is related to the product of the two context distributions. The product works here as the AND
   function: words that are assigned high probabilities by both word vectors will have high probability, and the other
   words will have low probability. Thus if "Volga River" appears frequently in the same sentence together with the words
   "Russian" and "river", the sum of these two word vectors will result in such a feature vector that is close to the vector
   of "Volga River".*
   
## What are future directions for this research?

1. One avenue for future research is exploring better evaluation metrics for words and phrases. The evaluation
   metrics used in this paper were subjective and dependent on the corpus. Having an evaluation that is (1) more
   objective (not defined by human-made examples), (2) independent of any particular corpus, and (3) capable of
   capturing non-linear relationships between words is an important foundation for continued work with word vector 
   representation. One potential idea is creating a set of benchmark language modeling tasks where word vectors
   can be embedded, then judging the overall quality of the models on how well they perform on the benchmarks
   with the different word embeddings paired with the amount of training time needed for convergence.
   
2. Another research avenue: trying alternative pre-processing algorithms for phrase identification. Phrase identification
   in a corpus is a problem suited for the unsupervised learning domain, and some exploration could be done on alternative
   unsupervised algorithms for identifying common phrases.
   
## What questions are left with you?

1. To what degree (if any) does the pre-processing phrase identification improve the overall quality of word vectors?
   My intuition is that pre-processing the corpus by tokenizing phrases may actually improve the quality of word vectors.
   If, for example, the corpus contains the phrases "New York", "New England", and "new shoes", then tokenizing "New York"
   and "New England" may actually improve the quality of the word vector for "new" since the distribution of text in the
   vicinity of "New York" is different than the distribution of words close to the more typical sense of "new". The authors
   compared the quality of different neural network architectures, but did not explore the how phrase tokenization could
   impact the quality of word vectors trained on the same architecture (but without the phrase tokenization).

2. Could the phrase identification algorithm be used to discover longer idioms used in the language? For example, "the early
   bird gets the worm". Using the same intuition presented above, could tokenizing these idioms improve the quality of word
   vectors?
   
3. Another question, expressed in an earlier section: how are the datasets of analogies compiled? What steps, if any, were
   taken to remove potential human bias from these datasets?
   
4. The authors point out that negative sampling actually leads to better vector representations than the other, more
   complex, learning objectives. Why does a simpler learning objective result in a better outcome? The authors suggest
   this may be because having the simpler learning objective allows for the model to be spend more time training
   on meaningful examples. Considering that the evaluation of the word vectors is based on their ability to represent
   linear relationships, could it also mean that that the negative sampling is more suited to the particular evaluation
   proposed in the paper?

   
## What is the takeaway message for this paper?

1. Negative sampling is a fast learning objective for generating high-quality word vectors.

2. Vector representations of words can learn to have linear relationships with one another, which makes them
   suited for tasks of finding the semantic meaning of a linear combination of words.
   
3. The authors propose a pre-processing step for finding and tokenizing common phrases in a corpus. These phrases can
   have different semantics than the composition of words they contain and are assigned their own vector representation.
