interface ShellHeaderProps {
  heading: string
  description?: string
}

export const ShellHeader = ({ heading, description }: ShellHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold capitalize leading-6 text-slate-900 md:text-4xl">
        {heading}
      </h1>
      {description ? (
        <p className="mt-2 text-lg text-slate-500">{description}</p>
      ) : null}
    </div>
  )
}
