import moment from "moment";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";

const Table = ({ currentMsgs }) => {
  const tableHeaders = ["Дата", "Номер", "Запись сообщения"];

  return (
    <section className="container mb-35">
      {currentMsgs.length === 0 ? (
        <h2>Ничего не найдено</h2>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              {tableHeaders.map((e) => (
                <th key={e} scope="col">{e}</th>
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
    </section>
  );
};

export default Table;
