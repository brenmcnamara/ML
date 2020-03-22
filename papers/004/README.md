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

## 5. What are the contributions?

## 6. What are future directions for this research?

## 7. What questions are you left with?

## 8. What is your take-away message from this paper?


