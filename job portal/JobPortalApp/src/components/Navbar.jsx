import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { openSignIn, openSignUp } = useClerk();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      if (user.publicMetadata?.role === 'admin') {
        navigate('/admindb');
      } else {
        navigate('/userdb');
      }
    }
  }, [isSignedIn, user, navigate]);

  return (
    <div className="m-0 p-0 bg-gray-100">
      <nav className="text-[#1E3A8A] py-3 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold">JOBIFY</div>
        <div className="space-x-4">
          <Link to="/">
            <Button variant="text" color="inherit">
              Home
            </Button>
          </Link>
          <Button variant="text" color="inherit" onClick={openSignUp}>
            Sign Up
          </Button>
          <Button
            sx={{ color: 'whitesmoke', bgcolor: '#1E3A8A', ml: 2 }}
            onClick={openSignIn}
          >
            Login
          </Button>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="relative h-screen flex items-start justify-center text-white text-center p-0">
          <div className="flex flex-col justify-center items-start mt-30 ml-5">
            <h1 className="text-4xl font-bold text-[#2c50b2] text-left">
              Find Your Dream Job Today!
            </h1>
            <h3 className="text-3xl font-bold text-[#2c50b2] text-left">
              Connecting Talent with Opportunity
            </h3>
            <div className="w-72 text-left mr-10">
              <p className="mt-2 text-lg font-medium text-[#2d4a98]">
                Looking for the perfect job? Whether you're a fresh graduate or an
                experienced professional, we've got thousands of opportunities
                waiting for you. Explore a variety of industries, find roles that
                match your skills, and take the next step in your career with ease.
              </p>
            </div>
            <a href="#feature">
              <button className="mt-4 bg-[#10B981] p-4 rounded-xl hover:bg-[#34D399]">
                Discover More
              </button>
            </a>
          </div>
          <div className="hidden md:flex justify-center">
            <img src="bg.png" className="h-screen" alt="Background" />
          </div>
        </header>

        {/* About Section */}
        <section className="py-12 px-6" id="feature">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#1E3A8A]">
            About
          </h2>
          <p className="text-center mb-6">
            Jobify is your go-to platform for finding the best jobs in tech,
            design, and more.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
            {/* Card 1 */}
            <Card className="bg-white shadow-lg rounded-none overflow-hidden border-2 border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl max-w-xs mx-auto">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#1E3A8A]">
                  Advanced Job Search
                </h3>
                <p className="text-gray-600 mt-4">
                  Easily find jobs that match your skills and preferences with our
                  powerful search filters and smart recommendations.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-white shadow-lg rounded-none overflow-hidden border-2 border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl max-w-xs mx-auto">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#1E3A8A]">
                  Instant Job Alerts
                </h3>
                <p className="text-gray-600 mt-4">
                  Get notified as soon as new jobs are posted that match your
                  criteria. Never miss out on a great opportunity again.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="bg-white shadow-lg rounded-none overflow-hidden border-2 border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl max-w-xs mx-auto">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#1E3A8A]">
                  Company Profiles
                </h3>
                <p className="text-gray-600 mt-4">
                  Explore detailed company profiles, including reviews, salaries,
                  and more, to make an informed decision about your next job.
                </p>
              </CardContent>
            </Card>

            {/* Card 4 */}
            <Card className="bg-white shadow-lg rounded-none overflow-hidden border-2 border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl max-w-xs mx-auto">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#1E3A8A]">
                  Easy Application
                </h3>
                <p className="text-gray-600 mt-4">
                  Apply for jobs quickly with just a few clicks using our easy
                  application process.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="bg-[#1E3A8A] text-white text-center py-6 mt-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-lg font-bold">JOBIFY</div>
              <div className="space-x-4 mt-2 md:mt-0">
                <a href="/" className="text-gray-100 hover:text-white">
                  Home
                </a>
                <a href="/signup" className="text-gray-100 hover:text-white">
                  Sign up
                </a>
                <a href="/login" className="text-gray-100 hover:text-white">
                  Login
                </a>
              </div>
            </div>
            <p className="mt-4 text-gray-100">
              &copy; 2025 Jobify. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Navbar;