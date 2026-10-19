import { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function MortgageCalculator({ onOpenContact }) {
  const [propertyPrice, setPropertyPrice] = useState(850000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [interestRate, setInterestRate] = useState(5.8);

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  // Monthly mortgage calculation formula: P * (r*(1+r)^n) / ((1+r)^n - 1)
  const monthlyPayment =
    monthlyRate > 0
      ? (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanPrincipal / totalMonths;

  const totalRepayment = monthlyPayment * totalMonths;
  const totalInterest = totalRepayment - loanPrincipal;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="calculator" className="py-6 md:py-8 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#c59b27]/30 text-xs font-bold uppercase tracking-widest text-[#9a7210] mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Investment Advisory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-neutral-900 tracking-tight">
            Mortgage & Investment <span className="gold-gradient-text">Calculator</span>
          </h2>
          <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
            Estimate your monthly financing commitments, down payments, and total investment breakdown for your next luxury property.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-[#c59b27]/30 rounded-2xl p-6 sm:p-10 hover:shadow-xl transition-shadow duration-300">
          
          {/* Sliders Input Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Property Price */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-neutral-800 font-bold">
                  Property Value
                </label>
                <span className="text-base font-bold font-serif text-[#9a7210]">
                  {formatCurrency(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min="300000"
                max="4000000"
                step="25000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-[#c59b27] bg-neutral-200 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 font-medium mt-1">
                <span>$300,000</span>
                <span>$2,000,000</span>
                <span>$4,000,000+</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-neutral-800 font-bold">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-base font-bold font-serif text-[#9a7210]">
                  {formatCurrency(downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#c59b27] bg-neutral-200 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 font-medium mt-1">
                <span>10% (Min)</span>
                <span>20% (Standard)</span>
                <span>50%</span>
              </div>
            </div>

            {/* Loan Duration */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-neutral-800 font-bold">
                  Loan Tenure
                </label>
                <span className="text-base font-bold font-serif text-[#9a7210]">
                  {loanTermYears} Years
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="5"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full accent-[#c59b27] bg-neutral-200 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 font-medium mt-1">
                <span>5 Yrs</span>
                <span>20 Yrs</span>
                <span>35 Yrs</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-wider text-neutral-800 font-bold">
                  Estimated Interest Rate
                </label>
                <span className="text-base font-bold font-serif text-[#9a7210]">
                  {interestRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="3.0"
                max="10.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#c59b27] bg-neutral-200 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 font-medium mt-1">
                <span>3.0%</span>
                <span>5.8% (Avg)</span>
                <span>10.0%</span>
              </div>
            </div>

          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-white border-2 border-[#c59b27]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold block mb-1">
                Estimated Monthly Repayment
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-serif text-[#9a7210] mb-6">
                {formatCurrency(monthlyPayment)}
                <span className="text-xs font-normal text-neutral-500 font-sans ml-1">/ month</span>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 py-4 border-y border-neutral-200 text-xs">
                <div className="flex justify-between text-neutral-600 font-medium">
                  <span>Loan Amount (Principal):</span>
                  <span className="font-bold text-neutral-900">{formatCurrency(loanPrincipal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600 font-medium">
                  <span>Down Payment Required:</span>
                  <span className="font-bold text-[#9a7210]">{formatCurrency(downPaymentAmount)}</span>
                </div>
                <div className="flex justify-between text-neutral-600 font-medium">
                  <span>Total Interest Over Term:</span>
                  <span className="font-bold text-neutral-800">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between text-neutral-600 pt-2 border-t border-neutral-200 font-bold">
                  <span>Total Repayments:</span>
                  <span className="text-neutral-900">{formatCurrency(totalRepayment)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={onOpenContact}
                className="w-full py-3.5 rounded-xl bg-[#c59b27] hover:bg-[#aa7f17] text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:shadow-[0_4px_18px_rgba(197,155,39,0.3)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Request Financial Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-neutral-500 text-center mt-2.5 font-medium">
                *Estimates are indicative. Terms and interest rates subject to final lender approval.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
