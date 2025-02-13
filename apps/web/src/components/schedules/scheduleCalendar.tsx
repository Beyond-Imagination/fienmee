import Calendar from 'react-calendar'
import './calendar.css'
export default function ScheduleCalendar({ onChange }) {
    return (
        <div>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <Calendar
                    onChange={onChange}
                    calendarType="gregory"
                    formatMonthYear={(locale, date) => {
                        const year = date.getFullYear()
                        const month = date.getMonth() + 1
                        return `${year}년 ${month}월`
                    }}
                    formatDay={(locale, date) => {
                        return date.getDate()
                    }}
                    formatShortWeekday={(locale, date) => {
                        const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                        return weekdays[date.getDay()]
                    }}
                    prev2Label={null}
                    next2Label={null}
                    showNeighboringMonth={false}
                />
            </div>
        </div>
    )
}
