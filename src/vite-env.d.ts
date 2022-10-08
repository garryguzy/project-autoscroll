/// <reference types="vite/client" />

interface Arguments {
  container: HTMLElement | string;
  selector: HTMLElement | string;
  columns: number;
  speed: number[] | number;
  space?: number;
  columnIndexes?: number[][];
}
interface ColumnItemOptions {
  containerEl: JQuery<HTMLElement>;
  items: JQuery<HTMLElement>[];
  left: number;
  speed: number;
  space?: number;
}
