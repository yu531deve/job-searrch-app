import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
};

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Rails API から取得したデータを保存するための State
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts") // Rails API からデータ取得
      .then((response) => response.json())
      .then((data) => {
        setJobs(data); // 既存のデータをクリアしてAPIのデータのみをセット
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const categories = [
    "エンジニア",
    "デザイン",
    "マーケティング",
    "営業",
    "人事",
    "医療・介護",
    "カスタマーサポート",
    "その他",
  ];

  // 絞り込み処理
  const filteredJobs = jobs.filter((job) => {
    const salaryMatch =
      (!minSalary || job.salary >= Number(minSalary)) &&
      (!maxSalary || job.salary <= Number(maxSalary));
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    return salaryMatch && categoryMatch;
  });

  return (
    <div className="flex">
      {/* 左側のフィルタ */}
      <div className="w-1/4 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-green-600">
          求人カテゴリ
        </h3>
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center mb-2 text-gray-600"
          >
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedCategories((prev) =>
                  prev.includes(value)
                    ? prev.filter((c) => c !== value)
                    : [...prev, value]
                );
              }}
              className="mr-2 accent-green-500"
            />
            {category}
          </label>
        ))}

        {/* 給与フィルタ */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 text-green-600">年収</h3>
          <div className="flex items-center mb-2">
            <input
              type="number"
              placeholder="最小"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              className="border rounded-lg px-3 py-1 w-20 text-right shadow-sm focus:border-green-500"
              step="100" // 100単位に設定
              min="0"
            />
            <span className="mx-2 text-green-500 font-semibold">～</span>
            <input
              type="number"
              placeholder="最大"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              className="border rounded-lg px-3 py-1 w-20 text-right shadow-sm focus:border-green-500"
              step="100" // 100単位に設定
              min="0"
            />
          </div>
        </div>

        {/* 投稿ボタン */}
        <div className="mt-6 text-center">
          <Link
            to="/post"
            className="inline-block bg-green-500 text-white font-semibold rounded-full px-4 py-2 hover:bg-green-600 transition shadow-lg"
          >
            + 新しい求人を投稿
          </Link>
        </div>
      </div>

      {/* 右側の求人一覧 */}
      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">求人一覧</h1>
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
    </div>
  );
};

export default JobList;
