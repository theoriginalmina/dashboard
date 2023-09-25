import { useContext, useState, useEffect, createContext } from "react";
import { supabase } from "supabaseClient.js";
import checkIfValidUser from "hooks/checkIfValidUser";

// create a context for authentication
const AuthContext = createContext({
  session: null,
  user: null,
  signOut: () => {},
  isUserLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;

      // console.log("session", session);

      if (session?.provider_token) {
        const oAuthToken = session.provider_token;

        const { data, error } = await supabase.auth.updateUser({
          data: { oAuthToken },
        });
        if (error) {
          console.log(error);
        }

        const valid = await checkIfValidUser(oAuthToken);

        console.log("valid", valid);

        if (valid) {
          setSession(session);
          setUser(session?.user);
          setLoading(false);
        } else {
          setSession(null);
          setUser("non_valid_user");
          setLoading(false);
        }
      } else {
        if (session) {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          const oAuthToken = user.user_metadata.oAuthToken;

          const valid = await checkIfValidUser(oAuthToken);

          if (valid) {
            setSession(session);
            setUser(session?.user);
            setLoading(false);
          } else {
            setSession(null);
            setUser("non_valid_user");
            setLoading(false);
          }
        }
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("onAuthStateChange");
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    });

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    signOut: () => supabase.auth.signOut(),
  };

  // use a provider to pass down the value
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
