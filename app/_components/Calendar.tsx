"use client";

import React, { useState } from "react";
import moment from "moment-jalaali";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateRange {
  from?: moment.Moment;
  to?: moment.Moment;
}

interface CalendarProps {
  type?: "cal_afg" | "cal_ir";
  mode?: "single" | "range";
  selected?: moment.Moment | DateRange;
  onSelect?: (date: moment.Moment | DateRange) => void;
  border?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  type = "cal_afg",
  mode = "single",
  selected,
  onSelect,
  border = true,
}) => {
  if (type === "cal_afg") {
    moment.loadPersian_dari({
      dialect: "persian-dari",
      usePersianDigits: false,
    });
  }
  if (type === "cal_ir") {
    moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
  }

  const [selectingFromDate, setSelectingFromDate] = useState(true);
  const [currentMonth, setCurrentMonth] = useState<moment.Moment>(
    selected && mode === "single"
      ? (selected as moment.Moment)
      : (selected as DateRange)?.from || moment()
  );

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "jMonth"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "jMonth"));
  };

  const handleDateClick = (day: number, month: moment.Moment) => {
    if (onSelect) {
      const newSelectedDate = month.clone().jDate(day);
      if (mode === "single") {
        onSelect(newSelectedDate);
      } else if (mode === "range") {
        const range = selected as DateRange;
        if (selectingFromDate || !range.from) {
          onSelect({ from: newSelectedDate, to: range.to });
          setSelectingFromDate(false);
        } else if (!range.to || newSelectedDate.isAfter(range.from)) {
          onSelect({ from: range.from, to: newSelectedDate });
          setSelectingFromDate(true);
        } else {
          onSelect({ from: newSelectedDate, to: undefined });
          setSelectingFromDate(false);
        }
      }
    }
  };

  const renderDays = (month: moment.Moment) => {
    const startOfMonth = month.clone().startOf("jMonth");
    const startDay = startOfMonth.day() === 6 ? 0 : startOfMonth.day() + 1;

    const daysInMonth = moment.jDaysInMonth(month.jYear(), month.jMonth());

    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="flex-1 py-2 text-center"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = startOfMonth.clone().jDate(day);
      const isSelected =
        mode === "single"
          ? // @ts-ignore
            dayDate.isSame(selected, "day")
          : ((selected as DateRange).from &&
              dayDate.isSame((selected as DateRange).from, "day")) ||
            ((selected as DateRange).to &&
              dayDate.isSame((selected as DateRange).to, "day"));
      const isInRange =
        mode === "range" &&
        (selected as DateRange).from &&
        (selected as DateRange).to &&
        dayDate.isBetween(
          (selected as DateRange).from,
          (selected as DateRange).to,
          null,
          "[]"
        );
      const isToday = dayDate.isSame(moment(), "day");

      let bgColorClass = "bg-white";
      if (isSelected) {
        bgColorClass = "bg-black text-white";
      } else if (isInRange) {
        bgColorClass = "bg-gray-300";
      } else if (isToday) {
        bgColorClass = "bg-gray-100";
      }

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day, month)}
          className={`flex-1 p-1 text-center cursor-pointer rounded-sm ${bgColorClass} ${
            !isSelected ? "hover:bg-gray-100" : ""
          }`}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div
      className={cn(border ? "flex gap-x-2 border rounded-md" : "flex gap-x-2")}
    >
      {/* Calendar */}
      <div dir="rtl" className="w-72 p-2 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousMonth}
            className="px-2 py-1 hover:bg-gray-100 rounded border"
          >
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
          <div className="text-lg font-bold">
            {currentMonth.format("jMMMM jYYYY")}
          </div>
          {mode === "single" && (
            <button
              onClick={handleNextMonth}
              className="px-2 py-1 hover:bg-gray-100 rounded border"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
          )}
          {mode === "range" && <div></div>}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, index) => (
            <div key={index} className="flex-1 p-2 text-center font-bold">
              {day}
            </div>
          ))}
          {renderDays(currentMonth)}
        </div>
      </div>
      {/* Additional Month for Range Picker */}
      {mode === "range" && (
        <div dir="rtl" className="w-72 p-2 bg-white rounded-md">
          <div className="flex justify-between items-center">
            <div></div>
            <div className="text-lg text-center font-bold">
              {currentMonth.clone().add(1, "jMonth").format("jMMMM jYYYY")}
            </div>
            <button
              onClick={handleNextMonth}
              className="px-2 py-1 hover:bg-gray-100 rounded border"
            >
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, index) => (
              <div key={index} className="flex-1 p-2 text-center font-bold">
                {day}
              </div>
            ))}
            {renderDays(currentMonth.clone().add(1, "jMonth"))}
          </div>
        </div>
      )}
    </div>
  );
};
