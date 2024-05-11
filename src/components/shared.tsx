import { cva } from "class-variance-authority";

export function SectionBadge(props) {
  return (
    <span className="top-2 px-2 text-xs cursor-default right-2 group-hover:opacity-100 ease-out duration-300 opacity-0 bg-yellow-400 inline-block p-1 absolute rounded-lg text-black">
      {props.children}
    </span>
  );
}

const sectionBoxVariants = cva(
  "flex gap-2 group relative w-full text-white gap-y-4 rounded-2xl",
  {
    variants: {
      variant: {
        outline: "bg-white/[0.05] border",
        plain: "",
        dotted: "border-dashed border border-white/[0.6]",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

export function SectionBox(props: {
  id?: string;
  variant?: "plain" | "outline" | "dotted";
  theme?: "cyan" | "white";
  className?: string;
  children: React.ReactNode;
}) {
  const { className, theme, variant = "outline", children, ...PROPS } = props;

  return (
    <div {...PROPS} className={sectionBoxVariants({ variant, className })}>
      {children}
    </div>
  );
}
