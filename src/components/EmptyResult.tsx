import Image from "next/image";
import React from "react";

const EmptyResult: React.FC = () => {
  return (
    <div
      id="initialState"
      className="w-full h-full flex flex-col justify-center items-center"
    >
      <Image width={500} height={500} src="/images/illustration-empty.svg" alt="illustration-empty" />
      <h2 className="text-2xl font-semibold mt-2">Results Shown here</h2>
      <p className="text-sm text-[#5E7B8C] mt-2 text-center">
        Complete the form and click &quot;calculate repayments&quot; to see what your
        mopnthly repayments would be.
      </p>
    </div>
  );
};

export default EmptyResult;
