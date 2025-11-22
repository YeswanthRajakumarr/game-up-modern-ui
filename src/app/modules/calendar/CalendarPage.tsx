import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, MapPin, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import type { CalendarEvent } from '../../../shared/types';
import { Icon3DImage } from '../../../shared/components/Icon3DImage';

const MOCK_EVENTS: CalendarEvent[] = [
  { id: 'e1', title: 'Math Midterm Exam', description: 'Chapters 1-5', date: '2023-10-15', time: '09:00', type: 'EXAM', color: 'bg-red-500' },
  { id: 'e2', title: 'Science Fair', description: 'Annual science fair exhibition', date: '2023-10-20', time: '14:00', type: 'EVENT', color: 'bg-blue-500' },
  { id: 'e3', title: 'Parent-Teacher Meeting', description: 'Scheduled meetings with parents', date: '2023-10-18', time: '16:00', type: 'MEETING', color: 'bg-purple-500' },
  { id: 'e4', title: 'Holiday - Diwali', description: 'School holiday', date: '2023-10-24', type: 'HOLIDAY', color: 'bg-yellow-500' },
  { id: 'e5', title: 'History Project Deadline', description: 'Submit World War II presentations', date: '2023-10-15', type: 'DEADLINE', color: 'bg-orange-500' },
  { id: 'e6', title: 'Sports Day', description: 'Annual sports competition', date: '2023-10-28', time: '08:00', type: 'EVENT', color: 'bg-green-500' },
];

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    return MOCK_EVENTS.filter(event => isSameDay(new Date(event.date), date));
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon3DImage type="calendar" size={48} float={true} />
          <div>
            <h1 className="text-3xl font-bold text-slate-800">School Calendar</h1>
            <p className="text-slate-500 mt-1">View events, exams, and important dates</p>
          </div>
        </div>
        <button 
          onClick={() => setShowEventModal(true)}
          className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <h2 className="text-xl font-bold text-slate-800">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-slate-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map(day => {
              const dayEvents = getEventsForDate(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              
              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`min-h-[80px] p-2 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50'
                      : isToday
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`${event.color} text-white text-xs px-1.5 py-0.5 rounded truncate`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-slate-500">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            {selectedDate ? `Events - ${format(selectedDate, 'MMM dd')}` : 'Upcoming Events'}
          </h3>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {selectedDate ? (
              selectedDateEvents.length > 0 ? (
                selectedDateEvents.map(event => (
                  <div key={event.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className={`${event.color} w-2 h-full rounded mt-1`}></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 text-sm">{event.title}</h4>
                        <p className="text-xs text-slate-600 mt-1">{event.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                          {event.time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </span>
                          )}
                          <span className="px-2 py-0.5 bg-slate-200 rounded text-xs">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm text-center py-8">No events for this date</p>
              )
            ) : (
              MOCK_EVENTS.slice(0, 5).map(event => (
                <div key={event.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className={`${event.color} w-2 h-full rounded mt-1`}></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 text-sm">{event.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{format(new Date(event.date), 'MMM dd, yyyy')}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
