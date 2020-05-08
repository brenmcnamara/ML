import { createNumberGraph } from './graph';
import { isDAG } from './graph-utils';

describe('isDAG', () => {
  test('is true when given a single node.', () => {
    const graph = createNumberGraph('[A:123]');
    expect(isDAG(graph)).toBe(true);
  });

  test('is true when given an empty graph', () => {
    const graph = createNumberGraph('');
    expect(isDAG(graph)).toBe(true);
  });

  test('is true when given a 2 node disconnected graph.', () => {
    const graph = createNumberGraph(`
    [A: 123]
    [B: 321]
    `);
    expect(isDAG(graph)).toBe(true);
  });

  test('is false when there is a 2 node directed cycle.', () => {
    const graph = createNumberGraph(`
    [A: 123]
    [B: 321]
    [A] -> [B]
    [B] -> [A]
    `);
  });

  test('is false when there is a 2 node directed cycled.', () => {
    const graph = createNumberGraph(`
    [A: 123]
    [B: 123]
    [A] -> [B]
    [B] -> [A]
    `);
    expect(isDAG(graph)).toBe(false);
  });

  test('is false when there is a 3 node undirected cycle.', () => {
    const graph = createNumberGraph(`
    [A: 123]
    [B: 321]
    [C: 432]
    [A] - [B]
    [B] - [C]
    [A] - [C]
    `);
    expect(isDAG(graph)).toBe(false);
  });

  test('is true when there is a 3 node directed graph with underlying undirected graph having a cycle.', () => {
    const graph = createNumberGraph(`
    [A: 123]
    [B: 321]
    [C: 455]
    [A] -> [C]
    [B] -> [C]
    [B] -> [A]
    `);
    expect(isDAG(graph)).toBe(true);
  });
});
