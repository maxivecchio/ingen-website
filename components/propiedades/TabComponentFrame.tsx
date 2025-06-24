"use client"
import { useState, useRef, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function TabComponentFrame({
  tabs,
  activeTab,
  disabledList = [""],
  setActiveTab,
  tooltipMessage = "Esta opción no está disponible",
}: {
  tabs: any[]
  activeTab?: string
  disabledList?: string[]
  setActiveTab: (tab: string) => void
  tooltipMessage?: string
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const [isDarkMode, setIsDarkMode] = useState(false)
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])

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

  useEffect(() => {
    requestAnimationFrame(() => {
      const overviewElement = tabRefs.current[0]
      if (overviewElement) {
        const { offsetLeft, offsetWidth } = overviewElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    })
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleTabClick = (index: number, tab: string) => {
    // Check if the tab is disabled
    if (disabledList.includes(tab)) {
      return // Do nothing if tab is disabled
    }

    setActiveIndex(index)
    setActiveTab(tab)
  }

  const renderTab = (tab: string, index: number) => {
    const isDisabled = disabledList.includes(tab)
    const tabContent = (
      <div
        /* @ts-ignore */
        ref={(el) => (tabRefs.current[index] = el)}
        className={`px-3 py-2 transition-colors duration-300 h-[30px] ${index === activeIndex ? "text-black dark:text-white" : "text-black dark:text-black"
          } ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => !isDisabled && handleTabClick(index, tab)}
      >
        <div
          className="text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5 whitespace-nowrap flex items-center justify-center h-full">
          {tab === "all" ? "Todos" : tab === "visible" ? "Visibles" : tab === "variation" ? "Variaciones" : tab}
        </div>
      </div>
    )

    // If the tab is disabled, wrap it in a tooltip
    if (isDisabled) {
      return (
        <Tooltip key={index}>
          <TooltipTrigger asChild>{tabContent}</TooltipTrigger>
          <TooltipContent className={"max-w-64 text-center"}>
            <p>{tooltipMessage}</p>
          </TooltipContent>
        </Tooltip>
      )
    }

    // Otherwise, return the tab content directly
    return <div key={index}>{tabContent}</div>
  }

  return (
    <div className="relative">
      {/* Hover Highlight */}
      <div
        className="absolute h-[30px] transition-all duration-300 ease-out bg-primary/10 dark:bg-primary rounded-[6px] flex items-center"
        style={{
          ...hoverStyle,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
      />

      {/* Active Indicator */}
      <div
        className="absolute bottom-[-2px] h-[2px] bg-primary dark:bg-white transition-all duration-300 ease-out"
        style={activeStyle}
      />

      {/* Tabs */}
      <TooltipProvider>
        <div className="relative flex space-x-[6px] items-center">
          {tabs.map((tab, index) => renderTab(tab, index))}
        </div>
      </TooltipProvider>
    </div>
  )
}
