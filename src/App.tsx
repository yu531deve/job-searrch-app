import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import PostJob from "./pages/PostJob";

const App = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Webエンジニア",
      category: "エンジニア",
      salary: 600,
      description: "Webサイトの設計・開発を担当します。",
    },
    {
      id: 2,
      title: "マーケティングマネージャー",
      category: "マーケティング",
      salary: 800,
      description: "マーケティング戦略の企画と実行を担当します。",
    },
  ]);

  // 新しい求人を追加する関数
  const addJob = (job: (typeof jobs)[0]) => {
    setJobs([...jobs, job]);
  };

  return (
    <Router>
      <Routes>
        {/* 求人一覧 */}
        <Route path="/" element={<JobList jobs={jobs} />} />
        {/* 求人詳細 */}
        <Route path="/jobs/:id" element={<JobDetail jobs={jobs} />} />
        {/* 求人投稿 */}
        <Route path="/post" element={<PostJob addJob={addJob} />} />
      </Routes>
    </Router>
  );
};

export default App;
