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
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const foundIndex = tabs.findIndex(tab => tab.href === pathname)
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex)
      setActiveTab(tabs[foundIndex].name)
    }
  }, [pathname])

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
    }
  }, [hoveredIndex])

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeIndex])

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
          ${index === activeIndex ? "text-black dark:text-white" : "text-black dark:text-black"}
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
      <div
        className="absolute h-[30px] transition-all duration-300 ease-out bg-primary/10 dark:bg-primary rounded-[6px] pointer-events-none"
        style={{
          ...hoverStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />
      <div
        className="absolute bottom-[-2px] h-[2px] bg-primary dark:bg-white transition-all duration-300 ease-out pointer-events-none"
        style={activeStyle}
      />
      <TooltipProvider>
        <div className="relative flex space-x-[6px] items-center min-w-max px-2 sm:px-0">
          {tabs.map((tab, index) => renderTab(tab, index))}
        </div>
      </TooltipProvider>
    </div>
  )
}
