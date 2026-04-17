declare module "canvas-confetti" {
  export type Options = {
    particleCount?: number;
    spread?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
  };

  export default function confetti(options?: Options): Promise<null> | null;
}
