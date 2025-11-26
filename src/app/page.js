import { getTrendingCoins } from '@/lib/api';
import CoinCard from '@/components/CoinCard';

export const revalidate = 60; // ISR: Revalidate this page every 60 seconds

export default async function Home() {
  const trendingCoins = await getTrendingCoins();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Trending Crypto Assets
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Discover the most searched cryptocurrencies on CoinGecko.
          Real-time updates powered by Next.js ISR.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingCoins.map((coin, index) => (
          <CoinCard key={coin.item.id} coin={coin} rank={index} />
        ))}
      </div>
    </div>
  );
}
