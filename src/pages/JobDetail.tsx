import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
  description: string;
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>(); // URL から ID を取得
  const location = useLocation(); // Link から渡された state を取得
  const navigate = useNavigate();

  // ✅ 変更点①: state から job を取得（リロードすると消える）
  const [job, setJob] = useState<Job | null>(location.state?.job || null);
  const [isLoading, setIsLoading] = useState(!job); // 🔹 初回ロード中フラグ

  // ✅ 変更点②: リロード時に API から取得する
  useEffect(() => {
    //APIリクエスト開始ログ
    console.log(`Fetching job details for ID: ${id}`);

    if (!job) {
      setIsLoading(true); // 🔹 ローディング開始
      fetch(
        `https://job-search-backend0531-6b7e45bfe3d5.herokuapp.com/posts/${id}`
      )
        .then((response) => {
          //ステータスコードをログに入力
          console.log("📡 Response status:", response.status);

          if (!response.ok) throw new Error("求人情報が見つかりません");
          return response.json();
        })
        .then((data) => {
          // 実際のデータをログに出力
          console.log("📦 Fetched job data:", data);

          setJob({ ...data, description: data.description ?? "説明なし" });
          setIsLoading(false); // 🔹 ローディング終了
        })
        .catch((error) => {
          console.error("Error fetching job details:", error);
          setIsLoading(false);
        });
    }
  }, [id, job]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-green-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">求人情報が見つかりません。</h1>
        <p className="text-gray-700">URLが間違っている可能性があります。</p>
        <button
          onClick={() => navigate(-1)}
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
      <p className="text-gray-700 mt-4">{job.description || "説明なし"}</p>

      {/* 戻るボタン */}
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:hover:bg-green-600"
      >
        戻る
      </button>
    </div>
  );
};

export default JobDetail;
