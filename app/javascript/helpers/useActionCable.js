import React, { useEffect, useMemo } from "react";
import { createConsumer } from "@rails/actioncable";

export default function useActionCable() {
  const actionCable = useMemo(() => createConsumer(), []);

  useEffect(() => {
    return () => {
      console.log("Disconnect Action Cable");
      actionCable.disconnect();
    };
  }, []);

  return actionCable;
}
