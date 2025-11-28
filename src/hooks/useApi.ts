import { useCallback, useState } from "react";
import type { Wish } from "../contexts/WishlistContext";

const BASE_URL = "http://localhost:3000";

export function useApi() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      try {
        setError(null);
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}/${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setError(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const get = useCallback(
    (endpoint: string, options = {}) => {
      return request(endpoint, { ...options, method: "GET" });
    },
    [request]
  );

  const post = useCallback(
    (endpoint: string, body: Wish, options = {}) => {
      return request(endpoint, {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    [request]
  );

  const put = useCallback(
    (endpoint: string, body: Wish, options = {}) => {
      return request(endpoint, {
        ...options,
        method: "PUT",
        body: JSON.stringify(body),
      });
    },
    [request]
  );

  const del = useCallback(
    (endpoint: string, options = {}) => {
      return request(endpoint, { ...options, method: "DELETE" });
    },
    [request]
  );

  const reset = useCallback(() => {
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    request,
    get,
    post,
    put,
    del,
    reset,
  };
}
