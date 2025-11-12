# Junction Hackathon Project — Pond Surveillance System

This project is a **web application powered by Next.js**, created for the Junction Hackathon.  
It is designed as a **surveillance system for pond farms**, allowing pond owners and administrators to monitor water quality, fish health, and environmental conditions in real-time.

---

## Overview

The Pond Surveillance System enables:

- Pond owners to **track water quality and environmental levels** in their ponds.  
- Automatic detection of **fluctuations in critical parameters**.  
- Alerts via **email and SMS** if levels exceed the standard thresholds.  
- Assessment of **whether a certain fish species can thrive** in a pond based on detected conditions.  

It combines **Next.js frontend**, a **backend database**, and **sensor integration** to provide real-time monitoring and actionable insights.

---

## Features

- **User Management:**  
  - Users are owners or admins (representing the company).  
  - Sign-in requires proof of ownership: contract upload + pond location on a map + standard level specification.

- **Database Tables:**  
  - Users (owners/admins)  
  - Pond standard levels and quality  
  - Fish and their living requirements  
  - Bacteria types and percentages per pond  
  - Sensor readings for current levels/percentages  

- **Dashboard:**  
  - Interactive charts showing fluctuations of pond levels over time  
  - Select specific parameters to visualize the chart you want  

- **Alert System:**  
  - Email and SMS alerts when readings surpass standard levels  

- **Fish Viability Section:**  
  - Checks whether a specific fish species can survive in the pond environment  

---

## Tech Stack

- **Frontend:** Next.js, React, CSS/Tailwind  
- **Backend:** Node.js / Express (API routes for data handling)  
- **Database:** PostgreSQL (or dummy JSON for development)  
- **Authentication:** NextAuth.js or custom auth logic  
- **Notifications:** Email + SMS via API (Twilio, SendGrid, etc.)  

---

## Setup and Usage

1. Clone the repository:  
```
git clone https://github.com/your-username/junction-pond-surveillance.git
cd junction-pond-surveillance
```

2. Install dependencies:
```
npm install
```
3. Set up environment variables for database and notification API keys.

4. Run the development server:
```
npm run dev
```
5. Open http://localhost:3000 in your browser.

## Future Enhancements

- Full integration with real-time sensor feeds

- Advanced predictive analytics for pond health

- Multi-pond support with combined dashboards

- Customizable alert thresholds per user/pond



