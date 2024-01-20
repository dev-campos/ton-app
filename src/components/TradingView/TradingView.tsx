import React, { useRef, useEffect } from "react";
import { ColorType, createChart } from "lightweight-charts";

export const TradingViewChart: React.FC = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartContainerRef.current) {
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 300,
                layout: {
                    background: { type: ColorType.Solid, color: "#ffffff" },
                    textColor: "#333",
                },
                grid: {
                    vertLines: {
                        color: "#e1ecf1",
                    },
                    horzLines: {
                        color: "#e1ecf1",
                    },
                },
            });

            const lineSeries = chart.addLineSeries();
            lineSeries.setData([
                { time: "2019-04-11", value: 80.01 },
                { time: "2019-04-12", value: 96.63 },
                // ... more data
            ]);

            return () => {
                chart.remove();
            };
        }
    }, []);

    return <div ref={chartContainerRef} />;
};
