import { useState, useRef, useEffect } from 'react';
import Octagon from './Octagon';
import TimerProgressBar from './TimerProgressBar';
import ResultDisplay from './atoms/ResultDisplay';
import './App.css';
import QuizApp from './organisms/QuizApp';

function App() {
  const totalTime = 8; // 総時間8秒
  const [started, setStarted] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalTime);

  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const startTimer = () => {
    // 総時間経過後に結果表示へ切替
    timerRef.current = setTimeout(() => {
      setShowResult(true);
      clearInterval(progressIntervalRef.current);
    }, totalTime * 1000);

    // 0.1秒ごとに残り時間を更新
    progressIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 0.1;
        if (newTime <= 0) {
          clearInterval(progressIntervalRef.current);
          return 0;
        }
        return newTime;
      });
    }, 100);
  };

  // スタートボタン押下時の処理
  const handleStart = () => {
    setStarted(true);
    setTapCount(0);
    setShowResult(false);
    setTimeLeft(totalTime);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    startTimer();
  };
  const reset = ()=>{
    setStarted(false);
    setShowResult(false);
  }

  // 「TAP」ボタン押下時の処理（10回タップで結果表示）
  const handleTap = () => {
    if (!started || showResult) return;
    setTapCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 10) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        setShowResult(true);
      }
      return newCount;
    });
  };

  return (
    <div className="main-app">
      {/* スタートボタン */}
      {!started && (
        <>
        <QuizApp>
        </QuizApp>
        <button className="atom-button" onClick={handleStart}>判定</button>
        </>
        )}
      
      {/* Octagonは見た目上の表示のみ（タップ判定は削除） */}
      {started && (
        <div style={{ display: 'inline-block' }}>
          <Octagon size={300} colored={tapCount >= 1}>
            <Octagon size={270} colored={tapCount >= 2}>
              <Octagon size={240} colored={tapCount >= 3}>
                <Octagon size={210} colored={tapCount >= 4}>
                  <Octagon size={180} colored={tapCount >= 5}>
                    <Octagon size={150} colored={tapCount >= 6}>
                      <Octagon size={120} colored={tapCount >= 7}>
                        <Octagon size={90} colored={tapCount >= 8}>
                          <Octagon size={60} colored={tapCount >= 9}>
                            <Octagon size={30} colored={tapCount >= 10} />
                          </Octagon>
                        </Octagon>
                      </Octagon>
                    </Octagon>
                  </Octagon>
                </Octagon>
              </Octagon>
            </Octagon>
          </Octagon>
        </div>
      )}
      
      {/* タイマー中かつ結果未表示の場合、プログレスバーと「TAP」ボタンを表示 */}
      {started && !showResult && (
        <>
          <TimerProgressBar timeLeft={timeLeft} totalTime={totalTime} />
          <button className="start-button" onClick={handleTap}>TAP!!</button>
        </>
      )}
      
      {/* 結果表示 */}
      {showResult && (<>
        <ResultDisplay tapCount={tapCount} />
        <button className="atom-next-button" onClick={reset}>Next</button>
      </>
      )}
    </div>
  );
}

export default App;
