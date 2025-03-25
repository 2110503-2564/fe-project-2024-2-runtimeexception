import { DentistJson } from "../../interfaces";

const getDentists = async () => {
    try {
        const res = await fetch(`https://backendforfrontend.vercel.app/api/v1/dentists`, {
            method: "GET",
            cache: "no-store", // Add no-store to disable cache
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch dentists: ${res.status} ${res.statusText}`);
        }

        const data: DentistJson = await res.json();
        console.log("Dentists Data:", data); // Log the data
        return data;
    } catch (error) {
        console.error("Error fetching dentists:", error);
        return null;
    }
};

export default getDentists;
 