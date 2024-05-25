import "./admin.css";
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [fileCopy, setFilesCopy] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

  const handleSearch = (e) => {
    let searchArr = fileCopy.filter((file) =>
      file.fileName.includes(e.target.value.toLocaleLowerCase())
    );
    if (e.target.value) {
      setFiles(searchArr);
    } else {
      setFiles(fileCopy);
    }
  };
  const createBackup = () => {
    setLoading(true);
    axios
      .post(
        "https://firestorebackupbackend-git-main-talhas-projects-6376b52b.vercel.app/backup",
        { token }
      )
      .then((res) => {
        setLoading(false);
        setModalVisibility(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to create Backup");
      });

    axios
      .get(
        "https://firestorebackupbackend-git-main-talhas-projects-6376b52b.vercel.app/files",
        { params: { token } }
      )
      .then((res) => {
        console.log(res.data.files);
        setFiles(res.data.files.reverse());

        setFilesCopy(res.data.files);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        alert("Authentication Error");
        navigate("/");
      });
  };
  useEffect(() => {
    axios
      .get(
        "https://firestorebackupbackend-git-main-talhas-projects-6376b52b.vercel.app/files",
        { params: { token } }
      )
      .then((res) => {
        setFiles(res.data.files.reverse());
        setFilesCopy(res.data.files);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        alert("Authentication Error");
        navigate("/");
      });
  }, []);

  return (
    <div className="main">
      <Sidebar />
      <div className="outer-box container-fluid">
        <div className="container heading ">
          <h3 style={{ color: "#f8b739" }}>Manage Backup</h3>
          <button
            className="button"
            onClick={createBackup}
            disabled={loading ? true : false}
          >
            {loading ? "Loading..." : "Create Backup"}
          </button>
        </div>
        <div className="container table-box">
          <div className="search-div">
            <label>Search :</label>
            <input
              className="searchbox"
              type="text"
              onChange={handleSearch}
            ></input>
          </div>
          <table className="">
            <thead>
              <tr>
                <td>File Name</td>
                <td>Date</td>
                <td></td>
              </tr>
            </thead>
            <tbody className="tablebody">
              {files?.map((file) => {
                const array = file.fileName.split("_");
                const date = array[0];

                return (
                  <tr className="tablerow">
                    <td className="tabledata">{file.fileName}</td>
                    <td className="tabledata">{date}</td>
                    <td className="tabledata">
                      <a
                        href={`${file.fileUrl}/${file.fileUrlPart}.overall_export_metadata`}
                        download
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={modalVisibility} onHide={() => setModalVisibility(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Backup created Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalVisibility(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
