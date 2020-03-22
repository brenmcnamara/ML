# Adam: A Method for Stochastic Optimization

Summary of this paper follows [this](https://cseweb.ucsd.edu/~wgg/CSE210/howtoread.html) rubric.

## 1. What are the motivations for this work?

The main "people" problem this paper addresses is the need for more generalized learning algorithms. Overall,
learning algorithms introduce a fundamental paradigm shift in software engineering; that shift takes us from
having engineers creating solutions to problems to having engineers *show* the solution to a problem The
consequences of this shift can be astronomical, and this new paradigm has already brought about solutions
to problems that have not previously been solved. Those problems exist in domains such as machine vision,
speech-to-text, and machine translation. For learning systems to progress, there needs to be more generalized
learning procedures; procedures that can work across different problem domains like Computer Vision and NLU.

More technically, the set of existing gradient-based optimization algorithms needs some improvement. There are
many trade-offs to consider when choosing an optimization algorithm : number of iterations before convergence,
computational efficiency, and assumptions being made of the optimization criterio. Overall, the best optimization
algorithm is the one that achieves convergence to a global optima the fastest. The choice of algorithm may
require considerations of problem domain and neural network architecture.

Some popular existing solutions include: RMSProp and AdaGrad. RMSProp uses moments to influence gradient updates.
In theory, this permits the algorithm to adjust its learning rate under higher variance / uncertainty. This makes
RMSProps better-suited to learning non-stationary objectives (i.e. non-determinism in the optimization criteria,
such as using dropout regularization) when compared to SGD. However, the algorithm is suseptible to sparse gradients.
AdaGrad addresses the problem of sparse gradients by using moment estimates instead of rescaled gradients when
performing parameter updates. Both RMSProp and AdaGrad have bias updates and do not perform any bias correction,
which can result in unstable learning, especially during the initial learning phase.

Another optimization algorithm the authors point out is called Sum-of-Functions. However, this algorithm is not as
generalizable, partly because of its increased memory requirements (making training on a GPU less tractable) and
partly because it works only on stationary objectives.

## 2. What is the proposed solution?

The authors propose a new optimization algorithm called Adam (Adaptive Moment Estimation). They claim that the
algorithm has the following desirable properties: (1) magnitude of parameter updates is invariant to 
rescaling of gradient, (2) step sizes are approximately bounded by the step size hyper parameter, (3) it does not
require a stationary objective (i.e. works well with regularization strategies such as dropout), (4) it works with
sparse gradients, and (5) it naturally performs some form of step-size annearling (gradient updates became finer in
later stages of learning).

Adam uses bias correction, which provides additional benefits of stable initial learning as the
moment hyperparameters approach 1.

## 3. What is the work's evaluation of the proposed solution?

The authors compare their algorithm to a number of other optimization algorithms: Adagrad, RMSProp, and SGDNestrov.
The comparison happens on three datasets: MNIST, CIFAR-10, and IMDB. MNIST and CIFAR-10 are image datasets while
IMDB is a text-based dataset of movie reviews. For CIFAR-10 and IMDB, these algorithms are tested with and without
dropout to check how well these algorithms work with non-stationary objectives. The algorithms are comparsed on
overall training cost reduction and speed of convergence. Overall, Adam appears to outperform the alternative
algorithms, in some cases by a large margin.

The paper also provides some theorical justification for Adam over other algorithms. An analysis and experiment around
bias correction shows that introducing a bias term stabalizes learning, especially during the initial few epochs.
Another analysis on gradient updates show that, under reasonable assumptions, updates are bounded by the
step size, which may make training more predictable. Finally, the authors discuss convergence of Adam and show that the
overall regret (regret is defined as "the sum of all previous differences between online prediction and the best
fixed-point parameter") converges to 0. However, this is under the assumption that the optimization criteria is
convex, which is not true for neural network architectures.

## 4. What is your analysis of the identified problem, idea, and evaluation?

The problem of having a generalized optimization algorithm is an important one. The authors approached this by
analyzing the desirable and undesirable attributes of existing optimization algorithms and showing that Adam
is, in theory, an improvements along these attributes. Overall, the theoretical justifications behind Adam
are compelling. These include: moment estimation, bias correction, and automated step-size annealing.

The evaluation was thorough. The authors tested their algorithm against a few popular alternatives. The
comparison explored stationary and non-stationary objectives, the domains of computer vision and
natural language understanding, and convergence in earlier and later epochs. Separately, Adam was compared
with and without bias correction.

Overall, Adam outperformed RMSProp, AdaGrad, and SGDNestrov across all experiment criteria that were reported.
Also, bias correction was shown to provide added stability during training.

## 5. What are the contributions?

1. The primary contribution of this paper is a superior optimization algorithm that outperforms existing solutions
and can generalize well to many problem domains within deep learning.

2. This paper explores the use of bias correction when performing parameter updates and provide a clear analysis
with experimentation elaborating the benefits of using bias correction.

3. An alternative form of Adam, called AdaMax, which uses an infinity norm instead of the second moment (see section 7.1).
Some theoretical justification was given to this algorithm, but the algorithm itself was not included in
the primary experimentation.

4. The authors also briefly discuss temporal averaging (see section 7.2). The justification for this is that last few
iterations of training are noisy due to stochastic sampling, so to correct for this, a moving average could be used
for parameter updates. This theory was not tested in the experiments conducted for this paper.

## 6. What are future directions for this research?

1. Experiment with AdaMax. AdaMax is purposed in this paper without any experimentation. It would be interesting to see
how this algorithm compares to the standard Adam algorithm along multiple domains and non-stationary objectives.

2. Experiment with temporal averaging. The authors propose temporal averaging as a solution to stabalizing training
on the last few iterations. This could be tested against the standard Adam algorithm. During experimentation, the
theory that temporal averaging provides stability at the end of training should be tested. Are there alternative
solutions to this problem other than temporal averaging?

3. In section 6.3, where the authors discuss the results of experimenting with convolutional neural networks,
the following statement is made: "We notice the second moment estimate ... vanishes to zero after a few epochs and is
dominated by the epsilon in algorithm 1. The second moment estimate is ... a poor approximation to the geometry of
the cost function in CNN's compared to fully connected network[s] from section 6.2". This statement is not followed
up by any proposal of a solution. What alternatives could there be to using the second moment estimation? Could
this be a good use-case for the AdaMax algorithm? Would there need to be domain-specific adjustments to the
optimization algorithms that account for specialized network geometries, or could there be a more general approach
to working around this limitation?

## 7. What questions are you left with?

1. Are their domain-specific optimization algorithms that outperform Adam for specific neural net architectures?
All the optimization algorithms in the experiments were general-purpose optimization algorithms, but could there
be, for example, an optimization algorithm specifically suited for recurrent neural networks?

2. In section 7.1, during a discussion of AdaMax, the authors point out that variants of the L2 norm
"become numerically unstable for large p. However, in the special case where we let p approach infinity,
a surprisingly simple and stable algorithm emerges. As a point of clarification, what do the authors mean
by the word "unstable" used in this context?

## 8. What is your take-away message from this paper?

Adam is a new optimization algorithm for gradient-based training of deep neural networks. The algorithm is a
combination of two existing solution: AdaGrad and RMSProp. It has many advantages over existing algorithms,
including automated step size annealing and bounding, better training under sparse gradients,
and invariance to gradient rescaling.

Aside from the Adam optimization algorithm, this paper explores bias correction and demonstrates its capability of
stabalizing parameter updates.

