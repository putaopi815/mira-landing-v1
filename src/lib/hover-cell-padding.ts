/**
 * 列表格 / 卡片 hover 灰底区域：统一竖向内边距。
 * 上下 CSS 数值一致时，首行小字 + 末段行高仍常显得「上宽下窄」，故底部略加大作光学补偿。
 */
export const HOVER_CELL_PAD_BLOCK = "clamp(28px, 6vw, 40px)";

export const hoverCellVerticalPadding = {
  paddingTop: HOVER_CELL_PAD_BLOCK,
  paddingBottom: `calc(${HOVER_CELL_PAD_BLOCK} + 0.375rem)`,
} as const;
