export const Item = (): JSX.Element => {
  return (
    <div className="w-full mb-20 last-of-type:mb-8 px-4 flex flex-col gap-4">
      <div className="w-full h-12 grid grid-cols-10 gap-4 items-center">
        {/* <img src="" /> */}
        <div className="w-full h-full bg-zinc-200 rounded-full" />
        <span className="col-span-7">닉네임</span>
        <span className="text-right">3</span>
        <svg
          className="w-8"
          fill="#ffd014"
          // stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          ></path>
        </svg>
      </div>
      <div className="w-full h-96">
        {/* <img /> */}
        <div className="w-full h-full bg-zinc-200" />
      </div>
      <div className="w-full flex items-center gap-3">
        <svg
          className="w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
          />
        </svg>
        {/* <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg> */}
        <span>Music is my life...</span>
      </div>
    </div>
  );
};
