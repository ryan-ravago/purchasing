"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL); //server

export default function FormRequests({ serverTime }) {
  const [formRequests, setFormRequests] = useState([]);

  useEffect(() => {
    socket.on("formRequestReceive", (req) => {
      setFormRequests((prev) => [...prev, req]);
    });

    return () => socket.off("formRequestReceive");
  }, []);

  return (
    <div>
      <p className="mt-4"></p>
      <code className="text-xs">
        {formRequests.map((req, i) => (
          <p key={req.id}>{JSON.stringify(req, null, 2)}</p>
        ))}
      </code>
      <p className="mt-4">{JSON.stringify(serverTime)}</p>
    </div>
  );
}
