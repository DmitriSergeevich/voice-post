import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../Table/Table";
import FiltersSection from "../filters/filters";
import Spinner from "../Spinner/Spinner";
const parseString = require("xml2js").parseString;

const Main = () => {
  const [msgs, setMsgs] = useState([]);
  const [filtredMsgs, setFiltredMsgs] = useState([]);
  const [iSloading, setISloading] = useState(true);

  useEffect(() => {
    axios.get("./data.xml").then((data) => {
      parseString(data.data, function (err, result) {
        if (err) {
          console.log(err);
        }
        setISloading(false);
        setMsgs(result.Root.Data);
      });
    });
  }, []);

  return (
    <div className="container fixed-width">
      <header className="container mb-35">
        <h1>Голосовая почта</h1>
      </header>
      <FiltersSection setFiltredMsgs={setFiltredMsgs} msgs={msgs} />
      {iSloading ? <Spinner /> : <Table filtredMsgs={filtredMsgs} />}
    </div>
  );
};

export default Main;
