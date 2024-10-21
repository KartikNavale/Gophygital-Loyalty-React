import React, { useState } from 'react';

export default function RoundedRadioButtonCard({ onChange }) { 
  const [selected, setSelected] = useState(null);

  const options = [
    {
      value: "lifetime",
      label: "Lifetime",
      description: "Lifetime points will help members advance to higher tiers.",
    },
    {
      value: "yearly",
      label: "Rolling Year",
      description:
        "Tier upgrades by earned points from current month to pretending month the following year.",
    },
  ];

  const handleClick = (value) => {
    setSelected(value);
    onChange(value); 
  };

  return (
    <div className="container">
      {options.map((option) => (
        <div className="card m-4 tier-setting-card" key={option.value}>
          <div className="card-body">
            <div className="d-flex flex-column align-items-start">
              <div
                onClick={() => handleClick(option.value)}
                className="d-flex align-items-center m-2"
                style={{ cursor: 'pointer' }} 
              >
                <svg width="30" height="30">
                  <circle
                    cx="15"
                    cy="15"
                    r="10"
                    fill="none"
                    stroke="#e95420"
                    strokeWidth="2"
                  />
                  {selected === option.value && (
                    <circle cx="15" cy="15" r="7" fill="#e95420" />
                  )}
                </svg>
                <h5 className="card-title mb-0 ps-3 fw-bold">{option.label}</h5>
              </div>
              <p className="text-muted ms-3">{option.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
