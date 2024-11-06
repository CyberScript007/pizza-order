import { Link } from "react-router-dom";

function Button({ type, children, handleClick, to, disabled, className }) {
  const base =
    "inline-block uppercase bg-yellow-400 text-black text-sm rounded-full font-medium hover:bg-yellow-300 transition-all active:ring-offset-4 active:ring-2  active:ring-yellow-400 focus:ring-offset-4 focus:ring-2 focus:ring-yellow-400 disabled:cursor-not-allowed max-[300px]:text-xs";

  const styles = {
    primary: `${base} py-4 px-6 max-[640px]:py-2.5 max-[640px]:px-3.5`,
    secondary: `${base} py-2.5 px-5 text-xs font-bold max-[640px]:py-2 max-[640px]:px-3`,
    round: `${base} w-9 h-9 max-[640px]:w-7 max-[640px]:h-7`,
    clear: `uppercase text-sm font-bold trasition-all active:ring-offset-4 active:ring-2 active:ring-stone-300 text-stone-400 py-4 px-6 rounded-full border-2 hover:bg-stone-300 hover:text-stone-700 focus:ring-offset-4 focus:ring-2 focus:ring-stone-300  max-[640px]:py-2.5 max-[640px]:px-3.5 `,
  };

  if (to)
    return (
      <Link
        to={to}
        className="mb-5 inline-block text-sm text-blue-500 hover:underline max-[640px]:mb-2.5"
      >
        {children}
      </Link>
    );

  if (handleClick)
    return (
      <button
        disabled={disabled}
        className={`${styles[type]} ${className}`}
        onClick={handleClick}
      >
        {children}
      </button>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
