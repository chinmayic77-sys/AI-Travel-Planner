from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI
import os
import uvicorn

# Load .env file
load_dotenv()

# OpenAI client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Trip data
class TripRequest(BaseModel):
    destination: str
    days: int
    people: int
    budget: float
    interests: list[str]


# Test backend
@app.get("/")
def home():
    return {
        "message": "AI Travel Planner Backend is Running!"
    }


# AI Travel Planner
@app.post("/plan-trip")
def plan_trip(trip: TripRequest):

    interest_text = ", ".join(trip.interests)

    prompt = f"""
Create a travel itinerary for:

Destination: {trip.destination}
Number of days: {trip.days}
Number of travelers: {trip.people}
Budget: ₹{trip.budget}
Interests: {interest_text}

Create a practical day-by-day travel plan.

For every day include:

Morning:
Afternoon:
Evening:

Keep the plan suitable for the given budget and interests.

Give simple and useful travel suggestions.
"""

    response = client.responses.create(
        model="gpt-6-astra",
        input=prompt
    )

    ai_itinerary = response.output_text

    return {
        "destination": trip.destination,
        "days": trip.days,
        "people": trip.people,
        "total_budget": trip.budget,
        "interests": trip.interests,
        "ai_itinerary": ai_itinerary
    }


# Start server
if __name__ == "__main__":
    uvicorn.run(
        app,
        host="127.0.0.1",
        port=8000
    )