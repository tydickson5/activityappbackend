import { useState } from "react"

type Props = {
  password: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Password({ password, onChange}: Props) {

    const [confirmPassword, setConfirmPassword] = useState("")



        
    return (
        <div>
        <p>{password}</p>

        <input
            type="password"
            value={password ?? ""}
            onChange={onChange}
            placeholder="Enter email"
        />
        <input
            type="password"
            value={confirmPassword ?? ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter email"
        />

        </div>
    )
}