import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { options } from "../lib/data";

// 1. Định nghĩa Interface cho Props để sửa lỗi 'implicitly has an any type'
interface DateTimeFilterProps {
  dateQuery: string;
  setDateQuery: (value: string) => void;
}

const DateTimeFilter = ({ dateQuery, setDateQuery }: DateTimeFilterProps) => {
  const [open, setOpen] = React.useState(false);

  // 2. Tìm label dựa trên dateQuery để hiển thị trên Button
  const selectedLabel = options.find((option) => option.value === dateQuery)?.label 
    || options[0]?.label 
    || "Chọn thời gian";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between" // Thêm style để Button cân đối hơn
        >
          {selectedLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  // 3. Sửa hàm onSelect để truyền đúng giá trị
                  onSelect={() => {
                  setDateQuery(option.value);
                  setOpen(false);
                }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      dateQuery === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimeFilter;