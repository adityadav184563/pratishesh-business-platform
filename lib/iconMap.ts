import type { LucideIcon } from "lucide-react"
import {
  Award,
  Briefcase,
  Building2,
  Code,
  Coffee,
  FileText,
  Globe,
  GraduationCap,
  Landmark,
  Layout,
  Mic,
  Monitor,
  Receipt,
  Scale,
  Search,
  Server,
  ShieldCheck,
  ShoppingCart,
  Terminal,
  UserPlus,
  Users,
  Wallet,
  Wrench,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Code,
  Layout,
  ShoppingCart,
  Server,
  Wrench,
  Monitor,
  Receipt,
  FileText,
  Landmark,
  Building2,
  ShieldCheck,
  Users,
  Scale,
  GraduationCap,
  Wallet,
  Terminal,
  Coffee,
  Briefcase,
  UserPlus,
  Mic,
  Search,
  Award,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Monitor
}

export const ICON_OPTIONS = Object.keys(iconMap)
