# Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word Embeddings

## 1. What are the motivations for this work?

The *people problem* that this paper is addressing is that of mitigating the introduction of societal prejudice in machine systems. In particular, this paper addresses the ML research community and linguistics community on the problem of societal prejudices affecting our language models. The authors indicate the severity of the problem as it can lead to a feedback loop, where societal prejudices get encoded into our models, which then make decisions in the real world partially based on these prejudices, which then may amplify the prejudices further. One example of this feedback loop is search ranking of web pages, which make decisions of what pages people see based on some ranking of search terms.

Solving for this problem is difficult due to the opaque nature of modern machine learning models.  The encoded representations that these models use to make decisions do not lend themselves well to *explainability*, and pinpointing the factors considered when a Deep Learning Model makes a decision is difficult. It is therefore also difficult to make tweaks to the decision-making process in such a way that omits societal prejudices.

The *technical problem* this is addressed is the manipulation of word embeddings, commonly used for natural language tasks, such that they exemplify less bias. Because word embeddings have no hand-made features and are entirely defined by the training objective, finding where biases are encoded in the word embeddings is a difficult task. In addition, manipulating word embeddings to reduce bias runs the risk of de-grading the overall quality of those word embeddings, and can fundamentally change the mearning of the word embedding space.

## 2. What is the proposed solution?

The authors engineered a debiasing algorithm to work on these word embeddings, and use it specifically to target gender bias (though it is intended to generalize to other types of bias). The algorithm (1) takes a set of seed word pairs used to find the gender subspace, such as he / she, grandmother / grandfather, and guy / gal, (2) takes a set of words that should exhibit no gender bias, such as occupations like nurse, doctor, and babysitter, and (3) uses an approximated linear subspace of gender to orthogonalize the neutral words along the gender subspace. To discover the gender subspace, the authors use principle components on the seed words.

Previous research shows that word embedding have the ability to solve analogies, such as *Tokyo:Japan::Sydney:?* where the answer is *Australia*, using basic vector addition and subtraction. This motivates the belief that word embeddings capture linear relationships of features. For this reason, the authors make the assumption that gender is a linear subspace in the larger word embedding space, and can be captured using linear methods. Once the gender subspace is captured, other word embeddings can be analyzed for their gender preferences, such as *computer programmer*, *doctor*, or *nurse*.

The authors also explore hard and soft debiasing methods. Hard debiasing completely removes gender associations of key words while soft debiasing removes some of the gender associations. One may prefer an approach depending on the specific natural language application.

The authors define a routine to identify good candidates for gender-bias words. Given the set of seed word pairs that are gender compliments (he / she, guy / gal), they complete the analogy *he : x :: she : y*. The (x, y) pairs of words that maximize some score threshold are given to a set of crowd-source workers, who (1) rate whether each analogy makes sense and (2) rate whether the analogy exhibits gender bias. The word pairs which are voted to exhibit gender biases become candidates for debiasing.

There is one previous attempt at debiasing word embeddings mentioned by the authors which seeks to remove gender entirely from the embeddings. This approach is more limited, as gender is an important component in the meaning of words and semantics of language.

## 3. What's the work's evaluation of the proposed solution?

The authors use crowd-source workers to evaluate the quality of their debiasing algorithm. Given a set of word pairs using the procedure defined above, the workers evaluate whether the word pair makes sense and whether it exhibits the gender bias. These two ratings are used to measure the (1) the overall quality of the word embeddings and (2) the overall gender bias these word embeddings exhibit.

The crowd workers are asked to perform this task on (1) the original word embedding, (2) the word embeddings that have been processed by the soft-debiasing algorithm, and (3) the word embeddings processed by the hard-debiasing algorithm. The desire is for the debiasing algorithms to receive much lower bias ratings while having comparable ratings in the overall quality of the word embeddings, which indicates that the words were debiased with minimal impact on overall quality or semantic representation.

## 4. What is your analysis of the identified problem, idea, and evaluation?

The problem addressed by this paper poses a real threat to a future filled with decision-making systems. We require some level of accountability from these system to pinpointed flawed reasoning, and in particular, reasoning that mirrors the prejudices in society. On the problem of biased word embeddings, the authors make clear that embeddings are being used today for decision-making, and I agree that debiasing them is important.

The solution they proposed for debiasing these word embeddings is an interesting idea and, based on the analysis and evaluation presented in the paper, seems to be a promising avenue of research. However, there are a number of limitations to the algorithm.

Some of these limitations were mentioned in the research. The authors point out that words can be used in many contexts and these word embeddings, trained on many examples, can capture the subtelties in the semantics. However, when hard-debiaising words like *grandmother* and *grandfather* such that they are perfect gender compliments of one another, we lose information such as the use of *granfather* in the context *to granfather a law*.

Another problem that was hinted in the research is the identification of the gender subspace. The authors used principle components, then extracted the largest component to use as an approximation of the gender subspace. They acknowledged that the gender subspace has noise from (1) biases in the seed words, (2) polysemy (seed words having more than one meaning), and (3) limited sampling of seed words. However, there was no mention or discussion of whether gender *could* be captured as a linear subspace. While it is true that word emeddings exhibit linear features, there can only be a number of linear features captured in a finite-dimensional space. It is possible that gender is not perfectly linear. There is also an assumption that gender is single-dimensional subspace. Though the authors point this out and indicate that there algorithm works in higher-dimensional spaces, there is no discussion or mechanism for how to discover or evaluate the dimensionality of a desired subspace.

The authors point out that this algorithm could generalize to other types of bias, but there is no clear discussion on how this would occur. While the algorithm is appropriately parameterized to support multi-dimensional subspaces (the parameter *k* indicates the dimensionality of the subspaces and tweaking this would result in a larger bias subspace), there is no deeper discussion on any approach for approximating the dimensionality of the subspace. This would become a challenge when dealing with more complex biases such as race.

The benchmarks that is used deviates from other benchmarks, such as the analogies dataset used for evaluating the quality of word embeddings. While having a different benchmark is not itself a problem, this poses a challenge when evaluating the overall quality of the embeddings after the debiaising procedure. The embeddings are evaluated by 10 crowd-workers, which could introduce some subjective biases from the workers. 

## 5. What are the contributions?

1. The primary contribution of this paper is a debiasing algorithm for word embeddings. This algorithm can be parameterized by representative word pairs (i.e. he-she and granmother-grandfather for a gender subspace) and a subspace dimensionality *k*, which make this approach, in theory, generalizable.

2. In the process of creating a debiaising algorithm, the authors made some improvements on methods for finding bias in embeddings. This procedure involves using seed word pairs to identify biases (i.e. using *man : woman* to identify the bias association of *programmer : homemaker*). These discovered associations are evaluated by people for biases.

## 6. What are future directions for this research?

1. Scaling the algorithm to work with multi-dimensional bias subspaces. As mentioned above, there are some additional challenges when dealing with larger subspaces of bias (such as race). One challenge is finding the dimensionality of the subspace to normalize across. Another challenge is finding the appropriate seed words that represent this space well. As the number of dimensions of the space increases, there may need to be many more seeding examples to create accurate representations of the space. However, there were many nuances pointed at by the authors for such seed words, even for the 1-dimensional gender subspace (for example, man-woman was not used as a seed pair because man is used frequently in other contexts and is not a perfect compliment of woman). There are challenges to scaling the discovery of seed words when the subspace is more complex.

2. Creating some evaluation of whether a particular feature, such as gender, exists in the space and exhibits linear properties. The authors made the assumption that gender existed as a linear subspace of the embeddings, but the dimensionality of the embeddings (300 for the standard Google News Embeddings) is finite and can only capture a limited number of linear features. There should be some basic evaluation criteria of whether a feature even exhibits linear properties in a word embedding.

3. Following from the previous point, if a feature does not truly exhibit linear qualities, there should be a way to debias that works without the assumption of linearity.

## 7. What questions are left with you?

1. The authors point out a potential pitfall when debiaising using seed word pairs. Many of these pairs are not perfect compliments of one another, where some words may be used in contexts where there seed compliment makes no sense (i.e. *grandfather a law* is a use of *grandfather* where *grandmother* does not work). To what extent does using these seed pairs cause the overall quality of the embeddings to degrade? When dealing with a higher-dimensional bias subspace and many more seed words, is there a compounding effect of having more seeds to larger degredation of embeddings?

2. The debiasing algorithm provides a unique solution to a real world problem (having less bias ML algorithms). However, the solution is niche to natural language systems that use word embeddings. Even among systems that use word embeddings, the embeddings are a small part of the entire system and there is potential for bias in other parts as well. Is there a more generalized approach to debiasing language models? Is there a more generalize approach to debiasing ML systems?

3. The identification of societal biases in the word embeddings is done through a voting system performed by 10 crowd-sourced individuals. One can see limitations to this approach since the sample size of individuals is small and the aptitude of an individual to identify societal bias may vary. What alternative benchmarks can we look into for evalting bias and fairness?

## 8. What is your take-away message for this paper?

Word embeddings exhibit clear biases which, when used in real-world applications, compound existing societal prejudices. We could address some of these issues by debiasing word embeddings. The debiasing algorithm presented in this paper retains much of the original semantics of the embeddings. The algorithm identifies a feature we want to correct over, such as gender, uses principal components to approximate a linear subspace for the feature, and orthogonalizes words along that subspace to remove unwanted associations.

The algorihm can be parameterized on strictness of debiaising. The stricter the debiasing, the less a word will carry unwated bias associations, but the greater the change the original word and a greater risk to degrading some of the semantics of the emebddings.
