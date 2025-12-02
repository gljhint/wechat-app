<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenRouterService
{
    protected string $apiKey;
    protected string $gatewayUrl;
    protected string $defaultModel = 'openai/gpt-5.1';

    public function __construct()
    {
        $this->apiKey = config('services.openrouter.api_key');

        $this->gatewayUrl = "https://gateway.ai.cloudflare.com/v1/8ed94162ee5aedcc08fc241f2fe7378d/weixin-app/openrouter/v1";
    }

    /**
     * 生成圣经解释
     *
     * @param string $bibleReading 圣经读经内容
     * @return array 包含explanation, model_used等信息
     */
    public function generateBibleExplanation(string $bibleReading): array
    {
        try {
            $prompt = $this->buildPrompt($bibleReading);

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(60)->post($this->gatewayUrl . '/chat/completions', [
                'model' => $this->defaultModel,
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt,
                    ],
                ],
            ]);

            if (!$response->successful()) {
                throw new \Exception('OpenRouter API request failed: ' . $response->body());
            }

            $data = $response->json();

            return [
                'success' => true,
                'explanation' => $data['choices'][0]['message']['content'] ?? '',
                'model_used' => $data['model'] ?? $this->defaultModel,
            ];

        } catch (\Exception $e) {
            Log::error('OpenRouter API Error: ' . $e->getMessage());

            return [
                'success' => false,
                'error_message' => $e->getMessage(),
            ];
        }
    }

    /**
     * 构建提示词
     */
    protected function buildPrompt(string $bibleReading): string
    {
        return <<<EOT
你是一位资深的圣经学者和灵修导师。用户提供的读经内容包含了要阅读的经文章节和若干思考问题。请帮助用户理解这些经文，并解答思考问题。

读经内容：
{$bibleReading}

请按照以下结构提供解释：

**一、经文概览**
简要介绍今日所读经文的历史背景、主要人物和核心事件。

**二、问题解析**
逐一解答读经内容中提出的思考问题，每个问题的回答要：
- 紧扣经文内容
- 说明经文中的属灵教训
- 联系现代基督徒生活的实际应用

**三、灵修反思**
提供2-3个实用的反思要点，帮助读者将今日所学应用到日常生活中。

**四、祷告方向**
根据今日经文和思考问题，提供简短的祷告指引（1-2句话）。

写作要求：
- 用温暖、亲切的语气，避免过于学术化的表达
- 内容要有深度但易于理解
- 总字数控制在500-800字
- 适当引用相关经文作为佐证
- 关注经文的实际应用价值
EOT;
    }

    /**
     * 设置使用的模型
     */
    public function setModel(string $model): self
    {
        $this->defaultModel = $model;
        return $this;
    }
}
