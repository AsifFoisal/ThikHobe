import { Search } from "lucide-react"

interface SearchInputProps {
  id: string
  label?: string
  name?: string
  placeholder?: string
  defaultValue?: string
  className?: string
}

export function SearchInput({
  id,
  label = "Search",
  name,
  placeholder = "Search…",
  defaultValue,
  className,
}: SearchInputProps) {
  return (
    <div className={className}>
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-ink"
        />
        <input
          autoComplete="off"
          className="h-10 w-full rounded-[0.625rem] border border-line-strong bg-card pr-3 pl-10 text-sm text-ink transition-colors placeholder:text-muted-ink focus-visible:border-fern focus-visible:ring-2 focus-visible:ring-fern/20 focus-visible:outline-none"
          defaultValue={defaultValue}
          id={id}
          name={name}
          placeholder={placeholder}
          type="search"
        />
      </div>
    </div>
  )
}
