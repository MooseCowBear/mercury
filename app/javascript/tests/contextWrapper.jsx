import { render } from "@testing-library/react";
import React from "react";

import { PrivateChatsContext } from "../frontend/contexts/PrivateChatsContext";
import { PublicChatsContext } from "../frontend/contexts/PublicChatsContext";
import { UserInfoContext } from "../frontend/contexts/UserInfoContext";
import { VisibilityContext } from "../frontend/contexts/VisibilityContext";
import { ActionCableContext } from "../frontend/contexts/ActionCableContext";

const CONTEXT_MAP = {
  PrivateChatsContext,
  PublicChatsContext,
  UserInfoContext,
  VisibilityContext,
  ActionCableContext,
};

const setupComponent = (component, renderOptions) => {
  const { withContext } = renderOptions;

  if (!renderOptions) return component;

  return (
    <>
      {renderOptions.reduceRight((acc, { context, contextValue }) => {
        const Ctx = CONTEXT_MAP[context];
        return <Ctx.Provider value={contextValue}>{acc}</Ctx.Provider>;
      }, component)}
    </>
  );
};

export const renderWithContexts = (component, renderOptions) => {
  try {
    return render(setupComponent(component, renderOptions));
  } catch (error) {
    throw new Error("Render rest util error");
  }
};
