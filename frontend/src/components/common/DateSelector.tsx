import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Listbox, Transition } from '@headlessui/react';

const months = [
    { id: 0, name: 'January' },
    { id: 1, name: 'February' },
    { id: 2, name: 'March' },
    { id: 3, name: 'April' },
    { id: 4, name: 'May' },
    { id: 5, name: 'June' },
    { id: 6, name: 'July' },
    { id: 7, name: 'August' },
    { id: 8, name: 'September' },
    { id: 9, name: 'October' },
    { id: 10, name: 'November' },
    { id: 11, name: 'December' },
];

const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

interface DateSelectorProps {
    onDateSelect: (date: Date) => void;
    dateSelected: Date | null;
}

const DateSelector = ({ onDateSelect, dateSelected }: DateSelectorProps) => {

    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(dateSelected ?? today);
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [days, setDays] = useState<{day: number, currentMonth: boolean}[]>([]);

    useEffect(() => {
        generateCalendar(currentMonth, currentYear);
    }, [currentMonth, currentYear]);

    const generateCalendar = (month: number, year: number) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const startDay = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
        const totalDays = lastDayOfMonth.getDate();

        const prevMonthLastDay = new Date(year, month, 0).getDate();

        const daysArray: {day: number, currentMonth: boolean}[] = [];

        // Days from previous month
        for (let i = startDay; i > 0; i--) {
            daysArray.push({
                day: prevMonthLastDay - i + 1,
                currentMonth: false,
            });
        }

        // Days of current month
        for (let i = 1; i <= totalDays; i++) {
            daysArray.push({
                day: i,
                currentMonth: true,
            });
        }

        // Days from next month to fill the last week
        const nextDays = 42 - daysArray.length; // 6 weeks display
        for (let i = 1; i <= nextDays; i++) {
            daysArray.push({
                day: i,
                currentMonth: false,
            });
        }

        setDays(daysArray);
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const isToday = (day: number) => {
        const date = new Date(currentYear, currentMonth, day);
        return (
            date.toDateString() === new Date().toDateString()
        );
    };

    const isSelected = (day: number) => {
        const date = new Date(currentYear, currentMonth, day);
        return (
            selectedDate &&
            date.toDateString() === selectedDate.toDateString()
        );
    };

    const handleDateClick = (day: number) => {
        const selectedDate = new Date(currentYear, currentMonth, day);
        setSelectedDate(selectedDate);
        onDateSelect(selectedDate);
    };

    return (
        <div className="absolute p-3 space-y-0.5 bg-white z-10 border-gray-400 shadow-lg rounded-xl">
            {/* Months */}
            <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                {/* Prev Button */}
                <div className="col-span-1">
                    <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full focus:outline-none focus:bg-gray-100"
                        aria-label="Previous"
                    >
                        <ChevronLeftIcon className="shrink-0 size-4" />
                    </button>
                </div>
                {/* End Prev Button */}

                {/* Month / Year */}
                <div className="col-span-3 flex justify-center items-center gap-x-1">
                    {/* Month Select */}
                    <div className="relative">
                        <Listbox value={currentMonth} onChange={setCurrentMonth}>
                            <div className="relative">
                                <Listbox.Button className="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600">
                                    {months[currentMonth].name}
                                </Listbox.Button>
                                <Transition
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-2 z-50 w-32 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-auto">
                                        {months.map((month) => (
                                            <Listbox.Option
                                                key={month.id}
                                                className={({ active }) =>
                                                    `cursor-pointer select-none relative p-2 rounded-lg ${active ? 'bg-gray-100 text-gray-800' : 'text-gray-800'
                                                    }`
                                                }
                                                value={month.id}
                                            >
                                                {({ selected }) => (
                                                    <div className="flex justify-between items-center">
                                                        <span>{month.name}</span>
                                                        {selected && (
                                                            <CheckIcon className="shrink-0 size-3.5 text-gray-800" />
                                                        )}
                                                    </div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    {/* End Month Select */}

                    <span className="text-gray-800">/</span>

                    {/* Year Select */}
                    <div className="relative">
                        <Listbox value={currentYear} onChange={setCurrentYear}>
                            <div className="relative">
                                <Listbox.Button className="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:text-blue-600">
                                    {currentYear}
                                </Listbox.Button>
                                <Transition
                                    as={React.Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-2 z-50 w-20 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-auto">
                                        {years.map((year) => (
                                            <Listbox.Option
                                                key={year}
                                                className={({ active }) =>
                                                    `cursor-pointer select-none relative p-2 rounded-lg ${active ? 'bg-gray-100 text-gray-800' : 'text-gray-800'
                                                    }`
                                                }
                                                value={year}
                                            >
                                                {({ selected }) => (
                                                    <div className="flex justify-between items-center">
                                                        <span>{year}</span>
                                                        {selected && (
                                                            <CheckIcon className="shrink-0 size-3.5 text-gray-800" />
                                                        )}
                                                    </div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    {/* End Year Select */}
                </div>
                {/* End Month / Year */}

                {/* Next Button */}
                <div className="col-span-1 flex justify-end">
                    <button
                        type="button"
                        onClick={handleNextMonth}
                        className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full focus:outline-none focus:bg-gray-100"
                        aria-label="Next"
                    >
                        <ChevronRightIcon className="shrink-0 size-4" />
                    </button>
                </div>
                {/* End Next Button */}
            </div>
            {/* Months */}

            {/* Weeks */}
            <div className="flex pb-1.5">
                {daysOfWeek.map((day) => (
                    <span
                        key={day}
                        className="m-px w-10 block text-center text-sm text-gray-500"
                    >
                        {day}
                    </span>
                ))}
            </div>
            {/* Weeks */}

            {/* Days */}
            <div className="grid grid-cols-7">
                {days.map((dayObj, index) => (
                    <div key={index}>
                        <button
                            type="button"
                            onClick={() => handleDateClick(dayObj.day)}
                            disabled={!dayObj.currentMonth}
                            className={`m-px size-10 flex justify-center items-center text-sm rounded-full focus:outline-none
                ${!dayObj.currentMonth
                                    ? 'text-gray-400 disabled:opacity-50 disabled:pointer-events-none'
                                    : isSelected(dayObj.day)
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-800 hover:border-blue-600 hover:text-blue-600'
                                }
                ${isToday(dayObj.day) && dayObj.currentMonth && !isSelected(dayObj.day)
                                    ? 'border border-blue-600'
                                    : 'border border-transparent'
                                }
              `}
                        >
                            {dayObj.day}
                        </button>
                    </div>
                ))}
            </div>
            {/* Days */}
        </div>
    );
};

export default DateSelector;