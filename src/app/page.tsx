"use client";

import ButtonSubmit from "@/components/ButtonSubmit";
import CompleteResult from "@/components/CompleteResult";
import EmptyResult from "@/components/EmptyResult";
import InputField from "@/components/InputField";
import Link from "next/link";
import React, { useState } from "react";

const CURRENCY_SYMBOL = "\u00A3";

interface FormDataProps {
  amount: string | number;
  term: string | number;
  rate: string | number;
  type: "repayment" | "interestOnly" | "";
}

export default function Home() {
  const [formData, setFormData] = useState<FormDataProps>({
    amount: "",
    term: "",
    rate: "",
    type: "",
  });

  const [error, setError] = useState<{ [key: string]: string }>({});

  const [result, setResult] = useState<{ monthly: number; total: number }>({
    monthly: 0,
    total: 0,
  });

  const calculateResult = () => {
    const { amount, term, rate, type } = formData;
    const principal = Number(amount);
    const years = Number(term);
    const interestRate = Number(rate) / 100;

    let monthlyPayment = 0;
    let totalPayment = 0;

    if (type === "repayment") {
      const monthlyRate = interestRate / 12;
      const months = years * 12;
      if (monthlyRate > 0) {
        monthlyPayment =
          (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      } else {
        monthlyPayment = principal / months;
      }
      totalPayment = monthlyPayment * months;
    } else if (type === "interestOnly") {
      monthlyPayment = (principal * interestRate) / 12;
      totalPayment = monthlyPayment * years * 12;
    }

    setResult({
      monthly: parseFloat(monthlyPayment.toFixed(2)),
      total: parseFloat(totalPayment.toFixed(2)),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError((prev) => ({ ...prev, [e.target.id]: "" }));
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError((prev) => ({ ...prev, type: "" }));
    setFormData((prev) => ({
      ...prev,
      type: e.target.value as "repayment" | "interestOnly",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.amount) newErrors.amount = "Amount is required";
    else if (Number(formData.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";

    if (!formData.term) newErrors.term = "Term is required";
    else if (Number(formData.term) < 1)
      newErrors.term = "Term must be at least 1 year";

    if (!formData.rate) newErrors.rate = "Interest rate is required";
    else if (Number(formData.rate) <= 0)
      newErrors.rate = "Interest rate must be greater than 0";

    if (!formData.type) newErrors.type = "Please select a mortgage type";

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      calculateResult();
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl md:rounded-3xl grid md:grid-cols-2 max-w-4xl w-full overflow-hidden">
        <div className="px-6 md:px-12 py-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="capitalize text-lg font-semibold">
                Mortgage Calculator
              </h2>
              <button
                className="capitalize text-sm font-semibold border-b-2 rounded-xs cursor-pointer text-slate-600/50 hover:text-slate-600 ease-in-out duration-300"
                type="reset"
                onClick={() => (setFormData({ amount: "", term: "", rate: "", type: "" }), setError({}))}
              >
                Clear All
              </button>
            </div>

            <InputField
              label="Mortgage Amount"
              id="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="360,000"
              symbol="£"
              symbolPosition="left"
              error={error.amount}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Mortgage Term"
                id="term"
                type="number"
                value={formData.term}
                onChange={handleChange}
                placeholder="5"
                symbol="years"
                symbolPosition="right"
                error={error.term}
              />
              <InputField
                label="Interest Rate"
                id="rate"
                type="number"
                value={formData.rate}
                onChange={handleChange}
                placeholder="3.5"
                symbol="%"
                symbolPosition="right"
                error={error.rate}
              />
            </div>

            <div>
              <label className="block text-gray-700">Mortgage Type</label>
              <div className="flex flex-col space-y-2 mt-2">
                {["repayment", "interestOnly"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center font-semibold border-2 px-4 py-2 rounded-sm cursor-pointer ${
                      formData.type === type
                        ? "bg-[#d7da2f]/20 border-[#d7da2f] text-[#3F4A30]"
                        : "text-slate-400 border-slate-400/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={formData.type === type}
                      onChange={handleRadioChange}
                      className="hidden peer"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex justify-center items-center mr-2 ${
                        formData.type === type
                          ? "bg-[#d7da2f]/20 border-[#d7da2f]"
                          : "bg-slate-400/20 border-slate-400/40"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          formData.type === type
                            ? "bg-[#d7da2f]"
                            : "bg-slate-400/20"
                        }`}
                      />
                    </div>
                    {type === "repayment" ? "Repayment" : "Interest Only"}
                  </label>
                ))}
              </div>
              {error.type && (
                <p className="text-red-500 text-sm mt-1">{error.type}</p>
              )}
            </div>

            <ButtonSubmit title={formData.type === "interestOnly" ? "Calculate Interest" : "Calculate Repayments"} />
          </form>
        </div>

        <div className="bg-[var(--teal-blue)] text-white px-6 md:px-12 py-12 md:rounded-bl-[70px]">
          {result.monthly > 0 ? (
            <CompleteResult
              monthly={result.monthly}
              total={result.total}
              symbol={CURRENCY_SYMBOL}
              type={formData.type}
            />
          ) : (
            <EmptyResult />
          )}
        </div>
      </div>

      <div className="attribution mt-8">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <Link href="https://codebyasad.vercel.app/">Asad Ali</Link>.
      </div>
    </>
  );
}
