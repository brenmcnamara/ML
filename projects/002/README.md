# Learning a Gaussian Curve

This project contains a full implementation of a deep learning model that
learns the gaussian curve. There are 2 separate implementations of this network:one implemented from scratch (no libraries but numpy), and another using
pytorch.

## Learnings:

While implementing this algorithm, there were a number of bugs and limitations
with the training procedure that had to be fixed. For that reason, as debugging
was hapenning, more debugging tools were built to help with finding issues
in the model. Some of these tools include:

- logging of training error
- logging of weight and gradient magnitudes
- gradient checking
- gradient clipping for exploding gradients

Bugs in the implementation of back propagation were the main reason for some
of the issues during training.

Another issue was that of an imbalanced dataset. When generating the data, the
number of negative examples outnumbered the number of positive examples by
about 100:1. For this reason, downsampling was introduced, which took the
dominant class and randomly removed examples. For downsampling, a parameter,
*c*, was introduced which controlled the agressiveness of downsampling. A *c*
value of 1.0 meant that the data would be downsampled such that the two classes
had approximately equal number of examples. Larger c values would downsample less aggresively, and as c approached infinity, downsampling would not cause any
adjustments to the samples.

Initially, the sample inputs were not standardized, which may have caused
issues during training. A proper standardization of the inputs was introduced,
though the results of this were negligible, since the original mean and
standard deviation of the data was close to 0 and 1, respectively.

Precision / recall of the results were logged to ensure that the final
model had reasonable false positive and false negative rates.

Gradient clipping was also introduced, but was not used as it didn't provide
any benefit.

## Adam vs SGD

Both the Adam optimizer and SGD optimizer were implemented. The Adam optimizer
worked much faster, which is to be expected. However, one observation was
that the learning rates that worked well with Adam were different than those
that worked well with SGD, which made finding the relevant learning rates
tricky.

## Conclusion

Overall, this model was very simple since the actual function the model
was trying to learn was deterministic. Once the major bugs were fixed with
back propagation, training worked very smoothly.


