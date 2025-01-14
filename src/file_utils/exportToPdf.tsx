import {createRoot} from "react-dom/client"
import {Provider} from "react-redux"
import {store} from "../store/redux/store.ts"
import {SlideView} from "../view/Slide/SlideView.tsx"
import {Presentation} from "../store/objects.ts"
import {WORK_AREA_SCALE} from "../store/default_data/scale.ts"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import React from "react"

const renderComponentToContainer = (
    props = {},
    container
) => {
    return new Promise((resolve) => {
        const root = createRoot(container);
        root.render(
            <Provider store={store}>
                <SlideView
                    {...props}
                    onRenderComplete={() => resolve(root)}
            />
            </Provider>
        );
    });
}

const exportToPdf = async (presentation: Presentation) => {
    const slideSize = {
        x: 1920 * WORK_AREA_SCALE,
        y: 1080 * WORK_AREA_SCALE
    }
    const slides = presentation.slides
    const pdf = new jsPDF('l', 'px', [slideSize.x, slideSize.y])

    for (const [index, slide] of slides.entries()) {

        const slideContainer = document.createElement("div")
        slideContainer.style.position = 'absolute';
        slideContainer.style.top = '-10000px';
        slideContainer.style.left = '-10000px';
        slideContainer.style.width = `${slideSize.x}px`
        slideContainer.style.height = `${slideSize.y}px`
        document.body.appendChild(slideContainer)

        const root = await renderComponentToContainer({
            scale: WORK_AREA_SCALE,
            background: slide.background,
            content: slide.content,
        }, slideContainer)

        if (index > 0) {
            pdf.addPage()
        }

        const canvas = await html2canvas(slideContainer, {
            useCORS: true,
            scale: WORK_AREA_SCALE * 2,
        })

        const imgData = canvas.toDataURL('image/png')

        pdf.setFont('courier', 'italic')
        pdf.addImage(
            imgData,
            'PNG',
            0,
            0,
            slideSize.x,
            slideSize.y
        )
    }
    pdf.save(presentation.title);
}

export {
    exportToPdf,
}