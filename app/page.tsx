'use client'

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import html2canvas from 'html2canvas';

interface PeperoResult {
  peperoCount: number;
  peperoType: string;
  personality: string;
  fortune: string;
  tip: string;
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<PeperoResult | null>(null)
  const [predictedCount, setPredictedCount] = useState<number | null>(null)
  const [isCameraMode, setIsCameraMode] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const shareContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 컴포넌트 언마운트 시 카메라 스트림 정리
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setImage(result);
          analyzeImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      setStream(mediaStream);
      setIsCameraMode(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      alert('카메라 접근 권한이 필요합니다.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraMode(false);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg');
        setImage(imageData);
        stopCamera();
        analyzeImage(imageData);
      }
    }
  };

  const analyzeImage = async (imageData: string) => {
    setAnalyzing(true);
    setResult(null);

    try {
      const base64Data = imageData.split(',')[1];
      
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData: base64Data,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze image");
      }

      const text = data.text;
      const cleanText = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanText);
      
      setResult(parsed as PeperoResult);
      // 빼빼로 데이 예측 개수 계산 (현실적인 범위)
      const baseCount = parsed.peperoCount;
      // 분석 결과를 기반으로 하되, 현실적인 범위(1~100개)로 조정
      // 높은 빼빼로상일수록 더 많이 받을 가능성
      let predicted: number;
      if (baseCount > 500) {
        // 높은 빼빼로상: 30~80개
        predicted = Math.floor(30 + Math.random() * 50);
      } else if (baseCount > 300) {
        // 중상 빼빼로상: 20~60개
        predicted = Math.floor(20 + Math.random() * 40);
      } else if (baseCount > 150) {
        // 중 빼빼로상: 10~40개
        predicted = Math.floor(10 + Math.random() * 30);
      } else {
        // 낮은 빼빼로상: 5~25개
        predicted = Math.floor(5 + Math.random() * 20);
      }
      setPredictedCount(predicted);
    } catch (error) {
      console.error("Analysis error:", error);
      const fallbackCount = Math.floor(Math.random() * 900) + 100;
      setResult({
        peperoCount: fallbackCount,
        peperoType: "초코",
        personality: "AI가 당황한 신비로운 얼굴형",
        fortune: "오늘은 빼빼로를 뒤집어서 먹으면 행운",
        tip: "분석 실패도 운명이니 다시 시도해보세요"
      } as PeperoResult);
      // 에러 처리 시에도 현실적인 범위로 예측
      const predicted = Math.floor(10 + Math.random() * 40);
      setPredictedCount(predicted);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    setPredictedCount(null);
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateShareImage = async (): Promise<File | null> => {
    if (!shareContainerRef.current || !result || !image || predictedCount === null) return null;

    try {
      // 공유용 컨테이너 생성
      const shareContainer = document.createElement('div');
      shareContainer.style.position = 'absolute';
      shareContainer.style.left = '-9999px';
      shareContainer.style.top = '0';
      shareContainer.style.width = '400px';
      shareContainer.style.backgroundColor = '#ffffff';
      shareContainer.style.padding = '24px';
      shareContainer.style.display = 'flex';
      shareContainer.style.flexDirection = 'column';
      shareContainer.style.alignItems = 'center';
      shareContainer.style.gap = '16px';
      
      // 이미지 추가
      const imgElement = document.createElement('img');
      imgElement.src = image;
      imgElement.style.width = '160px';
      imgElement.style.height = '160px';
      imgElement.style.borderRadius = '12px';
      imgElement.style.objectFit = 'cover';
      shareContainer.appendChild(imgElement);

      // 결과 컨테이너
      const resultContainer = document.createElement('div');
      resultContainer.style.width = '100%';
      resultContainer.style.display = 'flex';
      resultContainer.style.flexDirection = 'column';
      resultContainer.style.gap = '20px';

      // 메인 결과
      const mainResult = document.createElement('div');
      mainResult.style.textAlign = 'center';
      mainResult.style.paddingBottom = '16px';
      mainResult.style.borderBottom = '1px solid #f3f4f6';
      
      const countDiv = document.createElement('div');
      countDiv.style.display = 'flex';
      countDiv.style.alignItems = 'baseline';
      countDiv.style.justifyContent = 'center';
      countDiv.style.gap = '6px';
      countDiv.style.marginBottom = '4px';
      
      const countText = document.createElement('span');
      countText.textContent = result.peperoCount.toString();
      countText.style.fontSize = '48px';
      countText.style.fontWeight = 'bold';
      countText.style.color = '#8B4513';
      
      const unitText = document.createElement('span');
      unitText.textContent = '개';
      unitText.style.fontSize = '16px';
      unitText.style.color = '#9ca3af';
      
      countDiv.appendChild(countText);
      countDiv.appendChild(unitText);
      
      const typeText = document.createElement('p');
      typeText.textContent = `${result.peperoType} 빼빼로상`;
      typeText.style.fontSize = '16px';
      typeText.style.color = '#374151';
      typeText.style.fontWeight = '500';
      typeText.style.margin = '0';
      
      mainResult.appendChild(countDiv);
      mainResult.appendChild(typeText);
      resultContainer.appendChild(mainResult);

      // 성격 분석
      const personalityDiv = document.createElement('div');
      personalityDiv.style.display = 'flex';
      personalityDiv.style.flexDirection = 'column';
      personalityDiv.style.gap = '8px';
      
      const personalityLabel = document.createElement('p');
      personalityLabel.textContent = '이런 사람이에요';
      personalityLabel.style.fontSize = '14px';
      personalityLabel.style.color = '#6b7280';
      personalityLabel.style.margin = '0 0 4px 0';
      
      const personalityText = document.createElement('p');
      personalityText.textContent = result.personality;
      personalityText.style.fontSize = '14px';
      personalityText.style.color = '#1f2937';
      personalityText.style.lineHeight = '1.6';
      personalityText.style.margin = '0';
      
      personalityDiv.appendChild(personalityLabel);
      personalityDiv.appendChild(personalityText);
      resultContainer.appendChild(personalityDiv);

      // 운세
      const fortuneDiv = document.createElement('div');
      fortuneDiv.style.backgroundColor = '#faf5ff';
      fortuneDiv.style.borderRadius = '8px';
      fortuneDiv.style.padding = '16px';
      fortuneDiv.style.display = 'flex';
      fortuneDiv.style.flexDirection = 'column';
      fortuneDiv.style.gap = '4px';
      
      const fortuneHeader = document.createElement('div');
      fortuneHeader.style.display = 'flex';
      fortuneHeader.style.alignItems = 'center';
      fortuneHeader.style.gap = '8px';
      fortuneHeader.style.marginBottom = '6px';
      
      const fortuneIcon = document.createElement('span');
      fortuneIcon.textContent = '🔮';
      fortuneIcon.style.fontSize = '18px';
      
      const fortuneLabel = document.createElement('h3');
      fortuneLabel.textContent = '오늘 운세';
      fortuneLabel.style.fontSize = '12px';
      fortuneLabel.style.fontWeight = '500';
      fortuneLabel.style.color = '#6b7280';
      fortuneLabel.style.margin = '0';
      fortuneLabel.style.textTransform = 'uppercase';
      fortuneLabel.style.letterSpacing = '0.05em';
      
      fortuneHeader.appendChild(fortuneIcon);
      fortuneHeader.appendChild(fortuneLabel);
      
      const fortuneText = document.createElement('p');
      fortuneText.textContent = result.fortune;
      fortuneText.style.fontSize = '14px';
      fortuneText.style.color = '#1f2937';
      fortuneText.style.lineHeight = '1.6';
      fortuneText.style.margin = '0';
      fortuneText.style.paddingLeft = '24px';
      
      fortuneDiv.appendChild(fortuneHeader);
      fortuneDiv.appendChild(fortuneText);
      resultContainer.appendChild(fortuneDiv);

      // 팁
      const tipDiv = document.createElement('div');
      tipDiv.style.backgroundColor = '#fffbeb';
      tipDiv.style.borderRadius = '8px';
      tipDiv.style.padding = '16px';
      tipDiv.style.display = 'flex';
      tipDiv.style.flexDirection = 'column';
      tipDiv.style.gap = '4px';
      
      const tipHeader = document.createElement('div');
      tipHeader.style.display = 'flex';
      tipHeader.style.alignItems = 'center';
      tipHeader.style.gap = '8px';
      tipHeader.style.marginBottom = '6px';
      
      const tipIcon = document.createElement('span');
      tipIcon.textContent = '💡';
      tipIcon.style.fontSize = '18px';
      
      const tipLabel = document.createElement('h3');
      tipLabel.textContent = '팁';
      tipLabel.style.fontSize = '12px';
      tipLabel.style.fontWeight = '500';
      tipLabel.style.color = '#6b7280';
      tipLabel.style.margin = '0';
      tipLabel.style.textTransform = 'uppercase';
      tipLabel.style.letterSpacing = '0.05em';
      
      tipHeader.appendChild(tipIcon);
      tipHeader.appendChild(tipLabel);
      
      const tipText = document.createElement('p');
      tipText.textContent = result.tip;
      tipText.style.fontSize = '14px';
      tipText.style.color = '#1f2937';
      tipText.style.lineHeight = '1.6';
      tipText.style.margin = '0';
      tipText.style.paddingLeft = '24px';
      
      tipDiv.appendChild(tipHeader);
      tipDiv.appendChild(tipText);
      resultContainer.appendChild(tipDiv);

      // 빼빼로 데이 예측
      const predictionDiv = document.createElement('div');
      predictionDiv.style.backgroundColor = '#fdf2f8';
      predictionDiv.style.borderRadius = '8px';
      predictionDiv.style.padding = '16px';
      predictionDiv.style.display = 'flex';
      predictionDiv.style.flexDirection = 'column';
      predictionDiv.style.gap = '4px';
      
      const predictionHeader = document.createElement('div');
      predictionHeader.style.display = 'flex';
      predictionHeader.style.alignItems = 'center';
      predictionHeader.style.gap = '8px';
      predictionHeader.style.marginBottom = '6px';
      
      const predictionIcon = document.createElement('span');
      predictionIcon.textContent = '🎁';
      predictionIcon.style.fontSize = '18px';
      
      const predictionLabel = document.createElement('h3');
      predictionLabel.textContent = '빼빼로 데이 예측';
      predictionLabel.style.fontSize = '12px';
      predictionLabel.style.fontWeight = '500';
      predictionLabel.style.color = '#6b7280';
      predictionLabel.style.margin = '0';
      predictionLabel.style.textTransform = 'uppercase';
      predictionLabel.style.letterSpacing = '0.05em';
      
      predictionHeader.appendChild(predictionIcon);
      predictionHeader.appendChild(predictionLabel);
      
      const predictionText = document.createElement('p');
      predictionText.textContent = '올해 빼빼로 데이에 받을 빼빼로는...';
      predictionText.style.fontSize = '14px';
      predictionText.style.color = '#1f2937';
      predictionText.style.lineHeight = '1.6';
      predictionText.style.margin = '0 0 8px 0';
      predictionText.style.paddingLeft = '24px';
      
      const predictionCountDiv = document.createElement('div');
      predictionCountDiv.style.display = 'flex';
      predictionCountDiv.style.alignItems = 'baseline';
      predictionCountDiv.style.gap = '6px';
      predictionCountDiv.style.marginBottom = '4px';
      predictionCountDiv.style.paddingLeft = '24px';
      
      const predictionCountText = document.createElement('span');
      predictionCountText.textContent = predictedCount.toString();
      predictionCountText.style.fontSize = '24px';
      predictionCountText.style.fontWeight = 'bold';
      predictionCountText.style.color = '#db2777';
      
      const predictionUnitText = document.createElement('span');
      predictionUnitText.textContent = '개';
      predictionUnitText.style.fontSize = '14px';
      predictionUnitText.style.color = '#6b7280';
      
      predictionCountDiv.appendChild(predictionCountText);
      predictionCountDiv.appendChild(predictionUnitText);
      
      const predictionMessage = document.createElement('p');
      const message = predictedCount > 60 
        ? '와! 엄청 많이 받을 거예요! 🎉'
        : predictedCount > 40
        ? '꽤 많이 받을 예정이에요! 😊'
        : predictedCount > 20
        ? '적당히 받을 거예요! 🍫'
        : predictedCount > 10
        ? '조금 받을 수도 있어요. 그래도 의미 있어요! 💝'
        : '한두 개라도 받으면 행복해요! 🍀';
      predictionMessage.textContent = message;
      predictionMessage.style.fontSize = '12px';
      predictionMessage.style.color = '#6b7280';
      predictionMessage.style.fontStyle = 'italic';
      predictionMessage.style.margin = '0';
      predictionMessage.style.paddingLeft = '24px';
      
      predictionDiv.appendChild(predictionHeader);
      predictionDiv.appendChild(predictionText);
      predictionDiv.appendChild(predictionCountDiv);
      predictionDiv.appendChild(predictionMessage);
      resultContainer.appendChild(predictionDiv);

      shareContainer.appendChild(resultContainer);
      document.body.appendChild(shareContainer);

      // 이미지 로드 대기
      await new Promise((resolve) => {
        if (imgElement.complete) {
          resolve(null);
        } else {
          imgElement.onload = () => resolve(null);
          imgElement.onerror = () => resolve(null);
          setTimeout(() => resolve(null), 2000);
        }
      });

      const canvas = await html2canvas(shareContainer, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: false,
      });

      document.body.removeChild(shareContainer);

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'pepero-result.png', { type: 'image/png' });
            resolve(file);
          } else {
            resolve(null);
          }
        }, 'image/png');
      });
    } catch (error) {
      console.error('Image generation error:', error);
      return null;
    }
  };

  const handleShare = async () => {
    if (shareContainerRef.current && result) {
      try {
        const shareText = `빼빼로 하우 머치 결과!\n나는 빼빼로 ${result.peperoCount}개 값어치의 ${result.peperoType} 빼빼로상 🍫\n\n${result.personality}\n\n나는 무슨 상일까?\n👉 바로 확인해보기\n${window.location.href}`;
        const shareImage = await generateShareImage();
        
        if (navigator.share && shareImage) {
          try {
            await navigator.share({
              text: shareText,
              files: [shareImage],
              url: window.location.href,
            });
            return;
          } catch (shareError: any) {
            // 파일 공유가 실패하면 텍스트만 공유
            if (shareError.name !== 'AbortError') {
              console.log('File share failed, trying text only');
            }
          }
        }

        // 파일 공유가 지원되지 않거나 실패한 경우
        if (shareImage) {
          // 이미지를 클립보드에 복사
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': shareImage,
              }),
            ]);
            await navigator.clipboard.writeText(shareText);
            alert('결과 이미지와 텍스트가 클립보드에 복사되었습니다!');
          } catch (clipError) {
            // 클립보드 복사 실패 시 다운로드
            const url = URL.createObjectURL(shareImage);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'pepero-result.png';
            a.click();
            URL.revokeObjectURL(url);
            await navigator.clipboard.writeText(shareText);
            alert('이미지가 다운로드되었고 텍스트가 클립보드에 복사되었습니다!');
          }
        } else {
          // 이미지 생성 실패 시 텍스트만
          await navigator.clipboard.writeText(shareText);
          alert('결과가 클립보드에 복사되었습니다!');
        }
      } catch (error) {
        console.error('Share error:', error);
        alert('공유 중 오류가 발생했습니다.');
      }
    }
  };

  const handleInstagramShare = async () => {
    if (shareContainerRef.current && result) {
      try {
        const shareImage = await generateShareImage();
        
        if (shareImage) {
          // 이미지 다운로드
          const url = URL.createObjectURL(shareImage);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'pepero-result.png';
          a.click();
          URL.revokeObjectURL(url);
          
          // 인스타그램 스토리 공유 링크 (모바일에서만 작동)
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          if (isMobile) {
            // 짧은 지연 후 인스타그램 앱 열기 시도
            setTimeout(() => {
              window.open('instagram://story-camera', '_blank');
            }, 500);
            alert('이미지가 다운로드되었습니다!\n인스타그램 앱에서 스토리를 열고 다운로드한 이미지를 추가하세요.');
          } else {
            alert('이미지가 다운로드되었습니다!\n인스타그램 웹에서 업로드하거나 모바일에서 스토리에 추가하세요.');
          }
        } else {
          alert('이미지 생성에 실패했습니다.');
        }
      } catch (error) {
        console.error('Instagram share error:', error);
        alert('공유 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
    { !image && !isCameraMode ? (
      <div className='flex flex-col items-center justify-center h-screen gap-3 px-4'>
        <h1 className='text-3xl font-bold text-brown'>빼빼로 하우 머치</h1>
        <p className='text-sm text-gray-600'>내 얼굴은 빼빼로 몇 개?</p>
        <input type='file' accept='image/*' ref={fileInputRef} className='hidden' onChange={handleImageCapture} />
        <div className='mt-2 mb-1'>
          <Image src='/image.png' alt='how much pepero' width={350} height={350} />
        </div>
        <p className='text-xs text-gray-400 mb-2'>* 업로드한 이미지는 저장되지 않아요</p>
        <button className='bg-brown text-white w-full max-w-xs py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition' onClick={startCamera}>
          사진 찍기
        </button>
        <button className='bg-white text-brown border-2 border-brown w-full max-w-xs py-3.5 rounded-full text-base font-semibold hover:bg-gray-50 transition' onClick={() => fileInputRef.current?.click()}>
          사진 올리기
        </button>
        <div className='mt-6 pt-4 border-t border-gray-200 w-full max-w-xs'>
          <div className='flex flex-wrap justify-center gap-3 text-xs text-gray-500'>
            <Link href='/terms' className='hover:text-brown transition'>이용약관</Link>
            <span className='text-gray-300'>|</span>
            <Link href='/privacy' className='hover:text-brown transition'>개인정보 처리방침</Link>
            <span className='text-gray-300'>|</span>
            <Link href='/contact' className='hover:text-brown transition'>고객센터</Link>
          </div>
        </div>
        </div>
    ) : isCameraMode ? (
      <div className='flex flex-col items-center justify-center h-screen gap-5 px-4'>
        <p className='text-lg font-semibold text-brown'>카메라</p>
        <div className='relative w-full max-w-sm'>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className='w-full rounded-xl shadow-md'
            style={{ transform: 'scaleX(-1)' }}
          />
          <canvas ref={canvasRef} className='hidden' />
        </div>
        <div className='flex gap-3 w-full max-w-sm'>
          <button
            onClick={stopCamera}
            className='flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-lg text-base font-semibold hover:bg-gray-200 transition'
          >
            취소
          </button>
          <button
            onClick={capturePhoto}
            className='flex-1 bg-brown text-white py-3.5 rounded-lg text-base font-semibold hover:opacity-90 transition'
          >
            촬영
          </button>
        </div>
        <div className='mt-4 pt-4 border-t border-gray-200 w-full max-w-sm'>
          <div className='flex flex-wrap justify-center gap-3 text-xs text-gray-500'>
            <Link href='/terms' className='hover:text-brown transition'>이용약관</Link>
            <span className='text-gray-300'>|</span>
            <Link href='/privacy' className='hover:text-brown transition'>개인정보 처리방침</Link>
            <span className='text-gray-300'>|</span>
            <Link href='/contact' className='hover:text-brown transition'>고객센터</Link>
          </div>
        </div>
      </div>
    ) : (
      <div ref={shareContainerRef} className={`flex flex-col items-center min-h-screen px-4 py-6 transition-all duration-500 ${analyzing ? 'justify-center' : 'justify-start pt-6'}`}>
        {image && (
          <div className={`relative transition-all duration-500 ${analyzing ? 'w-32 h-32 mb-6' : 'w-40 h-40 mb-4'}`}>
            <Image 
              src={image} 
              alt='your face' 
              fill
              className='rounded-xl object-cover transition-all duration-500 shadow-sm' 
            />
          </div>
        )}
        <div className='w-full max-w-sm' ref={resultRef}>
          {analyzing ? (
            <div className='bg-white rounded-xl shadow-sm p-6 text-center'>
              <div className='animate-spin rounded-full h-10 w-10 border-2 border-brown border-t-transparent mx-auto mb-3'></div>
              <p className='text-lg font-semibold text-brown'>잠깐만요...</p>
              <p className='text-xs text-gray-500 mt-1'>빼빼로 개수 세는 중</p>
            </div>
          ) : result ? (
            <div className='rounded-xl p-5 space-y-5'>
              {/* 메인 결과 */}
              <div className='text-center pb-4 border-b border-gray-100'>
                <div className='flex items-baseline justify-center gap-1.5 mb-1'>
                <h2 className='text-5xl font-bold text-brown'>
                    {result.peperoCount}
                  </h2>
                  <span className='text-base text-gray-400'>개</span>
                </div>
                <p className='text-base text-gray-700 font-medium'>
                  {result.peperoType} 빼빼로상
                </p>
              </div>

              {/* 성격 분석 */}
              <div className='space-y-2'>
                <p className='text-sm text-gray-500 mb-1'>이런 사람이에요</p>
                <p className='text-sm text-gray-800 leading-relaxed'>
                  {result.personality}
                </p>
              </div>
              
              <div className='flex flex-col gap-3'>
              {/* 운세 */}
              <div className='bg-purple-50 rounded-lg p-4 space-y-1'>
                <div className='flex items-center gap-2 mb-1.5'>
                  <span className='text-lg'>🔮</span>
                  <h3 className='text-xs font-medium text-gray-600'>오늘 운세</h3>
                </div>
                <p className='text-sm text-gray-800 leading-relaxed pl-6'>
                  {result.fortune}
                </p>
              </div>

              {/* 조언 */}
              <div className='bg-amber-50 rounded-lg p-4 space-y-1'>
                <div className='flex items-center gap-2 mb-1.5'>
                  <span className='text-lg'>💡</span>
                  <h3 className='text-xs font-medium text-gray-600'>팁</h3>
                </div>
                <p className='text-sm text-gray-800 leading-relaxed pl-6'>
                  {result.tip}
                </p>
              </div>

              {/* 빼빼로 데이 예측 */}
              {predictedCount !== null && (
                <div className='bg-brown-50 rounded-lg p-4 space-y-1'>
                  <div className='flex items-center gap-2 mb-1.5'>
                    <span className='text-lg'>🎁</span>
                    <h3 className='text-xs font-medium text-gray-600'>빼빼로 데이 예측</h3>
                  </div>
                  <div className='pl-6'>
                    <p className='text-sm text-gray-800 leading-relaxed mb-2'>
                      올해 빼빼로 데이에 받을 빼빼로는
                    </p>
                    <div className='flex items-baseline gap-1.5 mb-2'>
                      <span className='text-2xl font-bold text-brown'>
                        {predictedCount}
                      </span>
                      <span className='text-sm text-gray-600'>개</span>
                    </div>
                    <p className='text-xs text-gray-600 italic'>
                      {predictedCount > 60 
                        ? '와! 엄청 많이 받을 거예요! 🎉'
                        : predictedCount > 40
                        ? '꽤 많이 받을 예정이에요! 😊'
                        : predictedCount > 20
                        ? '적당히 받을 거예요! 🍫'
                        : predictedCount > 10
                        ? '조금 받을 수도 있어요. 그래도 의미 있어요! 💝'
                        : '한두 개라도 받으면 행복해요! 🍀'}
                    </p>
                  </div>
                </div>
              )}
              </div>

              {/* 버튼들 */}
              <div className='flex flex-col gap-2.5 pt-2'>
                <button onClick={handleShare} className='bg-brown text-white flex-1 py-3 text-base font-semibold hover:opacity-90 transition rounded-full'>공유하기</button>
                <button onClick={handleInstagramShare} className='bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white flex-1 py-3 text-base font-semibold hover:opacity-90 transition rounded-full'>인스타 스토리</button>
                <button onClick={handleReset} className='bg-gray-100 text-gray-700 flex-1 py-3 text-base font-semibold hover:bg-gray-200 transition rounded-full'>다시하기</button>
              </div>
              
              {/* Footer 링크 */}
              <div className='pt-4 mt-4 border-t border-gray-100'>
                <div className='flex flex-wrap justify-center gap-3 text-xs text-gray-500'>
                  <Link href='/terms' className='hover:text-brown transition'>이용약관</Link>
                  <span className='text-gray-300'>|</span>
                  <Link href='/privacy' className='hover:text-brown transition'>개인정보 처리방침</Link>
                  <span className='text-gray-300'>|</span>
                  <Link href='/contact' className='hover:text-brown transition'>고객센터</Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )}
    </>
  )
}