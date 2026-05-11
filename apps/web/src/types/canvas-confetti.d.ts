declare module "canvas-confetti" {
  export type Shape = "square" | "circle" | "star";

  export type Options = {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    flat?: boolean;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: Shape[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  };

  export default function confetti(options?: Options): Promise<null> | null;
}
