"use client";

import { Routes } from "@/lib/constants";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function LogoutPage() {
  const [statusMessage, setStatusMessage] = useState("");

  const controller = new AbortController();

  useEffect(() => {
    const logout = async () => {
      setStatusMessage("");

      try {
        const response = await axios.post(`${Routes.API_LOGOUT}`, {
          signal: controller.signal,
        });

        if (response.statusText !== "OK") {
          throw new Error("Възникна грешка. Моля опитайте отново");
        }

        if (response.data.statusCode !== 200) {
          throw new Error(
            "Неуспешен изход от системата. Моля опитайте отново като презаредите страницата"
          );
        }

        setStatusMessage(response.data.message);
      } catch (error) {
        const e = error as AxiosError;
        setStatusMessage(e.message);
      }

      setTimeout(() => {
        controller.abort();
      }, 5000);
    };

    logout();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{statusMessage}</div>;
}
