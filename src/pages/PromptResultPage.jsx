import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generatePrompt, generateReelsPrompt } from "../utils/generatePrompt";

function PromptResultPage() {
  const [blogPrompt, setBlogPrompt] = useState("");
  const [reelsPrompt, setReelsPrompt] = useState("");
  const [activeType, setActiveType] = useState("blog");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const currentPrompt = activeType === "blog" ? blogPrompt : reelsPrompt;

  useEffect(() => {
    const savedData = localStorage.getItem("blogPromptInput");

    if (!savedData) {
      navigate("/");
      return;
    }

    const parsedData = JSON.parse(savedData);

    setBlogPrompt(generatePrompt(parsedData));
    setReelsPrompt(generateReelsPrompt(parsedData));
  }, [navigate]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentPrompt);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      alert("복사에 실패했어요. 직접 드래그해서 복사해주세요.");
    }
  };

  const handleReset = () => {
    localStorage.removeItem("blogPromptInput");
    navigate("/");
  };

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <p style={styles.badge}>Prompt Result</p>
          <h1 style={styles.title}>완성된 콘텐츠 프롬프트</h1>
          <p style={styles.subtitle}>
            입력한 내용을 바탕으로 블로그용 프롬프트와 릴스용 프롬프트를
            각각 확인할 수 있어요.
          </p>
        </header>

        <div style={styles.tabBox}>
          <button
            type="button"
            onClick={() => setActiveType("blog")}
            style={{
              ...styles.tabButton,
              ...(activeType === "blog" ? styles.activeTab : {}),
            }}
          >
            블로그 프롬프트
          </button>

          <button
            type="button"
            onClick={() => setActiveType("reels")}
            style={{
              ...styles.tabButton,
              ...(activeType === "reels" ? styles.activeTab : {}),
            }}
          >
            릴스 프롬프트
          </button>
        </div>

        <section style={styles.resultCard}>
          <div style={styles.resultHeader}>
            <div>
              <h2 style={styles.resultTitle}>
                {activeType === "blog"
                  ? "네이버 블로그용 프롬프트"
                  : "릴스/쇼츠용 프롬프트"}
              </h2>
              <p style={styles.resultDescription}>
                {activeType === "blog"
                  ? "블로그 제목, 본문, 사진 문구, 해시태그를 생성하는 프롬프트예요."
                  : "15초/30초 영상 스크립트, 후킹 멘트, 자막, 해시태그를 생성하는 프롬프트예요."}
              </p>
            </div>

            <button type="button" onClick={handleCopy} style={styles.copyButton}>
              {copied ? "복사 완료!" : "복사하기"}
            </button>
          </div>

          <pre style={styles.promptBox}>{currentPrompt}</pre>
        </section>

        <div style={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={styles.secondaryButton}
          >
            입력 수정하기
          </button>

          <button type="button" onClick={handleReset} style={styles.dangerButton}>
            처음부터 다시 만들기
          </button>
        </div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f7f7f8",
    padding: "40px 18px",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "24px",
  },
  badge: {
    display: "inline-block",
    padding: "7px 12px",
    backgroundColor: "#e8f5ec",
    color: "#1b8f43",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "14px",
  },
  title: {
    fontSize: "34px",
    lineHeight: "1.25",
    margin: "0 0 12px",
    color: "#111",
  },
  subtitle: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#555",
    margin: 0,
  },
  tabBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "18px",
    backgroundColor: "#e9ecef",
    padding: "6px",
    borderRadius: "14px",
  },
  tabButton: {
    flex: 1,
    padding: "13px 16px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: "#555",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
  },
  activeTab: {
    backgroundColor: "#fff",
    color: "#03c75a",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  resultCard: {
    backgroundColor: "#fff",
    border: "1px solid #eee",
    borderRadius: "18px",
    padding: "22px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  resultTitle: {
    fontSize: "20px",
    margin: "0 0 6px",
  },
  resultDescription: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.5",
    margin: 0,
  },
  copyButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#03c75a",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  promptBox: {
    minHeight: "500px",
    maxHeight: "70vh",
    overflow: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    backgroundColor: "#111",
    color: "#f5f5f5",
    borderRadius: "14px",
    padding: "20px",
    fontSize: "14px",
    lineHeight: "1.7",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "18px",
  },
  secondaryButton: {
    flex: 1,
    padding: "15px 18px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#fff",
    color: "#222",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
  dangerButton: {
    flex: 1,
    padding: "15px 18px",
    border: "1px solid #ffd6d6",
    borderRadius: "12px",
    backgroundColor: "#fff5f5",
    color: "#d92d20",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default PromptResultPage;