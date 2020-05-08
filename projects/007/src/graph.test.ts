import { createNumberGraph } from './graph';

describe('createNumberGraph', () => {
  test('creates an empty graph', () => {
    const graph = createNumberGraph('');
    expect(graph.nodes).toEqual({});
    expect(graph.edges).toEqual([]);
  });

  test('creates a single node number graph.', () => {
    const graph = createNumberGraph(`
      [A : 123]
    `);

    expect(graph.nodes['A']).toEqual({ id: 'A', value: 123 });
    expect(graph.edges.length).toBe(0);
  });

  test('creates two nodes with a directed edge.', () => {
    const graph = createNumberGraph(`
      [A : 321]
      [B : 444]
      [A] -> [B]
    `);

    expect(graph.nodes['A']).toEqual({ id: 'A', value: 321 });
    expect(graph.nodes['B']).toEqual({ id: 'B', value: 444 });
    expect(graph.edges).toEqual([
      { edgeType: 'DIRECTED', nodeA: 'A', nodeB: 'B' },
    ]);
  });

  test('creates two nodes with an undirected edge.', () => {
    const graph = createNumberGraph(`
    [A: 123]
    [B: 455]
    [A] - [B]
    `);

    expect(graph.edges).toEqual([
      { edgeType: 'UNDIRECTED', nodeA: 'A', nodeB: 'B' },
    ]);
  });

  test('throws when defining an edge with invalid node id.', () => {
    expect(() =>
      createNumberGraph(`
      [A: 123]
      [A] -> [B]
    `),
    ).toThrow();
  });

  test('throws when defining multiple nodes with the same name.', () => {
    expect(() =>
      createNumberGraph(`
      [A: 123]
      [A: 321]
      `),
    ).toThrow();
  });

  test('throws when value is not a valid number.', () => {
    expect(() =>
      createNumberGraph(`
      [A: abc]
    `),
    ).toThrow();
  });
});
