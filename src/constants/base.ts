import { IconType } from "react-icons"
import {
  PiBriefcaseDuotone,
  PiDiamondsFourDuotone,
  PiFilesDuotone,
  PiGraduationCapDuotone,
  // PiHouseLineDuotone,
  PiLightbulbFilamentDuotone,
} from "react-icons/pi"

export const navlinks = (
  pathname: string
): { path: string; label: string; isActive: boolean; icon: IconType }[] => {
  return [
    // {
    //   path: "/",
    //   label: "Dashboard",
    //   isActive: pathname === "/",
    //   icon: PiHouseLineDuotone,
    // },
    {
      path: "/blogs",
      label: "Blogs",
      isActive: pathname.startsWith("/blogs"),
      icon: PiFilesDuotone,
    },
    {
      path: "/projects",
      label: "Projects",
      isActive: pathname.startsWith("/projects"),
      icon: PiDiamondsFourDuotone,
    },
    {
      path: "/experiences",
      label: "Experiences",
      isActive: pathname.startsWith("/experiences"),
      icon: PiBriefcaseDuotone,
    },
    {
      path: "/educations",
      label: "Educations",
      isActive: pathname.startsWith("/educations"),
      icon: PiGraduationCapDuotone,
    },
    {
      path: "/skills",
      label: "Skills",
      isActive: pathname.startsWith("/skills"),
      icon: PiLightbulbFilamentDuotone,
    },
  ]
}
