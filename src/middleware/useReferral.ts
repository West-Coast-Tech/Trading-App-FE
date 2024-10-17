import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../utils/API";
import Cookies from "js-cookie";

const useReferral = () => {
  const location = useLocation();
  const [referralId, setReferralId] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    const storedRef = localStorage.getItem("referralId");
    const cookieRef = Cookies.get("referralId");

    if (ref && /[A-Za-z0-9]+/i.test(ref)) {
      if (ref !== storedRef && ref !== cookieRef) {
        setReferralId(ref);
        localStorage.setItem("referralId", ref);
        Cookies.set("referralId", ref, { expires: 30 });

        try {
          const response = API.updateClicksForAffiliate(ref);
          console.log("Link click added successfully");
        } catch (error) {
          console.error("Error adding link click", error);
        }
      } else {
        console.log("Referral is the same, no need to update clicks");
      }
    } else if (cookieRef) {
      setReferralId(cookieRef);
    } else if (storedRef) {
      setReferralId(storedRef);
    }
  }, [location]);

  return referralId;
};

export default useReferral;
