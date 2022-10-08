import { interval } from 'rxjs';
import {
  generatePatchedItemsPosition,
  getLeftPositionForColumn,
  itemPositionRunning,
  processItemsOverTop,
} from './caculator';
import {
  generateColumnItems,
  generateColumnItemsPatch,
  getDom,
  setItemsInitStyle,
  setItemsPosition,
} from './handleDom';

/**
 *  初始化加载
 */
export const init = ({
  container,
  selector,
  columns = 3,
  speed = 1,
  space = 30,
  columnIndexes, // [[0,3,6], [1,4,7,9], [2,5,8]]
}: Arguments) => {
  const containerEl = getDom(container);

  const containerHeight = containerEl.height() || 0;

  containerEl.css({
    'overflow-y': 'visible',
    visibility: 'hidden',
  });

  const items = getDom(selector, containerEl) as JQuery<HTMLElement>;

  const columnItems = generateColumnItems(items, columns, columnIndexes);

  const columnLeftPositions = getLeftPositionForColumn(
    containerEl,
    columnItems[0],
    columns
  );

  containerEl.css({
    height: containerHeight,
  });

  columnItems.forEach((items, index) =>
    initColumnItems({
      items,
      containerEl,
      left: columnLeftPositions[index],
      speed: typeof speed === 'number' ? speed : speed[index],
      space,
    })
  );

  containerEl.css({
    'overflow-y': 'hidden',
    visibility: 'visible',
  });
};

/**
 *  针对 column 元素进行处理
 */
export const initColumnItems = ({
  containerEl,
  items,
  left,
  space = 30,
  speed = 1,
}: ColumnItemOptions) => {
  let disabled = false;
  let patchedItems = generateColumnItemsPatch(items, containerEl, space);

  setItemsInitStyle(patchedItems, left);

  let patchedItemsPosition = generatePatchedItemsPosition(patchedItems, space);

  setItemsPosition(patchedItems, patchedItemsPosition);

  patchedItems.forEach((i) => {
    i.on('mouseover', () => {
      disabled = true;
    }).on('mouseout', () => {
      disabled = false;
    });
  });

  const source = interval(16).pipe();
  source.subscribe(() => {
    if (!disabled) {
      patchedItemsPosition = itemPositionRunning(patchedItemsPosition, speed);
      setItemsPosition(patchedItems, patchedItemsPosition);
      const result = processItemsOverTop(
        patchedItems,
        patchedItemsPosition,
        space
      );
      patchedItems = result.newItems;
      patchedItemsPosition = result.newPositions;
    }
  });
};
