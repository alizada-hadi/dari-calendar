import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "./Calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import moment from "moment-jalaali";
const DatePicker = () => {
  const [date, setDate] = useState<any>();

  const formatDateRange = () => {
    if (date) {
      return `${date.format("jYYYY/jMM/jDD")}`;
    }
    return "انتخاب تاریخ"; // Default text when no range is selected
  };
  return (
    <Popover>
      <PopoverTrigger dir="rtl" asChild>
        <Button
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal")}
        >
          <CalendarIcon className="ml-2 h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          border={false}
          selected={date}
          onSelect={(date) => setDate(date as any)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
