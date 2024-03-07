import { useEffect, useMemo } from "react";
import { createConsumer } from "@rails/actioncable";

export function useActionCable() {
  const actionCable = useMemo(() => createConsumer(), []);

  useEffect(() => {
    return () => {
      console.log("Disconnect Action Cable");
      actionCable.disconnect();
    };
  }, []);

  return actionCable;
}
