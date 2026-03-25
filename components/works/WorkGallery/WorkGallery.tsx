"use client";

import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

import styles from "./WorkGallery.module.css";

type GalleryImage = {
  src: string;
  alt: string;
};

type Props = {
  images: GalleryImage[];
};

export default function WorkGallery({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = useMemo(
    () =>
      images.map((image) => ({
        src: image.src,
        alt: image.alt,
      })),
    [images],
  );

  return (
    <>
      <div className={styles.gallery}>
        {images.map((image, i) => (
          <button
            key={`${image.src}-${i}`}
            type="button"
            className={styles.item}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            aria-label={`Open image ${i + 1}`}
          >
            <img src={image.src} alt={image.alt} className={styles.image} />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Counter]}
        carousel={{ finite: slides.length <= 1 }}
        controller={{ closeOnBackdropClick: true }}
        counter={{ container: { style: { top: "20px", bottom: "auto" } } }}
        zoom={{
          maxZoomPixelRatio: 1.2,
          scrollToZoom: true,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
        }}
        on={{
          view: ({ index: currentIndex }) => setIndex(currentIndex),
        }}
        render={{
          buttonPrev: slides.length > 1 ? undefined : () => null,
          buttonNext: slides.length > 1 ? undefined : () => null,
        }}
        styles={{
          container: {
            backgroundColor: "rgba(18, 18, 18, 0.92)",
          },
        }}
      />
    </>
  );
}
