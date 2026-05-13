"use client"

import ComingSoon from "@/components/layouts/development/coming-soon";
import { useState } from "react";

export default function ForgotPasswordPage(){
  const [development, setDevelopment] = useState(true)

  return development ? <ComingSoon/> : <>Comming Soon</>
}