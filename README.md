# Movie Explorer - React Application

## Overview

Movie Explorer is a responsive web application built with React that allows users to:

Browse trending movies

Search for movies by title

View detailed movie information

Save favorite movies

Toggle between light and dark themes

## Features
### Core Functionality

Movie Browser: View trending movies on the homepage

Detailed View: See comprehensive movie details including:

Cast information

Trailers

Ratings

Runtime

Favorites System: Save and manage your favorite movies

### Search & Filter
Search movies by title

Filter by:

Genre

Release year range

Rating range

### UI Features
Responsive design for all screen sizes

Light/dark theme toggle

Clean, modern interface

Loading states and error handling

## Technologies Used

### Frontend:

React (v18+)

React Router (v6+)

Material-UI (v5+)

Axios for API calls

### State Management:

React Context API

Local Storage (for persisting favorites)

### API:

The Movie Database (TMDB) API

## Installation
Clone the repository:

bash
git clone https://github.com/yourusername/movie-explorer.git

Navigate to the project directory:

bash
cd movie-explorer
Install dependencies:

bash
npm install
Create a .env file in the root directory and add your TMDB API key:

env
REACT_APP_TMDB_API_KEY=your_api_key_here
Start the development server:

bash
npm start
Open your browser to:

http://localhost:3000

## Dependencies

Major dependencies include:

@mui/material: UI components

@mui/icons-material: Icons

axios: HTTP client

react-router-dom: Routing

## Acknowledgments

The Movie Database (TMDB) for their excellent API

Material-UI for the component library

Create React App for the project scaffolding
