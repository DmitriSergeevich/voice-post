import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import Table from "../Table/Table";
import { filter, FiltersSection } from "../filters/filters";
import Spinner from '../Spinner/Spinner';
const parseString = require("xml2js").parseString;

const Main = () => {
  const [msgs, setMsgs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState(0);
  const [dateFilter, setDateFilter] = useState(0);
  const [iSloading, setISloading] = useState(true);
  

  const msgsPerPage = 10;
  const lastUserIndex = currentPage * msgsPerPage;
  const firstUserIndex = lastUserIndex - msgsPerPage;
  const filtredMsgs = filter(msgs, nameFilter, durationFilter, dateFilter);
  const currentMsgs = filtredMsgs.slice(firstUserIndex, lastUserIndex);
  const pagesCount = Math.floor(filtredMsgs.length / msgsPerPage);

  useEffect(() => {
    axios.get("./data.xml").then((data) => {
      parseString(data.data, function (err, result) {
        if (err) {
          console.log(err);
        }
        setISloading(false)
        setMsgs(result.Root.Data);  
      });
    });
  }, []);

  return (
    <div className="container fixed-width">
      <header className="container mb-35">
        <h1>Голосовая почта</h1>
      </header>
      <FiltersSection
        dateFilter={dateFilter}
        nameFilter={nameFilter}
        durationFilter={durationFilter}
        setDateFilter={setDateFilter}
        setNameFilter={setNameFilter}
        setDurationFilter={setDurationFilter}
      />
      {
        iSloading
        ? <Spinner/>
        : <Table currentMsgs={currentMsgs} />
      }     
      {pagesCount > 1 ? (
        <Pagination
          currentPage={currentPage}
          pagesCount={pagesCount}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </div>
  );
};

export default Main;
