export function concatReduce(arr, func = a => a) {
  return arr.reduce((collection, item) => collection.concat(func.call(this, item)), []);
}

export function getRouteNodesLDR(router) {
  const selector = router.children || [];
  const left = selector.slice(0, selector.length / 2);
  const right = selector.slice(selector.length / 2);
  return concatReduce(left, some => getRouteNodesLDR(some, router))
    .concat({ ...router })
    .concat(concatReduce(right, some => getRouteNodesLDR(some, router)));
}

export function getRouteConnections(router) {
  return router && router.children
    ? router.children.map(c => ({
      from: {
        id: router.id,
        point: 'r',
      },
      to: {
        id: c.id,
        point: 'l',
      },
    })).concat(concatReduce(router.children, (c) => getRouteConnections(c, router)))
    : [];
}
