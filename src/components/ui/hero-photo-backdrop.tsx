import { HERO_BACKGROUND_BANNER_PHOTO_SAVED } from "@/lib/hero-background";

/**
 * Hero / CTA photo backdrop v4.
 *
 * - 基于 v0 静态图
 * - 叠加轻量 motion，保持 premium / calm 氛围
 * - 当前正朝更明显的高端科技感方向微调
 */
export function HeroPhotoBackdrop({
  parallaxOffset = 0,
}: {
  parallaxOffset?: number;
}) {
  return (
    <div className="hero-photo-backdrop-root" aria-hidden>
      <div className="hero-photo-backdrop-image-drift">
        <div
          className="hero-photo-backdrop-image"
          style={{
            backgroundImage: `url(${HERO_BACKGROUND_BANNER_PHOTO_SAVED})`,
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.1)`,
          }}
        />
      </div>
      <div className="hero-photo-backdrop-veil">
        <div className="hero-photo-backdrop-veil-inner" />
      </div>
      <div className="hero-photo-backdrop-tech-sheen">
        <div className="hero-photo-backdrop-tech-sheen-inner" />
      </div>
      <div className="hero-photo-backdrop-glow" />
      <div className="hero-photo-backdrop-overlay" />
    </div>
  );
}
