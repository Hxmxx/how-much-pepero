import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { imageData } = body;

        if (!imageData) {
            return Response.json({ error: "Image data is required" }, { status: 400 });
        }

        const contents = [
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: imageData,
                },
            },
            {
                text: `당신은 빼빼로 관상가입니다. 이 사진을 보고 재미있고 황당한 빼빼로 관상을 봐주세요.

다음 JSON 형식으로만 응답하세요 (다른 텍스트나 마크다운 없이):
{
  "peperoCount": 숫자 (100-1000 사이),
  "peperoType": "빼빼로 종류 (예: 아몬드, 누드, 초코쿠키, 화이트쿠키, 딸기, 치즈 등)",
  "personality": "한 줄 성격 분석 (20자 내외, 재미있게)",
  "fortune": "오늘의 빼빼로 운세 (30자 내외, 황당하고 웃기게)",
  "tip": "빼빼로 조언 (30자 내외, 말도 안 되지만 그럴싸하게)"
}

예시:
{
  "peperoCount": 427,
  "peperoType": "아몬드",
  "personality": "겉은 까칠하지만 속은 달달한 츤데레형",
  "fortune": "오늘 초코가 묻을 확률 99%, 티슈 필수",
  "tip": "빼빼로는 45도 각도로 먹으면 운이 옴"
}`
            },
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
        });

        // Google GenAI 응답에서 텍스트 추출
        let text = "";
        if (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) {
            text = response.candidates[0].content.parts[0].text;
        } else if ('text' in response && typeof response.text === 'string') {
            text = response.text;
        }
        
        console.log(text);
        return Response.json({ text });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Failed to generate content" }, { status: 500 });
    }
}