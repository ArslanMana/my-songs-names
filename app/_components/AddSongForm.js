"use client";
import { useState } from "react";
import { toast} from "react-toastify";
import { useRouter } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";

export default function AddSongForm({  }) {
  const [songName, setSongName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // for inline error
   const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error

    if (!songName.trim()) {
      setError("Song name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/favorites/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songName: songName.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add song");
      } else {
         router.refresh();
        toast.success("Song added to favorites!");
        setSongName("");
    
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 mt-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter song name..."
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 transition
              ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </form>

   
    </>
  );
}
