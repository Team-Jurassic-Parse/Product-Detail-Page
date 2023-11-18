# Product-Detail-Page
Front end capstone project that replicates an online retail store's product details page

# Overview
Our outdated client-facing retail web-portal has become significantly outdated and has been proven to be hurting sales numbers. Project Atelier comprises a complete redesign of the retail portal designed to address this concern and modernize the site.

# How to run the app locally:
1. Open your terminal in the downloaded repository.
2. Run the command `npm install`
3. Run the command `npm start`
4. Paste this link into a browser: http://localhost:3000/


# Custom Hooks Documentation

useServerFetch(method, endpoint, controller)

method: The method of the request you are making.
endpoint: The server endpoint for the request (what comes after .../hr-rfp/)
?body: The body for the request
?controller: The AbortController used to cancel the request (if necessary)

returns : <Promise> with the same resolution value as an axios fetch request

This hook can be used to directly replace your axios get requests.
