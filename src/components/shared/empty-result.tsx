import { IconType } from "react-icons"

interface EmptyResultProps {
  label: string
  icon: IconType
}

const EmptyResult: React.FC<EmptyResultProps> = ({ label, icon: Icon }) => {
  return (
    <div className="text-center flex flex-col gap-4 items-center justify-center px-8 py-12">
      <Icon className="size-14 text-muted-foreground" />
      <h4 className="text-muted-foreground">{label}</h4>
    </div>
  )
}
export default EmptyResult
