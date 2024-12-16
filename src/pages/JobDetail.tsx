import React from "react";
import { useParams, useNavigate } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
  description: string;
};

const JobDetail = ({ jobs }: { jobs: Job[] }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // ページ遷移用フック

  const job = jobs.find((job) => job.id === Number(id));

  if (!job) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">求人情報が見つかりません。</h1>
        <p className="text-gray-700">URLが間違っている可能性があります。</p>
        <button
          onClick={() => navigate(-1)} // 一つ前のページに戻る
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          戻る
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-lg shadow bg-white">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-700 text-lg mb-2">
        <span className="font-semibold">カテゴリ:</span> {job.category}
      </p>
      <p className="text-gray-700 text-lg mb-2">
        <span className="font-semibold">年収:</span> {job.salary}万円
      </p>
      <p className="text-gray-700 mt-4">{job.description}</p>

      {/* 戻るボタン */}
      <button
        onClick={() => navigate(-1)} // 一つ前のページに戻る
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        戻る
      </button>
    </div>
  );
};

export default JobDetail;
