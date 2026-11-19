const problems = [
  {
    title: "Who is actually coming?",
    body: "The name on the booking is not always the person at the door. There is little to check before the visit, and no shared record of who did the work.",
  },
  {
    title: "What will it cost?",
    body: "The quote is vague, the final amount appears late, and the gap between the two is explained only after the repair is underway.",
  },
  {
    title: "What is happening now?",
    body: "Updates depend on phone calls and messages. The customer is usually the last person to know where the repair actually stands.",
  },
  {
    title: "Why pay before the result?",
    body: "Money often changes hands before the customer can see whether the repair worked, leaving little leverage if something is wrong.",
  },
]

export function AboutProblem() {
  return (
    <section
      className="scroll-mt-24 bg-ink py-16 text-paper sm:py-20 lg:py-24"
      id="problem"
    >
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2 className="type-h1 max-w-[13ch] text-paper">
            The repair runaround is a design problem.
          </h2>
          <p className="max-w-[55ch] text-base leading-7 text-sage lg:justify-self-end">
            The work itself is not the hard part. The hard part is the
            not-knowing: who has your device, what it will cost, when it will be
            ready, and why you are paying before you can see the result.
          </p>
        </div>

        <div className="mt-12 grid gap-x-12 sm:grid-cols-2">
          {problems.map((problem) => (
            <div className="border-t border-white/15 py-7" key={problem.title}>
              <h3 className="text-lg font-semibold text-paper">
                {problem.title}
              </h3>
              <p className="mt-2 max-w-[46ch] text-sm leading-6 text-sage">
                {problem.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-[62ch] text-base leading-7 text-sage">
          FixMate changes the order:{" "}
          <span className="text-paper">information first, payment last.</span>{" "}
          The technician, the status, and the final amount are visible before
          money moves.
        </p>
      </div>
    </section>
  )
}
