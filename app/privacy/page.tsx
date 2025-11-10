export const metadata = {
  title: '개인정보 처리방침 | 빼빼로 하우 머치',
  description: '빼빼로 하우 머치 개인정보 처리방침',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-brown mb-8">개인정보 처리방침</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <p className="text-sm text-gray-500 mb-4">최종 수정일: 2024년 11월 11일</p>
            <p>
              빼빼로 하우 머치(이하 "서비스")는 이용자의 개인정보 보호를 매우 중요하게 생각하며, 
              「개인정보 보호법」 및 관련 법령을 준수하고 있습니다. 
              본 개인정보 처리방침은 서비스가 수집하는 개인정보의 항목, 처리 목적, 보유 및 이용 기간 등을 안내합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. 수집하는 개인정보의 항목 및 수집 방법</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">수집하는 정보</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>이미지 정보:</strong> 얼굴 분석을 위해 업로드하거나 촬영한 사진</li>
                  <li><strong>기기 정보:</strong> 서비스 이용 시 자동으로 수집되는 기기 정보 (브라우저 종류, OS 등)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">수집 방법</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>서비스 이용 과정에서 이용자가 직접 제공하는 정보</li>
                  <li>서비스 이용 과정에서 자동으로 생성되어 수집되는 정보</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. 개인정보의 처리 목적</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li><strong>서비스 제공:</strong> AI 기반 얼굴 분석 서비스 제공</li>
              <li><strong>서비스 개선:</strong> 서비스 품질 향상 및 오류 개선</li>
              <li><strong>기술적 지원:</strong> 서비스 이용 중 발생하는 기술적 문제 해결</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. 개인정보의 보유 및 이용 기간</h2>
            <div className="space-y-3">
              <p>
                서비스는 이용자가 업로드한 이미지를 <strong>서버에 저장하지 않으며</strong>, 
                AI 분석을 위해 일시적으로만 처리한 후 즉시 삭제합니다.
              </p>
              <p>
                분석 결과는 이용자의 기기에서만 저장되며, 서비스 제공자는 어떠한 개인정보도 보유하지 않습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. 개인정보의 제3자 제공</h2>
            <p>
              서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 
              다만, AI 분석을 위해 Google Gemini API를 사용하며, 
              이 과정에서 이미지 데이터가 Google로 전송될 수 있습니다. 
              Google의 개인정보 처리방침은 Google의 정책을 따릅니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. 개인정보 처리의 위탁</h2>
            <p>
              서비스는 AI 분석 기능을 제공하기 위해 Google Gemini API를 사용합니다. 
              이미지 분석을 위해 이미지 데이터가 Google로 전송되지만, 
              Google은 분석 목적 외의 용도로 데이터를 사용하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. 이용자의 권리 및 행사 방법</h2>
            <p>
              이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제를 요구할 수 있습니다. 
              다만, 서비스는 이용자가 업로드한 이미지를 서버에 저장하지 않으므로, 
              이용자가 직접 기기에서 삭제할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. 개인정보의 파기</h2>
            <p>
              서비스는 이용자가 업로드한 이미지를 서버에 저장하지 않으며, 
              AI 분석 완료 후 즉시 삭제됩니다. 
              이용자의 기기에 저장된 분석 결과는 이용자가 직접 삭제할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. 개인정보 보호책임자</h2>
            <p>
              서비스의 개인정보 보호 관련 문의사항은 고객센터를 통해 문의하실 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. 개인정보 처리방침의 변경</h2>
            <p>
              본 개인정보 처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 수 있으며, 
              변경사항은 서비스 내 공지사항을 통해 공지합니다.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <a 
            href="/" 
            className="text-brown hover:underline font-medium"
          >
            ← 홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}

