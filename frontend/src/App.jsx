import { useState } from "react";

function App() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [people, setPeople] = useState("");
  const [budget, setBudget] = useState("");
  const [interests, setInterests] = useState([]);
  const [tripPlan, setTripPlan] = useState(null);
  const [message, setMessage] = useState("");

  const availableInterests = [
    { name: "Beaches", icon: "🏖️" },
    { name: "Adventure", icon: "🏔️" },
    { name: "Food", icon: "🍜" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Nature", icon: "🌿" },
    { name: "History", icon: "🏛️" },
  ];

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const planTrip = async () => {
    if (!destination || !days || !people || !budget) {
      setMessage("⚠️ Please fill in all trip details.");
      return;
    }

    setMessage("✨ Creating your personalized trip...");
    setTripPlan(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/plan-trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination: destination,
            days: Number(days),
            people: Number(people),
            budget: Number(budget),
            interests: interests,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setTripPlan(data);
      setMessage("");
    } catch (error) {
      console.error(error);

      setMessage(
        "❌ Could not connect to the backend. Make sure FastAPI is running."
      );
    }
  };

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">

          <div className="logo-icon">
            ✈️
          </div>

          <div>
            <h2>TravelAI</h2>
            <small>Smart Travel Planning</small>
          </div>

        </div>

        <div className="nav-links">
          <span>Home</span>
          <span>Features</span>
          <span>About</span>
        </div>

        <button
          className="nav-button"
          onClick={() => {
            document
              .querySelector(".planner-card")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
        >
          Start Planning
        </button>

      </nav>


      <section className="hero-section">

        <div className="hero-content">

          <div className="badge">
            ✨ AI-Powered Travel Planner
          </div>

          <h1>
            Your Journey.
            <br />
            <span>Perfectly Planned.</span>
          </h1>

          <p>
            Tell us where you want to go, your budget and what you love.
            TravelAI creates a personalized travel experience for you.
          </p>

          <div className="hero-stats">

            <div>
              <strong>🤖 AI</strong>
              <span>Smart Planning</span>
            </div>

            <div>
              <strong>💰 Budget</strong>
              <span>Optimization</span>
            </div>

            <div>
              <strong>🗺️ Trips</strong>
              <span>Personalized</span>
            </div>

          </div>

        </div>


        <div className="planner-wrapper">

          <div className="planner-card">

            <div className="card-header">

              <div>

                <span className="card-label">
                  PLAN YOUR TRIP
                </span>

                <h2>
                  Where are you going?
                </h2>

              </div>

              <div className="sparkle">
                ✨
              </div>

            </div>


            <label>
              📍 Destination
            </label>

            <input
              className="modern-input"
              type="text"
              placeholder="Goa, Kerala, Manali..."
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />


            <div className="input-row">

              <div>

                <label>
                  📅 Days
                </label>

                <input
                  className="modern-input"
                  type="number"
                  min="1"
                  placeholder="4"
                  value={days}
                  onChange={(e) => {
                    setDays(e.target.value);
                  }}
                />

              </div>


              <div>

                <label>
                  👥 Travelers
                </label>

                <input
                  className="modern-input"
                  type="number"
                  min="1"
                  placeholder="2"
                  value={people}
                  onChange={(e) => {
                    setPeople(e.target.value);
                  }}
                />

              </div>

            </div>


            <label>
              💰 Your Budget
            </label>

            <div className="budget-input">

              <span>₹</span>

              <input
                type="number"
                min="1"
                placeholder="20000"
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value);
                }}
              />

            </div>


            <label>
              ❤️ What do you love?
            </label>

            <div className="interest-grid">

              {availableInterests.map((interest) => (

                <button
                  key={interest.name}
                  type="button"
                  className={
                    interests.includes(interest.name)
                      ? "interest-card active"
                      : "interest-card"
                  }
                  onClick={() => {
                    toggleInterest(interest.name);
                  }}
                >

                  <span>
                    {interest.icon}
                  </span>

                  {interest.name}

                </button>

              ))}

            </div>


            <button
              className="plan-button"
              onClick={planTrip}
            >

              <span>✨</span>

              Plan My Trip

              <span>→</span>

            </button>


            {message && (

              <div className="status-message">
                {message}
              </div>

            )}

          </div>

        </div>

      </section>


      <section className="features-section">

        <div className="section-heading">

          <span>
            WHY TRAVELAI?
          </span>

          <h2>
            Travel planning, made intelligent.
          </h2>

          <p>
            Everything you need to create the perfect trip.
          </p>

        </div>


        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🤖
            </div>

            <h3>
              AI-Powered Itinerary
            </h3>

            <p>
              Get a personalized day-by-day travel plan
              based on your destination and interests.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              💰
            </div>

            <h3>
              Smart Budgeting
            </h3>

            <p>
              Optimize your travel budget across hotels,
              food, activities and transportation.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Personalized
            </h3>

            <p>
              Your interests guide the recommendations
              so every trip feels uniquely yours.
            </p>

          </div>

        </div>

      </section>


      {tripPlan && (

        <section className="result-section">

          <div className="result-header">

            <span>
              ✨ YOUR AI TRAVEL PLAN
            </span>

            <h2>
              Your trip to{" "}
              <strong>
                {tripPlan.destination}
              </strong>
            </h2>

            <p>
              A personalized {tripPlan.days}-day
              adventure created for you.
            </p>

          </div>


          <div className="summary-grid">

            <div className="summary-card">

              <span>📍</span>

              <small>
                DESTINATION
              </small>

              <strong>
                {tripPlan.destination}
              </strong>

            </div>


            <div className="summary-card">

              <span>📅</span>

              <small>
                DURATION
              </small>

              <strong>
                {tripPlan.days} Days
              </strong>

            </div>


            <div className="summary-card">

              <span>👥</span>

              <small>
                TRAVELERS
              </small>

              <strong>
                {tripPlan.people}
              </strong>

            </div>


            <div className="summary-card">

              <span>💰</span>

              <small>
                TOTAL BUDGET
              </small>

              <strong>
                ₹
                {Number(
                  tripPlan.total_budget || 0
                ).toLocaleString("en-IN")}
              </strong>

            </div>

          </div>


          {tripPlan.budget_breakdown && (

            <div className="result-block">

              <h3>
                💰 Budget Breakdown
              </h3>

              <div className="summary-grid">

                <div className="summary-card">

                  <small>
                    🏨 ACCOMMODATION
                  </small>

                  <strong>
                    ₹
                    {Number(
                      tripPlan.budget_breakdown.accommodation || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>


                <div className="summary-card">

                  <small>
                    🍴 FOOD
                  </small>

                  <strong>
                    ₹
                    {Number(
                      tripPlan.budget_breakdown.food || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>


                <div className="summary-card">

                  <small>
                    🚕 TRANSPORT
                  </small>

                  <strong>
                    ₹
                    {Number(
                      tripPlan.budget_breakdown.transportation || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>


                <div className="summary-card">

                  <small>
                    🎯 ACTIVITIES
                  </small>

                  <strong>
                    ₹
                    {Number(
                      tripPlan.budget_breakdown.activities || 0
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>

              </div>

            </div>

          )}


          <div className="result-block">

            <h3>
              ❤️ Your Travel Style
            </h3>

            <div className="result-interests">

              {tripPlan.interests &&
              tripPlan.interests.length > 0 ? (

                tripPlan.interests.map((interest) => (

                  <span key={interest}>
                    {interest}
                  </span>

                ))

              ) : (

                <span>
                  🌎 Explorer
                </span>

              )}

            </div>

          </div>


          <div className="result-block">

            <div className="itinerary-title">

              <div>

                <span>
                  YOUR JOURNEY
                </span>

                <h3>
                  🤖 AI-Generated Itinerary
                </h3>

              </div>

              <div className="daily-budget">

                ₹
                {Number(
                  tripPlan.daily_budget || 0
                ).toLocaleString("en-IN")}

                /day

              </div>

            </div>


            <div className="ai-itinerary">

              {Array.isArray(tripPlan.ai_itinerary) ? (

                tripPlan.ai_itinerary.map(
                  (day, index) => (

                    <div
                      className="day-card"
                      key={index}
                    >

                      <h3>
                        📅 Day {day.day || index + 1}
                      </h3>

                      <p>
                        🌅 <strong>Morning:</strong>{" "}
                        {day.morning}
                      </p>

                      <p>
                        ☀️ <strong>Afternoon:</strong>{" "}
                        {day.afternoon}
                      </p>

                      <p>
                        🌙 <strong>Evening:</strong>{" "}
                        {day.evening}
                      </p>

                      <p>
                        💰 <strong>Estimated Budget:</strong>{" "}
                        ₹
                        {Number(
                          day.estimated_budget || 0
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  )
                )

              ) : (

                <p>
                  {tripPlan.ai_itinerary}
                </p>

              )}

            </div>

          </div>

        </section>

      )}


      <footer>

        <div className="footer-logo">
          ✈️ TravelAI
        </div>

        <p>
          Plan smarter. Travel better. Explore more.
        </p>

        <small>
          © 2026 TravelAI — AI-Powered Travel Planner
        </small>

      </footer>

    </div>
  );
}

export default App;

