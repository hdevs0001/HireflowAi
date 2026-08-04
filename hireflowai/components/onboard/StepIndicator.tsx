interface Props {
  current: number;
}

export default function StepIndicator({ current }: Props) {
  const steps = ["Company", "Email", "Address"];

  return (
    <div className="flex justify-center gap-6 mb-10">
      {steps.map((step, index) => {
        const active = current === index + 1;

        return (
          <div
            key={step}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`h-10 w-10 rounded-full border flex items-center justify-center font-semibold transition

              ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted"
              }`}
            >
              {index + 1}
            </div>

            <span
              className={`text-sm ${
                active && "font-semibold"
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}