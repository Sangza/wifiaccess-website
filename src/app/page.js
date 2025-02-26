"use client";
import React, { useEffect, useState } from "react";

function MainComponent() {
  const [searchLocation, setSearchLocation] = useState("");
  const [spots] = useState([
    {
      id: 1,
      title: "Unlimited Internet",
      location: "Enugu State College of Medicine Hostel 1",
      price_per_day: 1500,
      speed_mbps: 100,
    },
    {
      id: 2,
      title: "Godspeed Internet",
      location: "Enugu State College of Medicine Hostel 2 and 3",
      price_per_day: 1500,
      speed_mbps: 100,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMobileBanner, setShowMobileBanner] = useState(false);

  useEffect(() => {
    const loadSpots = async () => {
      try {
        const response = await fetch("/api/wifi-spots/list", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to load WiFi spots");
        }
        const data = await response.json();
        setSpots(data.spots?.slice(0, 3) || []);
      } catch (err) {
        setError("Could not load featured spots");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowMobileBanner(scrollPosition > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchLocation) {
      window.location.href = `/browse?location=${encodeURIComponent(
        searchLocation
      )}`;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative px-4 py-20 md:py-32">
        <img
          src="/images/diverse-wifi-table.jpg"
          alt="Diverse group of people working together around a table with WiFi connectivity"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-blue-800/95"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sigmar">
            Share Your WiFi, Earn Money
          </h1>
          <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto font-sigmar">
            Keep your community connected through your internet
          </p>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto font-sigmar">
            The marketplace for sharing and accessing WiFi spots anywhere,
            anytime
          </p>

          <p className="text-xl text-white mb-4 font-sigmar">
            Or search for spots on the web
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter location to find WiFi spots..."
                className="flex-1 px-4 py-3 rounded-md border-2 border-blue-400 bg-white text-blue-900 placeholder-blue-300 focus:outline-none focus:border-blue-500 font-sigmar"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 font-sigmar"
              >
                Search Spots
              </button>
            </div>
          </form>

          <a
          
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-sigmar"
          >
            List Your WiFi
          </a>
        </div>
      </div>

      {/* App Download Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 font-sigmar">
            Want to find and connect to a WiFi spot? Download our app
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              // href="#"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-sigmar"
            >
              <i className="fab fa-apple text-2xl mr-2"></i>
              Download on App Store
            </a>
            <a
              // href="#"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-sigmar"
            >
              <i className="fab fa-google-play text-2xl mr-2"></i>
              Get it on Google Play
            </a>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative bg-white dark:bg-gray-800 py-20">
        <img
          src="/images/city-wifi.jpg"
          alt="City silhouette with WiFi connectivity icons"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-white text-center mb-12 font-sigmar">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 border-2 border-blue-100 rounded-lg hover:border-blue-200 transition-colors bg-white/80 backdrop-blur-sm">
              <i className="fas fa-search text-4xl text-blue-600 dark:text-blue-400 mb-4"></i>
              <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-2 font-sigmar">
                Find nearby WiFi spots
              </h3>
              <p className="text-blue-800/80 dark:text-gray-300 font-sigmar">
                Search for available WiFi spots in your area
              </p>
            </div>

            <div className="p-6 border-2 border-blue-100 rounded-lg hover:border-blue-200 transition-colors bg-white/80 backdrop-blur-sm">
              <i className="fas fa-shield-alt text-4xl text-blue-600 dark:text-blue-400 mb-4"></i>
              <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-2 font-sigmar">
                Book secure access
              </h3>
              <p className="text-blue-800/80 dark:text-gray-300 font-sigmar">
                Reserve and pay for your chosen WiFi spot
              </p>
            </div>

            <div className="p-6 border-2 border-blue-100 rounded-lg hover:border-blue-200 transition-colors bg-white/80 backdrop-blur-sm">
              <i className="fas fa-wifi text-4xl text-blue-600 dark:text-blue-400 mb-4"></i>
              <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-2 font-sigmar">
                Connect instantly
              </h3>
              <p className="text-blue-800/80 dark:text-gray-300 font-sigmar">
                Get immediate access to fast and reliable WiFi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-white text-center mb-12 font-sigmar">
            Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/images/people-devices.jpg"
                alt="People using devices with WiFi connectivity"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-800/70 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-4 font-sigmar">
                  For WiFi Hosts
                </h3>
                <ul className="text-white/90 space-y-2 font-sigmar">
                  <li className="flex items-center">
                    <i className="fas fa-check mr-2"></i>
                    Turn unused bandwidth into income
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check mr-2"></i>
                    Help keep your community connected
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check mr-2"></i>
                    Share internet securely
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/images/people-devices.jpg"
                alt="People using devices with WiFi connectivity"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-800/70 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-4 font-sigmar">
                  For Guests
                </h3>
                <ul className="text-white/90 space-y-2 font-sigmar">
                  <li className="flex items-center">
                    <i className="fas fa-check mr-2"></i>
                    Find reliable WiFi anywhere
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check mr-2"></i>
                    Connect instantly
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check mr-2"></i>
                    Work and browse seamlessly
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="relative py-20 px-4">
        <img
          src="/images/people-computers.jpg"
          alt="People collaborating and using computers in a modern workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/90"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 font-sigmar">
            Join Our Growing Network of WiFi Sharers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="text-white/90 mb-4 font-sigmar">
                "We have used this to provide Unlimited internet access to 
                to student around our school."
              </p>
              <p className="text-white font-bold font-sigmar">
                - Uche Okenyi, Host
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="text-white/90 mb-4 font-sigmar">
                " I use unlimited Internet I get to access youtube videos 
                to help me study"
              </p>
              <p className="text-white font-bold font-sigmar">
                - Michael , Guest
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="text-white/90 mb-4 font-sigmar">
                "The platform is secure and easy to use. Great community!"
              </p>
              <p className="text-white font-bold font-sigmar">
                - Godspeed, Host
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Spots */}
      <div className="py-20 px-4 bg-blue-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 font-sigmar">
            Featured WiFi Spots
          </h2>

          {error && (
            <div className="text-center text-red-600 dark:text-red-400 mb-8 font-sigmar">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {spots.map((spot) => (
              <div
                key={spot.id}
                className="border-2 border-blue-100 hover:border-blue-200 transition-colors rounded-lg p-6 bg-white"
              >
                <h3 className="text-xl font-bold text-blue-900 dark:text-white mb-2 font-sigmar">
                  {spot.title}
                </h3>
                <p className="text-blue-800/80 dark:text-gray-300 mb-4 font-sigmar">
                  {spot.location}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-blue-600 dark:text-blue-400 font-bold font-sigmar">
                    N{spot.price_per_day}/day
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-sigmar">
                    <i className="fas fa-bolt mr-2"></i>
                    {spot.speed_mbps} Mbps
                  </p>
                </div>
                <a
                  // href=""
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-sigmar w-full text-center"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              // href=""
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-sigmar inline-block mr-4"
            >
              Browse All Spots
            </a>
            <a
              href=""
              className="px-6 py-3 border-2 border-blue-200 hover:border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 font-sigmar inline-block"
            >
              Become a Host
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 font-sigmar">WiFi Share</h3>
              <p className="text-white/80 mb-4 font-sigmar">
                Connecting communities through shared internet access.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/80 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white/80 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white/80 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white/80 hover:text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4 font-sigmar">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    // href=""
                    className="text-white/80 hover:text-white font-sigmar"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    // href=""
                    className="text-white/80 hover:text-white font-sigmar"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    // href=""
                    className="text-white/80 hover:text-white font-sigmar"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    // href=""
                    className="text-white/80 hover:text-white font-sigmar"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xl font-bold mb-4 font-sigmar">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    // href=""
                    className="text-white/80 hover:text-white font-sigmar"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    // href=""
                    className="text-white/80 hover:text-white font-sigmar"
                  >
                    Safety Center
                  </a>
                </li>
                <li>
                  <a
                    // href=""
                    className="text-white/80 hover:text-white font-sigmar"
                  >
                    Community Guidelines
                  </a>
                </li>
                <li>
                  <a
                    // href=""
                    className="text-white/80 hover:text-white font-sigmar"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-4 font-sigmar">Newsletter</h3>
              <p className="text-white/80 mb-4 font-sigmar">
                Subscribe to get the latest updates and news.
              </p>
              <form className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md bg-blue-800 text-white placeholder-white/60 border border-blue-700 focus:outline-none focus:border-blue-500 font-sigmar"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors font-sigmar"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-blue-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/80 text-sm font-sigmar">
                © 2025 WiFi Access. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  // href=""
                  className="text-white/80 hover:text-white text-sm font-sigmar"
                >
                  Terms of Service
                </a>
                <a
                  // href=""
                  className="text-white/80 hover:text-white text-sm font-sigmar"
                >
                  Privacy Policy
                </a>
                <a
                  // href=""
                  className="text-white/80 hover:text-white text-sm font-sigmar"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile App Banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 md:hidden transform transition-transform duration-300 ${
          showMobileBanner ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <p className="text-sm font-sigmar">Download our mobile app</p>
          <div className="flex gap-2">
            <a href="#" className="text-2xl">
              <i className="fab fa-apple"></i>
            </a>
            <a href="#" className="text-2xl">
              <i className="fab fa-google-play"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;