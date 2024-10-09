// useReferral.js
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useReferral = () => {
  const location = useLocation();
  const [referralId, setReferralId] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    console.log("Referral", ref);
    if (ref && /[A-Za-z0-9]+/i.test(ref)) {
      // Validate ObjectId
      setReferralId(ref);
      localStorage.setItem("referralId", ref);
    } else {
      const storedRef = localStorage.getItem("referralId");
      if (storedRef) {
        setReferralId(storedRef);
      }
    }
  }, [location]);

  return referralId;
};

export default useReferral;
