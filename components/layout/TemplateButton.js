import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";

function TemplateButton({ children }) {
  const router = useRouter();
  return (
    <div className="center">
      <h2 style={{ marginBottom: 10 }}>{children}</h2>
      <Button onClick={() => router.push("/events")}>Go Back</Button>
    </div>
  );
}

export default TemplateButton;
