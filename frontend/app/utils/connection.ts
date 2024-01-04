/* eslint @typescript-eslint/no-explicit-any: 0 */
type Edge = { node?: any; __typename?: string | undefined } | null;

export const getNodesFromConnectionEdges = <T extends Edge>(
  edges: T[] | undefined | null,
): NonNullable<NonNullable<T>['node']>[] =>
  edges
    ?.filter((edge): edge is NonNullable<T> => !!edge?.node)
    .map((edge) => edge.node)
    .filter((node): node is NonNullable<NonNullable<T>['node']> => !!node) ??
  [];
