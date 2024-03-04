import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'focus-visible:outline-bg-grey flex h-10 items-center rounded-lg bg-raisin px-4 text-sm font-medium transition-colors hover:bg-grey focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-grey aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}
