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
    try {
      const token = await getToken();
      const response = await axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
        headers: {
          Authorization: token,
        },
      });

      // Check if response.data is an array (direct websites array)
      if (Array.isArray(response.data)) {
        setWebsites(response.data);
      }
      // Check if response.data.websites exists (websites property in response)
      else if (response.data && response.data.websites) {
        setWebsites(response.data.websites);
      }
      // Fallback to empty array if neither format is found
      else {
        setWebsites([]);
      }
    } catch (error) {
      console.error("Failed to fetch websites:", error);
      setWebsites([]); // Set to empty array on error
    }
  }

  useEffect(() => {
    // Initial fetch
    refreshWebsites();

    // Set up interval for periodic fetching
    const interval = setInterval(
      () => {
        refreshWebsites();
      },
      1000 * 60 * 1 // Every minute
    );

    return () => clearInterval(interval);
  }, []);

  return { websites, refreshWebsites };
}
