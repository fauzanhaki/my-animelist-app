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
  recommendedAnime = reproduce(recommendedAnime, 4);

  return (
    <div className="bg-color-gray-900">
      {/* anime terpopuler */}
      <section>
        <div className="w-full mx-auto md:w-3/4">
          <Header
            title="Paling Populer"
            linkTitle="Lihat Semua"
            linkHref="/populer"
          />
          <AnimeList api={topAnime} />
        </div>
      </section>
      <section>
        <div className="w-full mx-auto md:w-3/4">
          <Header title="Rekomendasi" />
          <AnimeList api={recommendedAnime} />
        </div>
      </section>
    </div>
  );
};

export default Page;
