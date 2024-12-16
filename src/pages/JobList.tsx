import React, { useState } from "react";
import { Link } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
};

const JobList = ({ jobs }: { jobs: Job[] }) => {
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const salaryMatch =
      (!minSalary || job.salary >= Number(minSalary)) &&
      (!maxSalary || job.salary <= Number(maxSalary));
    return salaryMatch;
  });

  return (
    <div className="p-4">
      {/* 求人一覧タイトル */}
      <h1 className="text-3xl font-bold mb-6">求人一覧</h1>

      {/* 投稿ページへのリンク */}
      <div className="mb-4">
        <Link
          to="/post"
          className="inline-block bg-green-500 text-white font-semibold rounded px-4 py-2 hover:bg-green-700 transition"
        >
          新しい求人を投稿する
        </Link>
      </div>

      {/* 給与入力フォーム */}
      <div className="flex items-center space-x-2 mb-6">
        {/* 最小給与入力 */}
        <div className="flex items-center">
          <input
            type="number"
            placeholder="最小"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)}
            className="border rounded px-2 py-1 w-24 text-right"
            step="100"
            min="0"
          />
          <span className="ml-1">万円</span>
        </div>

        {/* ～ を表示 */}
        <span className="text-gray-700">～</span>

        {/* 最大給与入力 */}
        <div className="flex items-center">
          <input
            type="number"
            placeholder="最大"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            className="border rounded px-2 py-1 w-24 text-right"
            step="100"
            min="0"
          />
          <span className="ml-1">万円</span>
        </div>
      </div>

      {/* 求人一覧 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Link
              to={`/jobs/${job.id}`}
              key={job.id}
              className="block border rounded-lg shadow hover:shadow-lg transition-all p-4 bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-700 mb-1">カテゴリ: {job.category}</p>
              <p className="text-gray-700">年収: {job.salary}万円</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-700 col-span-3 text-center">
            該当する求人が見つかりません。
          </p>
        )}
      </div>
    </div>
  );
};

export default JobList;
