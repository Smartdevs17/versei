import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, Chart, ChartData, ChartOptions } from 'chart.js';

interface PriceDataPoint {
    timestamp: string;
    price: number;
}

interface OverviewTabProps {
    priceDataPoints: PriceDataPoint[];
}

const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
        },
    },
    scales: {
        x: {
            display: true,
            title: {
                display: false,
            },
        },
        y: {
            display: true,
            title: {
                display: false,
            },
            beginAtZero: false,
        },
    },
};

const OverviewTab: React.FC<OverviewTabProps> = ({ priceDataPoints }) => {
    const chartRef = useRef<Chart<'line'> | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Prepare chart data
    const priceData: ChartData<'line'> = {
        labels: priceDataPoints.map((point) => point.timestamp),
        datasets: [
            {
                label: 'Price',
                data: priceDataPoints.map((point) => point.price),
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    useEffect(() => {
        // Cleanup previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }

        // Create new chart instance if canvas is available
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                chartRef.current = new ChartJS(ctx, {
                    type: 'line',
                    data: priceData,
                    options: chartOptions,
                });
            }
        }

        // Cleanup on unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [priceDataPoints]); 

    return (
        <>
            <h2 className="text-lg font-semibold mb-4">PRICE</h2>
            <div className="w-full h-64">
                <canvas ref={canvasRef} />
            </div>
        </>
    );
};

export default OverviewTab;