import Button from "../../../components/common/Button/Button";
import Container from "../../../components/layout/Container/Container";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";

function Hero() {
  const [imgIndex, setImgIndex] = useState(0);

  const {
    data: imagesData,
    error,
    isLoading,
  } = useFetch("https://api.slingacademy.com/v1/sample-data/photos?limit=3");

  const images = imagesData?.photos || [];
  const goToImg = (i) => {
    setImgIndex(i);
  };

  if (isLoading) {
    return (
      <section className="relative h-[calc(100vh-64px)] bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#71F8E4] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hero images...</p>
        </div>
      </section>
    );
  }

  if (error || !images) {
    return (
      <section className="relative h-[calc(100vh-64px)] bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl">Failed to load images</p>
          <p className="text-sm text-gray-400 mt-2">"No images available</p>
        </div>
      </section>
    );
  }
  return (
    <section
      className="relative h-[calc(100vh-64px)] bg-white bg-cover bg-center bg-no-repeat overflow-hidden transition-all"
      style={{
        backgroundImage: `url(${images[imgIndex]?.url || images[0]?.url})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <Container>
        <div className="absolute z-10 top-1/4 mx-11 sm:mt-20">
          <h4 className="text-[#71F8E4] leading-6 tracking-tight mb-6">
            COMMUNITY EVENT
          </h4>
          <h1 className="text-white text-5xl font-extrabold mb-4">
            Join the Next Dev Meetup
          </h1>
          <p className="text-white text-[18px] mb-12">
            Connect with local engineers and architects in San Francisco.
            Sessions on Rust, Kubernetes, and WebAssembly.
          </p>
          <Button>Learn More &rarr;</Button>
        </div>
      </Container>

      <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToImg(i)}
            className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
              i === imgIndex ? "w-8 bg-[#71F8E4]" : "w-3 bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default Hero;
