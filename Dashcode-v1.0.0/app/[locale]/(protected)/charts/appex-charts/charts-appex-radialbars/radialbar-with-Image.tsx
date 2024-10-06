"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { colors } from "@/lib/colors";
import { useTheme } from "next-themes";
import { hexToRGB } from "@/lib/utils";
import { useConfig } from "@/hooks/use-config";

const RadialBarWithImage = ({ height = 350 }) => {
  const [config] = useConfig();
  const { theme: mode } = useTheme();


  const series = [67];

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "70%",
          image: "/images/chart/rocket.png",
          imageWidth: 64,
          imageHeight: 64,
          imageClipped: false,
        },
        dataLabels: {
          name: {
            show: false,
            color: "#fff",
          },
          value: {
            show: true,
            color: mode === 'light' ? colors["default-600"] : colors["default-300"],
            offsetY: 70,
            fontSize: "22px",
          },
        },
      },
    },
    fill: {
      type: "image",
      image: {
        src: ["/images/chart/paint.png"],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Volatility"],
    colors: [
      colors.success,
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type="radialBar"
      height={height}
      width={"100%"}
    />
  );
};

export default RadialBarWithImage;
