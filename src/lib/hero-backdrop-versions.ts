/**
 * Hero banner / backdrop 版本记录。
 *
 * 约定：
 * - `v0`：本次改 banner 前的纯静态图片背景
 * - `v4`：当前激活版本，静态图轻动效
 */
export const HERO_BACKDROP_ACTIVE_VERSION = "v4" as const;

export const HERO_BACKDROP_VERSIONS = [
  {
    id: "v0",
    label: "静态图片版本 v0",
    note: "本次改 banner 前使用的纯静态背景",
  },
  {
    id: "v4",
    label: "静态图轻动效版本 v4",
    note: "当前激活版本，对应 HeroPhotoBackdrop",
  },
] as const;
