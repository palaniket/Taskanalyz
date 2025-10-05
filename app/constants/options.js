// export const AI_PROMPT="Generate Travel plan for Location: {location}, for {totalDays} Days for {traveler}  with a {budget} budget,give me hotel options list with HotelName,Hotel address, Price, hotel image url, geo coordinates, rating, description and suggest itinerary with placeName, placeDetail, place Image url, Geo Coordinates, ticket pricing, Time travel each of the location for {totalDays} days  with each day plan(activities) with best time to visit(time duration) each location in the JSON format.Keep the format same in every response."
export const AI_PROMPT=`
You are an expert task analyzer AI.

Task Description:
{description}

User Prompt:
{user_prompt}

Previous Analysis Summary:
{previous_results}

Instructions:
1. First, provide a detailed, well-formatted answer to the user's prompt about this task. Use headings, bullet points, and short paragraphs for clarity.
2. Then, create a "Summary" section that combines the current analysis and previous results for this task. Highlight key insights, changes, and recommendations.

Format your response as follows:

---
## Analysis

{Your detailed, formatted answer here}

---
## Summary

{Combined summary of current and previous results, including key points and recommendations}

`
