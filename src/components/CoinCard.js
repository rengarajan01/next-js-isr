"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function CoinCard({ coin, rank }) {
    return (
        <Link href={`/coin/${coin.item.id}`}>
            <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-colors relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp className="w-24 h-24 text-primary" />
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                            #{rank + 1}
                        </span>
                        <img
                            src={coin.item.small}
                            alt={coin.item.name}
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-border text-gray-400">
                        Rank #{coin.item.market_cap_rank}
                    </span>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-foreground">{coin.item.name}</h3>
                    <p className="text-sm text-gray-400">{coin.item.symbol}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-sm text-gray-400">Price (BTC)</span>
                    <span className="font-mono text-primary">
                        {coin.item.price_btc.toFixed(8)}
                    </span>
                </div>
            </motion.div>
        </Link>
    );
}
