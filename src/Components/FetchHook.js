import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (httpRequest, url, HTTPmethod, bodyData) => {
  const [status, setStatus] = useState("Idle");
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      try {
        console.log("URL Requested is " + url);
        setStatus("Fetching");
        let res;
        if (HTTPmethod == "get") {
          res = await httpRequest.get(url);
        } else if (HTTPmethod == "post") {
          res = await httpRequest.post(url, bodyData);
        }
        console.log(res.data);
        setData(res.data);
        setStatus("Fetched");
      } catch (err) {
        setStatus("Failed");
        if (err.response.status == 401) {
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [HTTPmethod, httpRequest, bodyData, url]);
  return [status, data, setData];
};
export default useFetch;
