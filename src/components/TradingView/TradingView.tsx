import React, { useEffect, useRef, memo } from "react";

const TradingViewWidget: React.FC = () => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: "BINANCE:BTCUSDT",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "2",
            locale: "en",
            enable_publishing: false,
            backgroundColor: "rgba(0, 0, 0, 1)",
            hide_top_toolbar: true,
            hide_legend: true,
            save_image: false,
            hide_volume: true,
            support_host: "https://www.tradingview.com",
        });

        if (container.current) {
            container.current.appendChild(script);
        }

        // Optional: Clean up the script when the component unmounts
        return () => {
            if (container.current) {
                container.current.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright">
                <a
                    href="https://www.tradingview.com/"
                    rel="noopener noreferrer"
                    target="_blank">
                    <span className="blue-text">
                        Track all markets on TradingView
                    </span>
                </a>
            </div>
        </div>
    );
};

export default memo(TradingViewWidget);
