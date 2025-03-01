import React from "react";

const EmptyResult: React.FC = () => {
  return (
    <div
      id="initialState"
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <img src="/images/illustration-empty.svg" alt="illustration-empty" />
      <h2 className="text-2xl font-semibold mt-2">Results Shown here</h2>
      <p className="text-sm text-[#5E7B8C] mt-2 text-center">
        Complete the form and click "calculate repayments" to see what your
        mopnthly repayments would be.
      </p>
    </div>
  );
};

export default EmptyResult;
