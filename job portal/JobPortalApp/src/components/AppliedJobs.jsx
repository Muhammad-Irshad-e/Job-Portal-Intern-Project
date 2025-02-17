import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react"; // Import Clerk to get user info

const AppliedJobs = () => {
  const { user } = useUser(); // Get logged-in user
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = user.id;
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user-applications/' + userId);
        setApplications(response.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applied jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [user]);

  if (loading) return <p>Loading applied jobs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6  shadow-lg rounded-2xl" style={{backgroundColor: '#f4f4f4'}}>
      <h2 className="text-xl font-bold mb-4" style={{ color: "#1E3A8A" }}>Applied Job Listings</h2>
      {applications.length === 0 ? (
        <p className="text-gray-600">No jobs applied yet.</p>
      ) : (
        <ul>
          {applications.map((job) => (
            <li key={job._id} className="p-4 border-b last:border-none flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold" style={{ color: "#1E3A8A" }}>{job.jobTitle}</h3>
                <p className="text-gray-600">{job.companyName}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  job.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : job.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {job.status || "Pending"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppliedJobs;
