import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Job } from "../App";

type JobListProps = {
  jobs: Job[];
};

const categories = [
  "エンジニア",
  "デザイン",
  "マーケティング",
  "営業",
  "人事",
  "医療・介護",
  "カスタマーサポート",
];

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minSalary, setMinSalary] = useState(0);

  // カテゴリの絞り込み処理
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // 絞り込みのフィルター処理
  const filteredJobs = jobs.filter((job) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    const matchesSalary = job.salary >= minSalary;
    return matchesCategory && matchesSalary;
  });

  return (
    <div className="flex">
      {/* 左側のフィルタリングエリア */}
      <div className="w-1/4 p-4 border-r">
        <h3 className="font-bold mb-2">求人カテゴリ</h3>
        {categories.map((category) => (
          <label key={category} className="block">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}

        <h3 className="font-bold mt-4 mb-2">年収</h3>
        <select
          className="border p-2 w-full"
          value={minSalary}
          onChange={(e) => setMinSalary(Number(e.target.value))}
        >
          <option value={0}>すべて</option>
          <option value={300}>300万円以上</option>
          <option value={500}>500万円以上</option>
          <option value={700}>700万円以上</option>
        </select>
      </div>

      {/* 右側の求人一覧 */}
      <div className="w-3/4 p-4">
        <h2 className="font-bold text-xl mb-4">求人一覧</h2>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="block p-4 mb-4 border rounded shadow"
            >
              <h3 className="font-bold">{job.title}</h3>
              <p>カテゴリ: {job.category}</p>
              <p>年収: {job.salary}万円</p>
            </Link>
          ))
        ) : (
          <p>該当する求人がありません。</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
