import { FC, useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { Gallery } from "../components/Gallery";
import Fuse from "fuse.js";
import { useAxios } from "../api/useAxios";
import { PhotoType } from "../components/photos.type";

type handleFuseSearchType = Fuse.IFuseOptions<never> | undefined;

type linkType = {
  id: number;
  name: string;
  select: string;
};

type configType = {
  links: linkType[];
  navLink: linkType[];
};

export const AdminPage: FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [allPhotos, setAllPhotos] = useState<PhotoType[]>([]);
  const [listPhotos, setListPhotos] = useState<PhotoType[]>([]);
  const [linkActive, setLinkActive] = useState<number>(1);
  const config: configType = {
    links: [
      {
        id: 1,
        name: "All",
        select: "",
      },
      {
        id: 2,
        name: "New",
        select: "architecture",
      },
      {
        id: 3,
        name: "Nature",
        select: "nature",
      },
    ],

    navLink: [
      {
        id: 1,
        name: "matches",
        select: "",
      },
      {
        id: 2,
        name: "images",
        select: "",
      },
      {
        id: 3,
        name: "cases",
        select: "",
      },
      {
        id: 4,
        name: "takedowns",
        select: "",
      },
      {
        id: 5,
        name: "register",
        select: "",
      },
    ],
  };

  const [query, setQuery] = useState("");
  const axios = useAxios();

  const handleChangeFilter = (currentFilter: string, id: number) => {
    console.log({ currentFilter });
    setFilter(currentFilter);
    setLinkActive(id);
  };

  const handleFuseSearch = (
    arrayPhoto: never[],
    query: string,
    options: handleFuseSearchType
  ) => {
    const fuse = new Fuse(arrayPhoto, options);

    if (query) {
      const results = fuse.search(query);
      console.log({ results });
      setListPhotos(results.map((result) => result.item));
    } else {
      setListPhotos(allPhotos);
    }
  };

  const handleOnSeach = (e: any) => {
    const { value } = e.currentTarget;
    setQuery(value);
    handleFuseSearch(allPhotos as never[], value, {
      keys: ["topic", "url", "description", "user", "id"],
      includeScore: true,
      includeMatches: true,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowSpinner(true);
        const listPhotos = await axios.get("/api/v1/photos");
        const res = listPhotos.data;
        setAllPhotos(res.data);
        setListPhotos(res.data);
      } catch (error) {
        console.log(error);
      }
      setShowSpinner(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
        {/* fix width */}
        <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
          <div className="sticky top-0 w-full">
            <ul
              className="flex sm:flex-col overflow-hidden content-center 
            items-center bg-gray-200"
            >
              <li className="block w-full">
                <button className="items-center p-2 text-lg font-bold text-white bg-blue-500 block w-full ">
                  <span className="p-2">Pixsi</span>
                </button>
              </li>
              {config.navLink.map((link) => (
                <li key={link.id}>
                  <button
                    className="flex flex-col items-center p-4 text-sm"
                    onClick={() => alert("in progress")}
                  >
                    <FaLink className="inline-block w-6 h-6 " />
                    <span className="p-2 uppercase  tracking-wider">
                      {link.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full h-full flex-grow p-3 overflow-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div
              className="w-full shadow-md hover:shadow-lg focus:shadow-lg"
              role="group"
            >
              {config.links.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleChangeFilter(link.select || "", link.id)}
                  className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center 
        sm:justify-start border-b-2 
        title-font font-medium 
        inline-flex items-center leading-none 
         ${
           linkActive === link.id
             ? "border-indigo-500 text-indigo-500 bg-gray-100"
             : "border-gray-200"
         }
        hover:border-indigo-500 hover:text-indigo-500 hover:bg-gray-100
        active:border-indigo-500 active:text-indigo-500 active:bg-gray-100
        focus:border-indigo-500 focus:text-indigo-500 focus:bg-gray-100
        rounded-t
         tracking-wider`}
                >
                  {linkActive === link.id && (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-3 h-3 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  )}
                  {link.name}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center mt-10 sm:mt-0">
              <div className="flex border-2 rounded">
                <input
                  value={query}
                  onChange={handleOnSeach}
                  type="text"
                  className="px-4 py-2 max-w-80 w-full"
                  placeholder="Search..."
                />
                <button className="flex items-center justify-center px-4 border-l">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div>
            <Gallery
              filter={filter}
              isLoading={showSpinner}
              list={listPhotos}
            />
          </div>
        </div>
      </div>
      <footer className="mt-auto">@Copyright Lucian Crisan</footer>
    </>
  );
};
