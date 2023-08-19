import getGames from "../actions/getGames";

export default async function GamesPage() {

    const games = await getGames();
    
    if (games.length === 0) {
        return <div className="text-center">リザルトはありません</div>
      }
    return (
        <div>
            <div>
                {games.map((game, index) => (
                    <div key={index}>{game.comment}</div>
                ))}
            </div>
        </div>
    )
}