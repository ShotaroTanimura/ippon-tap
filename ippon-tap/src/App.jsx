import { useState, useRef, useEffect } from 'react';
import Octagon from './Octagon';
import TimerProgressBar from './TimerProgressBar';
import ResultDisplay from './atoms/ResultDisplay';
import './App.css';

function App() {
  const totalTime = 8; // 総時間10秒
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
    // 10秒後に結果表示へ切り替え
    timerRef.current = setTimeout(() => {
      setShowResult(true);
      clearInterval(progressIntervalRef.current);
    }, totalTime * 1000);

    // 0.1秒ごとに残り時間を更新（10秒で0になる）
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

  // スタートボタン押下時にタイマーとプログレスバーを開始
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

  // タップで各Octagonの色を変更し、10回で即結果表示
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
      {/* お洒落なスタートボタン */}
      {!started && <button className="start-button" onClick={handleStart}>START</button>}
      {started && (
        <div 
          onClick={handleTap} 
          style={{ display: 'inline-block', cursor: showResult ? 'default' : 'pointer' }}
        >
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
      {/* タイマー中かつ結果未表示の場合はプログレスバーを表示 */}
      {started && !showResult && (
        <TimerProgressBar timeLeft={timeLeft} totalTime={totalTime} />
      )}
      {/* 結果表示（アニメーション付き） */}
      {showResult && <ResultDisplay tapCount={tapCount} />}
    </div>
  );
}

export default App;
