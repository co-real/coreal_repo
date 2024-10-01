interface ButtonProps {
  variant?: "primary" | "secondary" | "dark" | "light";
  type?: "create" | "tab";
  onClick?: () => void;
  isActive?: boolean;
  children?: React.ReactNode;
}

function Button({
  variant = "primary",
  type = "create",
  onClick = () => {},
  children,
}: ButtonProps) {
  // 버튼 색상 및 스타일 임의 설정
  const variantClasses = {
    primary: "bg-purple-3 text-white hover:bg-purple-5",
    secondary: "bg-gray-200 text-purple-6 hover:bg-purple-1",
    dark: "bg-gray-900 text-white",
    light: "bg-gray-200 text-gray-900",
  };

  const typeClasses = {
    create: "px-[18px] py-[10px] body-1 md:px-[21px] md:py-[10px] md:body-2",
    tab: "px-3 py-2 text-body-1 md:px-4 md:py-[10px] md:text-body-1",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 rounded-xl ${variantClasses[variant]} ${typeClasses[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
