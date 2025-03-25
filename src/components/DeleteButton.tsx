"use client"; // Ensures this component runs on the client side

import { useState } from "react";
import deleteBooking from "@/libs/deleteBooking";
import { redirect } from "next/navigation";

export default function DeleteButton({ token, bookingId }: { token: string; bookingId: string }) {
    const [loading, setLoading] = useState(false);

    const deleteBook = async () => {
        setLoading(true);
        try {
            await deleteBooking(token, bookingId);
            console.log("Deleted Successfully");
            // Optionally: refresh the page or update state
        } catch (error) {
            console.error("Delete Failed", error);
        }
        
        setLoading(false);
        window.location.reload();
    };

    return (
        <button
            className="rounded-md bg-rose-600 hover:bg-red-700 px-3 py-2 text-white shadow-sm"
            onClick={deleteBook}
            disabled={loading}
        >
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}