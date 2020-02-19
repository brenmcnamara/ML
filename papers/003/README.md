# Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word Embeddings

## 1. What are the motivations for this work?

The *people problem* that this paper is addressing is that of mitigating the introduction of societal prejudice in machine systems. In particular, this paper addresses the ML research community and linguistics community on the problem of societal prejudices affecting our language models. The authors indicate the severity of the problem as it can lead to a feedback loop, where societal prejudices get encoded into our models, which then make decisions in the real world partially based on these prejudices, which then may amplify the prejudices further. One example of this feedback loop is search ranking of web pages, which make decisions of what pages people see based on some ranking of search terms.

Solving for this problem is difficult due to the opaque nature of modern machine learning models.  The encoded representations that these models use to make decisions do not lend themselves well to *explainability*, and pinpointing the factors considered when a Deep Learning Model makes a decision is difficult. It is therefore also difficult to make tweaks to the decision-making process in such a way that omits societal prejudices.

The *technical problem* this is addressed is the manipulation of word embeddings, commonly used for natural language tasks, such that they exemplify less bias. Because word embeddings have no hand-made features and are entirely defined by the training objective, finding where biases are encoded in the word embeddings is a difficult task. In addition, manipulating word embeddings to reduce bias runs the risk of de-grading the overall quality of those word embeddings, and can fundamentally change the mearning of the word embedding space.

## 2. What is the proposed solution?

The authors engineered a debiasing algorithm to work on these word embeddings, and use it specifically to target gender bias (though it is intended to generalize to other types of bias). The algorithm (1) takes a set of seed word pairs used to find the gender subspace, such as he / she, grandmother / grandfather, and guy / gal, (2) takes a set of words that should exhibit no gender bias, such as occupations like nurse, doctor, and babysitter, and (3) uses an approximated linear subspace of gender to orthogonalize the neutral words along the gender subspace. To discover the gender subspace, the authors use principle components on the seed words.

Previous research shows that word embedding have the ability to solve analogies, such as *Tokyo:Japan::Sydney:?* where the answer is *Australia*, using basic vector addition and subtraction. This motivates the belief that word embeddings capture linear relationships of features. For this reason, the authors make the assumption that gender is a linear subspace in the larger word embedding space, and can be captured using linear methods. Once the gender subspace is captured, other word embeddings can be analyzed for their gender preferences, such as *computer programmer*, *doctor*, or *nurse*.

The authors also explore hard and soft debiasing methods. Hard debiasing completely removes gender associations of key words while soft debiasing removes some of the gender associations. One may prefer an approach depending on the specific natural language application.

The authors define a routine to identify good candidates for gender-bias words. Given the set of seed word pairs that are gender compliments (he / she, guy / gal), they complete the analogy *he:x::she:y*. The (x, y) pairs of words that maximize some score threshold are given to a set of crowd-source workers, who (1) rate whether each analogy makes sense and (2) rate whether the analogy exhibits gender bias. The word pairs which are voted to exhibit gender biases become candidates for debiasing.

## 3. What's the work's evaluation of the proposed solution?

The authors use crowd-source workers to evaluate the quality of their debiasing algorithm. Given a set of word pairs using the procedure defined above, the workers evaluate whether the word pair makes sense and whether it exhibits the gender bias. These two ratings are used to measure the (1) the overall quality of the word embeddings and (2) the overall gender bias these word embeddings exhibit.

The crowd workers are asked to perform this task on (1) the original word embedding, (2) the word embeddings that have been processed by the soft-debiasing algorithm, and (3) the word embeddings processed by the hard-debiasing algorithm. The desire is for the debiasing algorithms to receive much lower bias ratings while having comparable ratings in the overall quality of the word embeddings, which indicates that the words were debiased with minimal impact on overall quality or semantic representation.

## 4. What is your analysis of the identified problem, idea, and evaluation?

The problem addressed by this paper poses a real threat to a future filled with decision-making systems. We require some level of accountability from these system to pinpointed flawed reasoning, and in particular, reasoning that mirrors the prejudices in society. On the problem of biased word embeddings, the authors make clear that embeddings are being used today for decision-making, and I agree that debiasing them is important.

The solution they proposed for debiasing these word embeddings is an interesting idea and, based on the analysis and evaluation presented in the paper, seems to be a promising avenue of research. However, there are a number of limitations to the algorithm.

Some of these limitations were mentioned in the research. The authors point out that words can be used in many contexts and these word embeddings, trained on many examples, can capture the subtelties in the semantics. However, when hard-debiaising words like *grandmother* and *grandfather* such that they are perfect gender compliments of one another, we lose information such as the use of *granfather* in the context *to granfather a law*.

Another problem that was hinted in the research is the identification of the gender subspace. The authors used principle components, then extracted the largest component to use as an approximation of the gender subspace. They acknowledged that the gender subspace has noise from (1) biases in the seed words, (2) polysemy (seed words having more than one meaning), and (3) limited sampling of seed words. However, there was no mention or discussion of whether gender *could* be captured as a linear subspace. While it is true that word emeddings exhibit linear features, there can only be a number of linear features captured in a finite-dimensional space. It is possible that gender is not perfectly linear. There is also an assumption that gender is single-dimensional subspace. Though the authors point this out and indicate that there algorithm works in higher-dimensional spaces, there is no discussion or mechanism for how to discover or evaluate the dimensionality of a desired subspace.

**TODO: FILL IN REST OF THIS SECTION**



