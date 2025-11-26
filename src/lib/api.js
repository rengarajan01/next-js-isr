const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function getTrendingCoins() {
    try {
        const res = await fetch(`${BASE_URL}/search/trending`, {
            next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
        });

        if (!res.ok) {
            throw new Error('Failed to fetch trending coins');
        }

        const data = await res.json();
        return data.coins;
    } catch (error) {
        console.error('Error fetching trending coins:', error);
        return [];
    }
}

export async function getCoinData(id) {
    try {
        const res = await fetch(`${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, {
            next: { revalidate: 60 }, // ISR: Revalidate every 60 seconds
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error('Failed to fetch coin data');
        }

        return await res.json();
    } catch (error) {
        console.error(`Error fetching data for coin ${id}:`, error);
        return null;
    }
}
