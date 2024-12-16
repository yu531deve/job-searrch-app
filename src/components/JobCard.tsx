import React from "react";

type JobProps = {
  title: string;
  category: string;
  salary: string;
};

const JobCard: React.FC<JobProps> = ({ title, category, salary }) => {
  return (
    <div className="border p-4 mb-4 rounded shadow-sm">
      <h2 className="text-lg font-bold">{title}</h2>
      <p>カテゴリ: {category}</p>
      <p>年収: {salary}</p>
    </div>
  );
};

export default JobCard;
