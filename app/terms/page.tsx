export const metadata = {
  title: '서비스 이용약관 | 빼빼로 하우 머치',
  description: '빼빼로 하우 머치 서비스 이용약관',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-brown mb-8">서비스 이용약관</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <p className="text-sm text-gray-500 mb-4">최종 수정일: 2024년 11월 11일</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제1조 (목적)</h2>
            <p>
              본 약관은 빼빼로 하우 머치(이하 "서비스")가 제공하는 AI 기반 얼굴 분석 서비스의 이용과 관련하여 
              서비스 제공자와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제2조 (정의)</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>"서비스"란 AI를 활용한 얼굴 분석 및 빼빼로 타입 분석 서비스를 의미합니다.</li>
              <li>"이용자"란 본 약관에 따라 서비스를 이용하는 자를 의미합니다.</li>
              <li>"콘텐츠"란 서비스를 통해 생성된 분석 결과, 이미지 등을 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제3조 (서비스의 제공)</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
              <li>서비스 제공자는 기술적 사양의 변경, 서비스 개선 등을 위해 서비스의 전부 또는 일부를 수정·중단할 수 있습니다.</li>
              <li>서비스 제공자는 서비스 이용과 관련하여 발생한 문제에 대해 일체의 책임을 지지 않습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제4조 (이용자의 의무)</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>이용자는 서비스를 이용할 때 다음 행위를 하여서는 안 됩니다:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>타인의 사진을 무단으로 업로드하는 행위</li>
                  <li>서비스의 안정적 운영을 방해하는 행위</li>
                  <li>법령 또는 본 약관에 위반되는 행위</li>
                </ul>
              </li>
              <li>이용자가 위반 행위를 한 경우 서비스 제공자는 서비스 이용을 제한하거나 중단할 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제5조 (개인정보 보호)</h2>
            <p>
              서비스 제공자는 이용자의 개인정보를 보호하기 위하여 노력합니다. 
              개인정보의 보호 및 사용에 대해서는 관련 법령 및 서비스 제공자의 개인정보 처리방침이 적용됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제6조 (저작권)</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>서비스에 게재된 모든 콘텐츠의 저작권은 서비스 제공자에게 있습니다.</li>
              <li>이용자가 생성한 콘텐츠에 대한 권리는 이용자에게 있습니다.</li>
              <li>이용자는 서비스를 통해 생성된 콘텐츠를 개인적인 목적으로만 사용할 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제7조 (면책조항)</h2>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>서비스 제공자는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
              <li>서비스 제공자는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
              <li>서비스 제공자는 AI 분석 결과의 정확성을 보장하지 않으며, 분석 결과는 오락 목적으로만 제공됩니다.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제8조 (약관의 변경)</h2>
            <p>
              서비스 제공자는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">제9조 (준거법 및 관할법원)</h2>
            <p>
              본 약관에 명시되지 않은 사항은 대한민국 법령을 따르며, 
              서비스 이용과 관련하여 발생한 분쟁에 대해서는 대한민국 법원의 관할을 따릅니다.
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

