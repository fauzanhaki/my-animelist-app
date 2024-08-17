import { getAnimeResponse } from "@/libs/api-libs";
import VideoPlayer from "@/components/Utilities/VideoPlayer";
import Image from "next/image";
import CollectionButton from "@/components/AnimeList/CollectionButton";
import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import CommentInput from "@/components/AnimeList/CommentInput";
import CommentBox from "@/components/AnimeList/CommentBox";

const Page = async ({ params: { id } }) => {
  const anime = await getAnimeResponse(`anime/${id}`);
  const user = await authUserSession();
  const collection = await prisma.collection.findFirst({
    where: { user_email: user?.email, anime_mal_id: id },
  });

  return (
    <div className="w-full mx-auto md:w-3/4">
      <div className="px-4 pt-4">
        <h3 className="text-2xl text-color-primary">
          {anime.data.title} - {anime.data.year}
        </h3>
        {!collection && user && (
          <CollectionButton
            anime_mal_id={id}
            user_email={user?.email}
            anime_image={anime.data.images.webp.image_url}
            anime_title={anime.data.title}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-2 px-4 pt-4 overflow-x-auto text-color-primary">
        <div className="flex items-center justify-center gap-4 px-4 py-1 border-2 rounded-xl border-color-gray-400">
          <h3>PERINGKAT</h3>
          <p>{anime.data.rank}</p>
        </div>
        <div className="flex items-center justify-center gap-4 px-4 py-1 border-2 rounded-xl border-color-gray-400">
          <h3>SKOR</h3>
          <p>{anime.data.score}</p>
        </div>
        <div className="flex items-center justify-center gap-4 px-4 py-1 border-2 rounded-xl border-color-gray-400">
          <h3>ANGGOTA</h3>
          <p>{anime.data.members}</p>
        </div>
        <div className="flex items-center justify-center gap-4 px-4 py-1 border-2 rounded-xl border-color-gray-400">
          <h3>EPISODE</h3>
          <p>{anime.data.episodes}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 px-4 pt-4 mx-auto sm:flex-nowrap text-color-primary">
        <Image
          src={anime.data.images.webp.image_url}
          alt={anime.data.images.jpg.image_url}
          width={250}
          height={250}
          className="object-cover w-full rounded-md"
        />
        <p className="text-xl text-justify">{anime.data.synopsis}</p>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-2xl text-color-primary">Komentar Penonton</h3>
        <CommentBox anime_mal_id={id} />
        {user && (
          <CommentInput
            anime_mal_id={id}
            user_email={user?.email}
            user_name={user?.name}
            anime_title={anime.data.title}
          />
        )}
      </div>
      <div>
        <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
      </div>
    </div>
  );
};

export default Page;
