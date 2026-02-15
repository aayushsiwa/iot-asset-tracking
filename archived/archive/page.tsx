// "use client";

// import React, { useEffect, useState } from "react";
// import { supabase } from "@/lib/utils/supabaseClient";
// import { Rows2 } from "@/lib/utils/rows";
// // import { ArchivedItem } from "@/types/Assets";
// import Toast from "@/components/Toast";

// const Archive: React.FC = () => {
//   const [archivedData, setArchivedData] = useState<ArchivedItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetchArchivedData();
//   }, []);

//   const fetchArchivedData = async () => {
//     setLoading(true);

//     try {
//       const { data, error } = await supabase
//         .schema("iot")
//         .from("archive")
//         .select()
//         .order("createdAt", { ascending: false });

//       if (error) throw error;

//       setArchivedData(data || []);
//     } catch (error: any) {
//       console.error("Error fetching archived data:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto font-mono py-20">
//       {!loading && archivedData.length === 0 && (
//         <Toast
//           message="No Archives found"
//           bgColor="bg-red-500"
//           textColor="text-white"
//           duration={10000}
//         />
//       )}

//       <h1 className="text-3xl font-bold dark:text-white">Asset Archive</h1>

//       <div className="flex justify-center mt-6">
//         <div className="overflow-x-auto w-full">
//           <table className="table-fixed w-full border-collapse border-white border-b-2">
//             <thead className="sticky top-0 z-10">
//               <tr className="bg-black text-white border-b-2 border-slate-700">
//                 <th className="p-3 text-center">Name</th>
//                 <th className="p-3 text-center">Status Changed At</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <Rows2 />
//               ) : (
//                 archivedData.length > 0 &&
//                 archivedData.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="border-b-2 border-slate-700 dark:text-white text-center"
//                   >
//                     <td className="p-3">{item.name}</td>
//                     <td className="p-3">
//                       {new Date(item.createdAt).toLocaleString("en-US", {
//                         dateStyle: "medium",
//                         timeStyle: "short",
//                       })}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Archive;
