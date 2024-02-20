import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThirdPartyPasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartypasswordless/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/passwordless";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        appName: "Muezzyn",
        apiDomain: "https://staging.api.muezzyn.com",
        websiteDomain: "https://mz-test.vercel.app",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        ThirdPartyPasswordless.init({
            contactMethod: "EMAIL",
            signInUpFeature: {
                providers: [
                    ThirdPartyPasswordless.Google.init(),
                ],
            }
        }),
        Session.init()
    ]
});

function App() {
  
        async function handleLogout() {
            try {
                await signOut();
                // Redirect or do any other action upon successful logout



            } catch (error) {
                console.error("Error during logout:", error);
            }
        }
   

    function NavBar({ onLogout }) {
        return (
            <ul>
                <li>Home</li>
                <li onClick={onLogout}>Logout</li>
            </ul>
        );
    }

    return (
        <SuperTokensWrapper>
            <BrowserRouter>
                <Routes>
                    {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyPasswordlessPreBuiltUI])}

                    <Route path="/" element={
                        <SessionAuth>
                            {/*Components that require to be protected by authentication*/}
                            <div>
                                <NavBar onLogout={handleLogout} />
                                Hello this is home
                            </div>
                        </SessionAuth>
                    } />
                </Routes>
            </BrowserRouter>
        </SuperTokensWrapper>
    );
}

export default App;