/**
 *  根据分栏的数量来获取每栏元素对应的left 坐标
 *  由于是竖向运动，left 坐标相对是固定的
 */
export const getLeftPositionForColumn = (
  containerEl: JQuery<HTMLElement>,
  items: JQuery<HTMLElement>[],
  columnCount: number = 3
) => {
  const result: number[] = [];
  const containerWidth = containerEl[0].offsetWidth || 0;
  const itemWidth = items[0][0].offsetWidth || 0;
  const singleItemWidth = containerWidth / columnCount;
  const space = singleItemWidth - itemWidth;
  if (space < 0) {
    for (let i: number = 0; i < columnCount; i++) {
      result[i] = i * itemWidth;
    }
  } else {
    for (let i: number = 0; i < columnCount; i++) {
      result[i] = i * itemWidth + space * i + space / 2;
    }
  }
  return result;
};

/**
 *  处理元素滚动出边界
 */
export const processItemsOverTop = (
  items: JQuery<HTMLElement>[],
  positions: number[],
  space: number = 30
) => {
  let newItems: JQuery<HTMLElement>[] = [...items];
  let newPositions: number[] = [...positions];
  while (newItems.length && isItemOverTop(newItems[0], newPositions[0])) {
    const i = newItems.shift() as JQuery<HTMLElement>;
    let j = newPositions.shift();
    j = (newPositions[newPositions.length - 1] +
      (newItems[newItems.length - 1][0].offsetHeight || 0) +
      space) as number;
    newItems.push(i);
    newPositions.push(j);
  }
  return { newItems, newPositions };
}; // 处理元素上移出边界的问题

export const isItemOverTop = (
  item: JQuery<HTMLElement>,
  top: number,
  space: number = 30
) => {
  const itemBottom = top + (item[0].offsetHeight || 0) + space;
  return itemBottom < 0;
};

export const itemPositionRunning = (positions: number[], speed: number = 1) => {
  return positions.map((i) => i - speed);
}; // 元素运动

export const generatePatchedItemsPosition = (
  items: JQuery<HTMLElement>[],
  space: number = 30
) => {
  const result: number[] = [];
  let totalHeight = 0;
  items.forEach((i, index) => {
    result[index] = index === 0 ? 0 : totalHeight;
    totalHeight += (i[0].offsetHeight || 0) + space;
  });
  console.log(result);
  return result;
};
