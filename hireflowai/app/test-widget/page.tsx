"use client"; // Ensure this is at the very top of your file

import { useEffect, useState } from "react";
import Script from "next/script";

export default function TestWidget() {
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    // This hook only runs in the browser, making window safe to use
    setOrigin(window.location.origin);
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>
        Testing HireFlow Widget
        <br />
        cmspy0fix0006sztwxvi0h3wy
      </h1>

      {/* Safely render the origin only after it is captured */}
      {origin && <h1 style={{ color: "#2563eb" }}>Origin: {origin}</h1>}

      <div id="hireflow-widget"></div>

      <Script
        src="http://localhost:3000/widget.js"
        data-widget-id="cmspy0fix0006sztwxvi0h3wy"
      />
    </div>
  );
}
