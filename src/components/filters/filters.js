import "./filters.css";
import moment from "moment";
import { debounce } from "../../utils/debounce";
import { useEffect, useState } from "react";

const dateFilterValues = [
  ["за все время"],
  ["за сегодня"],
  ["за вчера"],
  ["за последнюю неделю"],
  ["за текущий месяц"],
  ["за прошлый месяц"],
];

const durationFilterValues = [
  [0, "Все"],
  [1, "до 1 минуты"],
  [3, "до 3 минут"],
  [5, "до 5 минут"],
  [10, "до 10 минут"],
];

const FiltersSection = ({ setFiltredMsgs, msgs }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState(0);
  const [dateFilter, setDateFilter] = useState(0);
  const [inputName, setInputName] = useState("");

  const inputDebounce = debounce(setNameFilter);

  useEffect(() => {
    setFiltredMsgs(filter(msgs, nameFilter, durationFilter, dateFilter));
  }, [setFiltredMsgs, msgs, nameFilter, durationFilter, dateFilter]);

  return (
    <section className="container mb-35">
      <div className="filters">
        <div className="filters-col">
          <label htmlFor="period" className="form-label">
            Период
          </label>
          <select
            value={dateFilter}
            id="period"
            className="form-select"
            aria-label="period"
            onChange={(e) => {
              setDateFilter(e.target.value);
            }}
          >
            {dateFilterValues.map((date, i) => (
              <option key={date[0]} value={i}>
                {date[0]}
              </option>
            ))}
          </select>
        </div>
        <div className="filters-col">
          <label htmlFor="number" className="form-label">
            Номер
          </label>
          <input
            id="number"
            type="text"
            className="form-control"
            value={inputName}
            onInput={(e) => {
              setInputName(e.target.value);
              inputDebounce(e.target.value);
            }}
          />
        </div>
        <div className="filters-col">
          <label htmlFor="duration" className="form-label">
            Длительность
          </label>
          <select
            value={durationFilter}
            id="duration"
            className="form-select"
            aria-label="duration"
            onChange={(e) => {
              setDurationFilter(e.target.value);
            }}
          >
            {durationFilterValues.map((e) => (
              <option key={e[0]} value={e[0]}>
                {e[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="filters-col filters-clear">
          <button
            type="button"
            className="btn filters-clear-btn"
            onClick={() => {
              setNameFilter("");
              setDurationFilter(0);
              setDateFilter(0);
              setInputName("");
            }}
          >
            Сбросить фильтр
          </button>
        </div>
      </div>
    </section>
  );
};

export default FiltersSection;

const filter = (arr, name, duration, dateInterval) => {
  if (!name && !duration && !dateInterval) {
    return arr;
  }

  let filtredArr = arr;

  if (name) {
    filtredArr = filtredArr.filter((e) =>
      e.From[0].toLowerCase().includes(name.toLowerCase())
    );
  }
  if (+duration) {
    filtredArr = filtredArr.filter((e) => +e.Duration[0] / 60 < duration); // magic number
  }
  if (dateInterval) {
    switch (+dateInterval) {
      case 1:
        const today = moment().utc();
        filtredArr = filtredArr.filter((e) => {
          const date = moment.utc(e.Received[0]);
          return today.isSame(date, "day");
        });
        break;

      case 2:
        const yesterday = moment().subtract(1, "days");
        filtredArr = filtredArr.filter((e) => {
          const date = moment.utc(e.Received[0]);
          return yesterday.isSame(date, "day");
        });
        break;

      case 3:
        let lastWeek = [
          moment().utc().subtract(1, "weeks").startOf("week"),
          moment().utc().subtract(1, "weeks").endOf("week"),
        ];
        filtredArr = filtredArr.filter((e) => {
          const date = moment.utc(e.Received[0]);
          return (
            date.isBetween(lastWeek[0], lastWeek[1]) ||
            date.isSame(lastWeek[0]) ||
            date.isSame(lastWeek[1])
          );
        });
        break;

      case 4:
        let thisMonth = [
          moment().utc().startOf("month"),
          moment().utc().endOf("month"),
        ];
        filtredArr = filtredArr.filter((e) => {
          const date = moment.utc(e.Received[0]);
          return (
            date.isBetween(thisMonth[0], thisMonth[1]) ||
            date.isSame(thisMonth[0]) ||
            date.isSame(thisMonth[1])
          );
        });
        break;

      case 5:
        const lastMonth = [
          moment().subtract(1, "months").utc().startOf("month"),
          moment().subtract(1, "months").utc().endOf("month"),
        ];
        filtredArr = filtredArr.filter((e) => {
          const date = moment.utc(e.Received[0]);
          return (
            date.isBetween(lastMonth[0], lastMonth[1]) ||
            date.isSame(lastMonth[0]) ||
            date.isSame(lastMonth[1])
          );
        });
        break;

      default:
        return filtredArr;
    }
  }
  return filtredArr;
};
