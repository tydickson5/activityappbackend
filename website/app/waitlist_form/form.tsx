'use client'

import { useState } from "react"
import { Email } from "./email"
import { Password } from "./password"
import { Submit } from "./submit"

export function Form() {
  const [email, setEmail] = useState("")
  //const [password, setPassword] = useState("")

  return (
    <div>
      <Email
        email={email}
        onChange={(e) => setEmail(e.target.value)}

      />
      <Submit email={email}></Submit>


    </div>
  )
}