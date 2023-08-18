import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { range } from "underscore";
import { getMonth, getYear } from "date-fns";

registerLocale("ru", ru);

function toJSONLocal(date) {
  const local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}

const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button className="example-custom-input" onClick={onClick} ref={ref}>
    {new Date(value).toLocaleDateString()}
  </button>
));

const years = range(1920, getYear(new Date()) + 1, 1);
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const CustomDatePicker = ({ date, setDate }) => {
  return (
    <div className="input-date">
      <DatePicker
        locale="ru"
        customInput={<ExampleCustomInput />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => {
                date.setFullYear(Number(value));
                changeYear(value);
                setDate(date);
              }}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) => {
                // date.setMonth(Number(value));
                date.setMonth(months.indexOf(value));
                changeMonth(months.indexOf(value));
                setDate(date);
              }}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
        selected={date}
        onChange={(date) => setDate(date)}
      />
    </div>
  );
};
