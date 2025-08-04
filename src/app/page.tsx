"use client";
import Chart from "@/components/Chart";
import { useEffect, useState } from "react";

interface ChartEntry {
  title: string;
  data: [number, number | number[] | null][];
}
export default function Home() {
  const [charts, setCharts] = useState<ChartEntry[]>([]);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("مشکل در دریافت فایل");
        return res.json();
      })
      .then((json) => {
        if (!Array.isArray(json)) throw new Error("فرمت JSON اشتباه است");
        setCharts(json);
      })
      .catch((err) => {
        console.error("خطا:", err.message);
      });
  }, []);
  return (
    <div
      style={{
        marginTop: "50px",
        marginBottom: "50px",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {charts.map((chart, idx) => (
        <Chart key={idx} chart={chart} />
      ))}
    </div>
  );
}
