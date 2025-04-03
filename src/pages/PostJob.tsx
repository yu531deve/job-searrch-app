import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  category: string;
  salary: number;
  description: string;
  isFavorite: boolean; // ✅ 追加
};

const PostJob = ({ addJob }: { addJob: (job: Job) => void }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    salary: "",
    description: "",
    isFavorite: false, // ✅ 初期値を false に設定
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value, // ✅ 修正
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(), // Rails 側で ID を自動生成する場合は削除
      title: formData.title,
      category: formData.category,
      salary: Number(formData.salary),
      description: formData.description,
      is_favorite: formData.isFavorite, // ✅ Rails API に送るため `is_favorite` に変換
    };

    fetch("https://job-search-backend0531-6b7e45bfe3d5.herokuapp.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("投稿に失敗しました");
        }
        return response.json();
      })
      .then((data) => {
        console.log("投稿成功:", data);
        addJob(data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error posting job:", error);
      });
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

        {/* お気に入り登録のチェックボックス */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isFavorite"
              checked={formData.isFavorite}
              onChange={handleChange}
              className="accent-green-500"
            />
            お気に入り登録する
          </label>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
