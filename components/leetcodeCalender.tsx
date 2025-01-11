// import React, { useState, useEffect } from 'react';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';

// type LeetCodeData = {
//     rating: number;
//     topPercentage: number;
//     count: number;
//     value: number
//   };
  
//   type CachedData = {
//     data: LeetCodeData | null;
//     timestamp: number;
//   };

// function LeetCodeCalendar() {
//   const [data, setData] = useState<LeetCodeData | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//         const response = await fetch('/api/leetcode');
//         const data = await response.json();
//         setData(data);
//     }
//     fetchData();
//   }, []);

//   return (
//     <CalendarHeatmap
//       values={data?.value}
//       blockSize={12}
//       blockMargin={2}
//       fontSize={10}
//       // ... other props for customization
//     />
//   );
// }

// export default LeetCodeCalendar;