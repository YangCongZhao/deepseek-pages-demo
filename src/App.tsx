import { useState } from 'react';

const ChatComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e:never) => {
        e.preventDefault();
        setError(null);
        setResponse(null);
        setLoading(true);

        try {
            const res = await fetch('/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    systemPrompt: systemPrompt || undefined,
                    model: 'deepseek-chat',
                    temperature: 0.7,
                    max_tokens: 2000,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || '请求失败');
            }

            setResponse(data);
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl w-full bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
                DeepSeek AI Chat
            </h1>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        System Prompt (可选)
                    </label>
                    <textarea
                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-[#6B46C1] focus:ring-2 focus:ring-[#6B46C1] focus:ring-opacity-20"
                        rows={3}
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        placeholder="例如：你是一个有用的AI助手，名叫MyAI"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        用户 Prompt
                    </label>
                    <textarea
                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 transition-all duration-200 focus:border-[#6B46C1] focus:ring-2 focus:ring-[#6B46C1] focus:ring-opacity-20"
                        rows={3}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="请输入您的问题，例如：你好，请介绍一下你自己"
                        required
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading || !prompt}
                    className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-300 ${
                        loading || !prompt
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-[#2A2A72] to-[#6B46C1] hover:bg-[#5B3AB1] hover:-translate-y-[1px]'
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
            </div>

            {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
                    <p className="font-medium">错误：{error}</p>
                </div>
            )}

            {response && (
                <div
                    className="mt-6 p-6 bg-gray-50 rounded-lg transition-all duration-300 ease-in-out opacity-0 translate-y-2 animate-[fadeIn_300ms_ease-in-out_forwards]"
                    style={{
                        animation: 'fadeIn 300ms ease-in-out forwards',
                    }}
                >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">响应</h2>
                    <div className="space-y-3 text-gray-700">
                        <p>
                            <strong className="font-medium">ID:</strong> {response.id}
                        </p>
                        <p>
                            <strong className="font-medium">内容:</strong>{' '}
                            {response.choices[0].message.content}
                        </p>
                        <p>
                            <strong className="font-medium">Prompt Tokens:</strong>{' '}
                            {response.usage.prompt_tokens}
                        </p>
                        <p>
                            <strong className="font-medium">Completion Tokens:</strong>{' '}
                            {response.usage.completion_tokens}
                        </p>
                        <p>
                            <strong className="font-medium">Total Tokens:</strong>{' '}
                            {response.usage.total_tokens}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
