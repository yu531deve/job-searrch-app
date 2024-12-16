import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
  description: string;
};

const PostJob = ({ addJob }: { addJob: (job: Job) => void }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    salary: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      salary: Number(formData.salary),
      description: formData.description,
    };
    addJob(newJob);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-lg shadow bg-white">
      <h1 className="text-2xl font-bold mb-6">求人情報を投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* タイトル */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            タイトル
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        {/* カテゴリ */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            カテゴリ
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          >
            <option value="" disabled>
              選択してください
            </option>
            <option value="エンジニア">エンジニア</option>
            <option value="デザイン">デザイン</option>
            <option value="マーケティング">マーケティング</option>
            <option value="営業">営業</option>
            <option value="人事">人事</option>
            <option value="医療・介護">医療・介護</option>
            <option value="カスタマーサポート">カスタマーサポート</option>
            <option value="その他">その他</option>
          </select>
        </div>

        {/* 給与 */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            給与 (万円単位)
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            min="0" // 最小値を0に設定
            required
          />
        </div>

        {/* 説明 */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">説明</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            rows={4}
            required
          />
        </div>

        {/* 投稿ボタン */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          投稿する
        </button>
      </form>
    </div>
  );
};

export default PostJob;
