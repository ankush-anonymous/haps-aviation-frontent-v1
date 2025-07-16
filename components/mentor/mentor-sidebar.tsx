"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, User, Calendar } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/mentor/dashboard",
    icon: BarChart3,
  },
  {
    title: "Profile",
    href: "/mentor/profile",
    icon: User,
  },
  {
    title: "Availability",
    href: "/mentor/availability",
    icon: Calendar,
  },
]

export function MentorSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-orange-100 text-orange-600" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
