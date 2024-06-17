import { useMount, useRequest } from 'ahooks';
import { TreeSelect, TreeSelectProps } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { ITreeSelectItem } from './types';
import type { IValue } from './utils';
import { clearCache, differenceArray, getChildByNode, union } from './utils';

type IEnhanceNodeTitle = (
  children: Record<string, any>[],
) => Record<string, any>[];

const BaseTreeSelect: React.FC<ITreeSelectItem> = (props) => {
  const {
    request,
    defaultCheckAll,
    onChange,
    onValueChange,
    fieldNames,
    treeData,
    ...restProps
  } = props;

  const labelKey = fieldNames?.label || 'label';
  const valueKey = fieldNames?.value || 'value';
  const childrenKey = fieldNames?.children || 'children';

  const [selectValue, setSelectValue] = useState<IValue[]>([]);
  console.log('selectValue: ', selectValue);

  const requestOpts = request || (() => Promise.resolve(treeData));

  const popupValue = (value: any[]) => {
    onChange?.(value);
    onValueChange?.(value);
  };

  const { data, run } = useRequest(requestOpts, {
    manual: true,
    onSuccess: (resp) => {
      clearCache();
      if (defaultCheckAll && resp) {
        const kids = getChildByNode(resp, valueKey, childrenKey);
        const allValues = [...kids, resp[valueKey]].reverse();
        setSelectValue(allValues);
        popupValue(allValues);
      }
    },
  });
  // 如果是传入的request,则只调用一次
  useMount(() => {
    if (request) {
      run();
    }
  });
  // 如果传入的是options，则在options属性更新后就调用
  useEffect(() => {
    if (!request) {
      run();
    }
  }, [treeData, run, request]);

  // 后端返回的data经常都是一个对象，所以组件里面统一处理
  const respData = data ? (Array.isArray(data) ? data : [data]) : [];

  // 阻止冒泡,避免触发onSelect
  // 点击title节点选中当前节点，不选中子节点
  const clickNode = (evt: any, value: IValue) => {
    evt.stopPropagation();
    const index = selectValue.findIndex((val) => val === value);
    let result: IValue[] = [];
    if (index > -1) {
      const values = selectValue.slice(0);
      values.splice(index, 1);
      result = values;
    } else {
      result = selectValue.concat([value]);
    }
    setSelectValue(result);
    popupValue(result);
  };

  const enhanceNodeTitle: IEnhanceNodeTitle = (
    children: Record<string, any>[],
  ) => {
    if (!Array.isArray(children)) return [];
    return children.map((nodeData: Record<string, any>) => {
      const label = nodeData[labelKey];
      const value = nodeData[valueKey];
      return {
        value: value,
        title: <div onClick={(evt) => clickNode(evt, value)}>{label}</div>,
        children: enhanceNodeTitle(nodeData[childrenKey]),
        ...nodeData,
      };
    });
  };

  // 被选中时调用
  // 点击checkbox选中当前及其所有的子节点
  const handleSelect: TreeSelectProps['onSelect'] = (value, node: any) => {
    console.log('handleSelect');
    const kids = getChildByNode(node);
    const result = union(selectValue, [...kids, value]).reverse();
    setSelectValue(result);
    popupValue(result);
  };

  // 点击checkbox取消当前及其所有的子节点
  const handleDeSelect: TreeSelectProps['onDeselect'] = (value, node: any) => {
    const kids = getChildByNode(node);
    const result = differenceArray(selectValue, [...kids, value]);
    setSelectValue(result);
    popupValue(result);
  };

  const handleClear = () => {
    setSelectValue([]);
    popupValue([]);
  };

  return (
    <TreeSelect
      allowClear
      showSearch
      maxTagCount={3}
      treeCheckable
      showCheckedStrategy="SHOW_ALL"
      value={selectValue}
      onClear={handleClear}
      onSelect={handleSelect}
      onDeselect={handleDeSelect}
      treeData={enhanceNodeTitle(respData || treeData || [])}
      {...restProps}
      treeCheckStrictly={true}
    />
  );
};

export default memo(BaseTreeSelect);
