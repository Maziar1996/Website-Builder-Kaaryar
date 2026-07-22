import styles from "./UI.module.css";

export function SectionWrap({
  children,
  $padding,
  $mobilePadding,
  className,
  ...props
}) {
  return (
    <section
      className={`${styles.sectionWrap} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </section>
  );
}

export function Container({ children, className, ...props }) {
  return (
    <div className={`${styles.container} ${className || ""}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  $color,
  className,
  style,
  ...props
}) {
  return (
    <a
      className={`${styles.primaryButton} ${className || ""}`.trim()}
      style={{ ...style, "--btn-bg": $color }}
      {...props}
    >
      {children}
    </a>
  );
}

export function Heading({
  children,
  $size,
  $align,
  $mobileSize,
  as: Tag = "h2",
  className,
  ...props
}) {
  const sizeClass =
    $size === "22px"
      ? styles.headingSize22
      : $size === "24px"
        ? styles.headingSize24
        : $size === "20px"
          ? styles.headingSize20
          : "";
  const alignClass = $align === "center" ? styles.center : "";

  return (
    <Tag
      className={`${styles.heading} ${sizeClass} ${alignClass} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Text({ children, $size, $align, $muted, className, ...props }) {
  const mutedClass = $muted ? styles.muted : "";
  const alignClass = $align === "center" ? styles.center : "";

  return (
    <p
      className={`${styles.text} ${mutedClass} ${alignClass} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </p>
  );
}

export function Field({ children, className, ...props }) {
  return (
    <label className={`${styles.field} ${className || ""}`.trim()} {...props}>
      {children}
    </label>
  );
}

export function Input({ className, ...props }) {
  return (
    <input className={`${styles.input} ${className || ""}`.trim()} {...props} />
  );
}

export function TextArea({ className, ...props }) {
  return (
    <textarea
      className={`${styles.textArea} ${className || ""}`.trim()}
      {...props}
    />
  );
}

export function Select({ className, ...props }) {
  return (
    <select
      className={`${styles.select} ${className || ""}`.trim()}
      {...props}
    />
  );
}

export function SettingsItem({ children, className, ...props }) {
  return (
    <div
      className={`${styles.settingsItem} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export function AdminButton({
  children,
  $variant,
  as: Component = "button",
  className,
  ...props
}) {
  const variantClass =
    $variant === "primary"
      ? styles.adminButtonPrimary
      : $variant === "danger"
        ? styles.adminButtonDanger
        : $variant === "ghost"
          ? styles.adminButtonGhost
          : "";

  return (
    <Component
      className={`${styles.adminButton} ${variantClass} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

export function ArrowLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.56994 18.82C9.37994 18.82 9.18994 18.75 9.03994 18.6L2.96994 12.53C2.67994 12.24 2.67994 11.76 2.96994 11.47L9.03994 5.4C9.32994 5.11 9.80994 5.11 10.0999 5.4C10.3899 5.69 10.3899 6.17 10.0999 6.46L4.55994 12L10.0999 17.54C10.3899 17.83 10.3899 18.31 10.0999 18.6C9.95994 18.75 9.75994 18.82 9.56994 18.82Z"
        fill="white"
      />
      <path
        d="M20.4999 12.75H3.66992C3.25992 12.75 2.91992 12.41 2.91992 12C2.91992 11.59 3.25992 11.25 3.66992 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z"
        fill="white"
      />
    </svg>
  );
}
export function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 19l7-7-7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 19l-7-7 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
