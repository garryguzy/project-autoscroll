// Everything about dom moving ;

export const getDom = (
  dom: string | HTMLElement,
  parent: any = 'body'
): JQuery<HTMLElement> => {
  if (typeof dom === 'string') {
    return $(parent).find(dom);
  } else {
    return $(dom);
  }
};

export const setItemsInitStyle = (
  items: JQuery<HTMLElement>[],
  left: number
) => {
  items.forEach((i) => {
    i.css({
      position: 'absolute',
      left,
      top: 0,
    });
  });
};

export const setItemsPosition = (
  items: JQuery<HTMLElement>[],
  positions: number[]
) => {
  items.forEach((i, index) => {
    i.css({
      top: positions[index],
    });
  });
};

export const generateColumnItems = (
  items: JQuery<HTMLElement>,
  columns: number,
  columnIndexes?: number[][]
) => {
  let results: JQuery<HTMLElement>[][] = [];
  if (columnIndexes) {
    const flatItems = items.toArray().flatMap((v) => v);
    results = columnIndexes.map((v) => {
      return v.map((i) => {
        return $(flatItems[i]);
      });
    });
  } else {
    items.each((index, i) => {
      if (!results[index % columns]) {
        results[index % columns] = [];
      }
      results[index % columns].push($(i));
    });
  }
  return results;
};

export const generateColumnItemsPatch = (
  columnItems: JQuery<HTMLElement>[],
  containerEl: JQuery<HTMLElement>,
  space: number = 30
) => {
  // 根据高度需要进行元素补偿
  // 当前元素高度 + space 间隔 > container 高度 * 1.5 , 补偿后的高度也需要满足这个条件
  let columnHeight = 0;
  const result: JQuery<HTMLElement>[] = [];
  const containerHeight = containerEl[0].offsetHeight || 0;
  columnItems.forEach((i) => {
    columnHeight += (i[0].offsetHeight || 0) + space;
    result.push(i);
  });
  console.log(columnHeight);
  while (columnHeight < containerHeight * 1.5) {
    columnItems.forEach((i) => {
      const newItem = i.clone();
      newItem.height(i[0].offsetHeight || 0);
      containerEl.append(newItem);
      result.push(newItem);
    });
    columnHeight += columnHeight;
  }
  console.log(result);
  return result;
};
