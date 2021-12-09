import moment from "moment";
import { useState } from "react";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import Pagination from "../Pagination/Pagination";

const Table = ({ filtredMsgs }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeaders = ["Дата", "Номер", "Запись сообщения"];

  const msgsPerPage = 10;
  const lastUserIndex = currentPage * msgsPerPage;
  const firstUserIndex = lastUserIndex - msgsPerPage;
  const currentMsgs = filtredMsgs.slice(firstUserIndex, lastUserIndex);
  const pagesCount = Math.floor(filtredMsgs.length / msgsPerPage);

  return (
    <section className="container mb-35">
      {currentMsgs.length === 0 ? (
        <h2>Ничего не найдено</h2>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              {tableHeaders.map((e) => (
                <th key={e} scope="col">
                  {e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentMsgs.map((e) => {
              return (
                <tr key={e.Date[0]._}>
                  <td>{moment(e.Received[0]).utc().format("DD.MM HH:mm")}</td>
                  <td>{e.From}</td>
                  <td>
                    <div className="row">
                      <AudioPlayer dur={e.Duration[0]} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {pagesCount > 1 ? (
        <Pagination
          currentPage={currentPage}
          pagesCount={pagesCount}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </section>
  );
};

export default Table;
