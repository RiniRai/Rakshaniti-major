import React, { useState } from "react";
import find from "./../../../assets/find.svg";
import { useNavigate } from "react-router-dom";

const schemesData = [
  {
    id: "pmay",
    name: "Pradhan Mantri Awas Yojana",
    check: (form) => form.income < 300000,
  },
  {
    id: "mudra",
    name: "Mudra Yojana",
    check: (form) =>
      form.occupation === "Business" ||
      form.occupation === "Self-employed",
  },
  {
    id: "mahila",
    name: "Mahila Samriddhi Yojana",
    check: (form) =>
      form.gender === "Female" &&
      form.age >= 18 &&
      form.age <= 50 &&
      form.income < 300000,
  },
];

const SchemeEligibilty = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    income: "",
    gender: "",
    occupation: "",
  });

  const [eligible, setEligible] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkEligibility = () => {
    const result = schemesData.filter((scheme) =>
      scheme.check({
        ...form,
        age: Number(form.age),
        income: Number(form.income),
      })
    );

    setEligible(result);
    setChecked(true);
  };

  const isFormComplete =
    form.age && form.income && form.gender && form.occupation;

  return (
    <div className="px-[6vw] pt-28 pb-16 bg-[#07152B] min-h-screen text-white">

      {/* TOP CARD */}
      <div className="bg-[#1E2A3B] rounded-3xl shadow-2xl p-12 flex flex-col lg:flex-row items-center gap-16">

        {/* IMAGE */}
        <div className="lg:w-1/2">
          <img
            src={find}
            alt="Check Eligibility"
            className="w-full max-w-md mx-auto"
          />
        </div>

        {/* FORM */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-yellow-400">
            Check Your Scheme Eligibility
          </h1>

          <p className="mt-3 text-gray-300">
            Fill your details and find schemes you are eligible for.
          </p>

          <div className="mt-8 space-y-4">

            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={form.age}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-gray-200 text-black"
            />

            <input
              type="number"
              name="income"
              placeholder="Enter annual income"
              value={form.income}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-gray-200 text-black"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-gray-200 text-black"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <select
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-gray-200 text-black"
            >
              <option value="">Select Occupation</option>
              <option>Business</option>
              <option>Self-employed</option>
              <option>Farmer</option>
              <option>Student</option>
            </select>

            <button
              disabled={!isFormComplete}
              onClick={checkEligibility}
              className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 ${
                isFormComplete
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Check Eligibility
            </button>

          </div>
        </div>
      </div>

      {/* RESULTS */}
      {checked && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            Eligible Schemes
          </h2>

          {eligible.length === 0 ? (
            <div className="bg-red-500/20 border border-red-500 p-6 rounded-xl">
              ❌ You are currently not eligible for any schemes.
            </div>
          ) : (
            <div className="space-y-4">

              {eligible.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-[#2C3E50] border border-gray-600 p-5 rounded-xl flex justify-between items-center hover:scale-[1.01] hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-lg font-semibold">
                    ✔ {scheme.name}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/apply/${scheme.id}`, {
                        state: {
                          scheme_name: scheme.name,
                          scheme_code: scheme.id,
                        },
                      })
                    }
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-5 py-2 rounded-lg font-semibold hover:scale-105 transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              ))}

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SchemeEligibilty;
