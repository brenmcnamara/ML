interface Node<T> {
  id: string;
  value: T;
}

type EdgeType = 'DIRECTED' | 'UNDIRECTED';

interface Edge {
  edgeType: EdgeType;
  nodeA: string;
  nodeB: string;
}

export interface Graph<T> {
  nodes: { [id: string]: Node<T> };
  edgeCache: { [id: string]: string[] };
  edges: Edge[];
}

const rNodeDef = /^\[\s*([a-zA-Z\d_\-]+)\s*:\s*([a-zA-Z\d_\-]+)\s*\]$/;
const rEdgeDef = /^\[\s*([a-zA-Z\d_\-]+)\s*\]\s*(\->?)\s*\[\s*([a-zA-Z\d_\-]+)\s*\]$/;

// NOTE: Not an exhaustive regex for all parsable number types, but good
// enough for our use cases.
const rNum = /^\d+(\.\d+)?$/;

export function createNumberGraph(graphDefinition: string): Graph<number> {
  const defs = graphDefinition
    .split('\n')
    .map((line) => line.trim())
    .filter((l) => l.length > 0);

  // @ts-ignore
  const nodeMatchers: RegExpMatchArray[] = defs
    .map((def) => def.match(rNodeDef))
    .filter(Boolean);

  // @ts-ignore
  const edgeMatchers: RegExpMatchArray[] = defs
    .map((def) => def.match(rEdgeDef))
    .filter(Boolean);

  if (nodeMatchers.length + edgeMatchers.length !== defs.length) {
    throw Error(`Invalid graph definition.`);
  }

  const nodes: { [id: string]: Node<number> } = {};
  const edgeCache: { [id: string]: string[] } = {};
  const edges: Edge[] = [];

  for (const matcher of nodeMatchers) {
    const [id, value] = matcher.slice(1, 3);

    if (nodes[id]) {
      throw Error(`Multiple definitions for node: ${id}`);
    }

    if (!rNum.test(value)) {
      throw Error(`Expecting number. Got ${value}.`);
    }

    const node = { id, value: parseFloat(value) };
    nodes[id] = node;
  }

  for (const matcher of edgeMatchers) {
    const [nodeA, connection, nodeB] = matcher.slice(1, 4);

    if (!nodes[nodeA]) {
      throw Error(`Missing node for id: ${nodeA}`);
    }

    if (!nodes[nodeB]) {
      throw Error(`Missing node for id: ${nodeB}`);
    }

    const edgeType: EdgeType = connection === '-' ? 'UNDIRECTED' : 'DIRECTED';
    const edge = { edgeType, nodeA, nodeB };
    edges.push(edge);
  }

  for (const edge of edges) {
    switch (edge.edgeType) {
      case 'DIRECTED': {
        const toNodes = edgeCache[edge.nodeA] || [];
        toNodes.push(edge.nodeB);
        edgeCache[edge.nodeA] = toNodes;
        break;
      }

      case 'UNDIRECTED': {
        const toNodesA = edgeCache[edge.nodeA] || [];
        toNodesA.push(edge.nodeB);
        edgeCache[edge.nodeA] = toNodesA;

        const toNodesB = edgeCache[edge.nodeB] || [];
        toNodesB.push(edge.nodeA);
        edgeCache[edge.nodeB] = toNodesB;
      }
    }
  }

  return { nodes, edgeCache, edges };
}

export function createGraph<T>(
  assignments: { [id: string]: T },
  edgeDefinition: string,
): Graph<T> {
  const nodes: { [id: string]: Node<T> } = {};
  const edges: Edge[] = [];
  const edgeCache: { [id: string]: string[] } = {};

  for (const nodeID of Object.keys(assignments)) {
    nodes[nodeID] = { id: nodeID, value: assignments[nodeID] };
  }

  const defs = edgeDefinition
    .split('\n')
    .map((line) => line.trim())
    .filter((l) => l.length > 0);

  // @ts-ignore
  const edgeMatchers: RegExpMatchArray[] = defs
    .map((def) => def.match(rEdgeDef))
    .filter(Boolean);

  for (const matcher of edgeMatchers) {
    const [nodeA, connection, nodeB] = matcher.slice(1, 4);

    if (!nodes[nodeA]) {
      throw Error(`Missing node for id: ${nodeA}`);
    }

    if (!nodes[nodeB]) {
      throw Error(`Missing node for id: ${nodeB}`);
    }

    const edgeType: EdgeType = connection === '-' ? 'UNDIRECTED' : 'DIRECTED';
    const edge = { edgeType, nodeA, nodeB };
    edges.push(edge);
  }

  for (const edge of edges) {
    switch (edge.edgeType) {
      case 'DIRECTED': {
        const toNodes = edgeCache[edge.nodeA] || [];
        toNodes.push(edge.nodeB);
        edgeCache[edge.nodeA] = toNodes;
        break;
      }

      case 'UNDIRECTED': {
        const toNodesA = edgeCache[edge.nodeA] || [];
        toNodesA.push(edge.nodeB);
        edgeCache[edge.nodeA] = toNodesA;

        const toNodesB = edgeCache[edge.nodeB] || [];
        toNodesB.push(edge.nodeA);
        edgeCache[edge.nodeB] = toNodesB;
      }
    }
  }

  return { nodes, edgeCache, edges };
}
