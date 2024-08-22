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
const DateRangePicker = () => {
  const [dateRange, setDateRange] = useState<any>({
    from: moment().add(10, "days"),
    to: moment(),
  });

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${dateRange.from.format("jYYYY/jMM/jDD")} - ${dateRange.to.format(
        "jYYYY/jMM/jDD"
      )}`;
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
      <PopoverContent dir="rtl" className="w-auto p-0">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={(range) => setDateRange(range as any)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
