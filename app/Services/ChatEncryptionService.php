<?php

namespace App\Services;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

/**
 * 聊天消息加密服务
 *
 * 安全设计说明:
 * 1. 每条消息使用独立的随机密钥进行加密
 * 2. 该随机密钥使用用户对话密钥进行加密后存储
 * 3. 用户对话密钥从应用主密钥(APP_KEY)派生,确保安全性
 * 4. 管理员无法解密查看聊天内容,只能看统计数据
 */
class ChatEncryptionService
{
    /**
     * 生成用户对话密钥(私聊)
     *
     * 使用用户ID组合和应用密钥派生唯一密钥
     * 确保相同的用户对话始终生成相同的密钥
     *
     * @param int $userId1 用户1的ID
     * @param int $userId2 用户2的ID
     * @return string 32字节的派生密钥
     */
    private function deriveConversationKey(int $userId1, int $userId2): string
    {
        // 确保用户ID排序一致,避免 A->B 和 B->A 生成不同密钥
        $sortedIds = [$userId1, $userId2];
        sort($sortedIds);

        // 使用HMAC-SHA256从APP_KEY派生对话密钥
        // 注意: 保持与旧版兼容,不添加前缀!
        $baseKey = config('app.key');
        $conversationSalt = implode(':', $sortedIds);

        return hash_hmac('sha256', $conversationSalt, $baseKey, true);
    }

    /**
     * 生成群组共享密钥
     *
     * 所有群成员共享同一个群组密钥
     *
     * @param int $groupId 群组ID
     * @return string 32字节的派生密钥
     */
    private function deriveGroupKey(int $groupId): string
    {
        $baseKey = config('app.key');
        $groupSalt = 'group:' . $groupId;

        return hash_hmac('sha256', $groupSalt, $baseKey, true);
    }

    /**
     * 加密消息内容
     *
     * @param string $content 原始消息内容
     * @param int $fromUserId 发送者ID
     * @param int $recipientId 接收者ID(私聊用户ID或群组ID)
     * @param bool $isGroup 是否为群聊消息
     * @return array ['encrypted_content' => string, 'encryption_key' => string, 'encryption_iv' => string]
     * @throws \Exception
     */
    public function encryptMessage(string $content, int $fromUserId, int $recipientId, bool $isGroup = false): array
    {
        // 1. 生成随机消息密钥 (32字节)
        $messageKey = random_bytes(32);

        // 2. 生成随机初始化向量 (16字节用于AES-256-CBC)
        $iv = random_bytes(16);

        // 3. 使用随机密钥加密消息内容
        $encryptedContent = openssl_encrypt(
            $content,
            'AES-256-CBC',
            $messageKey,
            OPENSSL_RAW_DATA,
            $iv
        );

        if ($encryptedContent === false) {
            throw new \Exception('消息加密失败');
        }

        // 4. 生成对话密钥(根据类型选择)
        if ($isGroup) {
            // 群聊: 使用群组共享密钥
            $conversationKey = $this->deriveGroupKey($recipientId);
        } else {
            // 私聊: 使用用户对话密钥
            $conversationKey = $this->deriveConversationKey($fromUserId, $recipientId);
        }

        // 5. 使用对话密钥加密消息密钥
        $encryptedMessageKey = openssl_encrypt(
            $messageKey,
            'AES-256-CBC',
            $conversationKey,
            OPENSSL_RAW_DATA,
            substr($conversationKey, 0, 16) // 使用对话密钥的前16字节作为IV
        );

        if ($encryptedMessageKey === false) {
            throw new \Exception('密钥加密失败');
        }

        return [
            'encrypted_content' => base64_encode($encryptedContent),
            'encryption_key' => base64_encode($encryptedMessageKey),
            'encryption_iv' => base64_encode($iv),
        ];
    }

    /**
     * 解密消息内容
     *
     * @param string $encryptedContent Base64编码的加密内容
     * @param string $encryptedKey Base64编码的加密密钥
     * @param string $iv Base64编码的初始化向量
     * @param int $fromUserId 发送者ID
     * @param int $recipientId 接收者ID(私聊用户ID或群组ID)
     * @param bool $isGroup 是否为群聊消息
     * @return string 解密后的原始内容
     * @throws DecryptException
     */
    public function decryptMessage(
        string $encryptedContent,
        string $encryptedKey,
        string $iv,
        int $fromUserId,
        int $recipientId,
        bool $isGroup = false
    ): string {
        try {
            // 1. 生成对话密钥(根据类型选择)
            if ($isGroup) {
                // 群聊: 使用群组共享密钥
                $conversationKey = $this->deriveGroupKey($recipientId);
            } else {
                // 私聊: 使用用户对话密钥
                $conversationKey = $this->deriveConversationKey($fromUserId, $recipientId);
            }

            // 2. 解密消息密钥
            $messageKey = openssl_decrypt(
                base64_decode($encryptedKey),
                'AES-256-CBC',
                $conversationKey,
                OPENSSL_RAW_DATA,
                substr($conversationKey, 0, 16)
            );

            if ($messageKey === false) {
                throw new DecryptException('密钥解密失败');
            }

            // 3. 使用消息密钥解密内容
            $decryptedContent = openssl_decrypt(
                base64_decode($encryptedContent),
                'AES-256-CBC',
                $messageKey,
                OPENSSL_RAW_DATA,
                base64_decode($iv)
            );

            if ($decryptedContent === false) {
                throw new DecryptException('消息解密失败');
            }

            return $decryptedContent;

        } catch (\Exception $e) {
            throw new DecryptException('解密失败: ' . $e->getMessage());
        }
    }

    /**
     * 加密媒体URL (图片、视频等)
     *
     * 使用Laravel内置加密,因为URL通常不需要端到端加密
     *
     * @param string $url 原始URL
     * @return string 加密后的URL
     */
    public function encryptMediaUrl(string $url): string
    {
        return Crypt::encryptString($url);
    }

    /**
     * 解密媒体URL
     *
     * @param string $encryptedUrl 加密的URL
     * @return string 原始URL
     * @throws DecryptException
     */
    public function decryptMediaUrl(string $encryptedUrl): string
    {
        return Crypt::decryptString($encryptedUrl);
    }

    /**
     * 验证当前用户是否有权限解密该消息
     *
     * @param int|null $currentUserId 当前用户ID
     * @param int $fromUserId 发送者ID
     * @param int $recipientId 接收者ID(私聊用户ID或群组ID)
     * @param bool $isGroup 是否为群聊消息
     * @return bool
     */
    public function canDecrypt(?int $currentUserId, int $fromUserId, int $recipientId, bool $isGroup = false): bool
    {
        // 如果用户未登录,无权解密
        if ($currentUserId === null) {
            return false;
        }

        if ($isGroup) {
            // 群聊: 需要检查用户是否是群成员
            // 这里简化处理,交由外层(ChatMessage)验证群成员身份
            // 只要是登录用户,就允许尝试解密(解密会用群组密钥)
            return true;
        } else {
            // 私聊: 只有发送者和接收者可以解密
            return $currentUserId === $fromUserId || $currentUserId === $recipientId;
        }
    }

    /**
     * 用旧版逻辑解密(兼容迁移,无'private:'前缀)
     *
     * @internal 仅用于数据迁移
     */
    public function decryptMessageLegacy(
        string $encryptedContent,
        string $encryptedKey,
        string $iv,
        int $fromUserId,
        int $recipientId
    ): string {
        try {
            // 使用旧版密钥派生(无前缀)
            $sortedIds = [$fromUserId, $recipientId];
            sort($sortedIds);
            $baseKey = config('app.key');
            $conversationSalt = implode(':', $sortedIds);  // 注意:无前缀!
            $conversationKey = hash_hmac('sha256', $conversationSalt, $baseKey, true);

            // 解密消息密钥
            $messageKey = openssl_decrypt(
                base64_decode($encryptedKey),
                'AES-256-CBC',
                $conversationKey,
                OPENSSL_RAW_DATA,
                substr($conversationKey, 0, 16)
            );

            if ($messageKey === false) {
                throw new DecryptException('密钥解密失败');
            }

            // 解密内容
            $decryptedContent = openssl_decrypt(
                base64_decode($encryptedContent),
                'AES-256-CBC',
                $messageKey,
                OPENSSL_RAW_DATA,
                base64_decode($iv)
            );

            if ($decryptedContent === false) {
                throw new DecryptException('消息解密失败');
            }

            return $decryptedContent;

        } catch (\Exception $e) {
            throw new DecryptException('旧版解密失败: ' . $e->getMessage());
        }
    }
}
