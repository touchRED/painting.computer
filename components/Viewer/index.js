"use client";

import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { animated, to, useSpring } from "@react-spring/web";
import { useMove, useWheel } from "@use-gesture/react";
import { useState } from "react";
import useMeasure from "react-use-measure";

const AnimatedPrismicNextImage = animated(PrismicNextImage);

export default function Viewer({ image }) {
    const [imgRef, bounds] = useMeasure()
    const [selected] = useState(0)
    const [{ x, y, scale }, scaleApi] = useSpring(() => ({ scale: 1, x: 0, y: 0 }))

    const bindWheel = useWheel(({ offset: [, y] }) => {
        scaleApi.start({ scale: y / 1000 })
    }, { bounds: { top: 1000 }, from: () => [0, scale.get() * 1000] })

    const bindMove = useMove(({ xy: [x, y] }) => {
        scaleApi.start({ x: x, y: y })
    })

    return (
        <div className="w-full" {...bindWheel()} {...bindMove()}>
            {/* {data.images.map((img, i) => (
                <div className="flex flex-col items-center" key={i}>
                <PrismicNextImage
                    className="relative w-6/12"
                    field={img.image}
                    alt="Hero"
                    priority
                />
                <PrismicRichText field={img.description} />
                </div>
            ))} */}
            <div className="flex justify-center">
                <div ref={imgRef}>
                    <AnimatedPrismicNextImage
                        className="relative h-screen max-w-full w-auto"
                        field={image}
                        priority
                        style={{
                            maxHeight: "calc(100vh - 80px)",
                            transformOrigin: to([x, y], (x, y) => `${x - bounds?.x ?? 0}px ${y}px`),
                            transform: to([x, y, scale], ( x, y, s) => `scale(${s})`)
                        }}
                    />
                </div>
                {/* <PrismicRichText field={data.images[selected].description} /> */}
            </div>
            {/* {data.handle} */}
        </div>
    )
}