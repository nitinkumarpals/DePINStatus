"use client";
import { API_BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
interface Website {
  id: string;
  url: string;
  ticks: {
    id: string;
    createdAt: Date;
    status: string;
    latency: number;
  }[];
}
export function useWebsite() {
  const { getToken } = useAuth();
  const [websites, setWebsites] = useState<Website[]>([]);

  async function refreshWebsites() {
    const token = await getToken();
    const response = await axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
      headers: {
        Authorization: token,
      },
    });
    setWebsites(response.data.websites);
  }
  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshWebsites();
      },
      1000 * 60 * 1
    );
    return () => clearInterval(interval);
  }, []);
  return {websites, refreshWebsites};
}
