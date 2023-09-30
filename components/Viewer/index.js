"use client";

import { PrismicNextImage } from "@prismicio/next";
import { animated, to, useSpring } from "@react-spring/web";
import { useMove, useWheel } from "@use-gesture/react";
import Link from "next/link";
import { useState } from "react";
import useMeasure from "react-use-measure";

const AnimatedPrismicNextImage = animated(PrismicNextImage);

export default function Viewer({ images, handle }) {
    const [showDetails, setShowDetails] = useState(false)
    const [imgRef, bounds] = useMeasure()
    const [selected, setSelected] = useState(0)
    const [{ x, y, scale }, scaleApi] = useSpring(() => ({ scale: 1, x: 0, y: 0 }))

    const bindWheel = useWheel(({ offset: [, y] }) => {
        scaleApi.start({ scale: y / 1000 })
    }, { bounds: { top: 1000 }, from: () => [0, scale.get() * 1000] })

    const bindMove = useMove(({ xy: [x, y] }) => {
        scaleApi.start({ x: x, y: y })
    })
    const file = images[selected].image.url.split(/https:\/\/images.prismic.io\/wrong-site\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}_/).pop().split("?")[0]
    const title = file.split(".").slice(0, -1).join().replace(/\+/g, " ")
    const filetype = file.split(".").pop().toUpperCase()
    const dimensions = `${images[selected].image.dimensions.width}px x ${images[selected].image.dimensions.height}px`
    const info = `${dimensions} | ${filetype}`
    // console.log("img", title, images[selected])

    return (
        <div className="w-full" {...bindWheel()} {...bindMove()}>
            <div className="flex items-center justify-center">
                <div ref={imgRef}>
                    <AnimatedPrismicNextImage
                        className="relative lg:h-screen max-w-full w-auto"
                        field={images[selected].image}
                        priority
                        style={{
                            maxHeight: "calc(100vh - 52px)",
                            transformOrigin: to([x, y], (x, y) => `${x - bounds?.x ?? 0}px ${y}px`),
                            transform: to([x, y, scale], ( x, y, s) => `scale(${s})`)
                        }}
                    />
                </div>
            </div>
            <div className="flex lg:flex-col w-full lg:w-auto justify-between lg:justify-start items-start absolute pr-[40px] lg:pr-0 left-[20px] bottom-[20px] lg:bottom-[80px]">
                {showDetails && (
                    <div className="absolute bottom-[40px] lg:static bg-[#F7F7F6] mb-[20px] max-w-[435px]">
                        <div className="mb-[20px]">{title}</div>
                        <div>{info}</div>
                        <Link target="_blank" className="inline lg:hidden border-b border-b-[#000] mb-1" href={`https://www.instagram.com/${handle}`}>@{handle}</Link>
                    </div>
                )}
                <div className="cursor-pointer border-b border-b-[#000] mb-1" onClick={() => setShowDetails(d => !d)}>{showDetails ? "close" : "details"}</div>
                <Link target="_blank" className="hidden lg:block border-b border-b-[#000] mb-1" href={`https://www.instagram.com/${handle}`}>@{handle}</Link>
                <Link className="hidden lg:block border-b border-b-[#000] mb-1" href="/">artists</Link>
                <div className="flex">
                    <div className="cursor-pointer" onClick={() => setSelected(selected === images.length - 1 ? 0 : selected + 1)}>&lt;</div>
                    <div className="ml-10 cursor-pointer" onClick={() => setSelected(selected === 0 ? images.length - 1 : selected - 1)}>&gt;</div>
                </div>
            </div>
        </div>
    )
}