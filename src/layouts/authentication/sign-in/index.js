import { useEffect, useState } from "react";
import { supabase } from "supabaseClient.js";

import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signInImage.png";
import { useAuth } from "hooks/Auth";
import { Navigate } from "react-router-dom";

function SignIn() {
  // const { user } = useAuth();

  // if (user) {
  //   return <Navigate to="/" />;
  // }
  const [session, setSession] = useState();

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        scopes: "guilds guilds.members.read",
      },
    });
    if (error) throw error;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <CoverLayout
      title="WELCOME, ENTREPRENEUR!"
      color="white"
      description="You must be a member of Imperial Alpha to access the dashboard. Login via Discord to sign in! "
      premotto=""
      motto=""
      image={bgSignIn}
    >
      <VuiBox component="form" role="form">
        <VuiButton color="info" onClick={handleSignIn}>
          Login to Discord
        </VuiButton>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
