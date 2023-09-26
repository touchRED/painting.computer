"use client";

import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { animated, to, useSpring } from "@react-spring/web";
import { useMove, useWheel } from "@use-gesture/react";
import { useState } from "react";
import useMeasure from "react-use-measure";

const AnimatedPrismicNextImage = animated(PrismicNextImage);

export default function Viewer({ images }) {
    console.log(images)
    const [imgRef, bounds] = useMeasure()
    const [selected, setSelected] = useState(0)
    const [{ x, y, scale }, scaleApi] = useSpring(() => ({ scale: 1, x: 0, y: 0 }))

    const bindWheel = useWheel(({ offset: [, y] }) => {
        scaleApi.start({ scale: y / 1000 })
    }, { bounds: { top: 1000 }, from: () => [0, scale.get() * 1000] })

    const bindMove = useMove(({ xy: [x, y] }) => {
        scaleApi.start({ x: x, y: y })
    })

    return (
        <div className="w-full" {...bindWheel()} {...bindMove()}>
            <div className="flex justify-center">
                <div ref={imgRef}>
                    <AnimatedPrismicNextImage
                        className="relative h-screen max-w-full w-auto"
                        field={images[selected].image}
                        priority
                        style={{
                            maxHeight: "calc(100vh - 80px)",
                            transformOrigin: to([x, y], (x, y) => `${x - bounds?.x ?? 0}px ${y}px`),
                            transform: to([x, y, scale], ( x, y, s) => `scale(${s})`)
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="mr-auto">artists</div>
                <div className="flex">
                    <div className="mr-10 cursor-pointer" onClick={() => setSelected(selected === images.length - 1 ? 0 : selected + 1)}>&lt;</div>
                    <div className="cursor-pointer" onClick={() => setSelected(selected === 0 ? images.length - 1 : selected - 1)}>&gt;</div>
                </div>
                <div className="ml-auto">details</div>
            </div>
        </div>
    )
}