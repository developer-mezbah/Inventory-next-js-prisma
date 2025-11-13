"use client"
import { useFetchData } from "@/hook/useFetchData";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <Link href="/inventory" className="p-4 bg-blue-500 text-white rounded-xl">Go to the Inventory</Link>
    </div>
  );
}
