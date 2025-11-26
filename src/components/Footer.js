export default function Footer() {
    return (
        <footer className="bg-card border-t border-border mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} CryptoPulse. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <span className="text-gray-500 text-sm">Powered by</span>
                        <a
                            href="https://www.coingecko.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-cyan-400 text-sm font-medium transition-colors"
                        >
                            CoinGecko
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
