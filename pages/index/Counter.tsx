import React, { useState } from "react";
import { onLogin } from "@/functions/onLogin.telefunc";
import { onRegister } from "@/functions/onRegister.telefunc";
import { onCheckSession } from "@/functions/onCheckSession.telefunc";
import { onCreateHeadquarters } from "@/functions/Headquarters/onCreateHeadquarters.telefunc";

export function Counter() {

  return (
    <>
    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
    <button onClick={() => onRegister({email: "test@test.com", password: "123456", name: "test"})}>
      reg
    </button>
    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
    <button onClick={() => onLogin({email: "test@test.com", password: "123456"})}>
      login
    </button>
    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
    <button onClick={() => onCheckSession()}>
      check
    </button>
    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
    <button onClick={() => onCreateHeadquarters({ name: "test", description: "test", city: "test", country: "test"})}>
      create heaquarter
    </button>
    </>
  );
}
