import { useState, FC } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

import { ButtonUI } from '../button/button';
import styles from './calendar.module.css';
import { CalendarUIProps } from './types';
import ChevronDownIcon from '../../assets/icons/chevron-down';
import ChevronUpIcon from '../../assets/icons/chevron-up';

registerLocale('ru', ru);

// Генерируем массив лет (например, с 1950 по 2050)
const years = Array.from({ length: 76 }, (_, i) => 1950 + i);
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const CalendarUI: FC<CalendarUIProps> = ({ selectedDate = null, onChange = () => {} }) => {
  // Внутреннее состояние для выбора даты в самом календаре
  const [startDate, setStartDate] = useState<Date | null>(selectedDate || new Date());

  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  const handleChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleCancel = () => {
    // Возвращаем к тому, что пришло из пропсов
    setStartDate(selectedDate);
  };

  const handleSelect = () => {
    // Подтверждаем выбор и отправляем наверх
    onChange(startDate);
  };

  return (
    <div className={styles.calendarWrapper}>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        locale="ru"
        inline
        calendarStartDay={1}
        fixedHeight
        renderCustomHeader={({ date, changeMonth, changeYear }) => (
          <div className={styles.customHeader}>
            <div className={styles.selectContainer}>
              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                onMouseDown={() => setIsMonthOpen(true)}
                onBlur={() => setIsMonthOpen(false)}
                className={styles.headerSelectMonth}
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className={styles.iconContainer}>
                {isMonthOpen ? (
                  <ChevronUpIcon size={24} className={styles.icon} />
                ) : (
                  <ChevronDownIcon size={24} className={styles.icon} />
                )}
              </div>
            </div>

            <div className={styles.selectContainer}>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(Number(value))}
                onMouseDown={() => setIsYearOpen(true)}
                onBlur={() => setIsYearOpen(false)}
                className={styles.headerSelectYears}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className={styles.iconContainer}>
                {isYearOpen ? (
                  <ChevronUpIcon size={24} className={styles.icon} />
                ) : (
                  <ChevronDownIcon size={24} className={styles.icon} />
                )}
              </div>
            </div>
          </div>
        )}
      >
        <div className={styles.calendarFooter}>
          <ButtonUI variant="secondary" onClick={handleCancel} padding="12px 24px">
            Отменить
          </ButtonUI>

          <ButtonUI variant="primary" onClick={handleSelect} padding="12px 24px">
            Выбрать
          </ButtonUI>
        </div>
      </DatePicker>
    </div>
  );
};
