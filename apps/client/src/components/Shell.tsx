import { PropsWithChildren } from 'react'

interface ShellProps extends PropsWithChildren {
  //
}

export const Shell = ({ children }: ShellProps) => {
  return <div className="grid items-start gap-8">{children}</div>
}
