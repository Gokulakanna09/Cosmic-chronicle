import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DatePicker = ({ selectedDate, onDateChange }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    onDateChange(newDate);
    setIsOpen(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 glass-effect rounded-xl border border-cosmic-blue/30 text-space-star hover:border-cosmic-blue/50 transition-all duration-300 cosmic-glow"
      >
        <Calendar className="w-5 h-5 text-cosmic-blue" />
        <span className="font-medium">{formatDate(selectedDate)}</span>
        <ChevronDown
          className={`w-4 h-4 text-cosmic-blue transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 z-50 p-4 glass-effect rounded-xl border border-cosmic-blue/30 cosmic-glow animate-slide-up">
            <div className="grid grid-cols-1 gap-3 min-w-[280px]">
              {/* Quick date selections */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    onDateChange(new Date());
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 text-xs rounded-lg bg-cosmic-gold/20 hover:bg-cosmic-gold/30 border border-cosmic-gold/40 text-cosmic-gold transition-colors duration-200"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    onDateChange(yesterday);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 text-xs rounded-lg bg-cosmic-purple/20 hover:bg-cosmic-purple/30 border border-cosmic-purple/40 text-cosmic-purple transition-colors duration-200"
                >
                  Yesterday
                </button>
                <button
                  onClick={() => {
                    const random = new Date();
                    random.setDate(Math.floor(Math.random() * 365) + 1);
                    onDateChange(random);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 text-xs rounded-lg bg-cosmic-pink/20 hover:bg-cosmic-pink/30 border border-cosmic-pink/40 text-cosmic-pink transition-colors duration-200"
                >
                  Random
                </button>
              </div>

              {/* Date input */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-cosmic-blue">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  className="w-full px-3 py-2 rounded-lg bg-space-medium/50 border border-cosmic-blue/30 text-space-star focus:border-cosmic-blue focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Month quick selections */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-cosmic-blue">
                  Jump to Month
                </label>
                <div className="grid grid-cols-3 gap-1 max-h-32 overflow-y-auto">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setMonth(index);
                        onDateChange(newDate);
                        setIsOpen(false);
                      }}
                      className="px-2 py-1 text-xs rounded bg-space-light/50 hover:bg-cosmic-blue/20 text-space-star hover:text-cosmic-blue transition-colors duration-200"
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DatePicker;
