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

1. 

