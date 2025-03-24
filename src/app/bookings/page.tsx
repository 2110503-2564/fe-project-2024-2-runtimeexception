"use client";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/cartSlice";
import { BookingItem } from "../../../interfaces";
<<<<<<< HEAD
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
||||||| 97443b8
import {
  TextField,
  Button,
} from "@mui/material";
=======
import { TextField, Button } from "@mui/material";
>>>>>>> e0f9f7a461840b4403688e5cf8160da34a9c1630
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Reservations() {
<<<<<<< HEAD
  const searchParams = useSearchParams();
  const { data: session } = useSession();

||||||| 97443b8
=======
  const searchParams = useSearchParams(); // Get URL parameters
  const { data: session } = useSession(); // Get user session

>>>>>>> e0f9f7a461840b4403688e5cf8160da34a9c1630
  const [createAt, setCreateAt] = useState("");
  const [user, setUser] = useState("");
  const [dentist, setDentist] = useState("");
  const [bookDate, setBookDate] = useState<Dayjs | null>(dayjs());
  const [bookTime, setBookTime] = useState<string>(""); // New state for bookTime

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
    setCreateAt(now);

<<<<<<< HEAD
    const dentistName = searchParams.get("name");
||||||| 97443b8
    // Pre-fill dentist name from URL parameter
    const dentistName = searchParams.get("dentistName");
=======
    // Pre-fill dentist name from URL parameter
    const dentistName = searchParams.get("name");
>>>>>>> e0f9f7a461840b4403688e5cf8160da34a9c1630
    if (dentistName) {
      setDentist(dentistName);
    }

    if (session?.user?.name) {
      setUser(session.user.name);
    }
  }, [searchParams, session]);

  const handleBookVenue = () => {
    if (bookDate && user && dentist && createAt && bookTime) { // Check for bookTime
      const formattedDate = bookDate.format("YYYY-MM-DD");
      const booking: BookingItem = {
        bookDate: formattedDate,
        bookTime: bookTime, // Include bookTime
        user,
        dentist,
        createAt,
      };
      dispatch(addBooking(booking));
      router.push("/yourbook");
    }
  };

  const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]; // Example time slots

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
        disabled
      />
      <br />
      <TextField
        label="User Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="w-full max-w-sm"
        required
        disabled={session?.user?.name !== undefined}
      />
      <br />
      <TextField
        label="Dentist Name"
        value={dentist}
        onChange={(e) => setDentist(e.target.value)}
        className="w-full max-w-sm"
        required
        disabled={searchParams.get("name") !== null}
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
      {/* Time Selection */}
      <FormControl className="w-full max-w-sm">
        <InputLabel id="time-select-label">Booking Time</InputLabel>
        <Select
          labelId="time-select-label"
          id="time-select"
          value={bookTime}
          label="Booking Time"
          onChange={(e) => setBookTime(e.target.value)}
          required
        >
          {timeSlots.map((time) => (
            <MenuItem key={time} value={time}>
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <Button variant="contained" onClick={handleBookVenue} className="w-full max-w-sm">
        Book Venue
      </Button>
    </main>
  );
}
