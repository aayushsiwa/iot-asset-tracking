// "use client";
// import React from "react";
// import { supabase } from "../lib/helper/supabaseClient";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";

// function page() {
//     const loginGitHub = async () => {
//         const { data, error } = await supabase.auth.signInWithOAuth({
//             provider:"github",
//             options: {
//                 redirectTo: `../auth/callback`,
//             },
//         });
//     };
//     // async function signOut() {
//     //     const { error } = await supabase.auth.signOut();
//     // }

//     return (
//         <>
//             <button className="border-2 hover:bg-zinc-700" onClick={loginGitHub}>
//                 Login with github
//             </button>
//             {/* <Auth
//                 supabaseClient={supabase}
//                 appearance={{ theme: ThemeSupa }}
//                 providers={["github"]}
//                 localization={{
//                     variables: {
//                         sign_in: {
//                             email_label: "Your email address",
//                             password_label: "Your strong password",
//                         },
//                         sign_up: {
//                             email_label: "Your email address",
//                         },
//                     },
//                 }}
//             /> */}
//         </>
//     );
// }

// export default page;
