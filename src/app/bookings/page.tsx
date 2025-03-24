"use client";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/cartSlice";
import { BookingItem } from "../../../interfaces";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Reservations() {
  const searchParams = useSearchParams(); // Get URL parameters
  const { data: session } = useSession(); // Get user session

  const [createAt, setCreateAt] = useState("");
  const [user, setUser] = useState("");
  const [dentist, setDentist] = useState("");
  const [bookDate, setBookDate] = useState<Dayjs | null>(dayjs());

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    // Set current time for createAt
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
    setCreateAt(now);

    // Pre-fill dentist name from URL parameter
    const dentistName = searchParams.get("name");
    if (dentistName) {
      setDentist(dentistName);
    }


    if (session?.user?.name) {
      setUser(session.user.name);
    }
  }, [searchParams, session]);

  const handleBookVenue = () => {
    if (bookDate && user && dentist && createAt) {
      const formattedDate = bookDate.format("YYYY-MM-DD");
      const booking: BookingItem = {
        bookDate: formattedDate,
        user,
        dentist,
        createAt,
      };
      dispatch(addBooking(booking));
      // Clear the form after booking
      setCreateAt("");
      setUser("");
      setDentist("");
      setBookDate(dayjs());
      router.push("/yourbook");
    }
  };

  return (
    <main className="bg-slate-100 m-5 p-5 flex flex-col items-center">
      <div className="text-xl font-medium text-center">New Booking</div>
      <br />
      <TextField
        label="Create At"
        value={createAt}
        onChange={(e) => setCreateAt(e.target.value)}
        className="w-full max-w-sm"
        required
        disabled // Make it read-only
      />
      <br />
      <TextField
        label="User Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="w-full max-w-sm"
        required
        disabled={session?.user?.name !== undefined} // Make it read-only if user is logged in
      />
      <br />
      <TextField
        label="Dentist Name"
        value={dentist}
        onChange={(e) => setDentist(e.target.value)}
        className="w-full max-w-sm"
        required
        disabled={searchParams.get("dentistName") !== null} // Make it read-only if dentist name is from URL
      />
      <br />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Booking Date"
          value={bookDate}
          onChange={(newValue) => setBookDate(newValue)}
          className="w-full max-w-sm"
          
        />
      </LocalizationProvider>
      <br />
      <Button variant="contained" onClick={handleBookVenue} className="w-full max-w-sm">
        Book Venue
      </Button>
    </main>
  );
}
