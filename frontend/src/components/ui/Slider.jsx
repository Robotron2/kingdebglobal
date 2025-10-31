import React, { useMemo } from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "../../lib/utils"
import { useTheme } from "../../hooks/useTheme"

export function Slider({ className, defaultValue, value, min = 0, max = 100, step = 1, onValueChange, ...props }) {
	const { theme } = useTheme()
	const _values = useMemo(() => {
		if (Array.isArray(value)) return value
		if (Array.isArray(defaultValue)) return defaultValue
		return [min]
	}, [value, defaultValue, min])

	return (
		<SliderPrimitive.Root
			defaultValue={defaultValue}
			value={value}
			onValueChange={onValueChange}
			min={min}
			max={max}
			step={step}
			className={cn(
				"relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
				className
			)}
			{...props}>
			{/* Track */}
			<SliderPrimitive.Track
				data-slot="slider-track"
				className={`relative h-2 w-full grow overflow-hidden rounded-full ${
					theme === "light" ? "bg-muted-light" : "bg-muted-dark"
				}`}>
				{/* Range */}
				<SliderPrimitive.Range
					data-slot="slider-range"
					className="absolute h-full bg-yellow-400 rounded-full transition-all duration-300 ease-in-out"
				/>
			</SliderPrimitive.Track>

			{/* Thumb */}
			{Array.from({ length: _values.length }, (_, index) => (
				<SliderPrimitive.Thumb
					data-slot="slider-thumb"
					key={index}
					className={cn(
						"block size-5 rounded-full border-2 border-yellow-400 bg-white shadow-md",
						"transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95",
						"focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
					)}
				/>
			))}
		</SliderPrimitive.Root>
	)
}
