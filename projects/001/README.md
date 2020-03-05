# Back Propagation

This project consists of a basic back propagation implementation. The goal of this
project is to get comfortable with the back propagation algorithm and to understand
how it is derived. A full derivation of the core equations of the back propagation are
included with this project.

The back propagation implementation is tested on a couple of simple mathematical
functions: the first function represents an ellipse and the second represents a
gaussian curve. For each function, an x,y coordinate is given as input and the
output is a value, 0 or 1, indicating whether that coordinate is within the graph.


For the optimization step, a simple stochastic gradient descent is used.

## Learnings

### Back Prop is very finicky

The back propagation algorithm is pretty finicky and tricky to derive. I implemented
gradient checking to confirm that my implementation was correct. The gradient checking
algorithm, when training on a model at the start, indicated a relatively high error
with the back propagation gradients. As training went on for a number of epochs, the
error greatly reduced. Though surprising at first, I attribute this high initial error
to the fact that the model when initialized on random weights will learn very fast
at the start. As the model better approximates the function it is estimating, the
learning slows and the magnitude of the gradients will likely decrease as well. Once
the gradient checking errors stabalized, the gradient error was estimated at about 1e-9,
which seems to indicate that the back prop algorithm was implemented correctly.

### Need to watch for numerical overflows

There were a number of places in the code that resulted in numerical overflows. Some time
was spent to correct these overflows and adjust the values. These overflows were often a
result of division by 0, especially when calculating loss. One solution that worked well
was to adjust 0 values up and 1 values down by some adjustment value *epsilon*. The goal
was to avoid numerical overflows in a computationally efficient, vectorized way.

### A network with few parameters looks linear

In total there were 30 parameters in the neural network. This is extremely small, especially
compared to some model neural networks which can contains tens of millions of parameters,
if not billions.

The small number of parameters became apparent after graphing the models' estimates for the
functions they were approximating. The ellipse estimate was bounded by a connected set of
straight lines instead of a smooth outer shell, and the gaussian curve estimate failed
to learn the curve at the center of the gaussian (it was simply a straight line).

In a separate project, I create a larger-scale network to learn a better gaussian estimate.

