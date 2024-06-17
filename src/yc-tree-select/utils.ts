export type IValue = string | number;

interface INode {
  value: IValue;
  children: INode;
  [index: string]: any;
}

// 用户节点的信息，key是节点的id,value节点信息
const nodeCache = new Map();

export const clearCache = () => {
  nodeCache.clear();
};

/**递归获取该节点的所有子节点 */
const getChildByNodeRecursion = (
  treeNode: INode,
  nodeValue: IValue,
  // result: IValue[] = [],
  valueKey: string,
  childrenKey: string,
) => {
  const childCache = nodeCache.get(nodeValue);
  if (childCache) {
    return childCache;
  }
  let result: IValue[] = [];
  if (treeNode[childrenKey] && treeNode[childrenKey].length > 0) {
    treeNode[childrenKey].forEach((node: INode) => {
      const child = getChildByNodeRecursion(
        node,
        node[valueKey],
        valueKey,
        childrenKey,
      );
      result = [...child, node[valueKey], ...result];
    });
  }

  nodeCache.set(nodeValue, result);
  return result;
};

/**获取指定节点的所有子节点 */
export const getChildByNode = (
  treeNode: INode,
  valueKey = 'value',
  childrenKey = 'children',
) => {
  return getChildByNodeRecursion(
    treeNode,
    treeNode[valueKey],
    valueKey,
    childrenKey,
  );
};

// 两个数组求并集
export const union = (arr1: IValue[], arr2: IValue[]) => {
  const unionArray = [...arr1, ...arr2];
  return [...new Set(unionArray)];
};

export const differenceArray = (arr1: IValue[], arr2: IValue[]) => {
  return arr1.filter((value) => {
    return !arr2.includes(value);
  });
};
