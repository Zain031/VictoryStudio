"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/lib/colors";
import { useTheme } from "next-themes";
import { hexToRGB } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";

const GradiantDonut = ({ height = 350 }) => {

    const [config] = useConfig();
    const { theme: mode } = useTheme();


    const series = [44, 55, 41, 17, 15];

    const options: any = {
        chart: {
            toolbar: {
                show: false,
            }
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
        },
        legend: {
            position: 'bottom',
            formatter: function (val: number, opts: any) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex]
            },
            labels: {
                colors: mode === 'light' ? colors["default-600"] : colors["default-300"]
            },
            itemMargin: {
                horizontal: 5,
                vertical: 5,
            },
            markers: {
                width: 10,
                height: 10,
                radius: 10,
                offsetX: config.isRtl ? 5 : -5
            }
        },
        stroke: {
            width: 0
        },
        tooltip: {
            theme: mode === "dark" || mode === "system" ? "dark" : "light",
        },
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    };
    return (
        <Chart
            options={options}
            series={series}
            type="donut"
            height={height}
            width={"100%"}
        />
    );
};

export default GradiantDonut;
