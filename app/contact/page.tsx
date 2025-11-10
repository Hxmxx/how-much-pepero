'use client'

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: '업로드한 사진은 어디에 저장되나요?',
      answer: '업로드하신 사진은 서버에 저장되지 않습니다. AI 분석을 위해 일시적으로만 처리되며, 분석 완료 후 즉시 삭제됩니다.',
    },
    {
      question: '분석 결과는 정확한가요?',
      answer: '본 서비스는 오락 목적으로 제공되며, 분석 결과의 정확성을 보장하지 않습니다. 재미있게 즐겨주시기 바랍니다.',
    },
    {
      question: '카메라가 작동하지 않아요',
      answer: '카메라 기능은 HTTPS 환경에서만 작동합니다. 또한 브라우저에서 카메라 접근 권한을 허용해야 합니다. 권한 설정을 확인해주세요.',
    },
    {
      question: '공유 이미지가 생성되지 않아요',
      answer: '이미지 생성에 실패한 경우, 페이지를 새로고침하고 다시 시도해주세요. 문제가 지속되면 문의해주시기 바랍니다.',
    },
    {
      question: '분석이 오래 걸려요',
      answer: 'AI 분석은 보통 몇 초에서 30초 정도 소요됩니다. 네트워크 상태에 따라 시간이 더 걸릴 수 있습니다.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 서버로 전송하거나 이메일 서비스를 사용
    console.log('문의 내용:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-brown mb-8">고객센터</h1>
        
        <div className="space-y-8">
          {/* FAQ 섹션 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">자주 묻는 질문</h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">
                      Q. {faq.question}
                    </h3>
                    <span className="text-brown text-xl flex-shrink-0">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-gray-700 leading-relaxed">
                        A. {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 문의하기 폼 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">문의하기</h2>
            
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800 font-medium">문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-brown outline-none"
                    placeholder="이름을 입력해주세요"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-brown outline-none"
                    placeholder="이메일을 입력해주세요"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    문의 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-brown outline-none"
                  >
                    <option value="">선택해주세요</option>
                    <option value="bug">버그 신고</option>
                    <option value="feature">기능 제안</option>
                    <option value="privacy">개인정보 관련</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-brown outline-none resize-none"
                    placeholder="문의 내용을 자세히 입력해주세요"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brown text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  문의하기
                </button>
              </form>
            )}
          </section>

          {/* 연락처 정보 */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">연락처 정보</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>이메일:</strong>{' '}
                <a 
                  href="mailto:haminni.dev@gmail.com" 
                  className="text-brown hover:underline"
                >
                  haminni.dev@gmail.com
                </a>
              </p>
              <p><strong>응답 시간:</strong> 평일 09:00 - 18:00 (주말 및 공휴일 제외)</p>
              <p className="text-sm text-gray-500 mt-4">
                * 문의하신 내용에 대한 답변은 입력하신 이메일로 발송됩니다.
              </p>
            </div>
          </section>

          {/* 관련 링크 */}
          <section>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/terms" 
                className="text-brown hover:underline font-medium"
              >
                서비스 이용약관
              </a>
              <span className="text-gray-300">|</span>
              <a 
                href="/privacy" 
                className="text-brown hover:underline font-medium"
              >
                개인정보 처리방침
              </a>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-200">
            <a 
              href="/" 
              className="text-brown hover:underline font-medium"
            >
              ← 홈으로 돌아가기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

