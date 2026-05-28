type Props = {
  email: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Inputs({ email, onEmailChange, password,  onPasswordChange}: Props) {
  return (
    <div>
      <p>{email}</p>

      <input
        value={email ?? ""}
        onChange={onEmailChange}
        placeholder="Enter email"
      />
      <input
        type="password"
        value={password ?? ""}
        onChange={onPasswordChange}
        placeholder="Enter password"
      />
    </div>
  )
}