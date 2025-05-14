import { cn } from "../utils/cn"

interface ButtonProps {
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-3 text-sm py-1.5 md:py-2 flex justify-center items-center gap-2 rounded-full shadow-md shadow-black/[.03] h-10 active:shadow-none font-medium bg-white border border-neutral-200 cursor-pointer text-neutral-900 hover:bg-neutral-100 transition-all",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
