"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type TabItem = {
  name: string
  href: string
}

export default function TabComponentFrame({
  tabs,
  disabledList = [],
  tooltipMessage = "Esta opción no está disponible",
  setActiveTab,
}: {
  tabs: TabItem[]
  activeTab?: string
  disabledList?: string[]
  setActiveTab: (tab: string) => void
  tooltipMessage?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeBackgroundStyle, setActiveBackgroundStyle] = useState({ left: "0px", width: "0px", opacity: 0 })
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])

  // Effect to set active tab based on current pathname
  useEffect(() => {
    const foundIndex = tabs.findIndex((tab) => tab.href === pathname)
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex)
      setActiveTab(tabs[foundIndex].name)
    }
  }, [pathname, tabs, setActiveTab])

  // Effect to update hover style
  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    } else {
      setHoverStyle({}) // Clear hover style when not hovered
    }
  }, [hoveredIndex])

  // Effect to update active background style
  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveBackgroundStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
        opacity: 1, // Always visible when active
      })
    } else {
      setActiveBackgroundStyle({ left: "0px", width: "0px", opacity: 0 }) // Hide if no active tab
    }
  }, [activeIndex, tabs])

  const handleTabClick = (index: number, tab: TabItem) => {
    if (disabledList.includes(tab.name)) return
    setActiveIndex(index)
    setActiveTab(tab.name)
    router.push(tab.href)
  }

  const renderTab = (tab: TabItem, index: number) => {
    const isDisabled = disabledList.includes(tab.name)
    const tabContent = (
      <div
        /* @ts-ignore */
        ref={(el) => (tabRefs.current[index] = el)}
        className={`px-3 py-2 sm:px-4 sm:py-2 transition-colors duration-300 h-[30px] whitespace-nowrap
          ${index === activeIndex ? "text-white" : "text-black dark:text-black"}
          ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => !isDisabled && handleTabClick(index, tab)}
      >
        <div className="text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5 flex items-center justify-center h-full">
          {tab.name}
        </div>
      </div>
    )

    if (isDisabled) {
      return (
        <Tooltip key={index}>
          <TooltipTrigger asChild>{tabContent}</TooltipTrigger>
          <TooltipContent className="max-w-64 text-center">
            <p>{tooltipMessage}</p>
          </TooltipContent>
        </Tooltip>
      )
    }
    return <div key={index}>{tabContent}</div>
  }

  return (
    <div className="relative w-full overflow-x-auto">
      {/* Active Tab Background */}
      <div
        className="absolute h-[30px] transition-all duration-300 ease-out bg-primary rounded-[6px] pointer-events-none"
        style={activeBackgroundStyle}
      />
      {/* Hover Tab Background (only shows for non-active tabs) */}
      <div
        className="absolute h-[30px] transition-all duration-300 ease-out bg-primary/10 dark:bg-primary rounded-[6px] pointer-events-none"
        style={{
          ...hoverStyle,
          opacity: hoveredIndex !== null && hoveredIndex !== activeIndex ? 1 : 0,
        }}
      />
      <TooltipProvider>
        <div className="relative flex space-x-[6px] items-center min-w-max px-2 sm:px-0">
          {tabs.map((tab, index) => renderTab(tab, index))}
        </div>
      </TooltipProvider>
    </div>
  )
}
