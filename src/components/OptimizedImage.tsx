import { FC, useState } from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";

export type OptimizedImageProps = {
  image: { name: string; blurhash: string; url: string };
};

export const OptimizedImage: FC<OptimizedImageProps> = (props) => {
  const { image } = props;

  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    setLoadStarted(true);
  };

  return (
    <div className="block relative h-48 rounded ">
      <LazyLoadImage
        key={image.name}
        src={image.url}
        className="object-cover object-center !h-full !w-full block"
        onLoad={handleLoad}
        beforeLoad={handleLoadStarted}
      />
      {!isLoaded && isLoadStarted && (
        <div className="absolute z-20 top-0 left-0 w-full h-full">
          <Blurhash
            className="object-cover object-center !h-full !w-full"
            hash={image.blurhash}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}
    </div>
  );
};
