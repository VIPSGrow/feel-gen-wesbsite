import Cookies from "js-cookie";

// API Configuration
// export const host: string =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const host: string =
  process.env.NEXT_PUBLIC_API_URL || "https://backend.feelsafeco.in";

// Helper to check for FormData
const isFormData = (body: any): body is FormData => {
  return body instanceof FormData;
};

export const isUri = (string: unknown): boolean => {
  if (typeof string !== "string") {
    return false;
  }
  return (
    string.startsWith("http") ||
    string.startsWith("https") ||
    string.startsWith("ftp") ||
    string.startsWith("file")
  );
};

export const formattedAmountCommas = (value: number): string => {
  let amount: string = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return amount;
};

export const formattedAmount = (value: number): string => {
  let amount: string = "";

  if (value >= 1e5) {
    amount = formatInIndianUnits(value);
  } else {
    amount = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return amount;
};

export function formatInIndianUnits(amount: number | string): string {
  const numAmount = Number(amount);

  if (numAmount >= 1e7) {
    return (numAmount / 1e7).toFixed(2) + " Cr";
  } else if (numAmount >= 1e5) {
    return (numAmount / 1e5).toFixed(2) + " Lakh";
  } else if (numAmount >= 1e3) {
    return (numAmount / 1e3).toFixed(2) + "K";
  } else {
    return numAmount.toLocaleString("en-IN");
  }
}

export const getCurrencyIcon = (value: string): string => {
  return value === "INR" ? "₹" : "";
};

export const date_formate = (isoDate: string | Date): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB"); // "15/07/2025"
};

export const time_format = (isoDate: string | Date): string => {
  const date = new Date(isoDate);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export const time_diff = (
  isoDate1: string | Date,
  isoDate2: string | Date,
  s_time: string | null = null,
  e_time: string | null = null,
): string => {
  const date1 = new Date(isoDate1).getTime();
  const date2 = new Date(isoDate2).getTime();

  let diffMs = Math.abs(date2 - date1);
  let totalMins = diffMs / (1000 * 60);

  if (s_time) {
    totalMins += parseFloat(s_time.replace("mins", "").trim());
  }
  if (e_time) {
    totalMins += parseFloat(e_time.replace("mins", "").trim());
  }

  const diffHrs = Math.floor(totalMins / 60);
  const diffMins = Math.floor(totalMins % 60);

  return `${diffHrs} hr ${diffMins} min`;
};

// Types for Button Props
interface CustomButtonProps {
  children: React.ReactNode;
  color: any; // Ideally use specific MUI color types if using MUI
  variant: string;
  sx?: object;
  startIcon?: React.ReactNode;
  size?: string;
}

export const buttonProps = (
  children: React.ReactNode,
  color: any,
  variant: string,
  sx: object,
  icon?: React.ReactNode,
  size?: string,
): CustomButtonProps => ({
  children,
  color,
  variant,
  sx,
  startIcon: icon || null,
  size,
});

/**
 * Main Server Call Function
 */
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ErrorResponse {
  status: boolean;
  e_code?: number;
  message: string;
  data?: null;
}
// Isme 'undefined' ko add karein
export type BodyData =
  | Record<string, string | number | boolean | null | undefined>
  | FormData
  | null;

const serverCallFuction = async (
  method: HttpMethod = "GET",
  endPoints: string = "",
  body: BodyData = null,
): Promise<Record<string, unknown> | ErrorResponse> => {
  try {
    const storedToken =
      typeof window !== "undefined" ? Cookies.get("token") : "N/A";
    const token = storedToken ? `Bearer ${storedToken}` : "";
    // console.log('token - ', token);

    const headers: Record<string, string> = {};

    if (token) {
      headers["Authorization"] = token;
    }

    if (body && !isFormData(body)) {
      headers["Content-Type"] = "application/json";
    } else if (!body) {
      headers["Content-Type"] = "application/json";
    }

    const requestOptions: RequestInit = {
      method: method,
      headers: headers,
      body: body ? (isFormData(body) ? body : JSON.stringify(body)) : null,
    };

    const response = await fetch(`${host}/${endPoints}`, requestOptions);
    const contentType = response.headers.get("content-type");

    let dataresp: any = null;

    if (contentType && contentType.includes("application/json")) {
      const text = await response.text();
      dataresp = text ? JSON.parse(text) : {};
    }

    if (response.ok) {
      return dataresp;
    } else {
      return {
        status: false,
        e_code: response.status,
        message:
          dataresp?.message || dataresp?.error || "Something went wrong!",
      };
    }
  } catch (e: any) {
    console.log("error in calling endpoint - ", e);
    return {
      status: false,
      message: e.message || "Something went wrong",
      data: null,
    };
  }
};

export default serverCallFuction;

// Base64 Helpers (Note: Buffer is Node-only, use btoa/atob for Browser)
export const Decode64 = (encoded: string): string => {
  return Buffer.from(encoded, "base64").toString("utf-8");
};

export const Endcode64 = (string: string): string => {
  return Buffer.from(string).toString("base64");
};
