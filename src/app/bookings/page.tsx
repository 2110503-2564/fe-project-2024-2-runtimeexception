import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/db/dbConnect";
import Booking from "@/db/models/Booking";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

export default async function BookingPage() {


    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/api/auth/signin");
    }

    const createBooking = async (formData: FormData) => {
        "use server";
        const bookDate = formData.get("bookDate") as string;
        const bookTime = formData.get("bookTime") as string;
        const dentist = formData.get("dentist") as string;
        const user = session.user.name;
        const createAt = dayjs().format("YYYY-MM-DD HH:mm:ss");

        try {
            await dbConnect();
            await Booking.create({
                bookDate,
                bookTime,
                user,
                dentist,
                createAt,
            });
        } catch (error) {
            console.error("Booking Error:", error);
        }

        revalidateTag("bookings");
        redirect("/yourbook");
    };

    return (
        <main className="bg-slate-100 flex items-center justify-center min-h-screen p-5">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <div className="text-xl font-medium text-center mb-4">New Booking</div>
                <form action={createBooking} className="flex flex-col items-center">
                    <input type="hidden" name="createAt" value={dayjs().format("YYYY-MM-DD HH:mm:ss")} />
                    
                    <div className="w-full my-2">
                        <label className="block text-gray-700" htmlFor="user">User</label>
                        <input type="text" id="user" name="user" value={session.user.name} 
                            className="bg-gray-200 border-2 rounded w-full p-2 text-gray-700"
                            disabled />
                    </div>

                    <div className="w-full my-2">
                        <label className="block text-gray-700" htmlFor="dentist">Dentist</label>
                        <input type="text" id="dentist" name="dentist" 
                            className="border-2 rounded w-full p-2 text-gray-700"
                             />
                    </div>

                    <div className="w-full my-2">
                        <label className="block text-gray-700" htmlFor="bookDate">Booking Date</label>
                        <input type="date" id="bookDate" name="bookDate" required
                            className="border-2 rounded w-full p-2 text-gray-700" />
                    </div>

                    <div className="w-full my-2">
                        <label className="block text-gray-700" htmlFor="bookTime">Booking Time</label>
                        <select id="bookTime" name="bookTime" required 
                            className="border-2 rounded w-full p-2 text-gray-700">
                            <option value="">Select Time</option>
                            {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"].map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded mt-4 w-full">
                        Book Appointment
                    </button>
                </form>
            </div>
        </main>
    );
}