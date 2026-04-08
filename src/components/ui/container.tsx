interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  narrow?: boolean;
}

export function Container({ children, className, as: Component = "div", narrow }: ContainerProps) {
  return (
    <Component
      className={className}
      style={{
        maxWidth: narrow ? "900px" : "1280px",
        width: "100%",
        margin: "0 auto",
        paddingLeft: "32px",
        paddingRight: "32px",
      }}
    >
      {children}
    </Component>
  );
}
