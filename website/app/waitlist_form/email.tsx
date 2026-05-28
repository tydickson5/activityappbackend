type Props = {
  email: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Email({ email, onChange}: Props) {
  return (
    <div>
      <p>{email}</p>

      <input
        type="email"
        value={email ?? ""}
        onChange={onChange}
        placeholder="Enter email"
      />

    </div>
  )
}