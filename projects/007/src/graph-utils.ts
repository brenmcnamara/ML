import { Graph } from './graph';

export function isDAG(graph: Graph<any>): boolean {
  const visited: { [id: string]: boolean } = {};
  for (const nodeID of Object.keys(graph.nodes)) {
    if (visited[nodeID]) {
      continue;
    }

    const visitedThisPass: { [id: string]: boolean } = {};
    const stack: string[] = [nodeID];

    let next;
    while ((next = stack.pop())) {
      if (visitedThisPass[next]) {
        return false; // Found a cycle.
      }

      visitedThisPass[next] = true;

      // Add any nodes that have not been visited on a
      // previous pass.
      const childIDs = graph.edgeCache[next] || [];
      const toVisit = childIDs.filter((id) => !visited[id]);
      stack.push.apply(stack, toVisit);
    }

    for (const nodeID of Object.keys(visitedThisPass)) {
      visited[nodeID] = true;
    }
  }

  return true;
}
