import { getCoinData, getTrendingCoins } from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, Activity, Layers } from 'lucide-react';

export const revalidate = 60; // ISR: Revalidate every 60 seconds
export const dynamicParams = true; // Allow other coins to be generated on demand

export async function generateStaticParams() {
    const trendingCoins = await getTrendingCoins();
    return trendingCoins.map((coin) => ({
        id: coin.item.id,
    }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const coin = await getCoinData(id);

    if (!coin) {
        return {
            title: 'Coin Not Found',
        };
    }

    return {
        title: `${coin.name} (${coin.symbol.toUpperCase()}) Price - CryptoPulse`,
        description: `Current price and stats for ${coin.name}`,
    };
}

export default async function CoinPage({ params }) {
    const { id } = await params;
    const coin = await getCoinData(id);

    if (!coin) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Coin Not Found</h1>
                <Link href="/" className="text-primary hover:underline">
                    Return Home
                </Link>
            </div>
        );
    }

    const currentPrice = coin.market_data.current_price.usd;
    const priceChange24h = coin.market_data.price_change_percentage_24h;
    const isPositive = priceChange24h > 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
                href="/"
                className="inline-flex items-center text-gray-400 hover:text-primary mb-8 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Trending
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
                        <div className="flex items-center gap-6 mb-8">
                            <img
                                src={coin.image.large}
                                alt={coin.name}
                                className="w-20 h-20 rounded-full shadow-lg shadow-primary/20"
                            />
                            <div>
                                <h1 className="text-4xl font-bold text-foreground mb-2">
                                    {coin.name} <span className="text-gray-500 text-2xl">({coin.symbol.toUpperCase()})</span>
                                </h1>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-border text-sm font-medium">
                                        Rank #{coin.market_cap_rank}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-xl bg-background/50 border border-border">
                                <div className="flex items-center gap-2 text-gray-400 mb-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span>Current Price</span>
                                </div>
                                <div className="text-3xl font-bold text-foreground">
                                    ${currentPrice.toLocaleString()}
                                </div>
                                <div className={`text-sm mt-1 font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                    {isPositive ? '+' : ''}{priceChange24h.toFixed(2)}% (24h)
                                </div>
                            </div>

                            <div className="p-6 rounded-xl bg-background/50 border border-border">
                                <div className="flex items-center gap-2 text-gray-400 mb-2">
                                    <Layers className="w-4 h-4" />
                                    <span>Market Cap</span>
                                </div>
                                <div className="text-3xl font-bold text-foreground">
                                    ${coin.market_data.market_cap.usd.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-primary" />
                            About {coin.name}
                        </h2>
                        <div
                            className="prose prose-invert max-w-none prose-a:text-primary"
                            dangerouslySetInnerHTML={{ __html: coin.description.en || 'No description available.' }}
                        />
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
                        <h3 className="text-lg font-bold mb-6 text-foreground">Market Stats</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-border/50">
                                <span className="text-gray-400">24h High</span>
                                <span className="font-mono">${coin.market_data.high_24h.usd.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-border/50">
                                <span className="text-gray-400">24h Low</span>
                                <span className="font-mono">${coin.market_data.low_24h.usd.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-border/50">
                                <span className="text-gray-400">Total Volume</span>
                                <span className="font-mono">${coin.market_data.total_volume.usd.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-border/50">
                                <span className="text-gray-400">Circulating Supply</span>
                                <span className="font-mono">{coin.market_data.circulating_supply.toLocaleString()} {coin.symbol.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-primary mt-1" />
                            <div>
                                <h4 className="font-bold text-primary mb-1">ISR Active</h4>
                                <p className="text-sm text-primary/80">
                                    This page is statically generated and revalidated every 60 seconds.
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Generated at: {new Date().toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
