# Stefan Jordan - Metrolina Greenhouses Frontend Assessment

## Instructions:
1. Clone this repository to your local machine
2. Open your terminal and navigate to the root directory
3. Run `npm i` to install all dependencies
4. Create your own `.env.local` file and use your apiKey: `NEXT_PUBLIC_API_KEY="###"`
5. Run `npm run build` to create a production version
6. Run `npm start` and open your browser to http://localhost:3000 
7. Or skip steps 5 & 6 and run `npm run dev` and open your browser to http://localhost:3000

## Built with: 
- Next.js
- React
- TypeScript
- Tailwind
- Flowbite
- Tanstack Query
- React-Hook-Form
- Yup
- React-Tooltip, React-Scroll, React-Loading
- HeroIcon

## Notes:
- I hate CORS
- Created proxy api's to submit all fetch requests to metrolina API to bypass CORS 
- api/Test/EditItem changes the itemKey on it's own
- Had to manually remove spaces and place %20 to match API query string 
    - encodeURIComponent() was replacing with %2520
    - URLSearchParams() replaces spaces with +
- Displayed items are sorted by itemKey
- Fully responsive design
- Double check for deleting an item

## Stretch: 
- Tons of items? Lazy loading? Pagination?
- Add animation after deleting an item
- Edit market locations
- Sort, search, filter inventory

---
# Directions
## Tasks: 
1. [X] Use the GET endpoint to display a scrollable list of items.
2. [X] Items should be dismissible and post to the API.
3. [X] Users should be able to create items the item list with only an item number and description.
4. [X] Create a way to allow users to edit the item list (not the inventory values).
5. [X] Upon selecting an item, an alert dialog (or similar pop-up widget) will display the store locations and inventory values.

## Requirements
- [X] All inputs must be validated. *UPC check digit validation not required.*
- [X] If using a web view, your page scale well the following mobile devices and monitor displays:
- [X] iPhone 6/7/8, iPhone SE, iPhone 12/13 Pro Max, iPad, iPad Pro 12.9-inch, 1080p, 1440p
- [X] All tasks must be tested from your application prior to submission.
