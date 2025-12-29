import { useEffect, useState } from "react";

import { useAuth } from "./useAuth";
import { fetchUserProfile } from "@/features/auth/services";

export type UserProfile = {
  name?: string;
  role?: string;
  createdAt?: { toDate?: () => Date } | Date | string;
};

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchUserProfile(user.uid)
      .then((data) => {
        setProfile(data);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return { profile, loading };
};

