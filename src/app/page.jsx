import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import {
  getAnimeResponse,
  getNestedAnimeResponse,
  reproduce,
} from "@/libs/api-libs";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=8");
  let recommendedAnime = await getNestedAnimeResponse(
    "recommendations/anime",
    "entry"
  );
  recommendedAnime = reproduce(recommendedAnime, 4)
  
  return (
    <>
      {/* anime terpopuler */}
      <section>
        <div className="md:w-3/4 w-full mx-auto">
          <Header
            title="Paling Populer"
            linkTitle="Lihat Semua"
            linkHref="/populer"
          />
          <AnimeList api={topAnime} />
        </div>
      </section>
      <section>
        <div className="md:w-3/4 w-full mx-auto">
          <Header title="Rekomendasi" />
          <AnimeList api={recommendedAnime} />
        </div>
      </section>
    </>
  );
};

export default Page;
