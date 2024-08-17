import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const Page = async ({ params }) => {
  const { keyword } = params;
  const decodedKeyword = decodeURI(keyword);

  const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`);

  return (
    <>
      <section>
        <div className="md:w-3/4 w-full mx-auto">
          <Header title={`Pencarian untuk ${decodedKeyword}...`} />
          <AnimeList api={searchAnime} />
        </div>
      </section>
    </>
  );
};

export default Page;
