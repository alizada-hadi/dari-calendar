"use client";
import { Calendar } from "./_components/Calendar";
import moment from "moment-jalaali";
// import "dari-calendar/dist/styles.css";
import { useState } from "react";
import DatePicker from "./_components/DatePicker";
import DateRangePicker from "./_components/DateRangePicker";
export default function Home() {
  const [date, setDate] = useState<any>();
  const [dateRange, setDateRange] = useState<any>({
    from: moment().add(10, "days"),
    to: moment(),
  });
  return (
    <div className="p-5 flex flex-col space-y-32">
      <div className="flex items-center gap-x-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date: any) => setDate(date)}
        />
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range) => setDateRange(range as any)}
        />
      </div>
      <div className="flex items-center gap-x-4">
        <DatePicker />
        <DateRangePicker />
      </div>
    </div>
  );
}
