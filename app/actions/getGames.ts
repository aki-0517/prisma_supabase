import prisma from '@/lib/prisma'

// 投稿一覧取得
const getGames = async () => {
  try {
    const games = await prisma.game.findMany()
    return games
  } catch (error) {
    return []
  }
}

export default getGames