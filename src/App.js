import React, { useState } from "react";
import useFetchJobs from "./components/useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./components/Job";
import JobsPagination from "./components/JobsPagination";
import SearchForm from "./components/SearchForm";

const App = () => {
  const [params, setParams] = useState();
  const [page, setPage] = useState(1);

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const text = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: text };
    });
  };

  return (
    <Container>
      <h1 className="mb-4 mt-4">GitHub Job Postings</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error, try refreshing...</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
};

export default App;
