import React, { ButtonHTMLAttributes } from "react";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "primary" | "outline" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "medium",
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-colors duration-200 focus:outline-none";

  const sizeClasses: Record<ButtonSize, string> = {
    small: "px-8 py-2 text-sm",
    medium: "px-10 py-2.5 text-base",
    large: "px-12 py-3 text-lg",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primary hover:text-white",
    outline:
      "border border-gray-200 text-primary hover:bg-primary hover:text-white",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim();

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
