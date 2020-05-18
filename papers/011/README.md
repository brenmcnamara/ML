# Scaling Neural Machine Translation

This summary is based on [this rubric](https://cseweb.ucsd.edu/~wgg/CSE210/howtoread.html).

## 1. What are motivations for this work?

The main problem ("people problem") that this paper is addressing is the need
for training better language models for language translation. The motivation of
creating better language translation models comes from the need to
use these models for practical language translation needs.

More specifically, the authors address the long training process involved with
creating state-of-the-art neural network based sequence-to-sequence language
models. Many models today require training for multiple days on multiple GPU
processors before models converge. As a result, experimentation / iteration
speed is slow and trying many different permutations of tuning parameters and
other configurations is impractical. The intense computation cost with training
these models also makes them prohibitvely expensive for many people who'd like
to work on these problems.

There are many approaches that have been tried for reducing both the overall
computational work and the actual time of completion. Fortunately, training
neural network based language models is a process that can be easily
parallelized, which allows us to distribute training across many processors
and machines.

Strategies for more efficient training in software have also been tried,
such as using lower precision floating point numbers (for faster arithmetic
computations) and better communication strategies for cross-machine
workloads.

## 2. What is the proposed solution?

The authors propose and extend a number of solutions for improving the
efficiency of training large models. This paper explores the use of training
with parallel workers where each worker has a full, synchronized copy of the
model that is used calculate the gradients of different batches of data.
The following strategies are explored:

1. Use of low-precision floating point arithmetic during training. To avoid
   numerical underflows and overflows, the authors scale values to the
   FP16 range.

2. Training on larger batch sizes while increasing the learning rate. Larger
   batch sizes should help stabalize gradients (lower variance of gradients)
   which would allow for the use of larger learning rates. The hope is that
   this approach would cause convergence to happen faster.

3. Accumulating the gradients from multiple forward-backward passes before
   updating the weights. This should be particularly helpful when there are
   multiple machine synchronizing gradient updates. Some machines will finish
   before others and will sit idly while _stragglers_ finish up their gradient
   calculations. By letting a model do multiple passes over different batches
   of data before synchonization needs to occur, this reduces the variance
   in completion time between different workers and reduces the overall
   synchronization overhead for these machines.

4. Overapping the backward pass with the gradient synchonization process.
   Instead of waiting for a full backward pass over the data to synchronize
   gradients, a worker keeps a background thread and a synchonization buffer.
   Gradients are added to that buffer after the gradient of each layer in the
   network is calculated (instead of waiting for a full pass), and that
   buffer is synchronized across machines periodically.

## 3. What is the work's evaluation of the proposed solution?

The authors evaluate the quality of their model on the newstest14 datasets
for English-to-French and English-to-German. The transformer model is used
to test some of these different strategies, and the goals are to:

1. Achieve convergence faster for the transformer model.

2. Have a comparable BLEU score and perplexity (overall model quality) after
   convergence has been achieved. This is especially important for the lower
   floating point precision, which could run the risk of causing gradients to
   shift due to floating point accuracy issues.

The results were reported as each strategy was layed into the training process.
In a separate experiment, training hapenned on a cluster of workers. The
authors found that after adding in all the strategies mentioned above, the
overall training time was almost 5x faster. By performing training on a 16-node
cluster, the training time further improved by another 10x.

Aside from dramatically reducing the time and computational cost of training
the transformer model, the authors achieved a higher BLEU score and lower
perplexity.

## 4. What's your analysis of the identified problem, idea, and evaluation?

This problem is important to solve. Language models are continuing to get
more complex and are seeing an explosion in parameter sizes. For us to take
full advantage of modern deep learning architectures, we need to find more
efficient ways to train these models.

The ideas presented are great contributions to the strategies used for
efficient training. However, the most valuable advances that can be made
are advances in efficiently scaling out the training process to many nodes,
which was a secondary concern in this paper.

The evaluation clearly shows the effectiveness of these different strategies.
However, the chart provided for training efficiencies does not give a good
sense of whether any particular method provided much larger gains. This is
because the methods were layed on with each experiment trial; an alternative
approach would be to show each of the above strategies in isolation to get a
sense of where the best gains could be made.

## 5. What are the contributions?

The following techniques were contributed by this paper:

1. Using of low-precision floating point arithmetic during training.

2. Training on larger batch sizes while increasing the learning rate.

3. Accumulating the gradients from multiple forward-backward passes before
   updating the weights.

4. Performing gradient synchronization on a separate, independent thread that
   allowed for gradients to get synchronized at the granularity of a
   single layer.

## 6. What are the future directions for this research?

The authors mentioned in the conclusion (section 6) that more research should
be done to improve speed-up from training across machines. Some additional
thoughts:

1. I'd be interested to see if some of these strategies work well in a less
   stable training environment. For example, in the case where there may be
   multiple nodes, each with different capabilities: (different processing
   devices or different number of cores). In such an environment, the time
   it takes for a particular node to complete a training pass is harder
   to predict and must account for the variability of the workers and not just
   the variability of the data. There may need to be some separate worker
   training parameter that is kept and updated for each worker, giving it a
   scale of how fast it can train compared to other workers. This variable
   can be tracked and updated as an exponentially moving average.

## 7. What questions are left with you?

1. The authors mention that increasing the batch size allows for an increase
   in the learning rate. This was only briefly discussed. At what point does
   this trade-off no longer make sense? What was the process for finding the
   proper batch-size / learning rate pair?

2. How well do these algorithms work on sequence models (RNNs)? The transformer
   takes better advantage of parallel computation, do these algorithms work
   as well on RNNs, where there is a bottleneck on processing tokens in
   a sequence.

## 8. What is the take-away message from this paper?

The authors explore different techniques for scaling the training process
of neural machine translation models (different methods listed above). Some
strategies are used for better training on a single machine while other provide
greater benefits when training across multiple machines. The transformer model
is used to test the effectiveness of these scaling strategies for training.

Overall, the results show significant improvements in training speed (5x
improvement on a single machine) without hurting overall model quality when
testing against the BLEU score benchmark.
