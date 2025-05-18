import { useState } from 'react';
import { MastraClient } from "@mastra/client-js";
import Markdown from 'react-markdown'
interface ChatResponse {
    text: string | null | undefined;
    id: string;
    choices: {
        message: {
            content: string;
        };
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

const ChatComponent = () => {
    const [prompt, setPrompt] = useState('');
    // const [systemPrompt] = useState('');
    const [response, setResponse] = useState<ChatResponse | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const client = new MastraClient({
        // Required
       // baseUrl: "https://yc-mastra-app.yangcongzhao123.workers.dev",
         baseUrl: "http://localhost:4111",

        // Optional configurations for development
        retries: 3, // Number of retry attempts
        backoffMs: 300, // Initial retry backoff time
        maxBackoffMs: 5000, // Maximum retry backoff time
        headers: {
            // Custom headers for development
            'Content-Type': 'application/json',
            "X-Development": "true",
        },
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setResponse(null);
        setLoading(true);

        try {
            const agent = client.getAgent("codeReviewAgent");
            const response = await agent.generate({
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            });

            // const res = await fetch('https://my-app.yangcongzhao123.workers.dev/ai/chat', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         prompt,
            //         systemPrompt: systemPrompt || undefined,
            //         model: 'deepseek-chat',
            //         temperature: 0.7,
            //         max_tokens: 2000,
            //     }),
            // });
            //
            // const data = await res.json();
            //
            // if (!res.ok) {
            //     throw new Error(data.error || '请求失败');
            // }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setResponse(response);
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl w-full bg-white rounded-lg p-8 shadow-md mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
                code review
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
          <textarea
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none transition duration-200"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="上传代码"
              required
          />
                </div>
                <button
                    type="submit"
                    disabled={loading || !prompt}
                    className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-transform duration-300 ${
                        loading || !prompt
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-indigo-700 to-purple-600 hover:brightness-110 hover:-translate-y-0.5'
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
              <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
              >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              处理中...
            </span>
                    ) : (
                        '发送'
                    )}
                </button>
            </form>

            {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">
                    <p className="font-medium">错误：{error}</p>
                </div>
            )}

            {response && (
                <div className="mt-6 p-6 bg-gray-50 rounded-md animate-fadeIn">
                    <div className="space-y-3 text-gray-700">
                        <p>
                            <Markdown>{response.text}</Markdown>
                        </p>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
