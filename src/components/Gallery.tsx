import { FC, useDeferredValue, useEffect, useState } from "react";
import { OptimizedImage } from "./OptimizedImage";
import { PhotoType } from "./photos.type";
import { Spinner } from "./Spinner";

type GalleryType = {
  filter: string;
  list: PhotoType[];
  isLoading: boolean;
};

export const Gallery: FC<GalleryType> = ({
  filter = "",
  list,
  isLoading = false,
}) => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [allPhotos, setAllPhotos] = useState<PhotoType[]>([]);
  const [showSpinner, setShowSpinner] = useState(isLoading);

  const sortByCateg = (photos: PhotoType[], filter: string) => {
    if (filter === "") return photos;
    const res = photos.filter((photo: PhotoType) =>
      photo.topics.includes(filter)
    );
    return res;
  };

  useEffect(() => {
    setShowSpinner(isLoading);
    setAllPhotos(list);
    setPhotos(sortByCateg(list, filter));
  }, [list, isLoading]);

  useEffect(() => {
    setShowSpinner(true);
    setPhotos(sortByCateg(allPhotos, filter));
    setShowSpinner(false);
  }, [filter]);

  const deferredPhotos = useDeferredValue(photos);

  console.log("Filter", { photos });
  return (
    <section className="overflow-hidden text-gray-700 ">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-wrap -m-4">
          {showSpinner ? (
            <div className="m-auto">
              <Spinner />
            </div>
          ) : (
            <>
              {deferredPhotos.map((photo) => (
                <div className="lg:w-1/4 p-4 w-1/2" key={`photo-${photo.id}`}>
                  <OptimizedImage
                    image={{
                      name: photo.id,
                      blurhash: "LEHV6nWB2yk8pyo0adR*.7kCMdnj",
                      url: photo.url,
                    }}
                  ></OptimizedImage>
                  <div className="mt-4 text-left">
                    <h3 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {photo.user}
                    </h3>
                    <h2 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {photo.id}
                    </h2>
                    <p className="mt-1 italic text-justify">
                      {photo.description}
                    </p>
                    <div className="mt-3">
                      <h4 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        CATEGORY
                      </h4>
                      <div className="flex items-center flex-wrap ">
                        {photo.topics.map((topic: string) => (
                          <span
                            className="text-gray-400 inline-flex items-center leading-none text-sm mr-1"
                            key={topic}
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {photos.length === 0 && !showSpinner && <p>No photos found.</p>}
        </div>
      </div>
    </section>
  );
};
