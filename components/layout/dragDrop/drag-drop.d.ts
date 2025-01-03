export type dragAndDrop = {
  children: JSX.Element | JSX.Element[];
  childWidth: number;
  childHeight: number;
  margin: number;
  marginBottom: number;
  onDrag?(x: number, y: number): void;
  onDrop?(x: number, y: number): void;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  dropOnCorner?: boolean;
  menuOpen?: boolean;
  fullScreen?: boolean;
};
