import { Link } from "react-router-dom"
import { Button } from "../ui/button"

interface PageHeaderProps {
  title: string
  button?: {
    label: string
    href?: string
    onClick?: () => void
    varient?: "default" | "destructive" | "secondary" | "ghost"
  }[]
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, button }) => {
  return (
    <section className="flex items-center justify-between gap-4">
      <h1 className="font-bold text-xl md:text-2xl">{title}</h1>
      {button && (
        <div className="flex flex-col gap-6">
          {button.map((btn, i) => {
            if (btn.href) {
              return (
                <Button
                  asChild
                  variant={btn.varient || "default"}
                  key={"page-btn-" + btn.href + "-" + i}
                >
                  <Link to={btn.href}>{btn.label}</Link>
                </Button>
              )
            }
            if (btn.onClick) {
              return (
                <Button
                  key={"page-btn-" + btn.href + "-" + i}
                  variant={btn.varient || "default"}
                  className="cursor-pointer"
                  onClick={btn.onClick}
                >
                  {btn.label}
                </Button>
              )
            }
          })}
        </div>
      )}
    </section>
  )
}
export default PageHeader
