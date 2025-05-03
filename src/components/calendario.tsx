'use client';

import type React from 'react';

import { format, parse } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { es } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';

export const Calendario = ({
  value,
  onChange,
  disabled = false,
  placeholder = 'Selecciona una fecha',
  allowFutureDates = false
}: {
  value?: Date;
  onChange: (date?: Date) => void;
  disabled?: boolean;
  placeholder?: string;
  allowFutureDates?: boolean;
}) => {
  const [inputValue, setInputValue] = useState(
    value ? format(value, 'dd/MM/yyyy') : ''
  );
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [yearSearch, setYearSearch] = useState('');

  // Add state to track the current view month/year
  const [currentMonth, setCurrentMonth] = useState<Date>(value || new Date());

  // Update input value and current month when value changes externally
  useEffect(() => {
    if (value) {
      setInputValue(format(value, 'dd/MM/yyyy'));
      setCurrentMonth(value);
    } else {
      setInputValue('');
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    try {
      const parsed = parse(val, 'dd/MM/yyyy', new Date());
      if (!isNaN(parsed.getTime()) && parsed.getFullYear() >= 1000) {
        onChange(parsed);
        setCurrentMonth(parsed); // Update current month view
      }
    } catch (error) {
      // Invalid date format, do nothing
    }
  };

  // Generate years for dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i
  );

  // Filter years based on search input
  const filteredYears = yearSearch
    ? years.filter((year) => year.toString().includes(yearSearch))
    : years;

  // Generate months for dropdown
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    return {
      value: i,
      label: format(date, 'MMMM', { locale: es })
    };
  });

  // Handle month change from dropdown
  const handleMonthChange = (monthIndex: number) => {
    // Create a new date based on the current view
    const newDate = new Date(currentMonth);
    newDate.setMonth(monthIndex);

    // Update the current month view
    setCurrentMonth(newDate);

    // If there's a selected date, update it too
    if (value) {
      const updatedDate = new Date(value);
      updatedDate.setMonth(monthIndex);
      onChange(updatedDate);
    } else {
      // If no date is selected, select the first day of the new month/year
      onChange(newDate);
    }
  };

  // Handle year change from dropdown
  const handleYearChange = (year: number) => {
    // Create a new date based on the current view
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);

    // Update the current month view
    setCurrentMonth(newDate);

    // If there's a selected date, update it too
    if (value) {
      const updatedDate = new Date(value);
      updatedDate.setFullYear(year);
      onChange(updatedDate);
    } else {
      // If no date is selected, select the first day of the new month/year
      onChange(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          {value ? (
            format(value, 'PPP', { locale: es })
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0'
        align='start'
        side='bottom'
        sideOffset={4}
      >
        <div className='border-b p-3'>
          <Input
            placeholder='dd/mm/aaaa'
            value={inputValue}
            onChange={handleInputChange}
            className='h-8 text-sm'
          />
        </div>
        <div className='flex items-center justify-between border-b p-2'>
          {/* Month Selector with Search */}
          <Popover open={monthOpen} onOpenChange={setMonthOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={monthOpen}
                className='h-7 w-[110px] justify-between text-xs'
              >
                {format(currentMonth, 'MMMM', { locale: es })}
                <ChevronsUpDown className='ml-1 h-3 w-3 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[180px] p-0' align='start'>
              <Command>
                <CommandInput
                  placeholder='Buscar mes...'
                  className='h-8 text-xs'
                />
                <CommandList className='max-h-[145px]'>
                  <CommandEmpty>No se encontró.</CommandEmpty>
                  <CommandGroup>
                    {months.map((month) => (
                      <CommandItem
                        key={month.value}
                        value={month.label}
                        onSelect={() => {
                          handleMonthChange(month.value);
                          setMonthOpen(false);
                        }}
                        className='py-1 text-xs'
                      >
                        <Check
                          className={cn(
                            'mr-1 h-3 w-3',
                            currentMonth.getMonth() === month.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {month.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Year Selector with Search */}
          <Popover open={yearOpen} onOpenChange={setYearOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={yearOpen}
                className='h-7 w-[80px] justify-between text-xs'
              >
                {currentMonth.getFullYear()}
                <ChevronsUpDown className='ml-1 h-3 w-3 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[120px] p-0' align='start'>
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder='Buscar año...'
                  className='h-8 text-xs'
                  value={yearSearch}
                  onValueChange={setYearSearch}
                />
                <CommandList className='max-h-[145px]'>
                  {filteredYears.length === 0 && (
                    <CommandEmpty>No se encontró.</CommandEmpty>
                  )}
                  <CommandGroup>
                    {filteredYears.map((year) => (
                      <CommandItem
                        key={year}
                        value={year.toString()}
                        onSelect={() => {
                          handleYearChange(year);
                          setYearOpen(false);
                          setYearSearch('');
                        }}
                        className='py-1 text-xs'
                      >
                        <Check
                          className={cn(
                            'mr-1 h-3 w-3',
                            currentMonth.getFullYear() === year
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {year}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Calendar
          mode='single'
          selected={value}
          onSelect={onChange}
          month={currentMonth} // Control which month is displayed
          onMonthChange={setCurrentMonth} // Update state when calendar navigation changes month
          locale={es}
          disabled={(date) =>
            (!allowFutureDates && date > new Date()) ||
            date < new Date('1900-01-01')
          }
          initialFocus
          classNames={{
            day: 'h-8 w-8 text-xs p-0 font-normal aria-selected:opacity-100',
            head_cell:
              'text-muted-foreground rounded-md w-8 font-normal text-[0.7rem]',
            cell: 'h-8 w-8 text-center text-xs p-0',
            caption: 'flex justify-center pt-1 relative items-center px-2',
            caption_label: 'text-xs font-medium',
            nav_button:
              'h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100'
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
