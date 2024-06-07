import { subsonic } from "@/service/subsonic"

export async function homeLoader() {
  const randomSongsPromise = subsonic.songs.getRandomSongs()
  const newestAlbumsPromise = subsonic.albums.getAlbumList({ size: 16 })
  const frequentAlbumsPromise = subsonic.albums.getAlbumList({ size: 16, type: 'frequent' })
  const recentAlbumsPromise = subsonic.albums.getAlbumList({ size: 16, type: 'recent' })
  const randomAlbumsPromise = subsonic.albums.getAlbumList({ size: 16, type: 'random' })

  const [
    randomSongs,
    newestAlbums,
    frequentAlbums,
    recentAlbums,
    randomAlbums,
  ] = await Promise.all([
    randomSongsPromise,
    newestAlbumsPromise,
    frequentAlbumsPromise,
    recentAlbumsPromise,
    randomAlbumsPromise
  ])

  return {
    randomSongs,
    newestAlbums,
    frequentAlbums,
    recentAlbums,
    randomAlbums,
  }
}