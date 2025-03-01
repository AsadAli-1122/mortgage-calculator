import React from "react";

interface ButtonSubmitProps {
    title: string;
}
const ButtonSubmit: React.FC<ButtonSubmitProps> = ({ title }) => {
  return (
    <button
      type="submit"
      className="bg-[#d7da2f] text-[#3F4A30] px-6 py-2 rounded-full w-fit flex justify-center items-center space-x-2 font-semibold cursor-pointer hover:bg-[#3F4A30] hover:text-[#d7da2f] active:bg-[#3F4A30] active:text-[#d7da2f] duration-300 ease-in-out group"
    >
      <span className="h-4 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
        >
          <path
            className="duration-300 ease-in-out fill-[#3F4A30] group-hover:fill-[#d7da2f] group-active:fill-[#d7da2f]"
            d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 2v4h10V4zm0 6v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm-8 4v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm-8 4v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"
          ></path>
        </svg>
      </span>
      <span className="capitalize">{title}</span>
    </button>
  );
};

export default ButtonSubmit;
