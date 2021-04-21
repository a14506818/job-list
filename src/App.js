import firebase from "./firebase";
import { useState, useEffect } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [jobNames, setJobNames] = useState("");

  const jobList = firebase.firestore().collection("jobs");
  const orderJobList = firebase.firestore().collection("jobs").orderBy("job");

  const getJobs = () => {
    orderJobList.onSnapshot((snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      console.log(items);
      setJobs(items);
    });
  };

  useEffect(() => {
    getJobs();
  }, []);

  const addJob = (e) => {
    e.preventDefault();
    if (jobNames) {
      jobList.add({
        job: jobNames,
      });
    } else {
      alert("No input value");
    }
    setJobNames("");
  };

  const deleteJob = (id) => {
    console.log(id);
    jobList.doc(id).delete();
  };

  const updateJob = (target) => {
    const update = prompt("Update Job:", target.className);
    if (update) {
      jobList.doc(target.id).update({
        job: update,
      });
    }
  };

  return (
    <div className="App">
      <form onSubmit={(e) => addJob(e)}>
        <input
          type="text"
          className="jobInput"
          placeholder="Add Job"
          onChange={(e) => setJobNames(e.target.value)}
          value={jobNames}
        />
        <button type="submit" className="jobBtn">
          Add
        </button>
      </form>
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.job}</h3>
          <button
            type="button"
            className={job.job}
            id={job.id}
            onClick={(e) => updateJob(e.target)}
          >
            Update
          </button>
          <button
            type="button"
            id={job.id}
            onClick={(e) => deleteJob(e.target.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
