import React from "react";

interface CompleteResultProps {
    monthly: number;
    total: number;
    symbol: string;
    type: string;
}

const CompleteResult: React.FC<CompleteResultProps> = ({monthly, total, symbol, type}) => {
  return (
    <div id="resultState">
      <h2 className="text-lg font-semibold">Your results</h2>
      <p className="text-sm text-[#5E7B8C] mt-2">
        Your results are shown below based on the information you provided. To
        adjust the results, edit the form and click "{type === "interestOnly" ? "Calculate Interest" : "Calculate Repayments"}" again
      </p>
      <div className="mt-6 border-t-4 rounded-lg border-[#d7da2f] px-6 py-8 bg-[#0E2532]">
        <p className="text-[#5E7B8C] text-sm">Your monthly {type === "interestOnly" ? "Interest" : "Repayment"}</p>
        <p id="monthlyRepayment" className="text-3xl font-bold text-[#d7da2f]">
          {symbol} {monthly}
        </p>
        <hr className="border-slate-400/40 my-6" />

        <p className="text-[#5E7B8C] text-sm">
          Total you'll repay over the term
        </p>
        <p id="totalRepayment" className="text-xl font-bold">
          {symbol} {total}
        </p>
      </div>
      <div className="mt-4"></div>
    </div>
  );
};

export default CompleteResult;
