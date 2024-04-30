import _ from "lodash";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigateLink = (): ((navigateLink: string) => void) => {
  const [navigateLink, setNavigateLink] = useState<string>("");
  const [trigger, setTrigger] = useState<Date | null>(null);

  const navigate = useNavigate();

  const navigateCb = useCallback(
    (link: string): void => {
      setNavigateLink(link);
      setTrigger(new Date());
    },
    [navigateLink],
  );

  useEffect(() => {
    if (!_.isEmpty(navigateLink)) {
      navigate(navigateLink);
    }
  }, [navigateLink, trigger]);

  return navigateCb;
};
